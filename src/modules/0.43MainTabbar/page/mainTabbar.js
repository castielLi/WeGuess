/**
 * Created by apple on 2017/6/6.
 */

import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import DisplayComponent from '../../../Core/Component/index'
import Recommond from '../../TabRecommend/page'
import Me from '../../TabMe/page';
import {connect} from 'react-redux';

// const MainTabbar = TabNavigator({
//     tabrecommend: {
//         screen: TabRecommend,
//         navigationOptions: ({navigation}) => ({
//             tabBarLabel: '推荐',
//             tabBarIcon: ({tintColor}) => (
//                 <Image source={require('../resources/recommend.png')}
//                        style={[styles.icon, {tintColor: tintColor}]}
//                        resizeMode={Image.resizeMode.contain}
//                 />)
//         })
//     },
//     tableague: {
//         screen: TabLeague,
//         navigationOptions: ({navigation}) => ({
//             tabBarLabel: '赛事',
//             tabBarIcon: ({tintColor}) => (
//                 <Image source={require('../resources/league.png')}
//                        style={[styles.icon, {tintColor: tintColor}]}
//                        resizeMode={Image.resizeMode.contain}
//                 />)
//         })
//     },
//     tabguess: {
//         screen: TabGuess,
//         navigationOptions: ({navigation}) => ({
//             tabBarLabel: '竞猜',
//             tabBarIcon: ({tintColor}) => (
//                 <Image source={require('../resources/guess.png')}
//                        style={[styles.icon, {tintColor: tintColor}]}
//                        resizeMode={Image.resizeMode.contain}
//                 />)
//         })
//     },
//     tabaction: {
//         screen: TabAction,
//         navigationOptions: ({navigation}) => ({
//             tabBarLabel: '推荐',
//             tabBarIcon: ({tintColor}) => (
//                 <Image source={require('../resources/action.png')}
//                        style={[styles.icon, {tintColor: tintColor}]}
//                        resizeMode={Image.resizeMode.contain}
//                 />)
//         })
//     },
//     tabme: {
//         screen: TabMe,
//         navigationOptions: ({navigation}) => ({
//             tabBarLabel: '我',
//             tabBarIcon: ({tintColor}) => (
//                 <Image source={require('../resources/me.png')}
//                        style={[styles.icon, {tintColor: tintColor}]}
//                        resizeMode={Image.resizeMode.contain}
//                 />)
//         })
//     },
// }, {
//     initialRouteName: "tabguess",
//     animationEnabled: true, // 切换页面时是否有动画效果
//     tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
//     swipeEnabled: false, // 是否可以左右滑动切换tab
//     backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
//     tabBarOptions: {
//         activeTintColor: '#3a66b3', // 文字和图片选中颜色
//         activeBackgroundColor: "#ffffff",// 文字和图片选中背景颜色
//         inactiveTintColor: '#444444', // 文字和图片未选中颜色
//         inactiveBackgroundColor: "#ffffff",// 文字和图片未选中背景颜色
//         showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
//         indicatorStyle: {
//             height: 1  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
//         },
//         style: {
//             backgroundColor: '#fff', // TabBar 背景色
//             height: 44
//         },
//         tabStyle: {
//             height: 44
//         },
//         labelStyle: {
//             fontSize: 10, // 文字大小
//             lineHeight: 10,
//             margin: 0
//         },
//         iconStyle: {
//             height: 25
//         }
//     }
// });
//
//
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24
    }
});


class TabBarComponent extends DisplayComponent {
    constructor(){
        super()
        this.render = this.render.bind(this);
        this.state = {
            selectedTab: 'home',
            isLogged: false
        }

        this.handleTabMeSelected = this.handleTabMeSelected.bind(this);
    }

    handleTabMeSelected(){
        if(this.state.isLogged){
            this.setState({ selectedTab: 'profile' })
        }else{
            let page = {
                key : "Login",
                routeId: "Login"
            };
            this.route.push(this.props,page);
        }
    }

    render() {

        return (
            <TabNavigator>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="Home"
                    renderIcon={() =>  <Image source={require('../resources/action.png')}
                                              style={[styles.icon]}
                                              resizeMode={Image.resizeMode.contain}
                    />}
                    renderSelectedIcon={() =>  <Image source={require('../resources/action.png')}
                                                      style={[styles.icon]}
                                                      resizeMode={Image.resizeMode.contain}
                    />}
                    badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    {this.route.getComponentByRouteId("MainTabbar","TabRecommend")}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'profile'}
                    title="Profile"
                    renderIcon={() =>  <Image source={require('../resources/action.png')}
                                              style={[styles.icon]}
                                              resizeMode={Image.resizeMode.contain}
                    />}
                    renderSelectedIcon={() =>  <Image source={require('../resources/action.png')}
                                                      style={[styles.icon]}
                                                      resizeMode={Image.resizeMode.contain}
                    />}
                    onPress={() => this.handleTabMeSelected()}>
                    { this.state.isLogged ? this.route.getComponentByRouteId("MainTabbar","TabMe") :
                        this.route.getComponentByRouteId("MainTabbar","TabRecommend")}
                </TabNavigator.Item>
            </TabNavigator>
        )
    }
}


const mapStateToProps = state => ({
    loginStore: state.loginStore
});

const mapDispatchToProps = dispatch => ({
    // ...bindActionCreators(tabbarAction,dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(TabBarComponent);
