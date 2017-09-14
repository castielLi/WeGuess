import React, { Component } from 'react';  
import {  
  StyleSheet,  
  Text,  
  TextInput,  
  View,
  Dimensions,
  PixelRatio
} from 'react-native';  
import {bindActionCreators} from 'redux';
import {
    connect
} from 'react-redux';
import * as Actions from '../../reducer/action';
import * as commonActions from '../../../../Core/IM/redux/action';
import {createTextMessageObj} from './createMessageObj';
import IM from '../../../../Core/IM/index';

const ptToPx = pt=>PixelRatio.getPixelSizeForLayoutSize(pt);
const pxToPt = px=>PixelRatio.roundToNearestPixel(px);

var {height, width} = Dimensions.get('window');
const im = new IM();

class AutoExpandingTextInput extends Component {  
  constructor(props) {  
    super(props); 
    this.state={
      data:'',
      firstInputHeight:0,
      isFirstInputHeight:true,
      inputHeight:0,
      isLock:false
    } 
    this._onChangeText = this._onChangeText.bind(this);
    this._onSubmitEditing = this._onSubmitEditing.bind(this);
    this._onChange = this._onChange.bind(this);
  }  
  
  _onChangeText(data){
   this.state.isLock = false;
   this.state.data = data; 
   this.props.setTextInputData(data)
   // this.setState({
   //  data
   // })
  }
  //0.45.1 multiline设为true，每次提交_onSubmitEditing会执行两次
  _onSubmitEditing(){
    if(this.state.isLock) return;
    this.state.isLock = true;
    //
    if(this.state.data){
      //初始化消息
      let message = createTextMessageObj(this.state.data,'private','','li');
      im.addMessage(message,(status,messageId)=>{
        message.MSGID = messageId;
        //更新chatRecordStore
        this.props.addMessage('li',message);
        this.input.clear();
        //在表情栏提交后不会获得焦点
        if(!this.props.thouchBarStore.isExpressionPage) this.input.focus();
        this.state.data = '';
      });
     
      
      this.setState({
        inputHeight:this.state.firstInputHeight
      })
      this.props.changeThouchBarTopBoxHeight(this.state.firstInputHeight);
    }
    return
  }
  _onChange(event) {
    let height = event.nativeEvent.contentSize.height;
    if(this.state.isFirstInputHeight){
      this.state.firstInputHeight = height;
      this.state.isFirstInputHeight = false;
    } 

    //限制高度 
    if(height>(30+26*4)) return;
    this.setState({
      inputHeight:height
    })
    this.props.changeThouchBarTopBoxHeight(height);
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
       onSubmitEditing = {this._onSubmitEditing}   //0.45.1 multiline为true，并且blurOnSubmit为false时，ios点击确定会换行而不触发onSubmitEditing；Android无论怎么样点击确定都会触发onSubmitEditing
       blurOnSubmit = {true}// 提交失去焦点
       underlineColorAndroid = {'transparent'}  
       multiline={true}
       enablesReturnKeyAutomatically = {true} //ios专用  如果为true，键盘会在文本框内没有文字的时候禁用确认按钮
       returnKeyType='send'
       returnKeyLabel='发送'
       onChange={this._onChange}
       defaultValue={this.state.data}  
       //onContentSizeChange={this._onChange} 0.45.1 TextInput组件onContentSizeChange属性不可用
       style={[styles.textInputStyle,{height:Math.max(pxToPt(40),pxToPt(this.state.inputHeight)),left:this.props.thouchBarStore.isRecordPage?-999:60}]}  
       >  
      </TextInput>  
    );  
  }
  // componentDidMount(){
   
  //   //传递TextInput组件对象到父组件，父组件可以调用子组件方法
  //   this.props.getInputObject(this.input);
  // }

  componentWillReceiveProps(nextProps){
    if(nextProps.emojiText&&nextProps.emojiId!==this.props.emojiId){    
      this.state.data = this.state.data+nextProps.emojiText   //输入框添加emoji文字成功，但是onChange事件无法监听到，输入框高度无法改变
      this.state.isLock = false;
      this.props.setTextInputData(true)
    }
  }
}  
  
const styles = StyleSheet.create({  
  textInputStyle:{ 
    position:'absolute',
    left:60,
    top:pxToPt(10), 
    fontSize:20, 
    lineHeight:30, 
    width:width-180,  
    height:40,
    borderColor:'#ccc',
    borderWidth:pxToPt(1),   
    backgroundColor:'#fff',  
    borderRadius:10,
    overflow:'hidden',
    padding:0,
    paddingLeft:5,
    paddingRight:5,
    textAlignVertical: 'top'
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

 export default connect(mapStateToProps, mapDispatchToProps,null,{withRef : true})(AutoExpandingTextInput);
