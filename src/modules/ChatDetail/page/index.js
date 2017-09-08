import React, { Component } from 'react';
import { Text,StyleSheet,View ,TextInput} from 'react-native';
import NavigationTopBar from '../../.././Core/Component/NavigationBar'
import ContainerComponent from '../../.././Core/Component/ContainerComponent'
import ThouchBar from './thouchBar';
export default class ChatDetail extends ContainerComponent {
	 constructor(props) {
        super(props);
        this.state = {
        };
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
	        title:"聊天"
	    }
	}
  render() {
    return (
    	<View style={styles.container}>
    		<NavigationTopBar leftButton={this._leftButton} title={this._title} />
    		<View style={{flex:1,backgroundColor:'red'}}>
                <Text>List</Text>
            </View>
    		<ThouchBar></ThouchBar>
    	</View>
      
    );
  }
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#a3bee4',

    },
})