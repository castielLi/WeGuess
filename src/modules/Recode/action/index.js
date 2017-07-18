/**
 * Created by apple on 2017/6/15.
 */

import FMDB from '../../../Core/DatabaseHelper'

export function storeVoiceData(path,params){
    let sql = 'insert into ChatVoice values (@a,@b,@c)';
    //format 格式 是@ 后面的 a 随便填
    FMDB.queryDatabase(sql,params);
}