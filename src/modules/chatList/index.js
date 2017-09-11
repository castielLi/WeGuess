/**
 * Created by Hsu. on 2017/8/29.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    FlatList,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

// import BubbleText from 'react-native-message-bubble';
// import IMUI from 'aurora-imui-react-native';

// import Types from '../typeConfig';

let currentObj = undefined;


let isAddHistory = false;

let {width, height} = Dimensions.get('window');

export default class Chat extends Component {
    constructor(props){
        super(props)
        // let ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> {
        //     if (r1 !== r2) {
        //         console.log("不相等");
        //         //console.log(r1);
        //         //console.log(r2);
        //     } else {
        //         console.log("相等");
        //         //console.log(r1);
        //         //console.log(r2);
        //     }
        //     return r1 !== r2;
        // }});
        this.index = 1;
        this.data = [];
        this.extraData = [];
        this.contentHeights = [];
        this.footerY = null;
        this.listHeight = null;
        this.state = {
            data: [],
            scrollItem:0,
            extraData : []
        };

        currentObj = this;
        this.renderRow = this.renderRow.bind(this);
        this.getItemLayout = this.getItemLayout.bind(this);
    }
    componentWillMount() {
        this.fetchData();
    }


    fetchData = () => {
        console.log('fetchData');
        fetch('http://gank.io/api/data/福利/10/'+this.index)
            .then((response) => response.json())
            .then((responseData) => {
                let {results} = responseData;
                this.index = this.index + 1;
                this.data = results;
                this.setState({
                    data: this.data,
                });
                //console.log(this.data);
            })
            .done();
    }
    ToCDB(str) {
        var tmp = "";
        for(var i=0;i<str.length;i++)
        {
            if(str.charCodeAt(i)>65248&&str.charCodeAt(i)<65375)
            {
                tmp += String.fromCharCode(str.charCodeAt(i)-65248);
            }
            else
            {
                tmp += String.fromCharCode(str.charCodeAt(i));
            }
        }
        return tmp
    }

    getItemLayout = (data, index) => (
        { length: this.contentHeights[index], offset: this.samOffset(index), index }
    )

    samOffset(index){
        let height = 0;
        for(let i = 0; i<index;i++){
            height += this.contentHeights[i];
        }
        console.log("高度"+height);
        return height;
    }

    renderRow = (row) => {
        console.log('执行了renderRow');
        //console.log(this.state.data.length);
        //console.log(row);
        let {index,item} = row;

        if(index == (this.state.data.length - 1)){
            console.log("last one");
            console.log(currentObj.flatList);
            if(currentObj.flatList!=undefined ) {
                if (isAddHistory) {
                    this.flatList.getNode().scrollToIndex({animated: false, index: 5});
                    isAddHistory = !isAddHistory;
                } else {
                    this.flatList.getNode().scrollToIndex({animated:false,index:(this.data.length-1)})
                }
            }
        }

        if(item.who == 'daimajia'){
            return(
                <View
                    onLayout={(event) => this.onLayout(event,row)}
                    style={styles.itemViewRight}>
                    <View style={styles.bubbleViewRight}>
                        <Text style={styles.contentText}>{this.ToCDB('阿萨阿达1261651 sdfdsasd sad算电费sd asdasd'+item.who)}</Text>
                    </View>
                    <Image source={{uri:item.url}} style={styles.userImage}/>
                </View>
            )
        }
        else{
            return(
                <View
                    onLayout={(event) => this.onLayout(event,row)}
                    style={styles.itemView}>
                    <Image source={{uri:item.url}} style={styles.userImage}/>
                    <View style={styles.bubbleView}>
                        <Text style={styles.contentText}>{this.ToCDB('阿萨阿达1261651 sdfdsasd sad算电费sd asdasd'+item.who)}</Text>
                    </View>
                </View>
            )
        }
    }

    push = () => {
        console.log('push');
        this.data.push({
                _id: "59a755a2421aa901c85e5fea",
                createdAt: "2017-08-31T08:17:38.117Z",
                desc: "8-31",
                publishedAt: "2017-08-31T08:22:07.982Z",
                source: "chrome",
                type: "\u798f\u5229",
                url: "https://ws1.sinaimg.cn/large/610dc034ly1fj2ld81qvoj20u00xm0y0.jpg",
                used: true,
                who: "daimajia"
            });
        this.setState({
            data: this.data,
        });
        isAddHistory = false;

    }
    oldMsg = () => {
        console.log('oldMsg');
        fetch('http://gank.io/api/data/福利/5/10')
            .then((response) => response.json())
            .then((responseData) => {
                let {results} = responseData;
                this.data = results.concat(this.data)
                isAddHistory = true;
                this.setState({
                    data: this.data,
                });
                //console.log(this.data);
            })
            .done();
    }


    onLayout=(event,row)=>{
        console.log('event peroperties: ', event.nativeEvent.layout);
        this.contentHeights.push({index:row.index,height:event.nativeEvent.layout.height});
    }



    render() {
        const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
        console.log(this.data)
        if(this.data.length){
            return (
                <View style={styles.chatListView}>
                    <View style={styles.container}>
                        <Text style={styles.msg}>asdsdsfsdf</Text>
                        <View style={styles.triangle}/>
                        <TouchableOpacity onPress={this.push}>
                            <View style={{width:40,height:40,backgroundColor:'red'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.oldMsg}>
                            <View style={{width:40,height:40,backgroundColor:'blue'}}/>
                        </TouchableOpacity>
                    </View>

                    <AnimatedFlatList
                        ref={(fl) => this.flatList = fl}
                        // onLayout={(event) => this.onLayout(event)}
                        data={this.state.data}
                        extraData={this.state}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index}
                        style={{paddingHorizontal:10}}
                        // getItemLayout={this.getItemLayout}



                    />
                </View>
            );
        }else{
            return(null)
        }
    }
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    msg: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#98E165',
        borderRadius: 8,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 7,
        borderRightWidth: 7,
        borderBottomWidth: 7,
        borderTopWidth: 7,
        borderLeftColor: '#98E165',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    chatListView:{
        backgroundColor:'#ddd',
        flex:1,
    },
    itemView:{
        marginBottom:10,
        flexDirection:'row',
    },
    itemViewRight:{
        marginBottom:10,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    userImage:{
        width:40,
        height:40
    },
    bubbleView:{
        alignSelf:'flex-start',
        marginLeft:10,
        backgroundColor: '#fff',
        width:width-150,
        padding:10,
        justifyContent:'center',
        borderRadius:5
    },
    bubbleViewRight:{
        alignSelf:'flex-start',
        marginRight:10,
        backgroundColor: '#98E165',
        width:width-150,
        padding:10,
        justifyContent:'center',
        borderRadius:5
    },
    contentText:{
        includeFontPadding:false,
        fontSize:16
    }
});