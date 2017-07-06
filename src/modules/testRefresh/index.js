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

import BaseComponent from '../../Framework/Component'
import DisplayOne from './displayOne'
import DisplayTwo from './displayTwo'
import WeGuessSDK from '../../Framework/WeguessSDK'

export default class TestRefresh extends BaseComponent {

    constructor(props){
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
    }

    componentWillMount(){
        currentStyle = super.componentWillMount(currentStyle)

        this.viewModel = WeGuessSDK.clientManager().getClientInfo(["Username","PostCode","hello"]);
    }

    onButtonPress(){

    }

    render() {
        let name = this.viewModel["Username"];
        let code = this.viewModel["PostCode"];
            return (


            <View style={[currentStyle.main, currentStyle.wrapper]}>
                <View style={currentStyle.container}>
                    <Text style={currentStyle.signout}>List of all contacts</Text>
                    <DisplayOne viewModel = {name}/>
                    <DisplayTwo viewModel = {code}/>
                </View>
                <TouchableHighlight
                    onPress={this.onButtonPress}>
                    <View >
                        <Text >
                            Sign In
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        )

    }

}


let currentStyle = StyleSheet.create({
    signin:{
        height:40,
        width:310,
        backgroundColor:'#cbcd00',
        borderRadius:8,
    }
});