/**
 * Created by apple on 2017/6/28.
 */

import React, { Component } from 'react';
import Route from '../../../Core/route/router.js'

export default class TabOne extends Component{

    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    render(){

        this.props.navigation;

        const TabComponent = Route.getComponentByRouteId("MainTabbar",this.constructor.name);
        return (
            TabComponent
        )
    }
}

// import { TabNavigator,StackNavigator } from "react-navigation";
//
//
// class Home extends Component{
//     render(){
//         return(
//
//                <View>
//                 <Text > hello world</Text>
//                 </View>
//
//         )
//     }
// }
//
// const stack = StackNavigator({
//     home : {screen : Home}
// })
//
// export default stack;