import React, { Component } from 'react';  
import {  
  StyleSheet,  
  Text,  
  TextInput,  
  View,
  Dimensions
} from 'react-native';  
import {bindActionCreators} from 'redux';
import {
    connect
} from 'react-redux';
import * as Actions from '../reducer/action';
import * as commonActions from '../../../commonReducer/action';
import {createTextMessageObj} from './createMessageObj';
import IM from '../../../Core/IM/index';
var {height, width} = Dimensions.get('window');
const im = new IM();

class AutoExpandingTextInput extends Component {  
  constructor(props) {  
    super(props); 
    this.state={
      data:''
    } 
    this._onChangeText = this._onChangeText.bind(this);
    this._onSubmitEditing = this._onSubmitEditing.bind(this);
    this._onContentSizeChange = this._onContentSizeChange.bind(this);
  }  
  
  _onChangeText(data){
    this.setState({
      data
    })
  }
  //每次提交会执行两次
  _onSubmitEditing(){
    //
    if(this.state.data){
      //初始化消息
      let message = createTextMessageObj(this.state.data,'private','1','2');
      im.addMessage(message,(status,messageId)=>{
        message.MSGID = messageId;
        //更新chatRecordStore
        this.props.addMessage('li',message,'private')
      });
     
      this.input.clear();
      
    }
    return
  }
  _onContentSizeChange(event) {

    let height = event.nativeEvent.contentSize.height;
    //限制高度 
    if(height>(30+26*5)) return;
    this.props.changeHeight(height);
    }
  componentWillMount(){
     this.props.changeThouchBarInit();
  }
  render() {  
    return (  
      <TextInput
       ref={(refInput)=>{this.input = refInput}}
       onFocus = {this.props.focusInput}
       onChangeText = {this._onChangeText}
       onSubmitEditing = {this._onSubmitEditing}
       blurOnSubmit = {false}
       underlineColorAndroid = {'transparent'}  
       multiline={true}  
       onContentSizeChange={this._onContentSizeChange}
       style={[styles.textInputStyle,{height:Math.max(40,this.props.thouchBarStore.inputHeight),left:this.props.thouchBarStore.isRecordPage?-999:60}]}  
       >  
      </TextInput>  
    );  
  }
  componentDidMount(){
   
    //传递TextInput组件对象到父组件，父组件可以调用子组件方法
    this.props.getInputObject(this.input);
  }  
}  
  
const styles = StyleSheet.create({  
  textInputStyle:{ 
    position:'absolute',
    left:60,
    top:10, 
    fontSize:20, 
    lineHeight:30, 
    width:width-180,  
    height:40,
    borderColor:'#ccc',
    borderWidth:1,   
    backgroundColor:'#fff',  
    borderRadius:10,
    //overflow:'hidden',
    // paddingLeft:5,
    // paddingRight:5,
    padding:0,
    margin:0
  },

});  

const mapStateToProps = state => ({
    thouchBarStore: state.thouchBarStore
});

const mapDispatchToProps = (dispatch) => {
  return{
    ...bindActionCreators(Actions, dispatch),
    ...bindActionCreators(commonActions,dispatch)
}};

 export default connect(mapStateToProps, mapDispatchToProps)(AutoExpandingTextInput);
