/**
 * Created by apple on 2017/8/11.
 */

export function sqlFormat(sql,parameters=[]){
    let currentSql = sql;
    for(let i = 0; i<parameters.length;i++){
        // parameters[i] == "" ? parameters[i] = "blank":parameters[i];
        typeof parameters[i] === "boolean" ? (parameters[i] ? "true":"false"):parameters[i];
       currentSql = currentSql.replace("?", "'" + parameters[i] + "'");
    }
    return currentSql;
}