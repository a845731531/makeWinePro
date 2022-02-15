

import UserDataManager from "../../data/UserDataManager";
import BaseView from "../../framework/viewbase/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WeatherView extends BaseView {

   

    initByExData(exData: any): void {
        cc.log("看下天气的数据",UserDataManager.instance.getWeatherData())
    }

    start () {

    }

    // update (dt) {}
}
