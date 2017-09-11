//用于处理聊天页面聊天记录的reducer
//state示例
// {
//     ChatRecord:{
//         'li':[
//             {
//             status:'loading',
//             message:{                 
//                     MSGID:'',
//                     Command:6,//
//                     Resource:[{
//                         FileType:0,//0:image、1:video、3:audio
//                         LocalSource:'',//网络路径
//                         RemoteSource:'',//本地路径
//                     }],
//             Data:{
//                 IsAck :true;
//                 IsOfflineSaved :false;
//                 IsHistorySaved :false;
//                 IsOfflineNotify :true;
//                 LocalTime :"",
//                 Command : 1,
//                 //ServerTime :"",
//                 Data :{
//                     Command : 1,
//                     Data :"",//如果非文本数据，则为空。如果是文本数据则为文本内容
//                     Sender :"",
//                     Receiver :"",
//                 }
//             },
//             type:'',//text、image
//             way:'',//privte、chatroom
//             status:''//        
//                 }
//             }
//         ]
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
            state.ChatRecord[action.client].push({status:'loading',message:action.message})
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