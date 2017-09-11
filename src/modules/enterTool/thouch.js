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
  ScrollView,
  Dimensions,
  TextInput
} from 'react-native';
import ThouchBar from './thouchBar';

var {height, width} = Dimensions.get('window');
export default class Thouch extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentBox}>
          <ScrollView >
            <Text style={styles.row}>123</Text>
            <Text style={styles.row}>123</Text>
            <Text style={styles.row}>123</Text>
            <Text style={styles.row}>123</Text>
            <Text style={styles.row}>123</Text>
            <Text style={styles.row}>123</Text>
            <Text style={styles.row}>123</Text>
            <Text style={styles.row}>123</Text>
          </ScrollView>
        </View>
        <ThouchBar></ThouchBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ddd'
  },
  contentBox:{
    height:height-82
  },
  row:{
    height:100,
    borderColor:'#ccc',
    borderBottomWidth:1
  }
});

