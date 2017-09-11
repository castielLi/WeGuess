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