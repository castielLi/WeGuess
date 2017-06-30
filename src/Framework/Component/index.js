/**
 * Created by apple on 2017/6/29.
 */

import React, { Component } from 'react';
import StyleSheetHelper from '../../Common/StyleSheet/index'
import Style from '../../Common/StyleSheet/style'
import netWorking from '../Networking/Network'

export default class BaseComponent extends Component {

    componentDidMount(){
        console.log( this.constructor.name + "已经加入展示界面" )
    }

    fetchData(method,requestURL,callback,params){
        let network = netWorking();
       if(method == 'GET'){
           network.methodGET(requestURL,callback,false);
       }else{
           network.methodPOST(requestURL,params,callback,false);
       }
    }

    componentWillMount(newStyles){
        const styles = StyleSheetHelper.mergeStyleSheets(Style,newStyles);
        return styles;
    }

    render(){

    }

}
