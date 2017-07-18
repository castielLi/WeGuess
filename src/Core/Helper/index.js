/**
 * Created by apple on 2017/7/12.
 */


export function isObjectEmpty(model){
    if (typeof model === "object" && !(model instanceof Array)){
        var hasProp = true;
        for (var prop in model){
            hasProp = false;
            break;
        }
        return hasProp;
    }
}

export function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}