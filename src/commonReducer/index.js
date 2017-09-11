const initialState = {
    ChatRecord: {
        'li': []
    }
}
export default function chatRecordStore(state = initialState, action) {
    switch (action.type) {
        case 'ADD_CLIENT':
            state.ChatRecord[action.client] = []
            return {
                ...state
            };

        case 'ADD_MESSAGE':
            state.ChatRecord[action.client].push(action.message)
            return {
                ...state
            };

        case 'UPDATE_MESSAGES_STATUS':
            state.ChatRecord[action.client].forEach(function(itemArr,index,arr) {
                if(itemArr.MSGID === action.MSGID){
                    itemArr.status = action.status;
                }
            });

        case 'UPDATE_MESSAGES_REMOTESOURCE':
            state.ChatRecord[action.client].forEach(function(itemArr,index,arr) {
                if(itemArr.MSGID === action.MSGID){
                    itemArr.Resource[action.index].RemoteSource = action.RemoteSource;
                }
            });
        default:
            return state;
    }
}