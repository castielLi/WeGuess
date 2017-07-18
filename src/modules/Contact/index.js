/**
 * Created by apple on 2017/7/17.
 */

import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';
import BaseComponent from '../../../Framework/Component'

var Contacts = require('react-native-contacts')

export default class Contact extends BaseComponent {

    render() {

        Contacts.getAll((err, contacts) => {
            if(err === 'denied'){
                // error
            } else {
                console.log(contacts);
            }
        })

        return (

            <View>
                <Text>hello contact</Text>
            </View>
        )

    }

}