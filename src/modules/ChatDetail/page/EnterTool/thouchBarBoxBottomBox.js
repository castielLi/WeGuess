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
import ExpressionBox from './expressionBox';
import MoreUseBox from './moreUseBox';
import {
    connect
} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../reducer/action';
import * as commonActions from '../../../../Core/IM/redux/action';
const ptToPx = pt=>PixelRatio.getPixelSizeForLayoutSize(pt);
const pxToPt = px=>PixelRatio.roundToNearestPixel(px);


var {height, width} = Dimensions.get('window');
  


class ThouchBarBoxBottomBox extends Component {  
  constructor(props) {  
    super(props); 

  }
  

render(){
   let {isExpressionPage,isPlusPage} = this.props.thouchBarStore;
    if(isExpressionPage){
      return(
          <ExpressionBox setEmoji={this.props.setEmoji}></ExpressionBox>
        )
    }else if(isPlusPage){
      return(
        <MoreUseBox></MoreUseBox>
        )
    }else{
      return(
        null
        )
    }
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

const mapStateToProps = state => ({
    thouchBarStore: state.thouchBarStore
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(Actions, dispatch),
    ...bindActionCreators(commonActions,dispatch)
});

 export default connect(mapStateToProps, mapDispatchToProps)(ThouchBarBoxBottomBox);