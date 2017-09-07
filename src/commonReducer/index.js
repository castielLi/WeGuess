// const initialState = {
//     ChatRecord:{
//         'li':[{state:'loading',message:{}},{state:'loading',message:{}}...],
//         'zhang':[{state:'loading',message:{}},{state:'loading',message:{}}...],
//         ...
//     }
// }
const initialState = {
    ChatRecord:{
        'li':[{state:'loading',message:{}},{state:'loading',message:{}}]
    }
}
export default function chatRecordStore(state = initialState,action){
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

        default:
            return state;
    }
}