//向chatRecordStore增加新的聊天对象
export function addClient(client){
	return{
		type:'ADD_CLIENT',
		client
	}
}
//向chatRecordStore中某确定的聊天对象添加 一条消息
export function addMessage(client,message){
	return{
		type:'ADD_MESSAGE',
		client,
		message
	}
}
//修改某条消息的状态 {status:'修改该状态',message:{...}}
export function updateMessageStatus(status,MSGID){
	return{
		type:'UPDATE_MESSAGES_STATUS',
		client:InterceptionClientFromId(MSGID),
		MSGID,
		status
	}
}
//修改某条消息的网络路径
export function updateMessage(message){
	return{
		type:'UPDATE_MESSAGES',
		message,
		client:InterceptionClientFromId(message.MSGID),
		MSGID:message.MSGID,
	}
}


//从id截取用户名
function InterceptionClientFromId(str){
    let client = '';
    client = str.slice(0,str.indexOf('_'));
    return client;
}