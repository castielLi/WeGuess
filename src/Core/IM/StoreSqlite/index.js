/**
 * Created by apple on 2017/8/9.
 */
import { Platform, StyleSheet } from 'react-native';
import FMDB from '../../DatabaseHelper/index'
let SQLite = require('react-native-sqlite-storage')
import * as sqls from './IMExcuteSql'
import * as commonMethods from './formatQuerySql'
import ChatWayEnum from '../dto/ChatWayEnum'

let chatList = [];

export function storeSendMessage(message){

    IMFMDB.InsertMessageWithCondition(message,message.rec)
}

export function storeRecMessage(message){

    IMFMDB.InsertMessageWithCondition(message,message.send)
}

export function deleteClientRecode(name,chatType){
    IMFMDB.DeleteChatByClientId(name,chatType);
}

export function deleteMessage(message,chatType,client){
    IMFMDB.DeleteChatMessage(message,chatType,client);
}

export function addFailedSendMessage(message){
    IMFMDB.addFailedMessage(message);
}

export function getAllFailedSendMessage(callback){
    return IMFMDB.getAllFailedMessages(callback)
}

export function updateMessageStatus(message) {
    IMFMDB.UpdateMessageStatues(message)
}


export function initIMDatabase(){
    IMFMDB.initIMDataBase();
    // IMFMDB.getAllChatList();
}

var databaseObj = {
    name :"IM.db",//数据库文件
}
if(Platform.OS === 'ios'){
    databaseObj.createFromLocation='1'
}

let IMFMDB = {};
IMFMDB.initIMDataBase = function(){
    var db = SQLite.openDatabase({
        ...databaseObj

    }, () => {
        db.transaction((tx) => {
            for (key in sqls.InitIMTable) {
                let sql = sqls.InitIMTable[key];
                tx.executeSql(sql, [], (tx, results) => {
                    console.log('create IM database success');
                }, (err)=>{errorDB('创建数据数据表',err)});
            }
        });
    }, (err)=>{errorDB('初始化数据库',err)});
}

//todo：想办法进行批量操作
IMFMDB.InsertMessageWithCondition = function(message,client){

    let checkChatExist = sqls.ExcuteIMSql.QueryChatIsExist;

    var db = SQLite.openDatabase({
        ...databaseObj
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

                    tx.executeSql(createTableSql, [], (tx, results) => {

                        console.log("create chat table success");

                        //添加数据进数据库

                        insertIndexForTable(tableName,tx);

                        insertClientRecode(client,message.way,tx);

                        insertChat(message,tableName,tx);

                    }, (err)=>{errorDB('创建新聊天对象表',err)});
                }
            }, (err)=>{errorDB('查询所有聊天对象',err)});

        });
    }, (err)=>{errorDB('初始化数据库',err)});
}

//删除当前用户的聊天记录
IMFMDB.DeleteChatByClientId = function(name,chatType){
    var db = SQLite.openDatabase({
        ...databaseObj
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

//更新消息的isSend
IMFMDB.UpdateMessageStatues = function(message){

    var db = SQLite.openDatabase({
        ...databaseObj
    }, () => {
        db.transaction((tx) => {
            let tableName = "";
            let client = InterceptionClientFromId(message.messageId);
            //假设默认为聊天室


            if(message.way == ChatWayEnum.ChatRoom){
                 tableName = "ChatRoom_"+client;
            }else{
                tableName = "Private_"+client;
            }

            let updateSql = sqls.ExcuteIMSql.UpdateMessageStatusByMessageId;
            updateSql = commonMethods.sqlFormat(updateSql,[tableName,message.status,message.messageId]);
            tx.executeSql(updateSql, [], (tx, results) => {
                console.log("update " + message.messageId + "is send statues:" + message.status);
            }, (err)=>{errorDB('更新消息状态',err)});

        });
    }, (err)=>{errorDB('初始化数据库',err)});
}

//删除聊天室聊天记录
IMFMDB.DeleteChatByChatRoomId = function(chatRoom){
    var db = SQLite.openDatabase({
        ...databaseObj
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
        ...databaseObj
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
        ...databaseObj
    }, () => {
        db.transaction((tx) => {

            tx.executeSql(sqls.ExcuteIMSql.GetChatList, [], (tx, results) => {

                console.log(results);
                chatList = results;

            }, errorDB);

        });
    }, errorDB);
}

//添加发送失败的消息进数据库
IMFMDB.addFailedMessage = function(message){


    var db = SQLite.openDatabase({
        ...databaseObj
    }, () => {
        db.transaction((tx) => {

            let addSql = sqls.ExcuteIMSql.AddFailedMessage;

            addSql = commonMethods.sqlFormat(addSql,[message.messageId,message.rec,message.send,message.time,message.content,message.type,message.localPath,message.url]);

            tx.executeSql(addSql, [], (tx, results) => {

                console.log("add failed message success");

            }, errorDB);

        });
    }, errorDB);


}

//获取所有发送失败的消息
IMFMDB.getAllFailedMessages = function(callback){
    var db = SQLite.openDatabase({
        ...databaseObj
    }, () => {
        db.transaction((tx) => {

            let querySql = sqls.ExcuteIMSql.GetAllFailedMessages;

            tx.executeSql(querySql, [], (tx, results) => {

                callback(results.rows.raw());

                tx.executeSql(sqls.ExcuteIMSql.DeleteAllFailedMessages, [], (tx, results) => {

                    console.log("已经删除failedmessage")
                }, errorDB);

            }, errorDB);

        });
    }, errorDB);
}

function insertIndexForTable(tableName,tx){
    let insertSql = sqls.ExcuteIMSql.CreateChatTableIndex;

    insertSql = commonMethods.sqlFormat(insertSql,[tableName]);

    tx.executeSql(insertSql, [], (tx, results) => {

        console.log("insert index success for" + tableName);

    }, (err)=>{errorDB('向'+tableName + "添加索引",err)
    });
}

function insertChat(message,tableName,tx){
    let insertSql = sqls.ExcuteIMSql.InsertMessageToTalk;

    insertSql = commonMethods.sqlFormat(insertSql,[tableName,message.messageId,message.rec,message.send,message.time,message.content,message.type,message.localPath,message.url,message.status]);

    tx.executeSql(insertSql, [], (tx, results) => {

        console.log("insert meesage success");

    }, (err)=>{errorDB('向聊天对象插入详细聊天',err)});
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

//从id截取用户名
function InterceptionClientFromId(str){
    let client = '';
    client = str.slice(0,str.indexOf('_'));
    return client;
}
//从表名截取用户名
function InterceptionClientFromTable(str){
    let client = '';
    client = str.slice(str.indexOf('_')+1);
    return client;
}
function errorDB(type,err) {
    console.log("SQL Error: " +type,err);
}

function successDB() {
    console.log("open database");
}