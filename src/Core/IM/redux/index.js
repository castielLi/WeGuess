/**
 * Created by apple on 2017/8/3.
 */
import Message from './message'

let __instance = (function () {
    let instance;
    return (newInstance) => {
        if (newInstance) instance = newInstance;
        return instance;
    }
}());

export default class ChatRedux {
    constructor() {
        if (__instance()) return __instance();

        __instance(this);
    }

    static addMessageToRudex(){

    }

    static deleteMessageToRudx(){

    }

    static
}

// {
//     // ui相关
//     ui: [
//         // ui通用：比如loading
//         common: {
//     fetching:false
// },
//     login: {
//         username: '',
//             password: '',
//             isSigned: false,
//     },
//     register: { },
//     contactInfo: { },
// ],
//     im: ,
//     // 数据实体
//     entities: {
//         roster: {
//             byName: {
//                 {
//                     jid, name, subscription, groups?
//                 }
//             },
//             names: ['lwz2'...],
//                 // 好友列表在此，因为好友列表来源于roster，息息相关
//                 friends: ,
//         },
//         // 订阅通知
//         subscribe: {
//             byFrom: {}
//         },
//         room: {},
//         group: {
//             byId: {},
//             names:
//                 },
//         members: {
//             byName: ,
//             byGroupId:
//                 }
//         blacklist: {},
//         message: {
//             byId: {}
//             chat: {
//                 [chatId]: [messageId1, messageId2]
//             },
//             groupChat: {
//                 [chatId]: {}
//             },
//         }
//     }
// }