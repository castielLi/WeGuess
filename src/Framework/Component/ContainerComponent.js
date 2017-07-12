/**
 * Created by apple on 2017/7/3.
 */


import React, { Component } from 'react';
import netWorking from '../Networking/Network'
import BaseComponent from './index'
import Popup from 'react-native-popup';
import Loading from './Popup/loading'

export default class ContainerComponent extends BaseComponent {

    constructor(props){
        super(props);
        this.PopContent = Popup;
        this.Loading = Loading;
    }


    alert() {
        this.popup.alert('hello alert');
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
                    fontWeight: 'bold'
                },
                callback: () => {

                    oKCallback != undefined || oKCallback();
                }
            },
            cancel: {
                text: cancelButtonTitle,
                style: {
                    // color: 'red'
                    fontWeight: 'bold'
                },
                callback: () => {
                    cancelCallback != undefined || cancelCallback();
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
