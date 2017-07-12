/**
 * Created by apple on 2017/6/7.
 */

'use strict';
import 'whatwg-fetch'
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Button,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
var Dimensions = require('Dimensions');
import WeGuessSDK from '../../../Framework/WeguessSDK'
import ContainerComponent from '../../.././Framework/Component/ContainerComponent'
import * as LoginMethods from '../reducer/action'

class Login extends ContainerComponent {

    constructor(props) {
        super(props);
        this.state = {username: '',password:''};
        this.onButtonPress = this.onButtonPress.bind(this);
        this.toMain =  this.toMain.bind(this);
        this.render =  this.render.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){

        if(nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn === true){
            this.toMain();
            return false;
        }

        return true;
    }

    toMain(){
        this.route.toMain(this.props);
    }

    onButtonPress(){

        //这里跳转有bug，需要利用redux 来实现page的替换
        // WeGuessSDK.clientManager().autoLogin("grower1","111111",function(component){
        //     component.props.dispatch(LoginMethods.signIn())
        // },this);
        this.confirm("Warnning","hello world","OK",null,"Cancel",null)
    }


    render() {
        let Popup = this.PopContent;
        let Loading = this.Loading;
        return (
            <View style={styles.container}>
                <View style={styles.enter}>
                    <Image source={require('../resources/logo.jpg')} style={styles.logo}/>
                    <TextInput
                        style={styles.textbox}
                        placeholder="Username!"
                        onChangeText={(text) => this.setState({text})}
                    />
                    <TextInput
                        style={styles.textbox}
                        placeholder="Password!"
                        onChangeText={(text) => this.setState({password})}
                    />
                </View>

                <Text style={styles.forgotPassword}>Forgotten password?</Text>
                <View style={styles.buttons}>
                    <View style={styles.touchView}>
                    <TouchableHighlight
                        style={styles.signin}
                        onPress={this.onButtonPress}>
                        <View style={styles.touchButton}>
                            <Text style={styles.signInText}>
                                Sign In
                            </Text>
                        </View>
                    </TouchableHighlight>
                    </View>
                    <Text style={styles.midText}>------- OR -------</Text>
                    <View style={styles.touchView}>
                        <TouchableHighlight
                            style={styles.touchLighted}
                            onPress={this.onButtonPress}>
                            <View style={styles.thirdPartButton}>
                                <Image style={styles.touchButton} source={require('../resources/facebook.png')}>
                                    <Text style={styles.facebook}>
                                        Login with facebook!
                                    </Text>
                                </Image>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.touchLighted}
                            onPress={this.onButtonPress}>
                            <View style={styles.thirdPartButton}>
                                <Image style={styles.touchButton} source={require('../resources/google.png')}>
                                    <Text style={styles.google}>Login with google+!</Text>
                                </Image>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <Popup ref={ popup => this.popup = popup}/>
                <Loading ref = { loading => this.loading = loading}/>
            </View>
        );

    }
}

function select(store){
    return {
        isLoggedIn : store.loginStore.isLoggedIn,
    }
}
export default connect(select)(Login);

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#a3bee4',

    },
    enter:{
        height:215,
        alignItems: 'center',
    },
    logo: {
        width: 220,
        height: 45,
        marginTop:50,
        backgroundColor: 'transparent',
        resizeMode: 'stretch',
    },
    textbox:{
        marginLeft:30,
        marginTop:15,
        marginRight:30,
        height:40,
        borderWidth:1,
        borderColor:'rgba(53, 79, 138,1.0)',
        borderRadius:5
    },
    forgotPassword:{
        marginTop:0,
        marginRight:30,
        marginLeft:Dimensions.get('window').width -140 - 30,
        height:25
    },
    buttons:{
        flex:1,
        alignItems: 'center',
        marginTop:15
    },
    signInText:{
        color:'white',
        fontSize:16
    },
    signin:{
        height:40,
        width:310,
        backgroundColor:'#cbcd00',
        borderRadius:8,
    },
    midText:{
        color:'white',
        fontSize:16,
        marginTop:30,

    },
    touchLighted:{
        marginTop:15,
        borderRadius:8
    },
    thirdPartButton:{

        height:40,
        width:310,
    },
    touchView:{
        marginTop:15,
    },
    touchButton:{
        height:40,
        width:310,
        backgroundColor: 'transparent',
        resizeMode: 'stretch',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    facebook:{
        color:'white',
        fontSize:15,
    },
    google:{
        color:'rgba(53, 79, 138,1.0)',
        fontSize:15
    }

});

