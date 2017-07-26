/**
 * Created by apple on 2017/6/8.
 */
import  * as config from './NetworkConfig'
import  * as commons from '../Helper/index'
import 'whatwg-fetch'

function initRequestObject(headers,Method,params){
    let requestObject = Object.assign({},{ method : Method ,
        body: commons.isObjectEmpty(params)? "":JSON.stringify(params)})

    if(!commons.isObjectEmpty(headers)){
        return editHttpHeaders(requestObject,headers)
    }
    return requestObject;
}

function editHttpHeaders(requestObject,headers){
    headers = Object.assign({},headers,{"Accept": "application/json"});
    Object.assign(requestObject,{"headers":headers});
    return requestObject;
}

function promiseRequest(requestURL,requestObject,callback){
    let promise = Promise.race([
    	//发送请求
        fetch( config.baseURL + requestURL, requestObject )
            ,
        //请求超时
        new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Error('request timeout')), config.timeOut)
        })
    ])
    promise.then(response =>{
        callback(response,null)
    })
    promise.catch(error => {
        callback(null,error)
    })
}


export function httpRequestGET(requestURL,headers={},callback){
    let requestObject = initRequestObject(headers,"GET",{},callback)
    promiseRequest(requestURL,requestObject,callback);
}

export function httpRequestPOST(requestURL,params,headers={},callback){
    let requestObject= initRequestObject(headers,"POST",params,callback)
    promiseRequest(requestURL,requestObject,callback);
}