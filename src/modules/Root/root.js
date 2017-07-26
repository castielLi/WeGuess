/**
 * Created by apple on 2017/6/7.
 */
'use strict'

import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native'
import {
    Navigator,
    NavigationBar
} from 'react-native-deprecated-custom-components';
import {
    connect
} from 'react-redux';
import BaseComponent from '../../Core/Component'
import * as router from '../routerMap'


class Root extends BaseComponent {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    renderScene(Route, navigator) {
        // this.route = route;
        this.navigator = navigator;
        return this.route.getRoutePage(Route, navigator);
    }

    configureScene(route) {
        console.log(route)
        return Navigator.SceneConfigs.FloatFromRight;
    }

    render() {
        let initialRoute = this.route.initialRoute;
        return ( < Navigator initialRoute = {
                initialRoute
            }
            configureScene = {
                this.configureScene.bind(this)
            }
            renderScene = {
                this.renderScene.bind(this)
            }
            />
        );
    }
}

const styles = StyleSheet.create({
    navContainer: {
        height: 40,
        backgroundColor: '#fff'
    }
})

function MapState(store) {
    return {
        isLoggedIn: store.loginStore.isLoggedIn
    }
}


export default connect(MapState)(Root);