/**
 * Created by apple on 2017/9/14.
 */

import ChatCommandEnum from './ChatCommandEnum'
import MessageBodyTypeEnum from './MessageBodyTypeEnum'
import MessageCommandEnum from './MessageCommandEnum'

import SendMessageBodyDto from './SendMessageBodyDto'
import SendMessageDto from './SendMessageDto'
import messageBodyChatDto from './messageBodyChatDto'

import MessageType from './MessageType'
import ResourceTypeEnum from './ResourceTypeEnum'
import uploadResourceDto from './uploadResourceDto'


export function sqliteMessageToMessage(sqliteMessage){

    let message = new SendMessageDto();
    let messageBody = new SendMessageBodyDto();
    let messageData = new messageBodyChatDto();

    messageData.Data = sqliteMessage.content;
    messageData.Command = ChatCommandEnum.MSG_BODY_CHAT_C2C
    messageData.Sender = sqliteMessage.send;
    messageData.Receiver = sqliteMessage.rec;

    messageBody.LocalTime = new Date().getTime();
    messageBody.Command = MessageBodyTypeEnum.MSG_BODY_CHAT;
    messageBody.Data = messageData;

    message.Command = MessageCommandEnum.MSG_BODY;
    message.Data = messageBody;
    message.MSGID = sqliteMessage.messageId;

    if(sqliteMessage.type != MessageType.image){
         message.type = "image"
         let file = new uploadResourceDto()
         file.type = ResourceTypeEnum.Image;
         file.LocalSource =  message.localPath;
         message.Resource = [file];
    }else{
        message.type = "text"
    }
    return message;
}