/**
 * Created by apple on 2017/6/15.
 */

import React, { Component } from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';

// import StyleSheetHelper from '../../../Common/StyleSheet'
import BaseComponent from '../../../Framework/Component'

export default class Xmpp extends BaseComponent {

    componentWillMount(){
        currentStyle = super.componentWillMount(currentStyle)
    }

    render() {

        return <Text style={currentStyle.signout}>List of all contacts</Text>
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


