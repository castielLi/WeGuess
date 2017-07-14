/**
 * Created by apple on 2017/6/14.
 */

// import FileSystem from 'react-native-filesystem';
var RNFS = require('react-native-fs');

export default class FileHelper{
    static checkFileIsExist(path){
        try {
            const fileExists = RNFS.exists(path);
            // const directoryExists = RNFS.exists(path);
            // return fileExists || directoryExists;
            return fileExists;
        }catch(e){
            console.log('caught error', e);
            // Handle exceptions
        }
    }

    static createFileIfNotExist(path){
        if(FileHelper.checkFileIsExist(path)){
            createDirctoryInPath(path);
        }
        return false;
    }

}
function createDirctoryInPath(path){
    RNFS.mkdir(path)
        .then((success) => {
            return true;
        })
        .catch((err) => {
            console.log(err.message);
            return false;
        });
}