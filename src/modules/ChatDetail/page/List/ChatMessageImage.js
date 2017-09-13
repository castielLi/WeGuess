/**
 * Created by Hsu. on 2017/9/8.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';

import Sound from 'react-native-sound';

let {width, height} = Dimensions.get('window');

export default class ChatMessageImage extends Component {
    constructor(props){
        super(props)

    }

    static defaultProps = {
    };

    static propTypes = {
    };

    render() {
        let {data} = this.props;
        let {Sender,Receiver} = data.message.Data.Data;
        let {LocalSource,RemoteSource} = data.message.Resource;
        if(!Sender){
            return(
                <View style={styles.bubbleViewRight}>

                        <Image
                            source={{uri:'https://ws1.sinaimg.cn/large/610dc034ly1fivohbbwlqj20u011idmx.jpg'}}
                            style={styles.imageStyle}
                        />

                </View>
            )
        }
        else{
            return(
                <View style={styles.bubbleView}>

                        <Image
                            source={{uri:'https://ws1.sinaimg.cn/large/610dc034ly1fj78mpyvubj20u011idjg.jpg'}}
                            style={styles.imageStyle}
                        />

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
        justifyContent:'center',
        borderRadius:5
    },
    bubbleViewRight:{
        alignSelf:'flex-start',
        marginRight:10,
        backgroundColor: '#98E165',
        maxWidth:width-150,
        justifyContent:'center',
        borderRadius:5
    },
    imageStyle:{
        width:60,
        height:60,
    }
});