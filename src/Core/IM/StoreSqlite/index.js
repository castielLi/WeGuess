/**
 * Created by apple on 2017/8/9.
 */

import FMDB from '../../DatabaseHelper/index'
let SQLite = require('react-native-sqlite-storage')
import * as sqls from './IMExcuteSql'

let chatList = [];

export function storeSendMessage(message){

    IMFMDB.InsertMessageWithCondition(message)
}

export function storeRecMessage(message){


}

export function initIMDatabase(){
    IMFMDB.initIMDataBase();
    // IMFMDB.getAllChatList();
}


let IMFMDB = {};
IMFMDB.initIMDataBase = function(){
        var db = SQLite.openDatabase({
            name: 'IM.db',
            createFromLocation: "1"
        }, () => {
            db.transaction((tx) => {
                for (key in sqls.InitIMTable) {
                    let sql = sqls.InitIMTable[key];
                    tx.executeSql(sql, [], (tx, results) => {
                        console.log('create IM database success');
                    }, errorDB);
                }
            });
        }, errorDB);
    }

//todo：想办法进行批量操作
IMFMDB.InsertMessageWithCondition = function(message){

        let checkChatExist = sqls.ExcuteIMSql["QueryChatIsExist"];

        let client = "hello";

        var db = SQLite.openDatabase({
            name: 'IM.db',
            createFromLocation: "1"
        }, () => {
            db.transaction((tx) => {

                tx.executeSql(checkChatExist, [client], (tx, results) => {

                    console.log(JSON.stringify(results.rows.item(0)));

                }, errorDB);

            });
        }, errorDB);
}

IMFMDB.DeleteChatByClientId = function(){

}

IMFMDB.getQueryChatListByClientId = function(){

}

IMFMDB.getAllChatClientList = function(){
    var db = SQLite.openDatabase({
        name: 'IM.db',
        createFromLocation: "1"
    }, () => {
        db.transaction((tx) => {

            tx.executeSql(sqls.GetChatList, [], (tx, results) => {

                console.log(results);
                chatList = results;

            }, errorDB);

        });
    }, errorDB);
}

function errorDB(err) {
    console.log("SQL Error: " + err);
}

function successDB() {
    console.log("open database");
}