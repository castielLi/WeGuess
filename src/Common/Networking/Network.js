/**
 * Created by apple on 2017/5/15.
 */
'use strict';
// import  * as methodsAxios from './NetworkAxios'
import  * as methodsFetch from './NetworkFetch'
import  * as commons from './Common'

let __instance = (function () {
  let instance;
  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance;
  }
}());


var netWorkingConfig = {}
var AuthToken = ""
var UsingFramework = ""
var NeedAuth = false;


export default class netWorking {
  constructor() {
    if (__instance()) return __instance();

    __instance(this);
  }

  static setConfig(config){
    netWorkingConfig = config
  }

  static setNeedAuth(needAuth){
     NeedAuth = needAuth;
  }

  static setUsingFramework(frameworkName){
      UsingFramework = frameworkName;
  }

  methodGET(requestURL,callback,encryption){

    setAuthToken()

    if(!encryption){
      let promise = new Promise(function(res,rej){
          gettingFrameworkMethod().httpRequestGET(requestURL,netWorkingConfig,function(result,error){

            if(result!= null && result.status == 200){
              if(NeedAuth){
                AuthToken = result.response.headers["Auth_Token"];
              }
              res(result);
            }else {
              rej(result);
            }
          })

      }).then(
        (result)=>{
            callback(result.data);
        },
        (result)=>{
            console.log(result)
        }
      )
    }
  }
  //目前有错，需要服务器端设置response的header https://segmentfault.com/q/1010000008292792
  methodPOST(requestURL,params,callback,encryption){

     setAuthToken()

     if(!encryption){

       let promise = new Promise(function(res,rej){
           gettingFrameworkMethod().httpRequestPOST(requestURL,params,netWorkingConfig,function(result,error){

            if(result!= null && result.status == 200){
             if(NeedAuth){
               AuthToken = result.response.headers["Auth_Token"];
             }
             res(result);
           }else {
             rej(result);
           }
         })

       }).then(
         (result)=>{
           callback(result.data);
         },
         (result)=>{
           console.log(result)
         }
       )
     }
  }
}

function setAuthToken(){
  if(NeedAuth) {
    Object.assign(netWorkingConfig, {'Auth-Token': AuthToken})
  }
}

function gettingFrameworkMethod(){
    if(UsingFramework === 'fetch'){
        return methodsFetch;
    }
    return methodsAxios;
}



