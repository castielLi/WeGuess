import React, { Component } from 'react';
import { Text,StyleSheet,View ,TextInput,TouchableOpacity,KeyboardAvoidingView,Platform} from 'react-native';
import NavigationTopBar from '../../../Core/Component/NavigationBar/index'
import ContainerComponent from '../../../Core/Component/ContainerComponent'
import ThouchBar from './EnterTool/thouchBar';
import Chat from './List/index'
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

	//控制子组件Chat中的消息滚动到底部
	goBottom(){
        this.chat.scrollToEnd()
	}
  render() {
    const MyView = Platform.OS === 'ios'?KeyboardAvoidingView:View;
    return (
    	<MyView style={styles.container} behavior='padding'>
    		<NavigationTopBar leftButton={this._leftButton} title={this._title} />
            <Chat/>
            <ThouchBar></ThouchBar>
    	</MyView>
      
    );
  }
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#a3bee4',

    },
})