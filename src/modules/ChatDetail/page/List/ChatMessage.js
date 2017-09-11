/**
 * Created by Hsu. on 2017/9/8.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

let {width, height} = Dimensions.get('window');

export default class ChatMessage extends Component {
    constructor(props){
        super(props)

    }

    static defaultProps = {
    };

    static propTypes = {
    };

    typeOption = (data)=> {
        let {type} = data;
        switch (type) {
            case Const.messageText: {
                return (
                    <ChatMessageText
                        data={data}
                    />
                )
            }
                break;
            case Const.messageImage: {
                return (
                    <ChatMessageImage
                        data={data}
                    />
                )
            }
                break;
            case Const.messageVoice: {
                return (
                    <ChatMessageSound
                        data={data}
                    />
                )
            }
                break;
        }
    };

    render() {
        let {rowData} = this.props;
        this.typeOption(rowData);
    }
}



const styles = StyleSheet.create({

});