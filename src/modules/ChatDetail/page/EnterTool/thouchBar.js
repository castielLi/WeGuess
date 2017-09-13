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
      emojiText:''
    }  
    this.setEmoji = this.setEmoji.bind(this);
  }  

  setEmoji(emojiText){
    this.setState({
      emojiText
    })
  }
  render() {
    return (
      <View style={styles.thouchBarBox}>
        <ThouchBarBoxTopBox emojiText={this.state.emojiText}></ThouchBarBoxTopBox>
        <ThouchBarBoxBottomBox setEmoji={this.setEmoji}></ThouchBarBoxBottomBox>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  thouchBarBox: {
    backgroundColor: '#eee',
  }
});

