/**
 * Created by apple on 2017/7/12.
 */

export default class BaseManager {
     showLoading(component){
         if(component.loading != undefined){
             component.loading.show();
         }
     }

     hideLoading(component){
         if(component.loading != undefined){
             component.loading.hide();
         }
     }
}