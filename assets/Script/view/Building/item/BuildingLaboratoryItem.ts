import EventManager from "../../../framework/manager/EventManager";
import BuildingItem from "./BuildingItem";
import { CustomEventEnum } from "../../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import { EventEnum } from "../../../framework/FrameWorkEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingLaboratoryItem extends BuildingItem {

    showBuildingDetail() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.FormulaView,
        })
    }
}