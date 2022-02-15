import { CustomEventEnum } from "../../../Constant/CustomEventEnum";
import { BuildingType } from "../../../Constant/GameEnum";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import BuildingItem from "./BuildingItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingWorkShopItem extends BuildingItem {

    showBuildingDetail() {        
        if(this.buildingType == BuildingType.ZhiQu) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.BuildingDetailZhiqu,
                exData: {
                    buildingData: this.buildingData
                }
            })
        } else {            
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.BuildingDetailBaseWine,
                exData: {
                    buildingData: this.buildingData
                }
            })
        }
    }
}