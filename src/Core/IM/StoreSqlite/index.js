/**
 * Created by apple on 2017/8/9.
 */

import FMDB from '../../DatabaseHelper/index'
let SQLite = require('react-native-sqlite-storage')
import * as sqls from './IMExcuteSql'
import * as commonMethods from './formatQuerySql'
import ChatWayEnum from '../dto/ChatWayEnum'

let chatList = [];

export function storeSendMessage(message){

    IMFMDB.InsertMessageWithCondition(message,message.to)
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
IMFMDB.InsertMessageWithCondition = function(message,client){

        let checkChatExist = sqls.ExcuteIMSql.QueryChatIsExist;

        var db = SQLite.openDatabase({
            name: 'IM.db',
            createFromLocation: "1"
        }, () => {
            db.transaction((tx) => {

                tx.executeSql(checkChatExist, [client], (tx, results) => {

                    if(results.rows.length){
                        //如果当前聊天对象在数据库中存在有数据
                        //添加数据进数据库

                        let tableName = message.way == ChatWayEnum.Private?"Private_" + client:"ChatRoom_" + client;

                        insertChat(message,tableName,tx);

                    }else{
                        //如果当前聊天是新的聊天对象
                        let createTableSql = sqls.ExcuteIMSql.CreateChatTable;

                        let tableName = message.way == ChatWayEnum.Private?"Private_" + client:"ChatRoom_" + client;

                        createTableSql = commonMethods.sqlFormat(createTableSql,[tableName]);

                        tx.executeSql(createTableSql, [tableName], (tx, results) => {

                            console.log("create chat table success");

                            //添加数据进数据库
                            insertChat(message,tableName,tx);

                        }, errorDB);
                    }
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

function insertChat(message,tableName,tx){
    let insertSql = sqls.ExcuteIMSql.InsertMessageToPrivateTalk;

    insertSql = commonMethods.sqlFormat(insertSql,[tableName,message.to,message.from,message.date,message.content,message.type,message.localPath,message.url,message.isSend]);

    tx.executeSql(insertSql, [], (tx, results) => {

        console.log("insert meesage success");

    }, errorDB);
}

function errorDB(err) {
    console.log("SQL Error: " + err);
}

function successDB() {
    console.log("open database");
}