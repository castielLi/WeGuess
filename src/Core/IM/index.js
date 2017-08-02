/**
 * Created by apple on 2017/7/26.
 */

import Connect from './socket'

let _connect = new Connect();
let sendMessageQueue = [];
let sendMessageQueueState;
let waitSendMessageQueue = [];
let recieveMessageQueue = [];
let handleSqliteQueue = [];
let heartBeatInterval;
let loopInterval;
let checkQueueInterval;
let checkNetEnvironmentInterval;
let loopState;
let netState;



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

        this.connect = _connect;
        this.startIM();

    }


    startIM(){
       loopState = loopStateType.wait;
       sendMessageQueueState = sendMessageQueueType.empty;
       this.beginHeartBeat();
       this.beginRunLoop();
    }

    stopIM(){
        checkQueue(this.stopIMRunCycle,null);
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
            checkNetEnvironmentInterval = setInterval(function () {

                if(netState != 'NONE' && netState != 'none'){
                    clearInterval(checkNetEnvironmentInterval);
                    if(sendMessageQueue.length == 0 && recieveMessageQueue.length == 0){

                        loopState = loopStateType.wait;
                    }else
                        loopState = loopStateType.normal;
                }
            },200);
        }


    }

    checkQueue(emptyCallBack,inEmptyCallBack){
        checkQueueInterval = setInterval(function () {
            if(sendMessageQueue.length == 0 && recieveMessageQueue.length == 0){

                emptyCallBack || emptyCallBack();
            }else{
                inEmptyCallBack || inEmptyCallBack();
            }
        }, 1000);
    }

    addMessage(message){
        if(sendMessageQueueState == sendMessageQueueType.excuting){
            waitSendMessageQueue.push(message);
            console.log("message 加入等待队列")
        }else{
            sendMessageQueue.push(message);
            console.log("message 加入发送队列")
        }
    }

    handleSendMessageQueue(obj){
        if(sendMessageQueue.length > 0){
            loopState = loopStateType.normal;

            sendMessageQueueState = sendMessageQueueType.excuting;
            console.log(sendMessageQueueState);
            for(let item in sendMessageQueue){
                obj.sendMessage(item);
            }
            sendMessageQueue = [];

            if(waitSendMessageQueue.length > 0){
               console.log("拷贝等待队列到发送队列")
               sendMessageQueue = waitSendMessageQueue.reduce(function(prev, curr){ prev.push(curr); return prev; },sendMessageQueue);
               waitSendMessageQueue = [];
            }
            sendMessageQueueState = sendMessageQueueType.empty;
            console.log(sendMessageQueueState);
        }
        loopState = loopStateType.wait;
    }

    sendMessage(message){
        //发送websocket
        console.log("开始发送消息了")
    }

    handleRecieveMessageQueue(){

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
        let obj = this;
        loopInterval = setInterval(function () {

              if(loopState == loopStateType.wait) {
                  loopState = loopStateType.normal;
                  handleSend(obj);
                  handleRec(obj);
              }
        }, 200);
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

