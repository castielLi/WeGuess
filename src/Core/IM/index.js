/**
 * Created by apple on 2017/7/26.
 */

import Connect from './socket'

let _connect = new Connect();
let sendMessageQueue = [];
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

    handleSendMessageQueue(){

    }

    handleRecieveMessageQueue(){

    }

    beginHeartBeat(){
       heartBeatInterval = setInterval(function () {
           console.log("heartbeat is running")

        }, 10000);
    }

    beginRunLoop(){
        let handleSend = this.handleSendMessageQueue;
        let handleRec = this.handleRecieveMessageQueue;
        loopInterval = setInterval(function () {
              console.log("runloop is running")
              handleSend();
              handleRec();
        }, 200);
    }
}


let loopStateType = {
    normal : "normal",
    noNet : "noNet",
    wait : "wait"
};