/**
 * Created by apple on 2017/6/6.
 */
'use strict';
import React, {
    Component
} from 'react';
import {
    Provider
} from 'react-redux';
import { AppState , NetInfo} from 'react-native'
import Root from './modules/Root/root'
import configureStore from './store'
import configureNetwork from './Core/Networking/configureNetwork'
import FMDB from './Core/DatabaseHelper'
import BaseComponent from './Core/Component'
import Route from './Core/route/router'
import * as router from './modules/routerMap'
import IM from './Core/IM'

import ChatCommandEnum from './Core/IM/dto/ChatCommandEnum'
import MessageBodyTypeEnum from './Core/IM/dto/MessageBodyTypeEnum'
import MessageCommandEnum from './Core/IM/dto/MessageCommandEnum'

import SendMessageBodyDto from './Core/IM/dto/SendMessageBodyDto'
import SendMessageDto from './Core/IM/dto/SendMessageDto'
import messageBodyChatDto from './Core/IM/dto/messageBodyChatDto'


export default function App() {


    let store = configureStore();

    //初始化app的http组件
    configureNetwork({
        "Content-Type": "application/json"
    }, 'fetch', false)

    //初始化app的database
    FMDB.initDatabase()


    //初始化路由表
    Route.initRouteMap(router);

    //初始化IM
    let im = new IM();

    let sendMessage = setInterval(function(){
        let addMessage = new SendMessageDto();
        let messageBody = new SendMessageBodyDto();
        let messageData = new messageBodyChatDto();

        messageData.Data = "hello world";
        messageData.Command = ChatCommandEnum.MSG_BODY_CHAT_C2C
        messageData.Sender = "1";
        messageData.Receiver = "2";

        messageBody.LocalTime = new Date().getTime();
        messageBody.Command = MessageBodyTypeEnum.MSG_BODY_CHAT;
        messageBody.Data = messageData;


        addMessage.Command = MessageCommandEnum.MSG_BODY;
        addMessage.Data = messageBody;
        addMessage.type = "text";
        addMessage.way = "chatroom";

        im.addMessage(addMessage);

        // im.addRecMessage(addMessage);
    },2000)

    setInterval(function(){
        clearInterval(sendMessage)
    },10000)




    // //todo:使用chatwayenum枚举来控制类型
    // // im.deleteCurrentChatMessage("hello","chatroom")
    //
    //
    // let deleteMessage = new message();
    // deleteMessage.id = 59;
    // im.deleteMessage(deleteMessage,"chatroom","hello");


    class InitApp extends BaseComponent {
        constructor() {
            super();

            this.state = {
                store: configureStore(() => {
                    this.setState({
                        isLoading: false
                    })
                }),
                appState: AppState.currentState,
                memoryWarnings: 0,
                connectionInfo:"NONE"
            }

            this._handleAppStateChange = this._handleAppStateChange.bind(this);
            this._handleMemoryWarning = this._handleMemoryWarning.bind(this);
            this._handleConnectionInfoChange = this._handleConnectionInfoChange.bind(this);
        }


        componentDidMount() {
            AppState.addEventListener('change', this._handleAppStateChange);
            AppState.addEventListener('memoryWarning', this._handleMemoryWarning);
            NetInfo.addEventListener('change', this._handleConnectionInfoChange);
        }
        componentWillUnmount() {
            AppState.removeEventListener('change', this._handleAppStateChange);
            AppState.removeEventListener('memoryWarning', this._handleMemoryWarning);
        }
        _handleMemoryWarning() {
            this.setState({memoryWarnings: this.state.memoryWarnings + 1});
        }
        _handleAppStateChange(appState) {
            console.log('AppState changed to', appState)
            this.setState({
                appState : appState
            });

            if(appState == 'background'){
                 im.stopIM();
            }else if(appState == "active"){
                im.startIM();
            }
        }

        _handleConnectionInfoChange(connectionInfo) {

            console.log(connectionInfo);
            this.setState({
            connectionInfo:connectionInfo
                      });

            // if(connectionInfo == "NONE" || connectionInfo == "none"){
                im.handleNetEnvironment(connectionInfo);
            // }

        }

        render() {

            return (<Provider store={this.state.store}>
                <Root/>
            </Provider>)
        }
    }
    return InitApp;
}