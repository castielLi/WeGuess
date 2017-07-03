/**
 * Created by apple on 2017/6/29.
 */

import React, { Component } from 'react';
import StyleSheetHelper from '../../Common/StyleSheet/index'
import Style from '../../Common/StyleSheet/style'

export default class BaseComponent extends Component {

    componentDidMount(){
        console.log( this.constructor.name + "已经加入展示界面" )
    }

    componentWillMount(newStyles){
        const styles = StyleSheetHelper.mergeStyleSheets(Style,newStyles);
        return styles;
    }

    render(){

    }

}
