/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
StyleSheet,
View,
} from 'react-native';

import ThouchBarBoxTopBox from './thouchBarBoxTopBox';
import ThouchBarBoxBottomBox from './thouchBarBoxBottomBox';


export default class ThouchBar extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      emojiText:'',
      emojiId:'',
      textInputData:''
    }  
    this.setTextInputData = this.setTextInputData.bind(this);
    this.setEmoji = this.setEmoji.bind(this);
    this._onSubmitEditing = this._onSubmitEditing.bind(this);
  }  

  setEmoji(emojiText,emojiId){
    this.setState({
      emojiText,
      emojiId
    })
  }
  setTextInputData(data){
    this.setState({
     textInputData:data
    })
  }
  _onSubmitEditing(){
    this.bar.getWrappedInstance()._onSubmitEditing();
  }
  render() {
    return (
      <View style={styles.thouchBarBox}>
        <ThouchBarBoxTopBox ref={e => this.bar = e} emojiText={this.state.emojiText} emojiId={this.state.emojiId} setTextInputData={this.setTextInputData}></ThouchBarBoxTopBox>
        <ThouchBarBoxBottomBox setEmoji={this.setEmoji} _onSubmitEditing={this._onSubmitEditing} textInputData={this.state.textInputData}></ThouchBarBoxBottomBox>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  thouchBarBox: {
    backgroundColor: '#eee',
  }
});

