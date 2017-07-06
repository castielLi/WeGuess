/**
 * Created by apple on 2017/7/6.
 */

import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

import BaseComponent from '../../Framework/Component'
export default class DisplayOne extends BaseComponent {

    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    componentWillMount(){
        currentStyle = super.componentWillMount(currentStyle)
    }

    render() {

        return (
            <View style={[currentStyle.main, currentStyle.wrapper]}>
                <View style={currentStyle.container}>
                    <Text style={currentStyle.signout}>{this.props.viewModel}</Text>
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