/**
 * Created by apple on 2017/6/8.
 */

import netWorking from './Network'

export default function configureNetwork(config,frameworkName,needAuth){

    netWorking.setConfig(config)
    netWorking.setNeedAuth(needAuth)
    netWorking.setUsingFramework(frameworkName)

}
