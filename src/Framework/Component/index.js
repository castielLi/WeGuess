/**
 * Created by apple on 2017/6/29.
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
import StyleSheetHelper from '../../Common/StyleSheet/index'
import Style from '../../Common/StyleSheet/style'
import Route from '.././route/router'
import Popup from 'react-native-popup';
import Loading from './Popup/loading'

export default class BaseComponent extends Component {

    constructor(props){
        super(props);
        this.viewModel = {};
        //关联路由组件
        this.route = Route;
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

    componentDidMount(){
        console.log( this.constructor.name + "已经加入展示界面" )
    }

    componentWillMount(newStyles){
        const styles = StyleSheetHelper.mergeStyleSheets(Style,newStyles);
        return styles;
    }

    render(){

    }

}
