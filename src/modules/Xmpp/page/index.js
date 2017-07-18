/**
 * Created by apple on 2017/6/15.
 */

import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import Route from '../../../Core/route/router'


let initialRoute = {
    key:'Xmpp',
    routeId:'Xmpp'
}

export default class Xmpp extends Component {
    constructor(props){
        super(props);
    }

    renderScene(route, navigator) {
        this.navigator = navigator;
        let component = Route.getRoutePage(route, navigator);
        return component;
    }

    configureScene(route){
        if(route.sceneConfig){
            return route.sceneConfig;
        }
        return Navigator.SceneConfigs.FloatFromRight;
    }

    render() {
        return (
            <Navigator
                initialRoute={initialRoute}
                configureScene={this.configureScene.bind(this)}
                renderScene={this.renderScene.bind(this)}
            />
        );
    }
}
