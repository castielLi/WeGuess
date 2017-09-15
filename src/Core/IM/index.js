/**
 * Created by apple on 2017/7/26.
 */

import Connect from './socket'
import * as methods from './Common'
import * as storeSqlite from './StoreSqlite'
import UUIDGenerator from 'react-native-uuid-generator';
import MessageStatus from "./dto/MessageStatus"
import SendStatus from './dto/SendStatus'
import * as configs from './IMconfig'
import MessageCommandEnum from './dto/MessageCommandEnum'
import * as DtoMethods from './dto/Common'



let _socket = new Connect("1");

//网络状态
let networkStatus = "";

//发送消息队列
let sendMessageQueue = [];
let sendMessageQueueState;
//等待发送消息队列
let waitSendMessageQueue = [];
//收到消息队列
let recieveMessageQueue = [];
let recMessageQueueState;
let waitRecMessageQueue = [];
//存储sqlite队列
let handleSqliteQueueState;
let handleSqliteQueue = [];
let waitSqliteQueue = [];
//ack队列
let ackMessageQueue = [];
let waitAckMessageQueue = [];
let ackMessageQueueState;

//资源队列
let resourceQueueState;
let resourceQueue = [];
let waitResourceQueue = [];

let heartBeatInterval;
let loopInterval;
let checkQueueInterval;
let checkNetEnvironmentInterval;
let storeSqliteInterval;
let loopState;
let netState;

//假设账号token就是1
let ME = "1";

let currentObj = undefined;


//上层应用IM的接口
//返回消息结果回调
let AppMessageResultHandle = undefined;
//function(success:boolean,data:{})
//返回修改消息状态回调
let AppMessageChangeStatusHandle = undefined;
//function(message:message);


let __instance = (function () {
    let instance;
    return (newInstance) => {
        if (newInstance) instance = newInstance;
        return instance;
    }
}());

export default class IM {
    constructor(){
        if (__instance()) return __instance();

        __instance(this);
        this.socket = _socket;
        this.socket.onRecieveCallback(this.recMessage)
        //初始化IM的数据库
        storeSqlite.initIMDatabase();
        this.startIM();
        currentObj = this;
    }


    //赋值外部IM接口
    connectIM(getMessageResultHandle,changeMessageHandle){
        AppMessageResultHandle = getMessageResultHandle;
        AppMessageChangeStatusHandle = changeMessageHandle;
    }

    startIM(){
        loopState = loopStateType.wait;
        sendMessageQueueState = sendMessageQueueType.empty;
        handleSqliteQueueState = handleSqliteQueueType.empty;
        recMessageQueueState = recMessageQueueType.empty;
        ackMessageQueueState = ackQueueType.empty;
        resourceQueueState = resourceQueueType.empty;
        this.beginHeartBeat();
        this.beginRunLoop();

        //获取之前没有发送出去的消息重新加入消息队列
        this.addAllUnsendMessageToSendQueue();
    }

    setNetworkStatus(netState) {
        if (netState == "NONE" || netState == "none") {
            networkStatus = networkStatuesType.none;
        }
    }

    stopIM(){
        this.checkQueue(this.stopIMRunCycle);
    }

    waitOneLoop(){

    }

    stopIMRunCycle(){
        clearInterval(heartBeatInterval)
        clearInterval(loopInterval)
        clearInterval(checkQueueInterval)
    }

    //网络状态变换回调
    handleNetEnvironment(connectionInfo){
        netState = connectionInfo;

        if(netState == "NONE" || netState == "none"){

            networkStatus = networkStatuesType.none;

            checkNetEnvironmentInterval = setInterval(function () {

                if(netState != 'NONE' && netState != 'none'){
                    clearInterval(checkNetEnvironmentInterval);

                    //todo:恢复网络了后要重新发送消息

                    _socket.reConnectNet();

                    storeSqlite.getAllCurrentSendMessage(function(currentSendMessages){
                        console.log(currentSendMessages);
                        sendMessageQueue = currentSendMessages.reduce(function(prev, curr){ prev.push(curr); return prev; },sendMessageQueue);
                    });

                }
            },200);
        }else{
            networkStatus = networkStatuesType.normal;
        }
    }


    //检查send 和 rec队列执行回调
    checkQueue(emptyCallBack,inEmptyCallBack){
        checkQueueInterval = setInterval(function () {
            if(sendMessageQueue.length == 0 && recieveMessageQueue.length == 0){

                emptyCallBack || emptyCallBack();
            }else{
                inEmptyCallBack || inEmptyCallBack();
            }
        }, 1000);
    }

    //删除当前聊天所有消息
    deleteCurrentChatMessage(name,chatType){
        storeSqlite.deleteClientRecode(name,chatType);
    }

    //删除当条消息
    deleteMessage(message,chatType,client){
        storeSqlite.deleteMessage(message,chatType,client);
    }


    //获取当前用户或者群组的聊天记录
    getRecentChatRecode(account,way,range = {start:0,limit:10},callback){
        storeSqlite.queryRecentMessage(account,way,range,callback);
    }




    //获取当前所有未发出去的消息添加入消息队列
    addAllUnsendMessageToSendQueue(){
        storeSqlite.getAllCurrentSendMessage(function(currentSendMessages){
            console.log("复制未发送的消息进入发送队列");
            if(currentSendMessages == null){
                return;
            }

            let messages = [];

            currentSendMessages.forEach(function (item) {
                messages.push(DtoMethods.sqliteMessageToMessage(item))
            })
            sendMessageQueue = messages.reduce(function(prev, curr){ prev.push(curr); return prev; },sendMessageQueue);
        });
    }


    //外部接口，添加消息
    addMessage(message,callback=function(success,content){},onprogess="undefined") {

        let messageUUID = "";

        if (message.type == "undefined") {
            callback(false, "message type error");
        }

        //先生成唯一的messageID并且添加message进sqlite保存
        UUIDGenerator.getRandomUUID().then((uuid) => {
            messageId = message.Data.Data.Receiver + "_" +uuid;
            message.MSGID = messageId;
            messageUUID = messageId;

            //把消息存入消息sqlite中
            message.status = MessageStatus.WaitOpreator;

            this.storeSendMessage(message);

            //把消息存入发送队列sqlite中
            storeSqlite.addMessageToSendSqlite(message);


            switch (message.type) {
                case "text":
                    this.addMessageQueue(message);
                    callback(true,message.MSGID);
                    break;
                case "image":

                    resourceQueue.push({onprogress:onprogess,message:message})
                    callback(true,message.MSGID);
                    break;
                case "audio":
                    resourceQueue.push({onprogress:onprogess,message:message})
                    callback(true,message.MSGID);
                    break;
                default:
                    break;
            }

            return messageUUID;
        });
    }


    //向resource队列中添加对象
    addResourceQueue(object){

        resourceQueue.push(object);
        console.log("message 加入资源队列")
    }

    //执行resource队列
    handleResourceQueue(obj){

        if(resourceQueue.length > 0){

            resourceQueueState = resourceQueueType.excuting;

            for(let item in resourceQueue){
                obj.uploadResource(resourceQueue[item]);
                resourceQueue.shift();
            }
            resourceQueueState = resourceQueueType.empty;

        }
    }

    //执行upload函数体
    uploadResource(obj){

        let message = obj["message"];
        let progressHandles = obj["onprogress"];
        let callback = obj["callback"];

        let uploadQueue = [];
        for(let item in message.Resource) {
            uploadQueue.push(methods.getUploadPathFromServer(message.Resource[item].LocalSource,item,function(progress,index){
                // console.log("进度：" + (progress.loaded / progress.total) + "%");
                let onprogess = progressHandles[index*1];
                onprogess("第"+(index * 1 + 1) +"张图片上传进度："+ progress.loaded/progress.total * 100);
            },function(result){
                console.log("上传成功" + result);
                message.Resource[item].RemoteSource = result.url;
            }));
        }

        Promise.all(uploadQueue).then(function(values){
            console.log(values);

            let copyMessage = Object.assign({}, message);

            copyMessage.status = SendStatus.PrepareToSend;
            currentObj.addUpdateSqliteQueue(copyMessage,UpdateMessageSqliteType.changeSendMessage)

            currentObj.addMessageQueue(message);

            //App上层修改message细节
            AppMessageChangeStatusHandle(message);

        }).catch(function (values) {
            console.log('上传失败上传失败上传失败上传失败',values);
        })

    }




    //添加消息至消息队列
    addMessageQueue(message){

        sendMessageQueue.push(message);
        console.log("message 加入发送队列")

    }

    //处理消息队列
    handleSendMessageQueue(obj){
        if(sendMessageQueue.length > 0){

            sendMessageQueueState = sendMessageQueueType.excuting;
            console.log(sendMessageQueueState);
            for(let item in sendMessageQueue){
                obj.sendMessage(sendMessageQueue[item],obj);
                sendMessageQueue.shift();
            }

            sendMessageQueueState = sendMessageQueueType.empty;
            console.log(sendMessageQueueState);
        }
    }

    //发送消息
    sendMessage(message,obj){
        //发送websocket
        console.log("开始发送消息了")


        let copyMessage = Object.assign({}, message);

        if(networkStatus == networkStatuesType.normal) {
            let success = this.socket.sendMessage(message);


            //心跳包不需要进行存储
            if(message.Command != MessageCommandEnum.MSG_HEART) {
                console.log("添加" + message.MSGID + "进队列");
                //初始加入ack队列，发送次数默认为1次
                obj.addAckQueue(message, 1);
                console.log("ack queue 长度" + ackMessageQueue.length);

                copyMessage.status = SendStatus.WaitAck;
                this.addUpdateSqliteQueue(copyMessage,UpdateMessageSqliteType.changeSendMessage)
            }
        }else{
            copyMessage.status = SendStatus.PrepareToSend;
            this.addUpdateSqliteQueue(copyMessage,UpdateMessageSqliteType.changeSendMessage)
        }
    }

    //存储消息
    storeSendMessage(message){
        if(message.Data.Data.Receiver != ME){
            storeSqlite.storeSendMessage(message);
        }else{
            storeSqlite.storeRecMessage(message);
        }
    }


    //向sqlite队列中push元素
    addUpdateSqliteQueue(message,type){
        handleSqliteQueue.push({message:message,type:type});
    }


    //处理更新sqlite队列
    handleUpdateSqlite(obj){
        if(handleSqliteQueue.length > 0){

            handleSqliteQueueState = handleSqliteQueueType.excuting;
            console.log(handleSqliteQueueState);
            for(let item in handleSqliteQueue){

                obj.updateSqliteMessage(handleSqliteQueue[item].message,handleSqliteQueue[item].type);
                handleSqliteQueue.shift();
            }


            handleSqliteQueueState = handleSqliteQueueType.empty;
            console.log(handleSqliteQueueState);
        }
    }

    //更改消息状态
    updateSqliteMessage(message,way){
        //根据类别修改消息结果或者是发送消息的消息状态
        if(way == UpdateMessageSqliteType.storeMessage){
            //修改message表中message状态
            storeSqlite.updateMessageStatus(message);
        }else{
            //修改发送队列中message状态
            storeSqlite.updateSendMessageStatus(message);
        }

    }

    //删除数据库中发送队列的message
    popCurrentMessageSqlite(messageId){
        storeSqlite.popMessageInSendSqlite(messageId);
    }





    //websocket接口,添加接受消息队列
    addRecMessage(message){

        recieveMessageQueue.push(message);
        console.log("message 加入接受队列")

    }

    handleRecieveMessageQueue(obj){

        if(recieveMessageQueue.length > 0){

            recMessageQueueState = recMessageQueueType.excuting;

            for(let item in recieveMessageQueue){
                obj.recMessage(recieveMessageQueue[item]);
                recieveMessageQueue.shift();
            }

            recMessageQueueState = recMessageQueueType.empty;

        }
    }

    recMessage(message,type=null) {

        //处理收到消息的逻辑
        console.log("IM Core:消息内容"+message + " 开始执行pop程序");

        if(type != null){
            message.Command = MessageCommandEnum.MSG_HEART;
            console.log("心跳包压入发送队列")
            sendMessageQueue.push(message);
            return;
        }

        let updateMessage = {};


        for(let item in ackMessageQueue){
            if(ackMessageQueue[item].message.MSGID == message){

                currentObj.popCurrentMessageSqlite(message)


                updateMessage = ackMessageQueue[item].message;
                ackMessageQueue.splice(item, 1);

                console.log("ack队列pop出：" + message)
                console.log(ackMessageQueue.length);
                break;
            }
        }

        //回调App上层发送成功
        AppMessageResultHandle(true,message);

        updateMessage.status = MessageStatus.SendSuccess;
        currentObj.addUpdateSqliteQueue(updateMessage,UpdateMessageSqliteType.storeMessage)
    }



    //添加消息至ack队列
    addAckQueue(message,times){
        let time = new Date().getTime();
        ackMessageQueue.push({"message":message,"time":time,"hasSend":times});
        console.log("message 加入发送队列")
    }

    //处理ack队列
    handAckQueue(obj){

        if(ackMessageQueue.length < 1){
            return;
        }

        console.log("开始执行ack队列超时处理")
        let time = new Date().getTime();
        for(let item in ackMessageQueue){
            if(time - ackMessageQueue[item].time > configs.timeOutResend){

                if(ackMessageQueue[item].hasSend > 3) {

                    //回调App上层发送失败
                    // AppMessageResultHandle(false,ackMessageQueue[item].message);

                    ackMessageQueue[item].message.status = MessageStatus.SendFailed;
                    obj.addUpdateSqliteQueue(ackMessageQueue[item].message,UpdateMessageSqliteType.storeMessage)

                    ackMessageQueue.splice(item, 1);
                    obj.popCurrentMessageSqlite(ackMessageQueue[item].message.MSGID)
                }else {
                    obj.socket.sendMessage(ackMessageQueue[item].message);
                    console.log("重新发送" + ackMessageQueue[item].message.MSGID);
                    ackMessageQueue[item].time = time;
                    ackMessageQueue[item].hasSend += 1;
                }
            }
        }
    }





    //心跳包
    beginHeartBeat(){
        heartBeatInterval = setInterval(function () {
        }, 10000);
    }

    //runloop循环
    beginRunLoop(){
        let handleSend = this.handleSendMessageQueue;
        let handleRec = this.handleRecieveMessageQueue;
        let handleUpdateSqlite = this.handleUpdateSqlite;
        let handleAckQueue = this.handAckQueue;
        let handleResource = this.handleResourceQueue;
        let obj = this;
        loopInterval = setInterval(function () {

            if(sendMessageQueueState == sendMessageQueueType.empty) {

                handleSend(obj);
            }

            if(handleSqliteQueueState == handleSqliteQueueType.empty){
                handleUpdateSqlite(obj);
            }

            if(resourceQueueState == resourceQueueType.empty){
                handleResource(obj)
            }

            handleAckQueue(obj);

        }, configs.RunloopIntervalTime);
    }
}


function reInitMessage(sqliteMessage){


    return message;
}



let loopStateType = {
    normal : "normal",
    noNet : "noNet",
    wait : "wait"
};

let sendMessageQueueType = {
    excuting : "excuting",
    empty : "empty"
}

let recMessageQueueType = {
    excuting : "excuting",
    empty : "empty"
}

let handleSqliteQueueType = {
    excuting : "excuting",
    empty : "empty"
}

let resourceQueueType = {
    excuting : "excuting",
    empty : "empty"
}

let ackQueueType = {
    excuting : "excuting",
    empty : "empty"
}

let networkStatuesType = {
    none : "none",
    normal : "normal"
}

let UpdateMessageSqliteType = {
    storeMessage:"storeMessage",
    changeSendMessage:"changeSendMessage"
}