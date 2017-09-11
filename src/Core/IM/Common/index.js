/**
 * Created by apple on 2017/8/9.
 */

import network from "../../Networking/Network"
import QNY from '../../QNY'

let net = new network();
let qny = new QNY();

export function getUploadPathFromServer(fileName,index,onprogress,success){
    return qny.uploadFile(fileName,index,onprogress,success);
}
