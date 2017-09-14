export function pressRecord(){
	return{
		type:'PRESS_RECORD'
	}
}
export function pressExpression(){
	return{
		type:'PRESS_EXPRESSION'
	}
}
export function pressPlus(){
	return{
		type:'PRESS_PLUS'
	}
}
export function changeThouchBarInit(){
	return{
		type:'CHANGE_INIT'
	}
}

export function focusInput(){
	return{
		type:'FOCUS_INPUT'
	}
}
export function listLoadMore(){
	return{
		type:'LIST_LOADMORE'
	}
}



export function showImageModal(urls){
	return{
		type:'SHOW_MODAL',
		urls:urls
	}
}
export function hideImageModal(){
	return{
		type:'HIDE_MODAL'
	}
}