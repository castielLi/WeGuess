/**
 * Created by apple on 2017/7/6.
 */

import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

import BaseComponent from '../../Core/Component'
export default class DisplayThree extends BaseComponent {

    componentWillMount(){
        currentStyle = super.componentWillMount(currentStyle)
    }

    render() {
        return (

            <View style={[currentStyle.main, currentStyle.wrapper]}>
                {this._renderNavBar()}
                <View style={currentStyle.container}>
                    <Text style={currentStyle.signout}>List of all contacts</Text>
                </View>
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