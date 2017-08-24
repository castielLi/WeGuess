/**
 * Created by apple on 2017/8/10.
 */

export const InitIMTable = {
    "createChatRecodeTable":"CREATE TABLE IF NOT EXISTS ChatRecode (Client varchar(255), Type varchar(255))",
    "CreateSendFailMessageTable":"CREATE TABLE IF NOT EXISTS FailMessageRecode (Id INTEGER PRIMARY KEY AUTOINCREMENT,messageId varchat(255),send varchar(255), rec varchar(255) , time varchar(255), content varchar(255), type varchar(255), localPath varchar(255), url varchar(255))",
}

export const ExcuteIMSql = {
    "QueryChatIsExist":"select * from ChatRecode where client = ?",
    "GetChatList":"select client from ChatRecode",
    "InsertChatRecode":"insert into ChatRecode (Client,Type) values (?,?)",
    "CreateChatTable"
        : "CREATE TABLE IF NOT EXISTS ? (Id INTEGER PRIMARY KEY AUTOINCREMENT,messageId varchat(255),send varchar(255), rec varchar(255) , time varchar(255), content varchar(255), type varchar(255), localPath varchar(255), url varchar(255) , status varchar(255))",
    "InsertMessageToTalk":"insert into ? (messageId,send,rec,time,content,type,localPath,url,status) values (?,?,?,?,?,?,?,?,?)",
    "DeleteChatFromChatList":"delete from ChatRecode where client = ?",
    "DeleteChatTableByName":"delete from ?",
    "CreateChatTableIndex":"CREATE INDEX index_id ON ?(messageId)",
    "QueryChatTypeFromChatList":"select Type from ChatRecode where client = ?",
    "DeleteMessageById":"delete from ? where Id = ?",
    "UpdateMessageStatusByMessageId":"update ? set status=? where messageId = ?",
    "AddFailedMessage":"insert into FailMessageRecode (messageId,send,rec,time,content,type,localPath,url) values (?,?,?,?,?,?,?,?)",
    "GetAllFailedMessages":"select * from FailMessageRecode",
    "DeleteAllFailedMessages":"delete from FailMessageRecode",
}