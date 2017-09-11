/**
 * Created by apple on 2017/7/31.
 */
import * as configs from './socketConfig'
import React, {
    Component
} from 'react';
import MessageCommandEnum from '../dto/MessageCommandEnum'

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
            if(event.data.length  <= 0){
                return ;
            }
            let message = JSON.parse(event.data);
            if(message.Command == MessageCommandEnum.MSG_REV_ACK) {
                onRecieveMessage(message.MSGID);
            }else if(message.Command == MessageCommandEnum.MSG_HEART){
                onRecieveMessage(message,MessageCommandEnum.MSG_HEART);
            }
        });

        this.webSocket.addEventListener('open', function (event) {
            console.log('Hello Server!');
        });
    }

    sendMessage(message){
        if(this.webSocket.readyState == this.webSocket.OPEN){
            console.log("Socket Core: 发送消息"+message);
            this.webSocket.send(JSON.stringify(message));
            return true;
        }
        return false;
    }




    onRecieveCallback(callback){
        onRecieveMessage = callback;
    }

    reConnectNet(){
       this.webSocket = new WebSocket(configs.serverUrl);
       this.addEventListenner();
    }
}