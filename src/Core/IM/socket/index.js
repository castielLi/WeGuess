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

    constructor() {
        super();
        if (__instance()) return __instance();

        __instance(this);

        this.webSocket = new WebSocket(configs.serverUrl);

        this.webSocket.addEventListener('open', function (event) {
            console.log('Hello Server!');
        });

        this.sendMessage = function(message){
            console.log("Socket Core: 发送消息"+message);
            this.webSocket.send(message);
        }


        this.webSocket.addEventListener('message', function (event) {
             console.log("Socket Core:收到了一条新消息:" + event.data)
             onRecieveMessage(event.data.split(" ")[1]);
        });

        this.onRecieveCallback = function(callback){
            onRecieveMessage = callback;
        }
    }
}