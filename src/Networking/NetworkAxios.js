/**
 * Created by apple on 2017/5/16.
 */
import  * as config from './NetworkConfig'
import VueResource from 'axios'
import Vue from 'vue'
import * as commons from './Common'
import Qs from 'qs'
Vue.use(VueResource)

function initHttpInstance(headers){
  let axios = VueResource.create({
    baseURL:config.baseURL,
    timeout:config.timeOut

  })
  if(!commons.isObjectEmpty(headers)){
      return editHttpHeaders(axios,headers)
  }
  return axios;
}

function editHttpHeaders(axios,headers){
  for(let item in config){
      Object.assign(axios.defaults,{headers:{ item: config[item]}})
  }
  return axios
}


export function httpRequestGET(requestURL,headers={},callback){
  let axios = initHttpInstance(headers)
  axios.get(requestURL).then(function(result){
    callback(result,null)
  }).catch(function(err){
    callback(null,err)
  });
}

export function httpRequestPOST(requestURL,params,headers={},callback){
  let axios = initHttpInstance(headers)
  var data = Qs.stringify(params);

  axios.post(requestURL,data).then(function(result){
    callback(result,null)
  }).catch(function(err){
    callback(null,err)
  });

}


