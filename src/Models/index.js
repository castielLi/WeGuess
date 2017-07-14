/**
 * Created by apple on 2017/7/4.
 */

import ClientInfo from './ClientInfo/index'

const _client = new ClientInfo();

export default class WeGuessSDK {

    static clientManager(){
        return _client;
    }
}