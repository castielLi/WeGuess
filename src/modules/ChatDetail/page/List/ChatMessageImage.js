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
    TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../reducer/action'

let {width, height} = Dimensions.get('window');

class ChatMessageImage extends Component {
    constructor(props){
        super(props)

        // this.Size = {
        //     width : 0,
        //     height: 0,
        // }

        this.state = {
            Size: {
                width: 0,
                height: 0,
            }
        }
    }

    static defaultProps = {
    };

    static propTypes = {
    };

    getImageSize = (uri)=>{
        Image.getSize(uri, (w, h) => {
            // this.Size = {width,height}

            this.setState({
                Size : {width:w,height:h}
            })
            //alert(this.Size.width+"22")
        })
    }

    localSourceObj = (Source)=>{
        return {uri:Source}
    }

    render() {
        let {data} = this.props;
        let {Sender,Receiver} = data.message.Data.Data;
        let {LocalSource,RemoteSource} = data.message.Resource[0];
        //let uri = LocalSource.substr(7);


        // this.Size = Image.getSize(LocalSource, (width, height) => {
        //     return {width,height}
        // })
        this.getImageSize(LocalSource || RemoteSource)
        //alert(this.Size.width+"11")
        if(!Sender){
            return(
                <View style={styles.bubbleViewRight}>
                    <TouchableOpacity onPress={()=>this.props.showImageModal(LocalSource || RemoteSource)}>
                        <Image
                            resizeMode={Image.resizeMode.cover}
                            source={this.localSourceObj(LocalSource || RemoteSource)}
                            style={[styles.imageStyle]}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View style={styles.bubbleView}>

                        <Image
                            source={this.localSourceObj(LocalSource || RemoteSource)}
                            style={[styles.imageStyle]}
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
        //backgroundColor: '#fff',
        //maxWidth:width-150,
        //justifyContent:'center',
        //borderRadius:5
    },
    bubbleViewRight:{
        alignSelf:'flex-start',
        marginRight:10,
        //backgroundColor: '#98E165',
        //maxWidth:width-150,
        //justifyContent:'center',
        //borderRadius:5
    },
    imageStyle:{
        height:100,
        width:100,
    }
});

const mapStateToProps = state => ({
    imageModalStore: state.imageModalStore
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(Actions,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessageImage);