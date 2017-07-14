/**
 * Created by apple on 2017/6/14.
 */


// export const createVoiceTable = 'CREATE TABLE IF NOT EXISTS ChatVoice (Path varchar(255), FromUser varchar(255), ToUser varchar(255))'


export const initTables = {
    "createVoiceTable":'CREATE TABLE IF NOT EXISTS ChatVoice (Path varchar(255), FromUser varchar(255), ToUser varchar(255))',
    "createVoiceUser":'CREATE TABLE IF NOT EXISTS UserTable (FirstName varchar(255), LastName varchar(255))'
}