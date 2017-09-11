//用于处理聊天页面聊天记录的reducer
//state示例
// {
//     ChatRecord:{
//         status:'loading',
//         message:{
//             'li':[
//                 {
//                     MSGID:'',
//                     Command:6,//
//                     Resource:[{
//                         FileType:0,
//                         LocalSource:'',
//                         RemoteSource:'',
//                     }],
//                     Data:{
//                         IsAck :true;
//                         IsOfflineSaved :false;
//                         IsHistorySaved :false;
//                         IsOfflineNotify :true;
//                         LocalTime :"",
//                         //ServerTime :"",
//                         Data :{
//                             Command : -1,
//                             Data :"",
//                             Sender :"",
//                             Receiver :"",
//                         }
//                     },
//                     type:'',
//                     way:'',
//                     status:
//                 },{

//                 }
//             ]
//         }
//     }
// }
const initialState = {
    ChatRecord: {
        'li': []
    }
}
export default function chatRecordStore(state = initialState, action) {
    switch (action.type) {
        //第一次聊天，向聊天记录redux中添加用户标记
        case 'ADD_CLIENT':
            state.ChatRecord[action.client] = []
            return {
                ...state
            };

        case 'ADD_MESSAGE':
            state.ChatRecord[action.client].push({status:loading,message:action.message})
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