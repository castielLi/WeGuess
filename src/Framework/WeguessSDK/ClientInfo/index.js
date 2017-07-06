/**
 * Created by apple on 2017/7/4.
 */

import netWorking from '../../Networking/Network'
import * as URLs from './clientApiSetting'
import FMDB from '../../../Common/DatabaseHelper'
import * as methods from '../Common'

const netWork = new netWorking()
var clientModel = {};

let __instance = (function () {
    let instance;
    return (newInstance) => {
        if (newInstance) instance = newInstance;
        return instance;
    }
}());

export default class ClientInfo {
    constructor() {
        if (__instance()) return __instance();

        __instance(this);
        this.network = netWork;
    }

    autoLogin(account,password,callback){
        //构造请求参数
         let params = {"username":account,"password":"111111","devicetoken":"","devicetype":"1"};

         const requestFinished = (result)=>{
             callback(didLoginFinished(result));
         }

         this.network.methodPOST(URLs.client_login,params,requestFinished,false);
    }

    getClientInfo(mirror){
        return methods.GetMirror(mirror,clientModel);
    }
}

//缓存client对象
function didLoginFinished(result){
    console.log(result);
    clientModel = result.Data;
    return result.Success;
}