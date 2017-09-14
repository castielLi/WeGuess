export default function stringToContentArray(text) {  
    //text = "wwww[微笑]eeee[鬼脸]asdfasfasd[大笑]w222";  
    var regex = new RegExp('\\[[a-zA-Z0-9\\/\\u4e00-\\u9fa5]+\\]', 'g');  
    var contentArray = [];  
    var regArray = text.match(regex);  
    console.log(regArray);  
    if (regArray === null) {  
        contentArray.push({"Content" : text});  
        return contentArray;  
    }  
  
    var indexArray = [];  
    var pos = text.indexOf(regArray[0]);//头  
    for (let i = 1; i < regArray.length; i++) {  
        indexArray.push(pos);  
        pos = text.indexOf(regArray[i],pos + 1);  
    }  
    indexArray.push(pos);//尾  

    for (let i=0; i<indexArray.length; i++) {  
        if (indexArray[i] === 0) {//一开始就是表情  
            contentArray.push({"Resources" : regArray[i],attr: {Type:"0"}});  
        } else {  
            if (i === 0) {  
                contentArray.push({"Content" : text.substr(0,indexArray[i])});  
            } else {  
                if (indexArray[i] - indexArray[i-1] - regArray[i-1].length > 0) {//两个表情相邻，中间不加content  
                    contentArray.push({"Content" : text.substr(indexArray[i-1] + regArray[i-1].length,indexArray[i] - indexArray[i-1] - regArray[i-1].length)});  
                }  
            }  
            contentArray.push({"Resources" : regArray[i],attr: {Type:"0"}});  
        }  
    }  
  
    let lastLocation = indexArray[indexArray.length - 1] + regArray[regArray.length - 1].length;  
    if (text.length > lastLocation) {  
        contentArray.push({"Content": text.substr(lastLocation,text.length - lastLocation)});  
    }  
    return contentArray;  
}  