/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import {
//   AppRegistry,
// } from 'react-native';
//
// import App from './src/App'
//
// AppRegistry.registerComponent('WeGuess', App);

import React, { Component } from 'react';
import { Worker , WorkerService}from 'rn-workers'
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class rnapp extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            text: "",
            count: 0,
            increment: 0,
        }
    }

    componentDidMount() {
        this.worker = new Worker();
        this.worker.onmessage = message => {
            console.log("on message");
            this.setState({
                text: message,
                count: this.state.count + 1
            });
        }

        this.interval = setInterval(() => this.setState({
            increment: this.state.increment + 1
        }), 100);

        const workerService = new WorkerService();
        workerService.onmessage = message => {
            const now = Date.now();
            while (Date.now() < now + 2000);
            workerService.postMessage("Hello from the other side (" + message + ")")
        };
    }

    componentWillUnmount() {
        this.worker.terminate();
        clearInterval(this.interval)
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.worker.postMessage("" + this.state.count)}>
                    <Text style={styles.clickMe}>
                        {"Send Message (" + this.state.count + ")"}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.text}>
                    {this.state.text}
                </Text>
                {/*<Text style={styles.text}>*/}
                    {/*{"Should not freeze: " + this.state.increment}*/}
                {/*</Text>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    clickMe: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    text: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('WeGuess', () => rnapp);


