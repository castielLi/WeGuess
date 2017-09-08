import React, { Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {
    connect
} from 'react-redux';
import RNFS from 'react-native-fs';
import Audio from './Audio.js';
import uuidv1 from 'uuid/v1';
import {bindActionCreators} from 'redux';
import * as Actions from '../reducer/action';
import Icon from 'react-native-vector-icons/FontAwesome';
import AutoExpandingTextInput from './autoExpandingTextInput';
import * as commonActions from '../../../commonReducer/action';
import {createResourceMessageObj} from './createMessageObj';
import IM from '../../../Core/IM/index';

const im = new IM();
var {height, width} = Dimensions.get('window');
var audio;
class ThouchBarBoxTopBox extends Component {  
 	constructor(props) {  
    super(props);  
    this.state = {  
      inputHeight:62,
      speakTxt:'按住说话', 
      sendMessage:{data:'',from:'',id:'',uri:'',type:''},
      path:'',
      fileName:''
    };  
    this.toRecord = this.toRecord.bind(this);
    this.toExpression = this.toExpression.bind(this);
    this.toPlus = this.toPlus.bind(this);
    this.renderVoiceButton = this.renderVoiceButton.bind(this);
    this.rendersmileButton = this.rendersmileButton.bind(this);
    this.renderPlusButton = this.renderPlusButton.bind(this);
    this.renderEnterBox = this.renderEnterBox.bind(this);
    this._onPressIn = this._onPressIn.bind(this);
    this._onPressOut = this._onPressOut.bind(this);
    this.getInputObject = this.getInputObject.bind(this);
  }  
  toRecord(){
    if(this.props.thouchBarStore.isRecordPage){
      this.input.focus();
    }else{
      this.input.blur();
    }
    this.props.pressRecord();
  }
  toExpression(){
    if(this.props.thouchBarStore.isExpressionPage){
      this.input.focus();
    }else if(!this.props.thouchBarStore.isRecordPage&&!this.props.thouchBarStore.isExpressionPage){
      this.input.blur();
    }
   this.props.pressExpression();
  }
  toPlus(){
    if(this.props.thouchBarStore.isPlusPage){
      this.input.focus();
    }else if(!this.props.thouchBarStore.isRecordPage&&!this.props.thouchBarStore.isPlusPage){
      this.input.blur();
    }
    this.props.pressPlus();
  }
  renderVoiceButton(){
    if(this.props.thouchBarStore.isRecordPage){
      return(
        <Icon name="keyboard-o" size={30} color="#aaa" />
        )
    }else{
      return(
        <Icon name="feed" size={30} color="#aaa" />
        )
    }
  }
  rendersmileButton(){
    if(this.props.thouchBarStore.isExpressionPage){
      return(
        <Icon name="keyboard-o" size={30} color="#aaa" />
        )
    }else{
      return(
        <Icon name="smile-o" size={30} color="#aaa" />
        )
    }
  }
  renderPlusButton(){
    return(
      <Icon name="plus" size={30} color="#aaa" />
      )
  }
  _onPressIn(){
    //开始录音
    let fileName = uuidv1();
    this.state.fileName = fileName;
    audio = new Audio('Li', fileName);
    audio._record();  
    this.setState({
      speakTxt:'松开结束'
    })

  }
  _onPressOut(){
    //检查录音时间
    //...
    
    audio._stop(()=>{
      //初始化消息
      let message = createResourceMessageObj('audeo','private',[{LocalSource:this.state.path+'/'+this.state.fileName,RemoteSource:''}],'1','2');
      let messageId = im.addRecMessage(message);
      message.MSGID = messageId;
      //更新chatRecordStore
      this.props.addMessage('li',message,'private')
    });
    //发送
    this.setState({
      speakTxt:'按住说话'
    })
  }
  renderEnterBox(){
    return(
      <View style={{overflow:"hidden",flex:1}}>
        <TouchableHighlight style={[styles.speakBox,{left:this.props.thouchBarStore.isRecordPage?60:-999}]} underlayColor={'#bbb'} activeOpacity={0.5} onPressIn={this._onPressIn} onPressOut={this._onPressOut}>
           <Text style={styles.speakTxt}>{this.state.speakTxt}</Text>
        </TouchableHighlight>
        <AutoExpandingTextInput getInputObject={this.getInputObject}></AutoExpandingTextInput>
      </View>
      )
  }
  //获取TextInput组件对象
  getInputObject(input){
    this.input = input;
  }
  componentWillMount(){
    //创建文件夹
      let path = RNFS.DocumentDirectoryPath + '/' + 'Li';
      this.state.path = path;
      RNFS.mkdir(path)
        .then((success) => {
          console.log('create new dir success!');
        })
        .catch((err) => {
          console.log(err.message);
        });
  }
	render(){
		return(
			<View style={[styles.thouchBarBoxTop,{height:this.props.thouchBarStore.isRecordPage?62:Math.max(62,this.props.thouchBarStore.inputHeight+20)}]}>
	          {this.renderEnterBox()}
	          <TouchableHighlight style={[styles.button,styles.voiceButton]} underlayColor={'#bbb'} activeOpacity={0.5} onPress={this.toRecord}>
	            {this.renderVoiceButton()}
	          </TouchableHighlight>
	          <TouchableHighlight style={[styles.button,styles.smileButton]} underlayColor={'#bbb'} activeOpacity={0.5} onPress={this.toExpression}>
	            {this.rendersmileButton()}
	          </TouchableHighlight>
	          <TouchableHighlight style={[styles.button,styles.plusButton]} underlayColor={'#bbb'} activeOpacity={0.5} onPress={this.toPlus}>
	            {this.renderPlusButton()}
	          </TouchableHighlight>
	        </View>
			)
	}
  shouldComponentUpdate(nextProps,nextState){
    if(nextProps.thouchBarStore.isRecordPage!==this.props.thouchBarStore.isRecordPage||nextProps.thouchBarStore.isExpressionPage!==this.props.thouchBarStore.isExpressionPage||nextProps.thouchBarStore.isPlusPage!==this.props.thouchBarStore.isPlusPage||nextProps.thouchBarStore.inputHeight!==this.props.thouchBarStore.inputHeight||nextState!==this.state){
      return true
    }
    return false;
  }
  componentWillUpdate(){
    console.log('will update')
  }
 }

 const styles = StyleSheet.create({
  thouchBarBox: {
    width,
    backgroundColor: '#eee',
  },
  thouchBarBoxTop:{
    height:62,//62
  },
  inputBox:{
    width:width-170,

    marginLeft:57,
    backgroundColor:'#fff',
    borderRadius:10
  },
  button:{
    position:'absolute',
    height:40,
    width:40,
    borderWidth:1,
    borderColor:'#575757',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
  voiceButton:{
    bottom:10,
    left:5
  },
  smileButton:{
    bottom:10,
    right:60
  },
  plusButton:{
    bottom:10,
    right:5
  },
  speakBox:{
    position:'absolute',
    height:40,
    width:width-180, 
    left:60,
    top:10,
    borderRadius:10,
    borderColor:'#ccc',
    borderWidth:1, 
    justifyContent:'center',
  },
  speakTxt:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold'
  },

});

const mapStateToProps = state => ({
    thouchBarStore: state.thouchBarStore
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(Actions, dispatch),
    ...bindActionCreators(commonActions,dispatch)
});

 export default connect(mapStateToProps, mapDispatchToProps)(ThouchBarBoxTopBox);

