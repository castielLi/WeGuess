const initialState = {
    isRecordPage: false,
    isExpressionPage:false,
    isPlusPage:false,
    listScrollToEnd:false,
};
export function thouchBarStore(state = initialState,action){
	 switch (action.type) {
        case 'PRESS_RECORD':
            return {
                ...state,
                isRecordPage: !state.isRecordPage,
                isExpressionPage:false,
                isPlusPage:false,
                listScrollToEnd:false,
            };

        case 'PRESS_EXPRESSION':
            return {
                ...state,
                isRecordPage: false,
                isExpressionPage:!state.isExpressionPage,
                isPlusPage:false,
                listScrollToEnd:true,
            };

        case 'PRESS_PLUS':
            return {
                ...state,
                isRecordPage: false,
                isExpressionPage:false,
                listScrollToEnd:true,
                isPlusPage:!state.isPlusPage
            };
        case 'CHANGE_INIT':
            return {
               ...initialState
            };
        case 'FOCUS_INPUT':
            return {
                 ...state,
                isRecordPage: false,
                isExpressionPage:false,
                isPlusPage:false,
                listScrollToEnd:true,
            };
        case 'LIST_LOADMORE':
            return {
                 ...state,
                listScrollToEnd:false,
            };
        default:
            return state;
    }
}




const initialModalState = {
    isShow: false,
    urls:[],
};
export function imageModalStore(state = initialModalState,action){
     switch (action.type) {
        case 'SHOW_MODAL':
            return {
                urls:[{url:action.urls}],
                isShow:true,
            };
        case 'HIDE_MODAL':
            return {
                ...state,
                isShow:false,
            };
        default:
            return state;
    }
}