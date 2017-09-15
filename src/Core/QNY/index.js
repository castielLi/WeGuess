/**
 * Created by apple on 2017/7/27.
 */

import Rpc from './rpc';
import Config from './config';
import ImgOps from './imageops';

let __instance = (function() {
	let instance;
	return(newInstance) => {
		if(newInstance) instance = newInstance;
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


        //this.network.methodPOST(url,content,function(){
        //
        //      do something
        //
        // },false,{"Content-Type":"application/x-www-form-urlencoded"})
    }

    uploadFile(){

    }

    downloadFile(){

    }

    // imageSyncOperation(){
    //
    // }


	//todo:做成多张图片可以统一上传 promise.race
	uploadFile(fileUri,index, onprogress,success,error) {
		return new Promise((resolve, reject) => {
			let keys = fileUri.split("/");
			let key = keys[keys.length - 1];

			var that = this;
			fetch(Config.TOKEN_URL + key).then(response => {
				if(response.status >= 200 && response.status < 300) {
					return response
				} else {
					reject && reject(response);
				}

			}).then(response => {
				return response.json();
			}).then(response => {
				let formInput = {
					key: key,
					// formInput对象如何配置请参考七牛官方文档“直传文件”一节
				}
				Rpc.uploadFile(fileUri, response.Value, formInput, function(event, xhr) {
					onprogress(event,index);
				}).then(() => {
					let result = {
						key: key,
						url: Config.QIY_URL + key
					}
					success(result);
					resolve && resolve(index);
				}, (xhr) => {
					error(index);
					reject && reject(index);
				});
			}).catch(e => {
				error(index);
				reject && reject(index);
			});
		});
	}
	Thumbnail(orgImgUrl,width, height, quality, format) {
        let imgInfo = new ImgOps.ImageView(1, width, height, quality, format);
        let url = imgInfo.makeRequest(orgImgUrl);
        return url;
	}
	downloadFile() {

	}

	// imageSyncOperation(){
	//
	// }
}
