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
   // this.state.data = data
   this.setState({
    data
   })
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
        this.props.addMessage('li',message)
        this.state.isLock = false;
      });
     
      this.input.clear();
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
       onSubmitEditing = {this._onSubmitEditing}
       blurOnSubmit = {false}
       underlineColorAndroid = {'transparent'}  
       multiline={true}
       returnKeyType={'send'}
       returnKeyLabel={'发送'}
       onChange={this._onChange}
       value={this.state.data}  
       //onContentSizeChange={this._onChange} 0.45.1 TextInput组件onContentSizeChange属性不可以
       style={[styles.textInputStyle,{height:Math.max(pxToPt(40),pxToPt(this.state.inputHeight)),left:this.props.thouchBarStore.isRecordPage?-999:60}]}  
       >  
      </TextInput>  
    );  
  }
  componentDidMount(){
   
    //传递TextInput组件对象到父组件，父组件可以调用子组件方法
    this.props.getInputObject(this.input);
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(nextProps.emojiText&&nextProps.emojiId!==this.props.emojiId){    
      this.setState({
        data:this.state.data+nextProps.emojiText
      })
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
