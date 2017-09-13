import React, { Component } from 'react';  
import {  
  StyleSheet,  
  Text,  
  TextInput,  
  View,
  Dimensions,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  PixelRatio
} from 'react-native';  
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

const ptToPx = pt=>PixelRatio.getPixelSizeForLayoutSize(pt);
const pxToPt = px=>PixelRatio.roundToNearestPixel(px);


var {height, width} = Dimensions.get('window');
  


export default class ExpressionBox extends Component {  
  constructor(props) {  
    super(props); 
    this.onPressEmoji = this.onPressEmoji.bind(this);
  }
  
onPressEmoji(emojiText){
  this.props.setEmoji(emojiText,Date.now())
}
render(){

      return(
          <View style={styles.ThouchBarBoxBottomBox}>
          <Swiper style={styles.wrapper} showsButtons={false} activeDotColor={'#434343'} loop={false} >
             <View style={styles.swiperSlide}>
              <TouchableWithoutFeedback onPress={this.onPressEmoji.bind(this,'[呲牙]')}>
                <Image source={require('../../resource/sm.png')} style={styles.img}></Image>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.onPressEmoji.bind(this,'[微笑]')}>
                <Image source={require('../../resource/sm.png')} style={styles.img}></Image>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.onPressEmoji.bind(this,'[呲牙]')}>
                <Image source={require('../../resource/sm.png')} style={styles.img}></Image>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.onPressEmoji.bind(this,'[微笑]')}>
                <Image source={require('../../resource/sm.png')} style={styles.img}></Image>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.onPressEmoji.bind(this,'[呲牙]')}>
                <Image source={require('../../resource/sm.png')} style={styles.img}></Image>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.onPressEmoji.bind(this,'[微笑]')}>
                <Image source={require('../../resource/sm.png')} style={styles.img}></Image>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.onPressEmoji.bind(this,'[呲牙]')}>
                <Image source={require('../../resource/sm.png')} style={styles.img}></Image>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.onPressEmoji.bind(this,'[微笑]')}>
                <Image source={require('../../resource/sm.png')} style={styles.img}></Image>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.swiperSlide}>
              <TouchableWithoutFeedback onPress={()=>{alert('表情')}}>
                <Image source={require('../../resource/sm.png')} style={styles.img}></Image>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.swiperSlide}>
             <TouchableWithoutFeedback onPress={()=>{alert('表情')}}>
                <Image source={require('../../resource/sm.png')} style={styles.img}></Image>
              </TouchableWithoutFeedback>
            </View>
          </Swiper>
        </View>
        )
    }
}

const styles = StyleSheet.create({
  ThouchBarBoxBottomBox:{
    height:230,
    borderColor:'#ccc',
    borderTopWidth:1
  },
  wrapper:{
    flex:1,
  },
  swiperSlide:{
    flex:1,
    flexWrap:'wrap',
    flexDirection:'row',
  },
  plusItemBox:{
    width:pxToPt(60),
    height:pxToPt(70),
    marginTop:20,
    marginHorizontal:(width-4*pxToPt(60))/8,
    alignItems:'center',
  },
  plusItemImgBox:{
    height:pxToPt(50),
    width:pxToPt(50),
    borderRadius:pxToPt(10),
    borderColor:'#ccc',
    borderWidth:pxToPt(1), 
    justifyContent:'center',
    alignItems:'center'
  },
  img:{
    height:pxToPt(25),
    width:pxToPt(25),
    resizeMode:'stretch',
    margin:10
  },
  plusItemTit:{
    fontSize:12,
    color:'#bbb'
  }
});
