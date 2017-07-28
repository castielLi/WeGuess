import React, {
	Component
} from 'react';
import {
	AppRegistry,
	Text,
	View
} from 'react-native';
import ContainerComponent from '../../Core/Component/ContainerComponent'
import NavigationTopBar from '../../Core/Component/NavigationBar'

export default class XX extends ContainerComponent {
    constructor(props) {
        super(props);
        this._leftButton = this._leftButton.bind(this);
        this._title = this._title.bind(this);
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
            title:"XX"
        }
    }
	render() {
		return (
			<View style={{flex:1,backgroundColor:'#fff'}}>
				<NavigationTopBar leftButton={this._leftButton} title={this._title} />
				<Text>XX</Text>
			</View>
		);
	}
}