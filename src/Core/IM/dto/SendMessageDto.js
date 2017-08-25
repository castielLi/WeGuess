/**
 * Created by apple on 2017/8/25.
 */


//发送消息的最外层

export default class SendMessageDto{
    constructor(){
        this.MSGID = "";
        this.Command = -1;
        this.Resource = null;
        this.Data = {};
        this.type = "";
        this.way = "";
        this.status = "";
    }
}