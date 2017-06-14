/**
 * Created by apple on 2017/6/7.
 */

/**
 * 所有 component 整个框架内只有此处引入
 * navigator 统一进行路由显示
 * 将全部 component 的引用从老式的层级式改为统一入口的扁平式
 */
/*
 * 路由配置项
 * 可配置默认参数 props: params
 */
import Login from '../modules/Login/page/login'
import MainTabbar from '../modules/MainTabbar/page/mainTabbar'
import AudioExample from '../modules/Recode/page'

const RouteMap = {
    'module/login': {component: Login, params: {}},
    'modeule/maintabbar':{component:MainTabbar,params:{}},
    'module/recode': {component: AudioExample, params: {}},
};

export default RouteMap;