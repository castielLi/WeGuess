/**
 * Created by apple on 2017/8/25.
 */

//发送消息最外层中resource item结构
export default class SendMessageDto{
    constructor(){
        this.FileType = 0;
        this.LocalSource = "";
        this.RemoteSource = [];
    }
}