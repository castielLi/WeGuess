/**
 * Created by apple on 2017/6/6.
 */
'use strict';

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import Root from './modules/Root/root'
import configureStore from './store'
import configureNetwork from './Networking/configureNetwork'

let store = configureStore();


export default class App extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: true,
            store: configureStore(()=>{this.setState({isLoading: false})})
        }

        //初始化app的http组件
        configureNetwork({"Content-Type":"application/json"},'fetch',false)
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
