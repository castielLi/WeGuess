/**
 * Created by apple on 2017/6/7.
 */
import { combineReducers } from 'redux';
import loginStore from '../../modules/Login/reducer';
import chatRecordStore from '../../commonReducer/index';

export default combineReducers({
    loginStore,
    chatRecordStore
});