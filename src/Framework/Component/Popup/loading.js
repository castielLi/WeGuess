/**
 * Created by apple on 2017/7/11.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    Text,
    View
} from 'react-native';
var Dimensions = require('Dimensions');
export default class Loading extends Component {

    constructor(props, context) {

        super(props, context);

        this.state = {
            isVisible: false
        };
    }

    show(){

        this.setState({
            isVisible: true,
        });
    };

    hide(){

        this.setState({
            isVisible: true,
        });
    };

    render() {
        let { isVisible } = this.state;
        if(isVisible) {
            return (
                <View style={styles.loadingContainer}>
                    <View style={styles.loading}>
                    <ActivityIndicator
                        size="large"
                        color="black"
                    />
                    </View>
                </View>
            );
        }
        return <View style={styles.hidden}/>;
    }
}
const styles = StyleSheet.create({
    loadingContainer: {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:'rgba(0,0,0,0.3)',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute'
    },
    loading:{
        backgroundColor:'white',
        height:90,
        width:90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
    },
    hidden: {
        position: 'absolute',
        height: 0,
        width: 0,
        top: 0,
        left: 0,
    }
});