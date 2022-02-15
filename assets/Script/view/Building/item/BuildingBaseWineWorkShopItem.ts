import { NetMsgDef } from "../../../../resources/pb/NetMsgDef";
import PropConfig from "../../../config/PropConfig";
import { BuildingType, ItemType, ProduceState } from "../../../Constant/GameEnum";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import BagDataManager from "../../../data/BagDataManager";
import BuildingDataManager from "../../../data/BuildingDataManager";
import UserDataManager from "../../../data/UserDataManager";
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import { Tool } from "../../../framework/manager/Tool";
import BuildingWorkShopItem from "./BuildingWorkShopItem";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingBaseWineWorkShopItem extends BuildingWorkShopItem {
    onEnable() {
        EventManager.instance.addEventListener("UpdateBrewBuildingCmd_SC", this.onNtfUpdate, this)
        EventManager.instance.addEventListener("BuildingInfoBrewBuildingCmd_SC", this.onNtfUpdate, this)
        super.onEnable()
    }
    updateView() {
        if (this.buildingData == null) {
            this.node.active = false;
            return;
        }
        let buildingList = BuildingDataManager.instance.getBuildingListByType(BuildingType.JiaoChi)
        buildingList.sort((first, second) => {
            if(first.produceState != second.produceState) {
                return second.produceState - first.produceState
            } else if(first.produceState == ProduceState.Working) {
                return first.produceEndTime - second.produceEndTime
            } else {
                return first.buildingIndex - second.buildingIndex
            }
        })
        let itemBuilding = buildingList[0]
        if(itemBuilding) {
            this.itemInfo && (this.itemInfo.updateView(itemBuilding))
        }
    }
    onRspStartProduce(eventData) {
        if (!eventData.building_data || eventData.building_data.building_id != BuildingType.JiaoChi) {
            return
        }
        this.updateView()
    }
    onRspGather(eventData) {
        if (!eventData.building_data || eventData.building_data.building_id != BuildingType.JiaoChi) {
            return
        }
        this.updateView()
    }
    onNtfUpdate(eventData) {
        if (!eventData.building_data || eventData.building_data.building_id != BuildingType.JiaoChi) {
            return
        }
        this.updateView()
    }
    onRspSpeedUp(eventData) {
        if(eventData.error_code) {
            return
        }
        if (!eventData.building_data || eventData.building_data.building_id != BuildingType.JiaoChi) {
            return
        }
        this.updateView()
    }
}