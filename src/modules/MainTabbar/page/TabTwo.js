/**
 * Created by apple on 2017/6/29.
 */

import React, { Component } from 'react';
import Route from '../../../Core/route/router.js'

export default class TabTwo extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        const TabComponent = Route.getComponentByRouteId("MainTabbar",this.constructor.name);
        return (
            TabComponent
        )
    }
}