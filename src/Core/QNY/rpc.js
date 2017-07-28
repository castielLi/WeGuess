
import config from "./config"

function uploadFile(uri, token, formInput, onprogress) {
    return new Promise((resolve, reject)=> {
        if (typeof uri != 'string' || uri == '' || typeof formInput.key == 'undefined') {
            reject && reject(null);
            return;
        }
        if (uri[0] == '/') {
            uri = "file://" + uri;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('POST', config.SOUTH_CHINA_HTTP_UPLOAD_CLIENT);
        xhr.onload = () => {
            if (xhr.status !== 200) {
                reject && reject(xhr);
                return;
            }

            resolve && resolve(xhr);
        };

        var formdata = new FormData();
        formdata.append("key", formInput.key);
        formdata.append("token", token);
        if (typeof formInput.type == 'undefined')
            formInput.type = 'application/octet-stream';
        if (typeof formInput.name == 'undefined') {
            var filePath = uri.split("/");
            if (filePath.length > 0)
                formInput.name = filePath[filePath.length - 1];
            else
                formInput.name = "";
        }
        formdata.append("file", {uri: uri, type: formInput.type, name: formInput.name});
        xhr.upload.onprogress = (event) => {
            onprogress && onprogress(event, xhr);
        };
        xhr.send(formdata);
    });
}


//发送管理和fop命令,总之就是不上传文件
function post(uri, adminToken, content) {
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    let payload = {
        headers: headers,
        method: 'POST',
        dataType: 'json',
        timeout: config.RPC_TIMEOUT,
    };
    if (typeof content === 'undefined') {
        payload.headers['Content-Length'] = 0;
    } else {
        //carry data
        payload.body = content;
    }

    if (adminToken) {
        headers['Authorization'] = adminToken;
    }

    return fetch(uri, payload);
}



export default {uploadFile, post}