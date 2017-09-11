/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import AutoExpandingTextInput from './autoExpandingTextInput';
import Swiper from 'react-native-swiper';

var {height, width} = Dimensions.get('window');
export default class ThouchBar extends Component {
  constructor(props) {  
    super(props);  
    this.state = {  
      height:62,
      //是否录音界面
      isRecord:false,
      //是否表情界面
      isExpression:false,
      //是否更多界面
      isPlus:false,
      speakTxt:'按住说话',  
    };  
    this._onChangeText = this._onChangeText.bind(this);
    this._changeHeight = this._changeHeight.bind(this);
    this.toRecord = this.toRecord.bind(this);
    this.toExpression = this.toExpression.bind(this);
    this.toPlus = this.toPlus.bind(this);
    this.renderVoiceButton = this.renderVoiceButton.bind(this);
    this.rendersmileButton = this.rendersmileButton.bind(this);
    this.renderPlusButton = this.renderPlusButton.bind(this);
    this.renderEnterBox = this.renderEnterBox.bind(this);
    this._onPressIn = this._onPressIn.bind(this);
    this._onPressOut = this._onPressOut.bind(this);
    this.renderThouchBarBoxBottom = this.renderThouchBarBoxBottom.bind(this);
    this._onFocus = this._onFocus.bind(this);
  }  
  _onChangeText(text){
    //console.log(text)
  }
  _changeHeight(height){
    this.setState({
      height,
    })
  }
  toRecord(){
    if(this.state.isRecord){
      this.input.input.focus();
    }else{
      this.input.input.blur();
    }
    this.setState({
      isRecord:!this.state.isRecord,
      isExpression:false,
      isPlus:false,
    })
  }
  toExpression(){
    if(this.state.isExpression){
      this.input.input.focus();
    }else if(!this.state.isRecord&&!this.state.isExpression){
      this.input.input.blur();
    }
    this.setState({
      isExpression:!this.state.isExpression,
      isRecord:false,
      isPlus:false
    })
  }
  toPlus(){
    if(this.state.isPlus){
      this.input.input.focus();
    }else if(!this.state.isRecord&&!this.state.isPlus){
      this.input.input.blur();
    }
    this.setState({
      isPlus:!this.state.isPlus,
      isExpression:false,
      isRecord:false
    })
  }
  renderVoiceButton(){
    if(this.state.isRecord){
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
    if(this.state.isExpression){
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
    //...
    this.setState({
      speakTxt:'松开结束'
    })
  }
  _onPressOut(){
    //检查录音时间
    //发送
    this.setState({
      speakTxt:'按住说话'
    })
  }
  _onFocus(){
    this.setState({
      isRecord:false,
      isExpression:false,
      isPlus:false,
    })
  }
  renderEnterBox(){
    // if(this.state.isRecord){
    //   return(
    //     <TouchableHighlight style={[styles.speakBox]} underlayColor={'#bbb'} activeOpacity={0.5} onPressIn={this._onPressIn} onPressOut={this._onPressOut}>
    //       <Text style={styles.speakTxt}>{this.state.speakTxt}</Text>
    //     </TouchableHighlight>
    //   )
    // }else{
    //   return(
    //     <AutoExpandingTextInput  ref={(refInput)=>{this.input = refInput}} onChangeText={this._onChangeText} changeHeight={this._changeHeight} autoFocus={this.state.autoFocus}></AutoExpandingTextInput>
    //     )
    // }
    return(
      <View style={{overflow:"hidden",flex:1}}>
        <TouchableHighlight style={[styles.speakBox,{left:this.state.isRecord?60:-999}]} underlayColor={'#bbb'} activeOpacity={0.5} onPressIn={this._onPressIn} onPressOut={this._onPressOut}>
           <Text style={styles.speakTxt}>{this.state.speakTxt}</Text>
        </TouchableHighlight>
        <AutoExpandingTextInput  isRecord={this.state.isRecord} ref={(refInput)=>{this.input = refInput}} onChangeText={this._onChangeText} onFocus={this._onFocus} changeHeight={this._changeHeight}></AutoExpandingTextInput>
      </View>
      )
  }
  //渲染thouchBar组件下半部分
  renderThouchBarBoxBottom(){
    if(this.state.isExpression){
      return(
      <View style={styles.ThouchBarBoxBottomBox}>
        <Swiper style={styles.wrapper} showsButtons={false} activeDotColor={'#434343'}>
           <View style={styles.swiperSlide}>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
          </View>
          <View style={styles.swiperSlide}>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
          </View>
          <View style={styles.swiperSlide}>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
            <Image source={require('./img/sm.png')} style={styles.img}></Image>
          </View>
        </Swiper>
      </View>
      )
}else if(this.state.isPlus){
  return(
    <View style={styles.ThouchBarBoxBottomBox}>
        <Swiper style={styles.wrapper} showsButtons={false} activeDotColor={'#434343'}>  
          <View style={styles.swiperSlide}>
            <View style={styles.plusItemBox}>
              <TouchableHighlight style={styles.plusItemImgBox} underlayColor={'#bbb'} activeOpacity={0.5} onPress={()=>{}}>
                <Icon name="picture-o" size={50} color="#aaa" />
              </TouchableHighlight>
              <Text style={styles.plusItemTit}>照片</Text>
            </View>
            <View style={styles.plusItemBox}>
              <TouchableHighlight style={styles.plusItemImgBox} underlayColor={'#bbb'} activeOpacity={0.5} onPress={()=>{}}>
                <Icon name="picture-o" size={50} color="#aaa" />
              </TouchableHighlight>
              <Text style={styles.plusItemTit}>照片</Text>
            </View>
            <View style={styles.plusItemBox}>
              <TouchableHighlight style={styles.plusItemImgBox} underlayColor={'#bbb'} activeOpacity={0.5} onPress={()=>{}}>
                <Icon name="picture-o" size={50} color="#aaa" />
              </TouchableHighlight>
              <Text style={styles.plusItemTit}>照片</Text>
            </View>
          </View>
          <View style={styles.swiperSlide}>
            <View style={styles.plusItemBox}>
              <TouchableHighlight style={styles.plusItemImgBox} underlayColor={'#bbb'} activeOpacity={0.5} onPress={()=>{}}>
                <Icon name="picture-o" size={50} color="#aaa" />
              </TouchableHighlight>
              <Text style={styles.plusItemTit}>照片</Text>
            </View>
            <View style={styles.plusItemBox}>
              <TouchableHighlight style={styles.plusItemImgBox} underlayColor={'#bbb'} activeOpacity={0.5} onPress={()=>{}}>
                <Icon name="picture-o" size={50} color="#aaa" />
              </TouchableHighlight>
              <Text style={styles.plusItemTit}>照片</Text>
            </View>
            <View style={styles.plusItemBox}>
              <TouchableHighlight style={styles.plusItemImgBox} underlayColor={'#bbb'} activeOpacity={0.5} onPress={()=>{}}>
                <Icon name="picture-o" size={50} color="#aaa" />
              </TouchableHighlight>
              <Text style={styles.plusItemTit}>照片</Text>
            </View>
          </View>
          <View style={styles.swiperSlide}>
            <View style={styles.plusItemBox}>
              <TouchableHighlight style={styles.plusItemImgBox} underlayColor={'#bbb'} activeOpacity={0.5} onPress={()=>{}}>
                <Icon name="picture-o" size={50} color="#aaa" />
              </TouchableHighlight>
              <Text style={styles.plusItemTit}>照片</Text>
            </View>
            <View style={styles.plusItemBox}>
              <TouchableHighlight style={styles.plusItemImgBox} underlayColor={'#bbb'} activeOpacity={0.5} onPress={()=>{}}>
                <Icon name="picture-o" size={50} color="#aaa" />
              </TouchableHighlight>
              <Text style={styles.plusItemTit}>照片</Text>
            </View>
            <View style={styles.plusItemBox}>
              <TouchableHighlight style={styles.plusItemImgBox} underlayColor={'#bbb'} activeOpacity={0.5} onPress={()=>{}}>
                <Icon name="picture-o" size={50} color="#aaa" />
              </TouchableHighlight>
              <Text style={styles.plusItemTit}>照片</Text>
            </View>
          </View>
        </Swiper>
      </View>
    )
}else{
  return null
}
    
  }
  render() {
    let ChooseComponent = Platform.OS === 'ios'?KeyboardAvoidingView:View;
    return (
      <ChooseComponent behavior='padding' style={styles.thouchBarBox}>
        <View style={[styles.thouchBarBoxTop,{height:this.state.isRecord?62:Math.max(62,this.state.height+20)}]}>
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
        <View style={[styles.thouchBarBoxBottom]}>
          {this.renderThouchBarBoxBottom()}
        </View>
      </ChooseComponent>
    );
  }
}

const styles = StyleSheet.create({
  thouchBarBox: {
    position:'absolute',
    width,
    bottom:0,
    left:0,
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
  ThouchBarBoxBottomBox:{
    height:240,
    borderColor:'#ccc',
    borderTopWidth:1
  },
  wrapper:{

  },
  swiperSlide:{
    flex:1,
    flexWrap:'wrap',
    padding:10,
    flexDirection:'row',

  },
  img:{
    height:30,
    width:30,
    resizeMode:'stretch',
    margin:10
  },
  plusItemBox:{
    margin:20,
    marginTop:10,
    alignItems:'center'
  },
  plusItemImgBox:{
    height:70,
    width:70,
    borderRadius:20,
    borderColor:'#ccc',
    borderWidth:1, 
    justifyContent:'center',
    alignItems:'center'
  },
  plusItemTit:{
    fontSize:12,
    color:'#bbb'
  }
});

