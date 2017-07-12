# WeGuess
这是笔者第一次尝试写个应用框架，有诸多不妥的地方欢迎各位指正。

# 框架思路
如今我们的app开发迭代速度越来越快，改动也越来越多，怎么在这样的环境中减少我们的返工时的修改是笔者想解决的问题，而react-native本身的开发已经让我们
从原生app开发注重操作流程转向开始关注具体的一个component的开发，笔者也是受此启发，想让使用者只需要关注component内部应该怎么数据调用处理和展示，
其余的部分都是抛开component的外部逻辑。

# 框架依赖
whatwg-fetch , react-native-deprecated-custom-components , react-native-popup
上诉是Framework下的运用的第三方组件，其余还有组件视项目需求进行添加。

# 框架使用

网络请求初始化：
import configureNetwork from './Framework/Networking/configureNetwork'

configureNetwork({"Content-Type":"application/json"},'fetch',false)

configureNetwork({  
     //自定义设置http请求header
     headerConfig : {},
     // 'fetch' 和 'axios' 两个第三方组件，但是目前reactjs只需要赋值为'fetch'
     frameworkName : "",
     //bool类型，https请求是否需要验证
     needAuth: boolean
})

路由初始化：
import Route from './Framework/route/router'
import * as router from './modules/routerMap'

Route.initRouteMap(router);

路由是我们框架中的重中之重，我们需要创建一个routeMap.js的文件，文件内必须需要三个重要的export对象
MainPage，InitialRoute，RouteMap

//用于指定主视图
MainPage : {key:"",routeId:""}
//用于指定初始化视图
InitialRoute : {key:"",routeId:""}
MainPage : {key:"",routeId:""}
InitialRoute : {key:"",routeId:""}

//用于描述当前app中所有组件的调用关系
RouteMap: {
    "ComponentName":{
      "keyName":{component : Component, params:{}},
      "keyName":{component : Component, params:{}}
    },
    "ComponentName":{
      "keyName":{component : Component, params:{}},
      "keyName":{component : Component, params:{}}
    }
}

