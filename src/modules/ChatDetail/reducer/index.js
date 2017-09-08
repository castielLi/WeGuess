const initialState = {
    isRecordPage: false,
    isExpressionPage:false,
    isPlusPage:false,
    listScrollToEnd:false,
    inputHeight:0,
    sendMessage:{}
};
export default function thouchBarStore(state = initialState,action){
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
        case 'CHANGE_INPUTHEIGHT':
            return {
                ...state,
                inputHeight:action.height
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