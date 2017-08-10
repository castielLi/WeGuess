/**
 * Created by apple on 2017/8/3.
 */

export default class Message{
    constructor(type,content,statues,to,from){
        this.type = type;
        this.content = content;
        this.status = statues;
        this.to = to;
        this.from = from;
    }
}