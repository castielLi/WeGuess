/**
 * Created by apple on 2017/7/26.
 */

import Connect from './socket'
import * as methods from './Common'
import * as storeSqlite from './StoreSqlite'
import UUIDGenerator from 'react-native-uuid-generator';


let _socket = new Connect();
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

let heartBeatInterval;
let loopInterval;
let checkQueueInterval;
let checkNetEnvironmentInterval;
let storeSqliteInterval;
let loopState;
let netState;


let ME = "";


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
        setTimeout(storeSqlite.selectAllIsSend,15000)
    }


    startIM(){
       loopState = loopStateType.wait;
       sendMessageQueueState = sendMessageQueueType.empty;
       handleSqliteQueueState = handleSqliteQueueType.empty;
       recMessageQueueState = recMessageQueueType.empty;
       ackMessageQueueState = ackQueueType.empty;
       this.beginHeartBeat();
       this.beginRunLoop();
    }

    stopIM(){
        this.checkQueue(this.stopIMRunCycle,null);
    }

    stopIMRunCycle(){
        clearInterval(heartBeatInterval)
        clearInterval(loopInterval)
        clearInterval(checkQueueInterval)
    }

    handleNetEnvironment(connectionInfo){
       netState = connectionInfo;

        if(netState == "NONE" || netState == "none"){
            clearInterval(loopInterval)
            loopState = loopStateType.noNet;

            if(sendMessageQueue.length > 0){

            }

            checkNetEnvironmentInterval = setInterval(function () {

                if(netState != 'NONE' && netState != 'none'){
                    clearInterval(checkNetEnvironmentInterval);
                    // if(sendMessageQueue.length == 0 && recieveMessageQueue.length == 0){
                    //
                    //     loopState = loopStateType.wait;
                    // }else
                    //     loopState = loopStateType.normal;
                }
            },200);
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

    //外部接口，添加消息
    addMessage(message,callback=function(){},onprogess="undefined") {

        let messageUUID = "";

        if (message.type == "undefined" || message.type == "") {
            callback(false, "message type error");
        }

        //先生成唯一的messageID并且添加message进sqlite保存
        UUIDGenerator.getRandomUUID().then((uuid) => {
            messageId = message.to + "_" +uuid;
            message.id = messageId;
            messageUUID = messageId;
            this.storeSendMessage(message);

            switch (message.type) {
                case "text":
                    this.addMessageQueue(message);
                    callback(true);
                    break;
                // case "image":
                //     let result = methods.GetUploadTokenFromServer(message.content.name);
                //     break;
                default:
                    // let result = methods.getUploadTokenFromServer(message.content.name,onprogess);
                    // if(result.success){
                    callback(true);
                    this.addMessageQueue(message);
                    // }else{
                    //     callback(false,"upload server error");
                    // }
                    break;
            }

            return messageUUID;
        });
    }



    //添加消息至消息队列
    addMessageQueue(message){
        if(sendMessageQueueState == sendMessageQueueType.excuting){
            waitSendMessageQueue.push(message);
            console.log("message 加入等待发送队列")
        }else{
            sendMessageQueue.push(message);
            console.log("message 加入发送队列")
        }
    }

    //处理消息队列
    handleSendMessageQueue(obj){
        if(sendMessageQueue.length > 0){

            sendMessageQueueState = sendMessageQueueType.excuting;
            console.log(sendMessageQueueState);
            for(let item in sendMessageQueue){
                obj.sendMessage(sendMessageQueue[item],obj);
                sendMessageQueue.pop(sendMessageQueue[item]);
            }
            // sendMessageQueue = [];

            // if(waitSendMessageQueue.length > 0){
            //    console.log("拷贝等待队列到发送队列")
            //    sendMessageQueue = waitSendMessageQueue.reduce(function(prev, curr){ prev.push(curr); return prev; },sendMessageQueue);
            //    waitSendMessageQueue = [];
            // }

            // if(sendFailedMessageQueue.length > 0){
            //     console.log("拷贝失败队列到发送队列")
            //     sendMessageQueue = sendFailedMessageQueue.reduce(function(prev, curr){ prev.push(curr); return prev; },sendMessageQueue);
            //     sendFailedMessageQueue = [];
            // }

            sendMessageQueueState = sendMessageQueueType.empty;
            console.log(sendMessageQueueState);
        }
    }

    //发送消息
    sendMessage(message,obj){
        //发送websocket
        console.log("开始发送消息了")

        this.socket.sendMessage(message.id);

        console.log("添加" + message.id +"进队列");
        obj.addAckQueue(message);
        console.log("ack queue 长度" + ackMessageQueue.length);

        //发送失败
        if(false){
            // sendFailedMessageQueue.push(message);
        }else{
            handleSqliteQueue.push(message);
        }
    }

    storeSendMessage(message){
        if(message.to != ME){
            storeSqlite.storeSendMessage(message);
        }else{
             storeSqlite.storeRecMessage(message);
        }
    }





    handleUpdateSqlite(obj){

        if(handleSqliteQueue.length > 0){

            handleSqliteQueueState = handleSqliteQueueType.excuting;
            console.log(handleSqliteQueueState);
            for(let item in handleSqliteQueue){

                obj.updateSqliteMessage(handleSqliteQueue[item]);
                handleSqliteQueue.pop(handleSqliteQueue[item]);
            }
            // handleSqliteQueue = [];
            //
            // if(waitSqliteQueue.length > 0){
            //     console.log("拷贝等待存储队列到存储队列")
            //     handleSqliteQueue = waitSqliteQueue.reduce(function(prev, curr){ prev.push(curr); return prev; },handleSqliteQueue);
            //     waitSqliteQueue = [];
            // }

            handleSqliteQueueState = handleSqliteQueueType.empty;
            console.log(handleSqliteQueueState);
        }
    }

    updateSqliteMessage(message){
        storeSqlite.updateMessageStatus(message);
    }


    //添加消息至ack队列
    addAckQueue(message){
        if(ackMessageQueueState == ackQueueType.excuting){
            waitAckMessageQueue.push(message);
            console.log("message 加入等待队列")
        }else{
            ackMessageQueue.push(message);
            console.log("message 加入发送队列")
        }
    }


    //websocket接口,添加接受消息队列
    addRecMessage(message){

        if(recMessageQueueState == recMessageQueueType.excuting){
            waitRecMessageQueue.push(message);
            console.log("message 加入等待接受队列")
        }else{
            recieveMessageQueue.push(message);
            console.log("message 加入接受队列")
        }
    }

    handleRecieveMessageQueue(obj){

        if(recieveMessageQueue.length > 0){

            recMessageQueueState = recMessageQueueType.excuting;

            for(let item in recieveMessageQueue){
                obj.recMessage(recieveMessageQueue[item]);
                recieveMessageQueue.pop(recieveMessageQueue[item]);
            }
            // recieveMessageQueue = [];
            //
            // if(waitRecMessageQueue.length > 0){
            //     console.log("拷贝等待队列到接受队列")
            //     recieveMessageQueue = waitRecMessageQueue.reduce(function(prev, curr){ prev.push(curr); return prev; },recieveMessageQueue);
            //     waitRecMessageQueue = [];
            // }

            recMessageQueueState = recMessageQueueType.empty;

        }
    }

    recMessage(message) {

        //处理收到消息的逻辑
        console.log("IM Core:消息内容"+message + " 开始执行pop程序");

        for(let item in ackMessageQueue){
            if(ackMessageQueue[item].id == message){
                ackMessageQueue.splice(item, 1);
                console.log("ack队列pop出：" + message)
                console.log(ackMessageQueue.length);
                index = true;
                break;
            }
        }

        handleSqliteQueue.push(message);

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
        let obj = this;
        loopInterval = setInterval(function () {

              if(sendMessageQueueState == sendMessageQueueType.empty) {

                  handleSend(obj);
              }

              if(handleSqliteQueueState == handleSqliteQueueType.empty){
                  handleUpdateSqlite(obj);
              }

              // if(recMessageQueueState == recMessageQueueType.empty){
              //     handleRec(obj);
              // }

        }, 100);
    }
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

let ackQueueType = {
    excuting : "excuting",
    empty : "empty"
}
