/**
 * Created by apple on 2017/8/11.
 */

export function sqlFormat(sql,parameters=[]){
    let currentSql = sql;
    for(let i = 0; i<parameters.length;i++){
        // parameters[i] == "" ? parameters[i] = "blank":parameters[i];
        (typeof(parameters[i])=== "boolean") ? (parameters[i] ? "true":"false"):parameters[i];
       currentSql = currentSql.replace("?", "'" + parameters[i] + "'");
    }
    return currentSql;
}

export function sqlQueueFormat(sql,queue = []){

    let currentSql = sql;
    let parameter = "";
    for(let i = 0; i<queue.length;i++){

        if(queue.length != i + 1){
            parameter +=  ("'" + queue[i] + "',");
        }else{
            parameter += ("'" + queue[i] + "'");
        }
    }

    currentSql = currentSql.replace("?", parameter);
    return currentSql;
}