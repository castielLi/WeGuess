/**
 * Created by apple on 2017/6/6.
 */

import React, { Component } from 'react';
import { Text , View , Button} from 'react-native'
import { TabNavigator,StackNavigator } from "react-navigation";
import TabOne from './TabOne'
import TabTwo from './TabTwo'



const MainTabbar = TabNavigator({
    tabone : { screen : TabOne},
    tabtwo : { screen : TabTwo}
});

export default MainTabbar;