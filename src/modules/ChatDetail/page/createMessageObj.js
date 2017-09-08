import ChatCommandEnum from '../../../Core/IM/dto/ChatCommandEnum'
import MessageBodyTypeEnum from '../../../Core/IM/dto/MessageBodyTypeEnum'
import MessageCommandEnum from '../../../Core/IM/dto/MessageCommandEnum'

import SendMessageBodyDto from '../../../Core/IM/dto/SendMessageBodyDto'
import SendMessageDto from '../../../Core/IM/dto/SendMessageDto'
import messageBodyChatDto from '../../../Core/IM/dto/messageBodyChatDto'

export function createTextMessageObj(text,way,Sender,Receiver){
	    let addMessage = new SendMessageDto();
        let messageBody = new SendMessageBodyDto();
        let messageData = new messageBodyChatDto();
    
        messageData.Data = text;
        messageData.Command = ChatCommandEnum.MSG_BODY_CHAT_C2C
        messageData.Sender = Sender;
        messageData.Receiver = Receiver;
    
        messageBody.LocalTime = new Date().getTime();
        messageBody.Command = MessageBodyTypeEnum.MSG_BODY_CHAT;
        messageBody.Data = messageData;
    
    
        addMessage.Command = MessageCommandEnum.MSG_BODY;
        addMessage.Data = messageBody;
        addMessage.type = 'text';
        addMessage.way = way;
    	addMessage.Resource = null;
        return addMessage;
}

export function createResourceMessageObj(type,way,Resource,Sender,Receiver){
	    let addMessage = new SendMessageDto();
        let messageBody = new SendMessageBodyDto();
        let messageData = new messageBodyChatDto();
    
        messageData.Data = '';
        messageData.Command = ChatCommandEnum.MSG_BODY_CHAT_C2C
        messageData.Sender = Sender;
        messageData.Receiver = Receiver;
    
        messageBody.LocalTime = new Date().getTime();
        messageBody.Command = MessageBodyTypeEnum.MSG_BODY_CHAT;
        messageBody.Data = messageData;
    
    
        addMessage.Command = MessageCommandEnum.MSG_BODY;
        addMessage.Data = messageBody;
        addMessage.type = type;
        addMessage.way = way;
    	addMessage.Resource = Resource;
        return addMessage;
}