/**
 * Created by apple on 2017/6/6.
 */
'use strict';

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import Root from './root'
import configureStore from './store'

let store = configureStore();


export default class App extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: true,
            store: configureStore(()=>{this.setState({isLoading: false})})
        }
    }

    render() {
        if(this.state.isLoading){
            console.log('loading app');
        }

        return (<Provider store={this.state.store}>
          <Root/>
        </Provider>)
    }
}
