/**
 * Created by apple on 2017/6/6.
 */
'use strict';

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import Root from './modules/Root/root'
import configureStore from './store'
import configureNetwork from './Framework/Networking/configureNetwork'
import FMDB from './Framework/Common/DatabaseHelper'
import BaseComponent from './Framework/Component'
import Route from './Framework/route/router'
import * as router from './modules/routerMap'



export default function App(){


    let store = configureStore();

    //初始化app的http组件
    configureNetwork({"Content-Type":"application/json"},'fetch',false)

    //初始化app的database
    FMDB.initDatabase()

    //初始化路由表
    Route.initRouteMap(router);


    class InitApp extends BaseComponent {
        constructor() {
            super();

            this.state = {
                isLoading: true,
                store: configureStore(()=>{this.setState({isLoading: false})})
            }
        }

        render() {
            // if(this.state.isLoading){
            //     console.log('loading app');
            // }

            return (<Provider store={this.state.store}>
                <Root/>
            </Provider>)
        }
    }
    return InitApp;
}


同步移步
长按响应
通信录读取
多线程

