/**
 * Created by apple on 2017/6/14.
 */

import FileSystem from 'react-native-filesystem';

export default class FileHelper{
    static checkFileIsExist(path){
        try {
            const fileExists =
            FileSystem.fileExists(path);
            const directoryExists =
            FileSystem.directoryExists(path);

            return fileExists || directoryExists;

        }catch(e){
            console.log('caught error', e);
            // Handle exceptions
        }
    }
}