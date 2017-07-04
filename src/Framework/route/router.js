/**
 * Created by apple on 2017/6/7.
 */
'use strict';

import React from 'react';
import { Navigator } from 'react-native';
// import routerMap from '../../modules/routerMap'

var routerMap = {};

class Route {

    /**
     * 获取 ID 对应的 Component
     * @param {any} id 页面的 ID
     *              有严格的映射关系，会根据传入 ID 同名的文件夹去取路由对应的页面
     * @param {any} params Component 用到的参数
     */

    static initRouteMap(map){
        routerMap = Object.assign(routerMap,map);
    }


    static getRoutePage (route, navigator) {
        let id = route.key,
            params = route.params || {},
            routeObj = routerMap[id],
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
            routeObj = routerMap[id],
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


    static push(props, route,navigator) {
        navigator.push(route)
    }


    static pop(navigator) {
        navigator.pop()
    }
}

export default Route;