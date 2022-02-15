import EventManager from "../../../framework/manager/EventManager";
import BuildingItem from "./BuildingItem";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import { CustomEventEnum } from "../../../Constant/CustomEventEnum";
import { EventEnum } from "../../../framework/FrameWorkEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingMaterialItem extends BuildingItem {

    showBuildingDetail() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.BuildingDetailWaterwheel,
            exData: {
                buildingData: this.buildingData
            }
        })
    }
    showProductMakingView() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.BuildingDetailWaterwheel,
            exData: {
                buildingData: this.buildingData
            }
        })
    }
}