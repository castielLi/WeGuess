/**
 * Created by apple on 2017/6/28.
 */

import React, { Component } from 'react';
import Route from '../../../Framework/route/router.js'

export default class TabOne extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        const TabComponent = Route.getComponentByRouteId("module/recode");
        return (
            TabComponent
        )
    }
}