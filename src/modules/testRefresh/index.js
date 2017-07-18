/**
 * Created by apple on 2017/7/6.
 */

import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableHighlight
} from 'react-native';

import ContainerComponent from '../../Core/Component/ContainerComponent'
import DisplayOne from './displayOne'
import DisplayTwo from './displayTwo'
import WeGuessSDK from '../../Models'

export default class TestRefresh extends ContainerComponent {

    constructor(props){
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.state = this.viewModel;
    }

    componentWillMount(){
        this.viewModel = WeGuessSDK.clientManager().getClientInfo(["Username","PostCode","hello"]);
    }

    onButtonPress(){
        // console.log(this.viewModel);
        this.viewModel = {"Username":"旋转的周胖子","PostCode":"400015"}
        this.setState(this.viewModel);
        // console.log(this.viewModel);
    }

    render() {
        let name = this.viewModel["Username"];
        let code = this.viewModel["PostCode"];
            return (
                <View style={this.style.container}>
                    <DisplayOne viewModel = {name}/>
                    <DisplayTwo viewModel = {code}/>
                </View>
        )

    }

}
