import { CustomEventEnum } from "../../../Constant/CustomEventEnum";
import { ProduceState } from "../../../Constant/GameEnum";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import BuildingDataManager from "../../../data/BuildingDataManager";
import { BuildingData } from "../../../data/DataInterface";
import UserDataManager from "../../../data/UserDataManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import { Tool } from "../../../framework/manager/Tool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingDetailPitItem extends cc.Component {
    @property(cc.Node)
    emptyNode: cc.Node = null
    @property(cc.Node)
    detailNode: cc.Node = null
    @property(cc.Node)
    selectNode: cc.Node = null
    @property(cc.Sprite)
    statusSpr: cc.Sprite = null
    @property(cc.Label)
    remainTimeLabel: cc.Label = null

    public onClickCallback: Function = null;
    private buildingData: BuildingData = null;
    
    onEnable() {
        EventManager.instance.addEventListener("StartProduceBrewBuildingCmd_SC", this.onRspStartProduce, this)
        EventManager.instance.addEventListener("GatherBrewBuildingCmd_SC", this.onRspGather, this)
        EventManager.instance.addEventListener("UpdateBrewBuildingCmd_SC", this.onNtfUpdate, this)
        EventManager.instance.addEventListener("BuildingInfoBrewBuildingCmd_SC", this.onNtfUpdate, this)
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    setIsSelected(buildingId) {
        this.selectNode.active = false
        if(this.buildingData && this.buildingData.buildingId == buildingId) {
            this.selectNode.active = true
        }
    }
    updateView(buildingData) {
        this.buildingData = buildingData
        this.unschedule(this.updateRentTime)
        if(buildingData == null) {
            this.emptyNode.active = true
            this.detailNode.active = false
            return
        }
        this.selectNode.active = false
        this.emptyNode.active = false
        this.detailNode.active = true

        this.updateProductStatus()

        let rentEndTime = this.buildingData.rentEndTime
        if(rentEndTime && rentEndTime > 0) {
            this.remainTimeLabel.node.active = true
            let curTime = UserDataManager.instance.getCurTime()
            if(rentEndTime > curTime) {
                this.schedule(this.updateRentTime, 1)
            } else { 
                this.remainTimeLabel.string = "已过期"
            }
            this.updateRentTime()
        } else {
            this.remainTimeLabel.node.active = false
        }
    }
    updateProductStatus() {
        let produceState = this.buildingData.produceState || ProduceState.Idle
        if(produceState == ProduceState.Idle) {
            this.statusSpr.node.active = false
        } else {
            this.statusSpr.node.active = true
            let curTime = UserDataManager.instance.getCurTime()
            let produceEndTime = this.buildingData.produceEndTime
            if(produceState == ProduceState.Finished || curTime >= produceEndTime) {
                Tool.loadSpriteFrame("texture/building/pit_status_2", this.statusSpr)
            } else {
                Tool.loadSpriteFrame("texture/building/pit_status_1", this.statusSpr)
            }
        }
    }
    updateRentTime() {
        let rentEndTime = this.buildingData.rentEndTime
        let curTime = UserDataManager.instance.getCurTime()
        if(rentEndTime <= curTime) {
            this.remainTimeLabel.string = "已过期"
            this.unschedule(this.updateRentTime)
        } else {
            this.remainTimeLabel.string = cc.js.formatStr("租期: %s", Tool.formatTime(rentEndTime - curTime))
        }
    }
    onClickItem() {
        if(this.buildingData == null) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.BuildingPitAdd,
            })
            EventManager.instance.dispatchEvent(CustomEventEnum.UPDATE_VIEW_VISIBLE, {
                viewName: "BuildingDetailBaseWine",
                visible: false,
            })
            return
        }
        let rentEndTime = this.buildingData.rentEndTime
        if(rentEndTime && rentEndTime > 0) {
            let curTime = UserDataManager.instance.getCurTime()
            if(rentEndTime <= curTime) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "此窖池租赁已到期"
                })
                return
            }
        }
        if(this.onClickCallback) {
            this.onClickCallback(this.buildingData.buildingId)
        }
    }
    onRspStartProduce(eventData) {
        if (!eventData.building_data) {
            return
        }
        if (!this.buildingData) {
            return
        }
        if (eventData.building_data.building_id != this.buildingData.buildingType || 
            eventData.building_data.building_index != this.buildingData.buildingIndex) {
            return
        }
        this.buildingData = BuildingDataManager.instance.getBuildingDataById(this.buildingData.buildingId)
        this.updateProductStatus()
    }
    onRspGather(eventData) {
        if (!this.buildingData) {
            return
        }
        if (eventData.building_data.building_id != this.buildingData.buildingType || 
            eventData.building_data.building_index != this.buildingData.buildingIndex) {
            return
        }
        this.buildingData = BuildingDataManager.instance.getBuildingDataById(this.buildingData.buildingId)
        
        this.updateProductStatus()
    }
    onNtfUpdate(eventData) {
        if (!this.buildingData) {
            return
        }
        if (eventData.building_data.building_id != this.buildingData.buildingType || 
            eventData.building_data.building_index != this.buildingData.buildingIndex) {
            return
        }
        this.buildingData = BuildingDataManager.instance.getBuildingDataById(this.buildingData.buildingId)
        
        this.updateProductStatus()
    }
    
}