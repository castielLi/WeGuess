/**
 * Created by apple on 2017/5/16.
 */

export function isObjectEmpty(model){
  if (typeof model === "object" && !(model instanceof Array)){
    var hasProp = false;
    for (var prop in model){
      hasProp = true;
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
