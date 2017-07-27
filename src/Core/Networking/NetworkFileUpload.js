
import config from "./NetworkConfig"

export function uploadFile(uri, token, formInput, onprogress) {
    return new Promise((resolve, reject)=> {
        if (typeof uri != 'string' || uri == '' || typeof formInput.key == 'undefined') {
            reject && reject(null);
            return;
        }
        if (uri[0] == '/') {
            uri = "file://" + uri;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('POST', SOUTH_CHINA_HTTP_UPLOAD_CLIENT);
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

export class ImageView {
    constructor(mode, width, height, quality, format) {
        this.mode = mode || 1;
        this.width = width || 0;
        this.height = height || 0;
        this.quality = quality || 0;
        this.format = format || null;
    }

    makeRequest(url) {
        url += '?imageView2/' + this.mode;

        if (this.width > 0) {
            url += '/w/' + this.width;
        }

        if (this.height > 0) {
            url += '/h/' + this.height;
        }

        if (this.quality > 0) {
            url += '/q/' + this.quality;
        }

        if (this.format) {
            url += '/format/' + this.format;
        }

        return url;
    }
}

export class ImageInfo {
    static makeRequest(url) {
        return url + '?imageInfo'
    }
}

export class Exif {
   static makeRequest(url) {
        return url + '?exif'
    }
}