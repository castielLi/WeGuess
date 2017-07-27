/**
 * Created by apple on 2017/7/27.
 */

// import netWorking from '../Networking/Network'
import 'whatwg-fetch'

let __instance = (function () {
    let instance;
    return (newInstance) => {
        if (newInstance) instance = newInstance;
        return instance;
    }
}());


// var ACCESS_KEY = "";
// var SECRET_KEY = "";

// let _network = new netWorking();

export default class QNY {
    constructor() {
        if (__instance()) return __instance();

        __instance(this);
        // this.network = _network;
    }


    getAccessKeyAndSecretKey(){



    }

    uploadFile(){

    }

    downloadFile(){

    }

    // imageSyncOperation(){
    //
    // }
}
