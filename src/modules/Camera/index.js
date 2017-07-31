/**
 * Created by apple on 2017/7/24.
 */
'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import Camera from 'react-native-camera';
import BaseComponent from '../../Core/Component'
import NavigationTopBar from '../../Core/Component/NavigationBar';

export default class BadInstagramCloneApp extends BaseComponent {
    constructor(props){
        super(props);
        this.state = {
            cameraTypeIsFront:false
        }
        this._leftButton = this._leftButton.bind(this);
        this._title = this._title.bind(this);
    }
    _leftButton(){
        return {
            title: 'back',
            handler: () => this.route.pop(this.props),
        }
    }
    _title(){
        return{
            title:"Camera"
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationTopBar leftButton={this._leftButton} title={this._title} />
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    type = {this.state.cameraTypeIsFront?Camera.constants.Type.front:Camera.constants.Type.back}
                >
                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[拍照]</Text>
                    <Text style={styles.capture} onPress={this.changeCameraType.bind(this)}>[切换镜头]</Text>
                </Camera>
            </View>
        );
    }

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    }
    changeCameraType(){
        this.setState({
            cameraTypeIsFront:!this.state.cameraTypeIsFront
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#fff"
    },
    preview: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        width:100,
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40,
        textAlign:'center'
    }
});