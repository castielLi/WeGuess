/**
 * Created by apple on 2017/8/9.
 */
import { Platform, StyleSheet } from 'react-native';
import FMDB from '../../DatabaseHelper/index'
let SQLite = require('react-native-sqlite-storage')
import * as sqls from './IMExcuteSql'
import * as commonMethods from './formatQuerySql'
import ChatWayEnum from '../dto/ChatWayEnum'
import ResourceTypeEnum from '../dto/ResourceTypeEnum'

let chatList = [];

export function storeSendMessage(message,way){

    IMFMDB.InsertMessageWithCondition(message,message.Data.Data.Receiver)
}

export function storeRecMessage(message,way){

    IMFMDB.InsertMessageWithCondition(message,message.Data.Data.Sender)
}

export function deleteClientRecode(name,chatType){
    IMFMDB.DeleteChatByClientId(name,chatType);
}

export function deleteMessage(message,chatType,client){
    IMFMDB.DeleteChatMessage(message,chatType,client);
}

export function addMessageToSendSqlite(message){
    IMFMDB.addSendMessage(message);
}

export function popMessageInSendSqlite(messageId){
    IMFMDB.popMessageInSendMessageSqlite(messageId);
}

export function getAllCurrentSendMessage(callback){
    return IMFMDB.getAllCurrentSendMessages(callback)
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
                }, (err)=>{errorDB('创建数据表',err)});
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

                    let conetnt = getContentByMessage(message);
                    updateChat(conetnt,client,tx);

                    insertChat(message,tx);

                    insertChatToSpecialRecode(message,tableName,tx);

                }else{
                    //如果当前聊天是新的聊天对象
                    let createTableSql = sqls.ExcuteIMSql.CreateChatTable;

                    let tableName = message.way == ChatWayEnum.Private?"Private_" + client:"ChatRoom_" + client;

                    createTableSql = commonMethods.sqlFormat(createTableSql,[tableName]);

                    tx.executeSql(createTableSql, [], (tx, results) => {

                        console.log("create chat table success");

                        //添加数据进数据库

                        let conetnt = getContentByMessage(message);

                        updateChat(conetnt,client,tx);

                        insertClientRecode(client,message.way,tx);

                        insertChat(message,tx);

                        insertChatToSpecialRecode(message,tableName,tx);

                        // insertIndexForTable(tableName,tx);

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

            if(chatType =="chatroom"){

                deleteClientChatList("ChatRoom_" + name, tx);
            }else {
                deleteClientChatList("Private_" + name, tx);
            }

        });
    }, errorDB);
}

//更新消息的isSend
IMFMDB.UpdateMessageStatues = function(message){

    var db = SQLite.openDatabase({
        ...databaseObj
    }, () => {
        db.transaction((tx) => {
            let updateSql = "";

            if(message.Resource!= null && message.Resource.length > 0){


                let remoteSource = "";
                for(let item in message.Resource){
                    remoteSource += message.Resource[item].RemoteSource + ",";
                }

                updateSql = sqls.ExcuteIMSql.UpdateMessageStatusAndResourceByMessageId;
                updateSql = commonMethods.sqlFormat(updateSql,[message.status,remoteSource,message.MSGID]);
            }else{
                updateSql = sqls.ExcuteIMSql.UpdateMessageStatusByMessageId;
                updateSql = commonMethods.sqlFormat(updateSql,[message.status,message.MSGID]);
            }

            tx.executeSql(updateSql, [], (tx, results) => {
                console.log("update " + message.MSGID + "is send statues:" + message.status);
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

    deleteSql = commonMethods.sqlFormat(deleteSql,[tableName,message.MSGID]);

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
IMFMDB.addSendMessage = function(message){


    var db = SQLite.openDatabase({
        ...databaseObj
    }, () => {
        db.transaction((tx) => {

            let addSql = sqls.ExcuteIMSql.AddSendMessage;

            addSql = commonMethods.sqlFormat(addSql,[message.MSGID]);

            tx.executeSql(addSql, [], (tx, results) => {

                console.log("add current send message success");

            }, errorDB);

        });
    }, errorDB);


}

IMFMDB.popMessageInSendMessageSqlite = function(messageId){
    var db = SQLite.openDatabase({
        ...databaseObj
    }, () => {
        db.transaction((tx) => {

            let deleteSql = sqls.ExcuteIMSql.DeleteSendMessageByMessageId;

            deleteSql = commonMethods.sqlFormat(deleteSql,[messageId]);

            tx.executeSql(deleteSql, [], (tx, results) => {

                console.log("已经删除current send message")

            }, errorDB);

        });
    }, errorDB);
}


//获取所有发送失败的消息
IMFMDB.getAllCurrentSendMessages = function(callback){
    var db = SQLite.openDatabase({
        ...databaseObj
    }, () => {
        db.transaction((tx) => {

            let querySql = sqls.ExcuteIMSql.GetAllSendMessages;

            tx.executeSql(querySql, [], (tx, results) => {

                callback(results.rows.raw());

                // tx.executeSql(sqls.ExcuteIMSql.DeleteAllFailedMessages, [], (tx, results) => {
                //
                //     console.log("已经删除failedmessage")
                // }, errorDB);

            }, errorDB);

        });
    }, errorDB);
}

//为Tablename的表添加索引
// function insertIndexForTable(tableName,tx){
//     let insertSql = sqls.ExcuteIMSql.CreateChatTableIndex;
//
//     insertSql = commonMethods.sqlFormat(insertSql,[tableName]);
//
//     tx.executeSql(insertSql, [], (tx, results) => {
//
//         console.log("insert index success for" + tableName);
//
//     }, (err)=>{errorDB('向'+tableName + "添加索引",err)
//     });
// }

//添加消息进总消息表
function insertChat(message,tx){
    let insertSql = sqls.ExcuteIMSql.InsertMessageToRecode;

    let localPath = "";
    if(message.Resource!= null && message.Resource.length > 0) {
        for (let item in message.Resource) {
            localPath += message.Resource[item].LocalSource + ",";
        }
    }else{
        localPath = " ";
    }
    let url = " ";

    insertSql = commonMethods.sqlFormat(insertSql,[message.MSGID,message.Data.Data.Sender,message.Data.Data.Receiver,message.Data.LocalTime,message.Data.Data.Data,message.type,localPath,url,message.status]);

    tx.executeSql(insertSql, [], (tx, results) => {

        console.log("insert meesage success");

    }, (err)=>{errorDB('向聊天对象插入详细聊天',err)});
}

//添加messageId到个人消息表
function insertChatToSpecialRecode(message,tableName,tx){
    let insertSql = sqls.ExcuteIMSql.InsertMessageToTalk;

    insertSql = commonMethods.sqlFormat(insertSql,[tableName,message.MSGID]);

    tx.executeSql(insertSql, [], (tx, results) => {

        console.log("insert meesage success");

    }, (err)=>{errorDB('向聊天对象插入详细聊天',err)});
}


//修改chat列表中最近的聊天记录
function updateChat(content,client,tx){

    let updateSql = sqls.ExcuteIMSql.UpdateChatLastContent;

    updateSql = commonMethods.sqlFormat(updateSql,[content,client]);

    tx.executeSql(updateSql, [], (tx, results) => {

        console.log("更改最近一条消息记录为");

    }, (err)=>{errorDB('为'+client+"在会话列表中更新了最新的聊天记录")
    });
}

//添加会话记录
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

function getContentByMessage(message){
    let content = "";
    if(message.Resource != null && message.Resource.length > 0 && message.Resource.length < 2){
        switch (message.Resource[0].FileType){
            case ResourceTypeEnum.Image:
                content = "[图片]";
                break;
            case ResourceTypeEnum.Audio:
                content = "[音频]";
                break;
            case ResourceTypeEnum.Video:
                content = "[视频]";
                break;
        }

    }else if(message.Resource == null){
        content = message.Data.Data.Data
    }else{
        content = "[图片]";
    }

    return content;
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





