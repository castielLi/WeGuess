/**
 * Created by apple on 2017/7/17.
 */

import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ListView
} from 'react-native';
import BaseComponent from '../../Core/Component'

import Contacts from 'react-native-contacts';

var datas = [];
Contacts.getAll((err, contacts) => {
  if (err) {
    console.log('getAll() error: ' + err)
  } else {
    datas = contacts;
  }
})	
        
export default class Contact extends BaseComponent {
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
       });
		this.state = {
			ds:ds,
			data:datas
		}
		this._renderRow = this._renderRow.bind(this)
	}
	_renderRow(rowData){
		return(
			<View style={styles.row}>
				<Text>{rowData.familyName+rowData.givenName}</Text>
				<Text>{rowData.phoneNumbers.length>0?rowData.phoneNumbers[0].number:''}</Text>
			</View>
		)
	}
    render() {
    	console.log(this.state)
        return (
            <View style={styles.container}>
	               	<ListView dataSource = {
	                    this.state.ds.cloneWithRows(this.state.data)
	                  }
	                  renderRow = {
	                    this._renderRow
	                  }
	                />
           </View>
        )

    }
}
const styles = StyleSheet.create({
	container:{
		flex:1
	},
	row:{
		height:40,
		borderBottomWidth:1,
		borderBottomColor:'#ccc',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	},
})