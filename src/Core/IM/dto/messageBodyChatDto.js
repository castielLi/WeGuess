/**
 * Created by apple on 2017/8/25.
 */

//message body chat 结构
export default class messageBodyChatDto{
    constructor(){
        this.Command = -1;
        this.Data = "";
        this.Sender = "";
        this.Receiver = "";
    }
}