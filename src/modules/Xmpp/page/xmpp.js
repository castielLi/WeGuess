/**
 * Created by apple on 2017/7/3.
 */

import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

import Route from '../../../Framework/route/router'
import BaseComponent from '../../../Framework/Component'
import NavigatorBar from 'react-native-navbar';
export default class XmppMain extends BaseComponent {

    componentWillMount(){
        currentStyle = super.componentWillMount(currentStyle)
    }

    _renderNavBar(){
        var rightButtonConfig = {
            title: 'center',
            handler: ()=>{
                let page = {
                    key : "Xmpp",
                    routeId: "Login"
                };
                Route.push(this.props.navigator,page,this.props.navigator)
            }
        };

        var titleConfig = {
            title: 'XmppMain',
        };
        return <NavigatorBar style={currentStyle.navbar}
                             title={titleConfig}
                             rightButton={rightButtonConfig}
        />;
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