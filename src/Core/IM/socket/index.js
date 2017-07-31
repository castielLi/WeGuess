/**
 * Created by apple on 2017/7/31.
 */

let __instance = (function () {
    let instance;
    return (newInstance) => {
        if (newInstance) instance = newInstance;
        return instance;
    }
}());

export default class Connect {
    constructor() {
        if (__instance()) return __instance();

        __instance(this);
    }
}