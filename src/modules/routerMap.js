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
import Login from './Login/page/login'
import MainTabbar from './MainTabbar/page/mainTabbar'
import AudioExample from './Recode/page/index'
import Xmpp from './Xmpp/page/index'
import XmppMain from './Xmpp/page/xmpp'
import TestRefresh from './testRefresh'
import Main from './Main/page/main.js'
import Contact from './Contact'
import Camera from './Camera'
import Chat from './chatList'
import Thouch from './enterTool/thouch'
import ChatDetail from './ChatDetail/page/index';

export const MainPage = {
    key: 'MainTabbar',
    routeId: 'MainTabbar'
}


export const InitialRoute = {
    key: 'Root',
    routeId: 'Root'
}

export const RouteMap = {
    'Root': {
        'Root': {
            component: Main,
            params: {}
        }
    },
    'MainTabbar': {
        'TabOne': {
            component: AudioExample,
            params: {}
        },
        'TabTwo': {
            component: Xmpp,
            params: {}
        }
    },
    'Xmpp': {
        'Xmpp': {
            component: XmppMain,
            params: {}
        },
        'Login': {
            component: Login,
            params: {}
        },
        'TestRefresh': {
            component: TestRefresh,
            params: {}
        }
    },
    'Login': {
        'Login': {
            component: Login,
            params: {}
        }
    },
    'TestRefresh': {
        'TestRefresh': {
            component: TestRefresh,
            params: {}
        }
    },
    'Main': {
        'Main': {
            component: Main,
            params: {}
        }
    },
	'Contact': {
        'Contact': {
            component: Contact,
            params: {}
        }
    },
    'Camera':{
        'Camera':{
            component:Camera,
            parames:{}
        }
    },
    "Chat":{
        "Chat":{
            component:Chat,
            parames:{}
        }
    },
    "EnterTool":{
        "EnterTool":{
            component:Thouch,
            parames:{}
        }
    },
    "ChatDetail":{
        "ChatDetail":{
            component:ChatDetail,
            parames:{}
        }
    },
};


// 'module/login': {component: Login, params: {}},
// 'module/maintabbar':{component:MainTabbar,params:{}},
// 'module/recode': {component: AudioExample, params: {}},
// 'module/xmpp': {component: Xmpp, params: {}},