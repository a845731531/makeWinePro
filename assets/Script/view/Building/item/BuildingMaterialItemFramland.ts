import EventManager from "../../../framework/manager/EventManager";
import BuildingItem from "./BuildingItem";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import { BuildingData } from "../../../data/DataInterface";
import { BuildingType } from "../../../Constant/GameEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingMaterialItem extends BuildingItem {

    public init(buildingData: BuildingData): void {
        super.init(buildingData)

        //世界农田 不隐藏图片
        if(buildingData.buildingType == BuildingType.Farm && buildingData.buildingIndex > 2)
        {
            this.iconSpr.node.opacity = 255
        }

    }

    showBuildingDetail() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.BuildingDetailFramland,
            exData: {
                buildingData: this.buildingData
            }
        })
    }
    showProductMakingView() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.BuildingDetailFramland,
            exData: {
                buildingData: this.buildingData
            }
        })
    }
}