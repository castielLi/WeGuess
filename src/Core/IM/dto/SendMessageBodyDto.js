/**
 * Created by apple on 2017/8/25.
 */


//messageDto 中 Data 结构
export default class SendMessageBodyDto{
    constructor(){
       this.IsAck = true;
       this.IsOfflineSaved = false;
       this.IsHistorySaved = false;
       this.IsOfflineNotify = true;
       this.LocalTime = "";
       // this.ServerTime = "";
       this.Data = {};
    }
}