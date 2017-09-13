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

export default class ChatMessageText extends Component {
    constructor(props){
        super(props)

    }

    static defaultProps = {
    };

    static propTypes = {
    };

    render() {
        let {data} = this.props;
        let {Sender,Data,Receiver} = data.message.Data.Data;
        if(!Sender){
            return(
                <View style={styles.bubbleViewRight}>
                    <Text style={styles.contentText}>{Data}</Text>
                </View>
            )
        }
        else{
            return(
                <View style={styles.bubbleView}>
                    <Text style={styles.contentText}>{Data}</Text>
                </View>
            )
        }
    }
}



const styles = StyleSheet.create({
    bubbleView:{
        alignSelf:'flex-start',
        marginLeft:10,
        backgroundColor: '#fff',
        maxWidth:width-150,
        padding:12,
        justifyContent:'center',
        borderRadius:5
    },
    bubbleViewRight:{
        alignSelf:'flex-start',
        marginRight:10,
        backgroundColor: '#98E165',
        maxWidth:width-150,
        padding:10,
        justifyContent:'center',
        borderRadius:5
    },
    contentText:{
        includeFontPadding:false,
        fontSize:16
    }
});