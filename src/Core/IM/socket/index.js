/**
 * Created by apple on 2017/7/31.
 */
import * as configs from './socketConfig'
import React, {
    Component
} from 'react';

let __instance = (function () {
    let instance;
    return (newInstance) => {
        if (newInstance) instance = newInstance;
        return instance;
    }
}());

let onRecieveMessage = "undefined";

export default class Connect extends Component{

    constructor(token) {
        super();
        if (__instance()) return __instance();

        __instance(this);

        this.webSocket = new WebSocket(configs.serverUrl + "/?account=" + token);
        // this.webSocket = new WebSocket(configs.serverUrl);
        console.log("account token:" + token);
        this.reConnectNet = this.reConnectNet.bind(this);

        this.addEventListenner = this.addEventListenner.bind(this);

        this.addEventListenner();
    }

    addEventListenner(){
        this.webSocket.addEventListener('message', function (event) {
            console.log("Socket Core:收到了一条新消息:" + event.data)
            onRecieveMessage(event.data.split(" ")[1]);
        });

        this.webSocket.addEventListener('open', function (event) {
            console.log('Hello Server!');
        });
    }

    sendMessage(message){
        console.log("Socket Core: 发送消息"+message);
        this.webSocket.send(message);
    }




    onRecieveCallback(callback){
        onRecieveMessage = callback;
    }

    reConnectNet(){
       this.webSocket = new WebSocket(configs.serverUrl);
       this.addEventListenner();
    }
}