import {
  Platform,
  PermissionsAndroid
} from 'react-native';
import Sound from 'react-native-sound';
import {
  AudioRecorder,
  AudioUtils
} from 'react-native-audio';

console.log(AudioUtils.DocumentDirectoryPath) ///data/data/com.weixinrecord/files

export default class Audio {
  constructor(name, fileName) {
    this.state = {
      currentTime: 0.0,
      recording: false,
      finished: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/audio/' + name + '/' + fileName+'.aac',
      hasPermission: undefined,
    };

    this.prepareRecordingPath = this.prepareRecordingPath.bind(this); //执行录音的方法
    this._checkPermission = this._checkPermission.bind(this); //检测是否授权
    this._record = this._record.bind(this); //录音
    this._stop = this._stop.bind(this); //停止
    this._finishRecording = this._finishRecording.bind(this);
    this.init = this.init.bind(this);
  }



  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }

  init(fn) {
    this._checkPermission().then((hasPermission) => {
      this.state.hasPermission = hasPermission;
      if (!hasPermission) return;
      console.log('audioPath:', this.state.audioPath);
      this.prepareRecordingPath(this.state.audioPath);
      //录音过程中，每秒触发一次，回调函数参数data 是一个对象{currentTime:已经记录的秒数}
      AudioRecorder.onProgress = (data) => {
        this.state.currentTime = Math.floor(data.currentTime)
      };
      //停止录音时触发,ios下回调函数参数data是一个对象,android下data为空
      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === "OK", data.audioFileURL);
        }
      };
      fn();
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

  async _stop(fn) {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.state.recording = false;
    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
      fn&&fn();
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  _record() {
    var record = async function() {
      if (this.state.recording) {
        console.warn('Already recording!');
        return;
      }

      if (!this.state.hasPermission) {
        console.warn('Can\'t record, no permission granted!');
        return;
      }


      this.state.recording = true;
      try {
        const filePath = await AudioRecorder.startRecording();
      } catch (error) {
        console.error(error);
      }
    }
    this.init(record.bind(this));
  }

  _finishRecording(didSucceed, filePath) {

    this.state.finished = didSucceed
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
  }
}