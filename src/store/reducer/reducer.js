/**
 * Created by apple on 2017/6/7.
 */
import { combineReducers } from 'redux';
import loginStore from '../../modules/Login/reducer';
import chatRecordStore from '../../Core/IM/redux/index';
import {thouchBarStore,imageModalStore} from '../../modules/ChatDetail/reducer/index';
export default combineReducers({
    loginStore,
    chatRecordStore,
    //聊天栏状态
    thouchBarStore,
    //大图展示状态
    imageModalStore,

});