
import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ListView
} from 'react-native';
import BaseComponent from '../../Core/Component'
import NavigationTopBar from '../../Core/Component/NavigationBar';
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
		this._renderRow = this._renderRow.bind(this);
        this._leftButton = this._leftButton.bind(this);
        this._title = this._title.bind(this);
	}
	_renderRow(rowData){
		return(
			<View style={styles.row}>
				<Text>{rowData.familyName+rowData.givenName}</Text>
				<Text>{rowData.phoneNumbers.length>0?rowData.phoneNumbers[0].number:''}</Text>
			</View>
		)
	}
    //定义上导航的左按钮
    _leftButton(){
        return {
            title: 'back',
            handler: () => this.route.pop(this.props),
        }
    }
    //定义上导航的标题
    _title(){
        return{
            title:"Contact"
        }
    }
    render() {
        return (
            <View style={styles.container}>
				<NavigationTopBar leftButton={this._leftButton} title={this._title} />
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
		flex:1,
		backgroundColor:'#fff'
	},
	row:{
		height:40,
		paddingLeft:20,
		paddingRight:20,
		borderBottomWidth:1,
		borderBottomColor:'#ccc',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	},
})