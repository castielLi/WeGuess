/**
 * Created by apple on 2017/8/9.
 */

import FMDB from '../../DatabaseHelper/index'
let SQLite = require('react-native-sqlite-storage')
import * as sqls from './IMExcuteSql'
import * as commonMethods from './formatQuerySql'
import ChatWayEnum from '../dto/ChatWayEnum'

let chatList = [];
export function selectAllMessage(){
    IMFMDB.SelectAll()
}
export function storeSendMessage(message){

    IMFMDB.InsertMessageWithCondition(message,message.to)
}

export function storeRecMessage(message){

}

export function deleteClientRecode(name,chatType){
    IMFMDB.DeleteChatByClientId(name,chatType);
}

export function deleteMessage(message,chatType,client){
    IMFMDB.DeleteChatMessage(message,chatType,client);
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
IMFMDB.SelectAll = function(){
     var db = SQLite.openDatabase({
            name: 'IM.db',
            createFromLocation: "1"
        }, () => {
            db.transaction((tx) => {
                

                    tx.executeSql('select * from ChatRecode', [], (tx, results) => {
                        console.log('查询ChatRecode数据表所有数据');
                        console.log(results.rows)
                    }, errorDB);
                
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
                    console.log('说话啊说话啊说话啊说话啊说话啊说话啊')
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

                            insertClientRecode(client,message.way,tx);

                            insertChat(message,tableName,tx);

                        }, errorDB);
                    }
                }, errorDB);

            });
        }, errorDB);
}

//删除当前用户的聊天记录
IMFMDB.DeleteChatByClientId = function(name,chatType){
    var db = SQLite.openDatabase({
        name: 'IM.db',
        createFromLocation: "1"
    }, () => {
        db.transaction((tx) => {

            // tx.executeSql(sqls.ExcuteIMSql.QueryChatTypeFromChatList, [name], (tx, results) => {
            //
            //     console.log(results);
            //     // chatList = results;
            //     if(results.rows.length) {
            //
            //         deleteClientRecodeByName(name,tx);

                    // if(results.rows.item(0).Type == "chatroom")
                    if(chatType =="chatroom"){

                        deleteClientChatList("ChatRoom_" + name, tx);
                    }else {
                        deleteClientChatList("Private_" + name, tx);
                    }
        //         }
        //     }, errorDB);
        //
        });
    }, errorDB);
}

//删除聊天室聊天记录
IMFMDB.DeleteChatByChatRoomId = function(chatRoom){
    var db = SQLite.openDatabase({
        name: 'IM.db',
        createFromLocation: "1"
    }, () => {
        db.transaction((tx) => {

            tx.executeSql(sqls.ExcuteIMSql.QueryChatTypeFromChatList, [client], (tx, results) => {

                console.log(results);
                // chatList = results;
                if(results.rows.length) {

                    deleteClientRecode(chatRoom);
                    deleteClientChatList("ChatRoom_" + chatRoom);
                }
            }, errorDB);

        });
    }, errorDB);
}

//删除具体消息
IMFMDB.DeleteChatMessage = function(message,chatType,client){

    let tableName = chatType=="chatroom"? "ChatRoom_"+client : "Private"+client;

    let deleteSql = sqls.ExcuteIMSql.DeleteMessageById;

    deleteSql = commonMethods.sqlFormat(deleteSql,[tableName,message.id]);

    var db = SQLite.openDatabase({
        name: 'IM.db',
        createFromLocation: "1"
    }, () => {
        db.transaction((tx) => {

            tx.executeSql(deleteSql, [], (tx, results) => {

                console.log("delete current message success");

            }, errorDB);

        });
    }, errorDB);
}

//按照需求获取当前用户的聊天记录
IMFMDB.getQueryChatListByClientId = function(){

}

//获取所有聊天用户
IMFMDB.getAllChatClientList = function(){
    var db = SQLite.openDatabase({
        name: 'IM.db',
        createFromLocation: "1"
    }, () => {
        db.transaction((tx) => {

            tx.executeSql(sqls.ExcuteIMSql.GetChatList, [], (tx, results) => {

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

function insertClientRecode(client,way,tx){
    let insertSql = sqls.ExcuteIMSql.InsertChatRecode;

    insertSql = commonMethods.sqlFormat(insertSql,[client,way]);

    tx.executeSql(insertSql, [], (tx, results) => {

        console.log("insert recode success");

    }, errorDB);
}

function deleteClientRecodeByName(name,tx){
    let deleteSql = sqls.ExcuteIMSql.DeleteChatFromChatList;

    deleteSql = commonMethods.sqlFormat(deleteSql,[name]);

    tx.executeSql(deleteSql, [], (tx, results) => {

        console.log("delete recode success");

    }, errorDB);
}

function deleteClientChatList(tableName,tx){
    let deleteSql = sqls.ExcuteIMSql.DeleteChatTableByName;

    deleteSql = commonMethods.sqlFormat(deleteSql,[tableName]);

    tx.executeSql(deleteSql, [], (tx, results) => {

        console.log("delete chat list success");

    }, errorDB);
}

function errorDB(err) {
    console.log("SQL Error: " + err);
}

function successDB() {
    console.log("open database");
}