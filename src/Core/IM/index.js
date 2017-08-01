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
       this.beginHeartBeat();
       this.beginRunLoop();
    }

    stopIM(){

        checkQueueInterval = setInterval(function () {
            if(sendMessageQueue.length == 0 && recieveMessageQueue.length == 0){
                clearInterval(heartBeatInterval)
                clearInterval(loopInterval)
                clearInterval(checkQueueInterval)
            }
        }, 1000);
    }

    handleNetEnvironment(){

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
        loopInterval = setInterval(function () {

              console.log("runloop is running")
        }, 200);
    }
}

