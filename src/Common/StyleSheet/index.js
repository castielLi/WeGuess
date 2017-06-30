/**
 * Created by apple on 2017/6/29.
 */

export default class StyleSheetHelper {
    static mergeStyleSheets(commonStyle,fileStyle){

        return Object.assign({},commonStyle,fileStyle);
    }
}