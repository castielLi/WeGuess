/**
 * Created by apple on 2017/6/7.
 */
'use strict';

import React from 'react';
import { Navigator } from 'react-native';
import * as commons from '../Common'


class Route {

    /**
     * 获取 ID 对应的 Component
     * @param {any} id 页面的 ID
     *              有严格的映射关系，会根据传入 ID 同名的文件夹去取路由对应的页面
     * @param {any} params Component 用到的参数
     */

    static routerMap = {};
    static mainPage = {};
    static initialRoute = {};

    static initRouteMap(router){
        let {RouteMap,MainPage,InitialRoute} = router;
        this.routerMap = Object.assign(this.routerMap,RouteMap);
        this.mainPage =  MainPage;
        this.initialRoute = InitialRoute;
    }


    static getRoutePage (route, navigator) {
        let id = route.key,
            params = route.params || {},
            routeObj = this.routerMap[id],
            Component;
        if (routeObj) {
            let ComponentInfo = routeObj[route.routeId]
            Component = ComponentInfo.component;
            //合并默认参数
            Object.assign(params, ComponentInfo.params);
        } else {
            // Component = Error;
            // params = {message: '当前页面没有找到：' + id};
        }
        return <Component navigator={navigator} {...params} />;
    }


    static getComponentByRouteId(key,routeId){
        let id = key,
            routeObj = this.routerMap[id],
            Component;
        if (routeObj) {
            let ComponentInfo = routeObj[routeId];
            Component = ComponentInfo.component;
        } else {
            // Component = Error;
            // params = {message: '当前页面没有找到：' + id};
        }
        return <Component/>;
    }


    static push(props, route) {
        props.navigator.push(route)
    }


    static toMain(props){
        let routes = props.navigator.getCurrentRoutes();
        let contain = false;
        for(let i = 0;i<routes.length;i++){
           if(routes[0][0] == this.mainPage["key"]){
               contain = true;
               break;
           }
        }
        if(!contain) {
            if(commons.containsObject(this.initialRoute,routes)){
                props.navigator.push(this.mainPage);
                return;
            }
        }
        props.navigator.popToTop();
    }

    static pop(props) {
        props.navigator.pop()
    }

    static toLogin(){

    }
}

export default Route;