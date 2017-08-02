/**
 * Created by apple on 2017/6/28.
 */

import React, { Component } from 'react';
import Route from '../../../Core/route/router.js'

export default class TabOne extends Component{

    static navigationOptions = {
        tabBarVisible: false
    };

    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    render(){

        const TabComponent = Route.getComponentByRouteId("MainTabbar",this.constructor.name);
        return (
            TabComponent
        )
    }
}