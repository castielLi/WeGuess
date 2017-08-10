/**
 * Created by apple on 2017/8/9.
 */

import network from "../../Networking/Network"
import QNY from '../../QNY'

let net = new network();
let qny = new QNY();

export function getUploadPathFromServer(fileName,onprogress){

    net.methodPOST("",fileName,function(result){
        if(result.success){
           let uploadResult = qny.uploadFile(token,onprogress);
           uploadResult.url = result.url;
           return uploadResult;
        }
        return result;
    },false,{});
}
