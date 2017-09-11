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
            state.ChatRecord[action.client].push({status:"loading",message:action.message})
            return {
                ...state
            };

        case 'UPDATE_MESSAGES_STATUS':
            state.ChatRecord[action.client].forEach(function(itemArr,index,arr) {
                if(itemArr.message.MSGID === action.MSGID){
                    itemArr.message.status = action.status;
                }
            });

        case 'UPDATE_MESSAGES_REMOTESOURCE':
            state.ChatRecord[action.client].forEach(function(itemArr,index,arr) {
                if(itemArr.message.MSGID === action.MSGID){
                    itemArr.message.Resource[action.index].RemoteSource = action.RemoteSource;
                }
            });
        default:
            return state;
    }
}