/**
 * Created by apple on 2017/8/10.
 */

export const InitIMTable = {
    "createChatRecodeTable":"CREATE TABLE IF NOT EXISTS ChatRecode (Client varchar(255), Type varchar(255))",
}

export const ExcuteIMSql = {
    "QueryChatIsExist":"select * from ChatRecode where client = ?",
    "GetChatList":"select client from ChatRecode",
    "InsertChatRecode":"insert into ChatRecode (Client,Type) values (?,?)",
    "CreateChatTable"
        : "CREATE TABLE IF NOT EXISTS ? (Id INTEGER PRIMARY KEY AUTOINCREMENT,Send varchar(255), Rec varchar(255) , Time varchar(255), Content varchar(255), Type varchar(255), LocalPath varchar(255), Url varchar(255) , IsSend Boolean)",
     "InsertMessageToPrivateTalk":"insert into ? (Send,Rec,Time,Content,Type,LocalPath,Url,IsSend) values (?,?,?,?,?,?,?,?)",
    "DeleteChatFromChatList":"delete from ChatRecode where client = ?",
    "DeleteChatTableByName":"delete from ?",
    "QueryChatTypeFromChatList":"select Type from ChatRecode where client = ?",
    "DeleteMessageById":"delete from ? where Id = ?",
}