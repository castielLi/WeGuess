/**
 * Created by apple on 2017/7/3.
 */


import React, { Component } from 'react';
import netWorking from '../Networking/Network'
import BaseComponent from './index'
import Popup from 'react-native-popup';
import Loading from './Popup/loading'
import Route from '../route/router'
import style from '../StyleSheet/style'
import {
    View
} from 'react-native';

export default class ContainerComponent extends Component {

    constructor(props) {
        super(props);
        this.PopContent = Popup;
        this.Loading = Loading;
        this.route = Route;
        this.viewModel = {};
        this.style = style;
    }



    alert(content) {
        this.popup.alert(content);
    }

    showLoading(){
        this.loading.show();
    }

    hideLoading(){
        this.loading.hide();
    }

    confirm(title,content,okButtonTitle="OK",oKCallback=undefined,cancelButtonTitle="Cancel",cancelCallback=undefined,) {
        this.popup.confirm({
            title: title,
            content: ['content'],
            ok: {
                text: okButtonTitle,
                style: {
                    // color: 'green',
                    // fontWeight: 'bold'
                },
                callback: () => {

                    oKCallback != undefined && oKCallback(this.popup);
                }
            },
            cancel: {
                text: cancelButtonTitle,
                style: {
                    // color: 'red'
                    // fontWeight: 'bold'
                },
                callback: () => {
                    cancelCallback != undefined && cancelCallback(this.popup);
                }
            }
        });
    }

    fetchData(method,requestURL,callback,params){
        let network = netWorking();
        if(method == 'GET'){
            network.methodGET(requestURL,callback,false);
        }else{
            network.methodPOST(requestURL,params,callback,false);
        }
    }

}
