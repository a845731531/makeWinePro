import MapItemConfig from "../../../config/MapItemConfig";
import { BuildingData } from "../../../data/DataInterface";
import EventManager from "../../../framework/manager/EventManager";
import { CustomEventEnum } from "../../../Constant/CustomEventEnum";
import { Tool } from "../../../framework/manager/Tool";
import MapDataManager from "../../../data/map/MapDataManager";
import LandDataManager from "../../../data/land/LandDataManager";
import BuildingItem from "./BuildingItem";
import { BuildingType } from "../../../Constant/GameEnum";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import BuildingDataManager from "../../../data/BuildingDataManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LandBuildingItem extends BuildingItem {

    onEnable() {
        EventManager.instance.addEventListener("StartProduceBrewBuildingCmd_SC", this.onRspStartProduce, this)
        EventManager.instance.addEventListener("GatherBrewBuildingCmd_SC", this.onRspGather, this)         
        EventManager.instance.addEventListener("AccelerateProduceBrewBuildingCmd_SC", this.onRspSpeedUp, this)
        EventManager.instance.addEventListener("ResumeProduceBrewBuildingCmd_SC", this.onRspSpeedUp, this)
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    public init(buildingData: BuildingData): void {
        super.init(buildingData,false)
        this.updateViewSize()
    }

    updateViewSize()
    {
        let itemConfig = MapItemConfig[this.buildingType]
        if (itemConfig) {
            //TODU 节点Node偏移量
            if (this.node.getChildByName("Node")) {
                this.node.getChildByName("Node").position = cc.v3(itemConfig.iconRect[0], itemConfig.iconRect[1])
                this.node.getChildByName("Node").width = itemConfig.iconRect[2]
                this.node.getChildByName("Node").height = itemConfig.iconRect[3]
            }
        }
    }

    showBuildingDetail() {        
        if(this.buildingType == BuildingType.ZhiQu) {

            //xiejinhui 测试 TODO
            let data = BuildingDataManager.instance.getBuildingData(BuildingType.ZhiQu,1)
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.BuildingDetailZhiqu,
                exData: {
                    buildingData: data
                }
            })
        } else if(this.buildingType == BuildingType.Wine) {            
            let data = BuildingDataManager.instance.getBuildingData(BuildingType.Wine,1)
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.BuildingDetailBaseWine,
                exData: {
                    buildingData: data,
                }
            })
        }
    }
    
    public hidePrefab()
    {
        let landBuildingData = LandDataManager.instance.getLandBuildItemData(0,this.buildingData.buildingType,this.buildingData.buildingIndex)
        if(landBuildingData)
        {
            this.node.active = false
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_DESTROY_BUILDING_DATA,{
                landId: landBuildingData.landId,
                buildingType: this.buildingData.buildingType,
                buildingIndex: this.buildingData.buildingIndex,
            })
        }
    }

    public showPrefab()
    {
        let landBuildingData = LandDataManager.instance.getLandBuildItemData(0,this.buildingData.buildingType,this.buildingData.buildingIndex)
        if(landBuildingData)
        {
            this.node.active = true
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_CREATE_BUILDING_DATA,{
                landId: landBuildingData.landId,
                buildingType: this.buildingData.buildingType,
                buildingIndex: this.buildingData.buildingIndex,
            })
        }
    }

    public createPrefab(parent)
    {
        //TODO
        let landBuildingData = LandDataManager.instance.getLandBuildItemData(0,this.buildingData.buildingType,this.buildingData.buildingIndex)
        if(landBuildingData)
        {
            this.node.parent = parent;
            let pos = MapDataManager.instance.getTiledMiddlePos(landBuildingData.areaId.col, landBuildingData.areaId.row)
            this.node.x = pos.x
            this.node.y = pos.y
            this.node.zIndex = Tool.getBuildingZIndex(pos.y)
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_CREATE_BUILDING_DATA,{
                landId: landBuildingData.landId,
                buildingType: this.buildingData.buildingType,
                buildingIndex: this.buildingData.buildingIndex,
            })
        }
    }

    public movePrefab()
    {
        let landBuildingData = LandDataManager.instance.getLandBuildItemData(0,this.buildingData.buildingType,this.buildingData.buildingIndex)
        if(landBuildingData)
        {
            this.node.active = true
            let pos = MapDataManager.instance.getTiledMiddlePos(landBuildingData.areaId.col, landBuildingData.areaId.row)
            this.node.x = pos.x
            this.node.y = pos.y
            this.node.zIndex = Tool.getBuildingZIndex(pos.y)
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_MOVE_BUILDING_DATA,{
                landId: landBuildingData.landId,
                buildingType: this.buildingData.buildingType,
                buildingIndex: this.buildingData.buildingIndex,
            })
        }
    }

    public destroyPrefab()
    {
        this.node.destroy()
        let landBuildingData = LandDataManager.instance.getLandBuildItemData(0,this.buildingData.buildingType,this.buildingData.buildingIndex)
        if(landBuildingData)
        {
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_DESTROY_BUILDING_DATA,{
                landId: landBuildingData.landId,
                buildingType: this.buildingData.buildingType,
                buildingIndex: this.buildingData.buildingIndex,
            })
        }
    }

    
}