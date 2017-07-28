/**
 * Created by apple on 2017/7/6.
 */

import React, {
    Component
} from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableHighlight
} from 'react-native';

import ContainerComponent from '../../Core/Component/ContainerComponent'
import NavigationTopBar from '../../Core/Component/NavigationBar'
import DisplayOne from './displayOne'
import DisplayTwo from './displayTwo'
import WeGuessSDK from '../../Models'

export default class TestRefresh extends ContainerComponent {

    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.state = this.viewModel;
        this._leftButton = this._leftButton.bind(this);
        this._title = this._title.bind(this);
    }

    componentWillMount() {
        this.viewModel = WeGuessSDK.clientManager().getClientInfo(["Username", "PostCode", "hello"]);
    }

    onButtonPress() {
        // console.log(this.viewModel);
        this.viewModel = {
            "Username": "旋转的周胖子",
            "PostCode": "400015"
        }
        this.setState(this.viewModel);
        // console.log(this.viewModel);
    }
    //定义上导航的左按钮
    _leftButton(){
        return {
            title: 'back',
            handler: () => this.route.pop(this.props),
        }
    }
    //定义上导航的标题
    _title(){
        return{
            title:"TestRefresh"
        }
    }
    render() {
        let name = this.viewModel["Username"];
        let code = this.viewModel["PostCode"];
        return (
            <View style={this.style.container} style={{flex:1,backgroundColor:'#fff'}}>
                <NavigationTopBar leftButton={this._leftButton} title={this._title} />
                <DisplayOne viewModel = {name}/>
                <DisplayTwo viewModel = {code}/>
            </View>
        )

    }

}