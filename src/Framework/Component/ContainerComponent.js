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

    confirm() {
        this.popup.confirm({
            title: 'hello confirm',
            content: ['this is a hello confirm', 'this is a hello confirm'],
            ok: {
                text: 'yes',
                style: {
                    color: 'green',
                    fontWeight: 'bold'
                },
                callback: () => {
                    this.popup.alert('thank u 😬');
                }
            },
            cancel: {
                text: 'no',
                style: {
                    color: 'red'
                },
                callback: () => {
                    this.popup.alert('bad man 👿');
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
