/**
 * Created by apple on 2017/7/26.
 */

import Connect from './socket'

let _connect = new Connect();
let sendMessageQueue = [];
let recieveMessageQueue = [];

let __instance = (function () {
    let instance;
    return (newInstance) => {
        if (newInstance) instance = newInstance;
        return instance;
    }
}());

export default class IM {
    private constructor() {
        if (__instance()) return __instance();

        __instance(this);

        this.connect = _connect;
        this.startIM();
        this.heartBeatInterval = 0 ;
        this.loopInterval = 0 ;
    }

    static getInstance(){
        return this.constructor();
    }


    private startIM(){
       this.beginHeartBeat();
       this.beginRunLoop();
    }

    private beginRunLoop(){
        this.loopInterval = setInterval(function () {


        }, 200)
    }

    private handleSendMessageQueue(){

    }

    private handleRecieveMessageQueue(){

    }

    private beginHeartBeat(){
       this.heartBeatInterval = setInterval(function () {


        }, 10000)
    }
}

