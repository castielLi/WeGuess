/**
 * Created by Hsu. on 2017/9/8.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Modal,
    Easing,
    Dimensions,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

import ImageZoom from 'react-native-image-pan-zoom';

import ZoomImage from 'react-native-zoom-image';
//import {Easing} from 'react-native'; // import Easing if you want to customize easing function

import ImageViewer from 'react-native-image-zoom-viewer';

const images = [{
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}, {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}, {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}]

const uri = 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460';

export default class Ces extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uri : props.uri,
            isShow : props.isShow,
        }
    }
    componentWillReceiveProps(newProps){
        this.setState({
            uri : newProps.uri,
            isShow : newProps.isShow,
        });
    }

    // shouldComponentUpdate(newProps,nextState){
    //     if(newProps.isShow == this.props.isShow){
    //         return false
    //     }
    //     return true;
    // }

    modalClose = ()=>{
        this.setState({
            isShow : false,
        })
    }
    render() {
        console.log(this.props)
        console.log(this.state.uri,this.state.isShow)
        return (
            <Modal onRequestClose={()=>{}} animationType={'fade'} visible={this.state.isShow}>
                <ImageViewer
                    imageUrls={[{url:this.state.uri}]} // 照片路径
                    enableImageZoom={true} // 是否开启手势缩放
                    index={0} // 初始显示第几张
                    onClick={()=>this.modalClose()}
                    //onChange={(index) => {}} // 图片切换时触发
                />
            </Modal>
        );
    }

}

/*
 * <Modal>
 <ImageViewer
 imageUrls={images} // 照片路径
 enableImageZoom={true} // 是否开启手势缩放
 index={0} // 初始显示第几张
 onChange={(index) => {}} // 图片切换时触发
 />
 </Modal>
 * */


/*
 *
 * <ZoomImage
 source={{uri: 'https://ooo.0o0.ooo/2017/03/31/58de0e9b287f6.jpg'}}
 imgStyle={{width: 250, height: 230}}
 duration={200}
 enableScaling={false}
 easingFunc={Easing.ease}
 />
 *
 * */


/*
 * <ImageZoom cropWidth={Dimensions.get('window').width}
 cropHeight={Dimensions.get('window').height}
 imageWidth={200}
 imageHeight={200}
 panToMove={true}
 >
 <Image style={{width:200, height:200}}
 source={{uri:'http://v1.qzone.cc/avatar/201407/07/00/24/53b9782c444ca987.jpg!200x200.jpg'}}/>
 </ImageZoom>
 * */