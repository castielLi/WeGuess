/**
 * Created by apple on 2017/6/7.
 */
'use strict'

import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import { connect } from 'react-redux';
import BaseComponent from '../../Framework/Component'
import * as router from '../routerMap'


class Root extends BaseComponent {
    constructor(props){
        super(props);
        this.render = this.render.bind(this);
    }

    renderScene(Route, navigator) {
        // this.route = route;
        this.navigator = navigator;
        return this.route.getRoutePage(Route, navigator);
    }

    configureScene(route){
        return Navigator.SceneConfigs.FloatFromRight;
    }

    render() {
        let initialRoute = this.route.initialRoute;
        return (
            <Navigator
            initialRoute={initialRoute}
            configureScene={this.configureScene.bind(this)}
            renderScene={this.renderScene.bind(this)}
        />
        );
    }
}


function MapState(store){
    return {
        isLoggedIn: store.loginStore.isLoggedIn
    }
}


export default connect(MapState)(Root);