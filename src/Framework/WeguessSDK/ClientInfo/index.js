/**
 * Created by apple on 2017/7/4.
 */

import netWorking from '../../Networking/Network'
import * as URLs from './clientConfig'

const netWork = new netWorking()

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

    autoLogin(account,password){
         let params = {"username":account,"password":"111111","devicetoken":"","devicetype":"1"};
         this.network.methodPOST(URLs.client_login,params,(result)=>{
             console.log(result);
         },false);

    }
}