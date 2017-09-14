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
import EMOJI_ENUM from '../EnterTool/EmojiEnum';
import stringToContentArray from './stringToContentArrayMethod';

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
        let dataArr = stringToContentArray(Data)
        if(!Sender){
            return(
                <View style={styles.bubbleViewRight}>
                    <Text style={styles.contentText}>
                        {
                            dataArr.map((v,i)=>{
                                if (v["Content"] != null) {//文本  
                                    return <Text key={i}>{v["Content"]}</Text>
                                }else if (v["Resources"] != null) {//emoji
                                    return <Image   
                                                key = {i}  
                                                style = {styles.emoji}  
                                                source={EMOJI_ENUM[v["Resources"].toLowerCase()]}  
                                              /> 
                                }  
                            })
                        }
                    </Text>
                </View>
            )
        }
        else{
            return(
                <View style={styles.bubbleView}>
                    <Text style={styles.contentText}>
                        {
                            dataArr.map((v,i)=>{
                                if (v["Content"] != null) {//文本  
                                    return <Text key={i}>{v["Content"]}</Text>
                                }else if (v["Resources"] != null) {//emoji
                                    return <Image   
                                                key = {i}  
                                                style = {styles.emoji}  
                                                source={EMOJI_ENUM[v["Resources"].toLowerCase()]}  
                                              /> 
                                }  
                            })
                        }
                    </Text>
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
    },
    emoji:{
        width:25,
        height:25,
        resizeMode:'stretch'
    }
});


