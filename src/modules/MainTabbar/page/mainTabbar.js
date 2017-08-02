/**
 * Created by apple on 2017/6/6.
 */

import React, { Component } from 'react';
import { Text , View , Button} from 'react-native'
import { TabNavigator,StackNavigator } from "react-navigation";
import TabOne from './TabOne'
import TabTwo from './TabTwo'



const MainTabbar = TabNavigator({
    tabone : { screen : TabOne ,
        navigationOptions:({navigation}) => ({
            // tabBarLabel:'首页',
            // tabBarIcon:({focused,tintColor}) => (
            //     <TabBarItem
            //         tintColor={tintColor}
            //         focused={focused}
            //         normalImage={require('./imgs/nav_fav@2x.png')}
            //         selectedImage={require('./imgs/nav_fav_actived@3x.png')}
            //     />
            // )
            //隐藏tabbar
            // tabBarVisible:false
        })},
    tabtwo : { screen : TabTwo }
});

export default MainTabbar;

