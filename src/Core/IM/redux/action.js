export function addClient(client){
	return{
		type:'ADD_CLIENT',
		client
	}
}
export function addMessage(client,message){
	return{
		type:'ADD_MESSAGE',
		client,
		message
	}
}
export function updateMessageStatus(MSGID,status){
	return{
		type:'UPDATE_MESSAGES_STATUS',
		client:InterceptionClientFromId(MSGID),
		MSGID,
		status
	}
}
export function updateMessageRemoteSource(MSGID,index,RemoteSource){
	return{
		type:'UPDATE_MESSAGES_REMOTESOURCE',
		client:InterceptionClientFromId(MSGID),
		MSGID,
		index,
		RemoteSource,

	}
}


//从id截取用户名
function InterceptionClientFromId(str){
    let client = '';
    client = str.slice(0,str.indexOf('_'));
    return client;
}