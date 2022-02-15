import { CustomEventEnum } from "../../../Constant/CustomEventEnum";
import { BuildingType, ProduceState } from "../../../Constant/GameEnum";
import BuildingDataManager from "../../../data/BuildingDataManager";
import { BuildingData } from "../../../data/DataInterface";
import UserDataManager from "../../../data/UserDataManager";
import EventManager from "../../../framework/manager/EventManager";
import BaseView from "../../../framework/viewbase/BaseView";
import BuildingMakingView from "../base/BuildingMakingView";
import BuildingProduceView from "../base/BuildingProduceView";
import BuildingDetailPitItem from "./BuildingDetailPitItem";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingProduceTab extends BaseView {
    @property(cc.Node)
    itemParent: cc.Node = null;

    @property(cc.Node)
    itemPre: cc.Node = null;

    @property(cc.Node)
    produceNode: cc.Node = null;
    @property(cc.Node)
    makingNode: cc.Node = null;

    private buildingMakingView: BuildingMakingView = null
    private buildingProduceView: BuildingProduceView = null;
    private buildingData: BuildingData = null;

    onLoad() {
        this.buildingProduceView = this.produceNode.getComponent(BuildingProduceView)
        this.buildingMakingView = this.makingNode.getComponent(BuildingMakingView)
        this.produceNode.active = false
        this.makingNode.active = false
    }
    start() {
        super.start()
        this.updatePitList()
    }
    onEnable() {
        EventManager.instance.addEventListener("StartProduceBrewBuildingCmd_SC", this.onRspStartProduce, this)
        EventManager.instance.addEventListener("GatherBrewBuildingCmd_SC", this.onRspGather, this)
        EventManager.instance.addEventListener("BuildingListBrewBuildingCmd_SC", this.onRspRent, this)
        EventManager.instance.addEventListener("UpdateBrewBuildingCmd_SC", this.onNtfUpdate, this)
        EventManager.instance.addEventListener("BuildingInfoBrewBuildingCmd_SC", this.onNtfUpdate, this)
        EventManager.instance.addEventListener("AccelerateProduceBrewBuildingCmd_SC", this.onNtfUpdate, this)
        EventManager.instance.addEventListener(CustomEventEnum.UPDATE_VIEW_VISIBLE, this.onUpdateVisible, this)
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
        super.onDisable()
    }

    updatePitList() {
        this.itemParent.removeAllChildren()
        let curTime = UserDataManager.instance.getCurTime()
        let firstPitData = null
        let buildingList = BuildingDataManager.instance.getBuildingListByType(BuildingType.JiaoChi)
        for(let i = 0, len = buildingList.length; i <= len; i++) {
            let itemNode = cc.instantiate(this.itemPre)
            let itemData = buildingList[i]
            itemNode.parent = this.itemParent
            itemNode.active = true

            let itemScript = itemNode.getComponent(BuildingDetailPitItem)
            if(itemScript) {
                itemScript.onClickCallback = this.onClickItem.bind(this)
                itemScript.updateView(itemData)
            }
            if(firstPitData == null && itemData) {
                if(!itemData.rentEndTime || itemData.rentEndTime > curTime) {
                    firstPitData = itemData
                }
            }
        }
        
        if(this.buildingData == null && firstPitData) {
            this.onClickItem(firstPitData.buildingId)
        } else if(this.buildingData) {
            this.setPitItemSelected(this.buildingData.buildingId)
        }
    }
    setPitItemSelected(buildingId) {
        let children = this.itemParent.children
        for(let i = 0, len = children.length;i < len; i++) {
            let itemNode = children[i]
            let itemScript = itemNode.getComponent(BuildingDetailPitItem)
            if(itemScript) {
                itemScript.setIsSelected(buildingId)
            }
        }
    }
    onClickItem(buildingId: number) {
        this.setPitItemSelected(buildingId)
        this.buildingData = BuildingDataManager.instance.getBuildingDataById(buildingId)
        this.buildingProduceView.initByExData({
            buildingData: this.buildingData,
        })
        this.buildingMakingView.initByExData({
            buildingData: this.buildingData,
        })
        this.updateDetailTab()
    }
    updateDetailTab() {        
        let produceState = this.buildingData.produceState || ProduceState.Idle
        if (produceState != ProduceState.Idle) {
            this.produceNode.active = false
            this.makingNode.active = true
        } else {
            this.produceNode.active = true
            this.makingNode.active = false
        }
    }
    onRspStartProduce(eventData) {
        if (!eventData.building_data) {
            return;
        }
        if (!this.buildingData) {
            return
        }
        if (eventData.building_data.building_id != this.buildingData.buildingType || 
            eventData.building_data.building_index != this.buildingData.buildingIndex) {
            return
        }
        this.buildingData = BuildingDataManager.instance.getBuildingDataById(this.buildingData.buildingId)
        this.buildingProduceView.initByExData({
            buildingData: this.buildingData
        })
        this.buildingMakingView.initByExData({
            buildingData: this.buildingData
        })
        this.updateDetailTab()
    }
    onRspGather(eventData) {
        if (!eventData.building_data) {
            return;
        }
        if (!this.buildingData) {
            return
        }
        if (eventData.building_data.building_id != this.buildingData.buildingType || 
            eventData.building_data.building_index != this.buildingData.buildingIndex) {
            return
        }
        this.buildingData = BuildingDataManager.instance.getBuildingDataById(this.buildingData.buildingId)
        
        this.buildingProduceView.initByExData({
            buildingData: this.buildingData
        })
        this.buildingMakingView.initByExData({
            buildingData: this.buildingData
        })
        this.updateDetailTab()
    }
    onRspRent() {
        this.updatePitList()
    }
    onNtfUpdate(eventData) {
        if (eventData.building_data.building_id != this.buildingData.buildingType || 
            eventData.building_data.building_index != this.buildingData.buildingIndex) {
            return
        }
        this.updateDetailTab()
    }

    onUpdateVisible(eventData) {
        let viewName = eventData.viewName
        if(this.node.name.indexOf(viewName) != -1) {
            if(eventData.visible) {
                this.showOpenAnimation(null)
            } else {
                this.showCloseAnimation(null)
            }
        }
    }
}