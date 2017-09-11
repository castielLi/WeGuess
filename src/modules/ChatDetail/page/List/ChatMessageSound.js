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

import Sound from 'react-native-sound';

let {width, height} = Dimensions.get('window');

export default class ChatMessageSound extends Component {
    constructor(props){
        super(props)

        this.stopSoundObj = null;
    }

    static defaultProps = {
    };

    static propTypes = {
    };

    playSound = (SoundUrl) => {
        this.stopSound(this.stopSoundObj)
        const callback = (error, sound) => {
            if(this.stopSoundObj && sound._filename == this.stopSoundObj._filename){
                this.stopSoundObj = null;
                return;
            }
            if (error) {
                Alert.alert('error', error.message);
            }
            this.stopSoundObj = sound;
            sound.play(() => {
                this.stopSoundObj = null;
                // Release when it's done so we're not using up resources
                sound.release();
            });
        };
        const sound = new Sound(SoundUrl,'', error => callback(error, sound));
    }

    stopSound = (Sound) => {
        if (!Sound) {
            return;
        }
        Sound.stop().release();
    };

    render() {
        let {data} = this.props;
        if(isMe){
            return(
                <View style={styles.bubbleViewRight}>
                    <TouchableOpacity onPress={()=>this.playSound(data.path)}>
                        <Text>播放</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View style={styles.bubbleView}>
                    <TouchableOpacity onPress={()=>this.playSound(data.path)}>
                        <Text>播放</Text>
                    </TouchableOpacity>
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
});