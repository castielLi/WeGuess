/**
 * Created by apple on 2017/7/3.
 */


import React, { Component } from 'react';
import netWorking from '../Networking/Network'
import BaseComponent from './index'

export default class ContainerComponent extends BaseComponent {

    fetchData(method,requestURL,callback,params){
        let network = netWorking();
        if(method == 'GET'){
            network.methodGET(requestURL,callback,false);
        }else{
            network.methodPOST(requestURL,params,callback,false);
        }
    }

}
