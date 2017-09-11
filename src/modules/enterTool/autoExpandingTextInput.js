import React, { Component } from 'react';  
import {  
  StyleSheet,  
  Text,  
  TextInput,  
  View,
  Dimensions
} from 'react-native';  
var {height, width} = Dimensions.get('window');
  
export default class AutoExpandingTextInput extends Component {  
  constructor(props) {  
    super(props);  
    this.state = {  
      text:'',  
      height:0,
    };  
    this._onChangeText = this._onChangeText.bind(this);
    this._onContentSizeChange = this._onContentSizeChange.bind(this);
  }  
  
  componentWillMount(){
    this.setState({autoFocus:this})
  }

  _onContentSizeChange(event) {
    let height = event.nativeEvent.contentSize.height
    console.log(height)
    //限制高度 
    if(height>(30+26*5)) return;
    this.setState({height});
    this.props.changeHeight(height);
    }
  _onChangeText(text){
    this.props.onChangeText(text,this.state.height)
  }
  render() {  
    return (  
      <TextInput
       ref={(refInput)=>{this.input = refInput}}
       onFocus = {this.props.onFocus}
       onChangeText = {this._onChangeText}
       underlineColorAndroid = {'transparent'}  
       multiline={true}  
       onContentSizeChange={this._onContentSizeChange}
       style={[styles.textInputStyle,{height:Math.max(40,this.state.height),left:this.props.isRecord?-999:60}]}  
       //onScroll={(event)=>{console.log(event.nativeEvent.contentOffset.y)}}
       >  
      </TextInput>  
    );  
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
    overflow:'hidden',
    padding:0,
    margin:0
  },

});  

