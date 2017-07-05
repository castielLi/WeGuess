/**
 * Created by apple on 2017/5/16.
 */

export function isObjectEmpty(model){
  if (typeof model === "object" && !(model instanceof Array)){
    var hasProp = true;
    for (var prop in model){
      hasProp = false;
      break;
    }
    //if (!hasProp){
    //  model = [model];
    //}else{
    //  return false;
    //}
    return hasProp;
  }
}
