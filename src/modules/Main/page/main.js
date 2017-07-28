/**
 * Created by apple on 2017/6/7.
 */

'use strict';
import 'whatwg-fetch'
import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Button,
    TouchableHighlight,
    ListView
} from 'react-native';
import {
    connect
} from 'react-redux';
import BaseComponent from '../../../Core/Component';
import NavigationTopBar from '../../../Core/Component/NavigationBar';
import XX from '../../XX/index.js'
var Dimensions = require('Dimensions');

class Main extends BaseComponent {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
        	ds:ds,
        	data:[{
                    key: 'Login',
                    id: 'Login'
                }, {
                    key: 'MainTabbar',
                    id: 'TabOne'
                }, {
                    key: 'TestRefresh',
                    id: 'TestRefresh'
                }, {
                    key: 'XX',
                    id: 'XX'
                }, {
                    key: 'XXX',
                    id: 'XXX'
                },{
                	key:'Contact',
                	id:'Contact'
                }],
            refresh: false,
            isZH:true,
            strings:this.Localization.strings.main
        }
        this._renderRow = this._renderRow.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this._title = this._title.bind(this);
    }
    onButtonPress(key, id) {
        this.route.push(this.props, {
                key,
                routeId: id
            })
            // this.props.navigator.push({
            //     key,
            //     routeId: id
            // })
    }
    _renderRow(rowData) {
        return (
            <View style={styles.touchView}>
                <View style={styles.buttons}>
                    <TouchableHighlight
                        style={styles.signin}
                        onPress={this.onButtonPress.bind(this,rowData.key,rowData.id)}>
                        <View style={styles.touchButton}>
                            <Text style={styles.signInText}>
                                {this.state.strings[rowData.key]}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
    changeLanguage(){
    	this.Localization.changeLanguage(!this.state.isZH?"zh-CN":"en-US");
    	this.setState({
    		isZH:!this.state.isZH,
    		data:this.state.data.concat([]),
    		strings:this.Localization.strings.main
    	})
    }
    //定义上导航的标题
    _title(){
        return{
            title:"Main"
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationTopBar leftButton={this._leftButton} title={this._title} />
               <View>
	               	<ListView dataSource = {
	                    this.state.ds.cloneWithRows(this.state.data)
	                  }
	                  renderRow = {
	                    this._renderRow
	                  }
	                />
               </View>
               <Text style={{textAlign:'center'}} onPress={this.changeLanguage}>{this.state.strings.ChangeLanguage}</Text>
           </View>
        )
    }
}

export default connect()(Main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a3bee4',

    },
    enter: {
        height: 215,
        alignItems: 'center',
    },
    logo: {
        width: 220,
        height: 45,
        marginTop: 50,
        backgroundColor: 'transparent',
        resizeMode: 'stretch',
    },
    textbox: {
        marginLeft: 30,
        marginTop: 15,
        marginRight: 30,
        height: 40,
        borderWidth: 1,
        borderColor: 'rgba(53, 79, 138,1.0)',
        borderRadius: 5
    },
    forgotPassword: {
        marginTop: 0,
        marginRight: 30,
        marginLeft: Dimensions.get('window').width - 140 - 30,
        height: 25
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        marginTop: 15
    },
    signInText: {
        color: 'white',
        fontSize: 16
    },
    signin: {
        height: 40,
        width: 310,
        backgroundColor: '#cbcd00',
        borderRadius: 8,
    },
    midText: {
        color: 'white',
        fontSize: 16,
        marginTop: 30,

    },
    touchLighted: {
        marginTop: 15,
        borderRadius: 8
    },
    thirdPartButton: {

        height: 40,
        width: 310,
    },
    touchView: {
        marginTop: 15,
    },
    touchButton: {
        height: 40,
        width: 310,
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    facebook: {
        color: 'white',
        fontSize: 15,
    },
    google: {
        color: 'rgba(53, 79, 138,1.0)',
        fontSize: 15
    }

});