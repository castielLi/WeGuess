/**
 * Created by apple on 2017/7/6.
 */

export function GetMirror(mirror,store){
    let mirrorModel = {};
    for(item in mirror){
        let prop = store[mirror[item]];
        if(prop != undefined){
            mirrorModel[mirror[item]] =  prop;
        }
    }
    return mirrorModel;
}