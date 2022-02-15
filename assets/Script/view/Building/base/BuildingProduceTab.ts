
import BuildingDataManager from "../../../data/BuildingDataManager";
import { BuildingData } from "../../../data/DataInterface";
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import BuildingMakingView from "./BuildingMakingView";
import BuildingProduceView from "./BuildingProduceView";
import BaseView from "../../../framework/viewbase/BaseView";
import { BuildingType, ProduceState } from "../../../Constant/GameEnum";
import BuildingMakingViewFramland from "../framland/BuildingMakingViewFramland";
import BuildingMakingViewWaterwheel from "../waterwheel/BuildingMakingViewWaterwheel";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingProduceTab extends BaseView {
    @property(cc.Node)
    produceNode: cc.Node = null;
    @property(cc.Node)
    makingNode: cc.Node = null;

    private buildingMakingView = null
    private buildingProduceView: BuildingProduceView = null;

    private buildingData: BuildingData = null
    
    initByExData(exData) {
        this.buildingData = exData.buildingData
        this.buildingProduceView = this.produceNode.getComponent(BuildingProduceView)
        this.buildingProduceView && this.buildingProduceView.initByExData(exData)

        if(this.buildingData.buildingType == BuildingType.Farm)
        {
            this.buildingMakingView = this.makingNode.getComponent(BuildingMakingViewFramland)
        }else if(this.buildingData.buildingType == BuildingType.Water)
        {
            this.buildingMakingView = this.makingNode.getComponent(BuildingMakingViewWaterwheel)
        }else{
            this.buildingMakingView = this.makingNode.getComponent(BuildingMakingView)
        }
        this.buildingMakingView && this.buildingMakingView.initByExData(exData)
        
        EventManager.instance.addEventListener("StartProduceBrewBuildingCmd_SC", this.onRspStartProduce, this)
        EventManager.instance.addEventListener("GatherBrewBuildingCmd_SC", this.onRspGather, this)
        EventManager.instance.addEventListener("UpdateBrewBuildingCmd_SC", this.onNtfUpdate, this)
        EventManager.instance.addEventListener("BuildingInfoBrewBuildingCmd_SC", this.onNtfUpdate, this)
        EventManager.instance.addEventListener("AccelerateProduceBrewBuildingCmd_SC", this.onNtfUpdate, this)
        

        this.updateTabView()
    }

    onEnable() {
        this.updateTabView()
    }
    onDestroy() {
        EventManager.instance.removeTargetListener(this)
    }
    updateTabView() {
        if(this.buildingData == null) {
            return
        }
        let produceState = this.buildingData.produceState || ProduceState.Idle
        if (produceState != ProduceState.Idle) {
            this.buildingProduceView.node.active = false
            this.buildingMakingView.node.active = true
        } else {
            this.buildingProduceView.node.active = true
            this.buildingMakingView.node.active = false
        }
    }
    onRspStartProduce(eventData) {
        if (!eventData.building_data) {
            return
        }
        if (!eventData.building_data) {
            return;
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
        this.updateTabView()
    }
    onRspGather(eventData) {
        if (!eventData.building_data) {
            return;
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
        this.updateTabView()
    }
    onNtfUpdate(eventData) {
        if (!eventData.building_data) {
            return;
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
        this.updateTabView()
    }
    
}