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
import IM from '../../Core/IM'

import ChatCommandEnum from '../../Core/IM/dto/ChatCommandEnum'
import MessageBodyTypeEnum from '../../Core/IM/dto/MessageBodyTypeEnum'
import MessageCommandEnum from '../../Core/IM/dto/MessageCommandEnum'

import SendMessageBodyDto from '../../Core/IM/dto/SendMessageBodyDto'
import SendMessageDto from '../../Core/IM/dto/SendMessageDto'
import messageBodyChatDto from '../../Core/IM/dto/messageBodyChatDto'
import uploadResourceDto from '../../Core/IM/dto/uploadResourceDto'



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
                    captureTarget={Camera.constants.CaptureTarget.disk}
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
            .then((data) => {

                alert("拍照成功！图片保存地址：\n"+data.path)

                let im = new IM();

                let addMessage = new SendMessageDto();
                let messageBody = new SendMessageBodyDto();
                let messageData = new messageBodyChatDto();
                let file = new uploadResourceDto()

                file.FileType = "image";
                file.LocalSource = data.path;

                messageData.Data = "";
                messageData.Command = ChatCommandEnum.MSG_BODY_CHAT_C2C
                messageData.Sender = "1";
                messageData.Receiver = "2";

                messageBody.LocalTime = new Date().getTime();
                messageBody.Command = MessageBodyTypeEnum.MSG_BODY_CHAT;
                messageBody.Data = messageData;


                addMessage.Command = MessageCommandEnum.MSG_BODY;
                addMessage.Data = messageBody;
                addMessage.type = "image";
                addMessage.way = "chatroom";
                addMessage.Resource = [file];

                im.addMessage(addMessage,function () {

                },function(progress) {
                    console.log("上传进度" + progress + "%");
                });


            })
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