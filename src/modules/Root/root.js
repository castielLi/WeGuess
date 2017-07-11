/**
 * Created by apple on 2017/6/7.
 */
'use strict'

import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import { connect } from 'react-redux';
import Route from '../../Framework/route/router'
import Login from '../Login/page/login'

let initialRoute = {
    key:'Login',
    routeId:'Login'
}

class Root extends Component {
    constructor(props){
        super(props);
    }


    componentWillUpdate(){
        if(this.props.isLoggedIn){
            initialRoute = {
                key:'TestRefresh',
                routeId:'TestRefresh'
            }
        }
    }


    renderScene(route, navigator) {
        // this.route = route;
        this.navigator = navigator;
        return Route.getRoutePage(route, navigator);
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


function MapState(store){
    return {
        isLoggedIn: store.loginStore.isLoggedIn
    }
}


export default connect(MapState)(Root);