/**
 * Created by apple on 2017/6/14.
 */
import React, {
    Component,
    PureComponent
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import {
    Worker
} from 'rn-workers'

import Sound from 'react-native-sound';
import {
    AudioRecorder,
    AudioUtils
} from 'react-native-audio';
import UUIDGenerator from 'react-native-uuid-generator';
import FileHelper from '../../../Core/Filesystem'
import TimeHelper from '../../../Core/TimeHelper'
import * as actions from '../action'

class AudioExample extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        currentTime: 0.0,
        recording: false,
        stoppedRecording: false,
        finished: false,
        audioPath: AudioUtils.CachesDirectoryPath + "/" + TimeHelper.format('yyyy-MM-dd'),
        hasPermission: undefined,
        recodeFileName: undefined
    };

    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000
        });
    }

    componentDidMount() {
        this._checkPermission().then((hasPermission) => {
            this.setState({
                hasPermission
            });

            if (!hasPermission) return;

            FileHelper.createFileIfNotExist(this.state.audioPath)

            UUIDGenerator.getRandomUUID().then((uuid) => {
                let path = this.state.audioPath + "/" + uuid + ".aac";
                this.setState({
                    recodeFileName: uuid + ".aac"
                });
                this.prepareRecordingPath(path);
            });

            // this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
                this.setState({
                    currentTime: Math.floor(data.currentTime)
                });
            };

            AudioRecorder.onFinished = (data) => {
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL);
                }
            };
        });
    }

    _checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }

        const rationale = {
            'title': 'Microphone Permission',
            'message': 'AudioExample needs access to your microphone so you can record audio.'
        };

        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
            .then((result) => {
                console.log('Permission result:', result);
                return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
            });
    }

    _renderButton(title, onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;

        return (
            <TouchableHighlight style={styles.button} onPress={onPress}>
                <Text style={style}>
                    {title}
                </Text>
            </TouchableHighlight>
        );
    }

    async _pause() {
        if (!this.state.recording) {
            console.warn('Can\'t pause, not recording!');
            return;
        }

        this.setState({
            stoppedRecording: true,
            recording: false
        });

        try {
            const filePath = await AudioRecorder.pauseRecording();

            // Pause is currently equivalent to stop on Android.
            if (Platform.OS === 'android') {
                this._finishRecording(true, filePath);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async _stop() {
        if (!this.state.recording) {
            console.warn('Can\'t stop, not recording!');
            return;
        }

        this.setState({
            stoppedRecording: true,
            recording: false
        });
        //将路径存入数据库
        actions.storeVoiceData(this.state.audioPath, [this.state.recodeFileName, '1', '2'])
        this.setState({
            recodeFileName: undefined
        });



        try {
            const filePath = await AudioRecorder.stopRecording();

            if (Platform.OS === 'android') {
                this._finishRecording(true, filePath);
            }
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }

    async _play() {
        if (this.state.recording) {
            await this._stop();
        }

        // These timeouts are a hacky workaround for some issues with react-native-sound.
        // See https://github.com/zmxv/react-native-sound/issues/89.
        setTimeout(() => {
            var sound = new Sound(this.state.audioPath, '', (error) => { //这里audioPath是文件夹的路径，所以放不出声音
                if (error) {
                    console.log('failed to load the sound', error);
                }
            });

            setTimeout(() => {
                sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }, 100);
        }, 100);
    }

    async _record() {
        if (this.state.recording) {
            console.warn('Already recording!');
            return;
        }

        if (!this.state.hasPermission) {
            console.warn('Can\'t record, no permission granted!');
            return;
        }

        if (this.state.stoppedRecording) {
            UUIDGenerator.getRandomUUID().then((uuid) => {
                let path = this.state.audioPath + "／" + uuid;
                this.prepareRecordingPath(path);
            });
        }

        this.setState({
            recording: true
        });

        try {
            const filePath = await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    }

    _finishRecording(didSucceed, filePath) {
        this.setState({
            finished: didSucceed
        });
        console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.controls}>
                    {this._renderButton("RECORD", () => {this._record()}, this.state.recording )}
                    {this._renderButton("PLAY", () => {this._play()} )}
                    {this._renderButton("STOP", () => {this._stop()} )}
                    {this._renderButton("PAUSE", () => {this._pause()} )}
                    <Text style={styles.progressText}>{this.state.currentTime}s</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b608a",
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    progressText: {
        paddingTop: 50,
        fontSize: 50,
        color: "#fff"
    },
    button: {
        padding: 20
    },
    disabledButtonText: {
        color: '#eee'
    },
    buttonText: {
        fontSize: 20,
        color: "#fff"
    },
    activeButtonText: {
        fontSize: 20,
        color: "#B81F00"
    }

});

export default AudioExample;