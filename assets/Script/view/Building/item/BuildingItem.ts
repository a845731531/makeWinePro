import { NetMsgDef } from "../../../../resources/pb/NetMsgDef";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import MapItemConfig from "../../../config/MapItemConfig";
import { BuildingData } from "../../../data/DataInterface";
import UserDataManager from "../../../data/UserDataManager";
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import { CustomEventEnum } from "../../../Constant/CustomEventEnum";
import BuildingDataManager from "../../../data/BuildingDataManager";
import BuildingItemInfo from "./BuildingItemInfo";
import BuildingPosConfig from "../../../config/BuildingPosConfig";
import { Tool } from "../../../framework/manager/Tool";
import LandDataManager from "../../../data/land/LandDataManager";
import GuideManager from "../../../framework/guide/GuideManager";
import { SoundEnum } from "../../../Constant/SoundEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingItem extends cc.Component {

    @property(cc.Sprite)
    iconSpr: cc.Sprite = null;

    @property(BuildingItemInfo)
    itemInfo: BuildingItemInfo = null;

    protected buildingData: BuildingData = null;
    protected buildingType: number = 0;
    protected buildingIndex: number = 0;

    protected coverTiledList = []

    onEnable() {
        EventManager.instance.addEventListener("StartProduceBrewBuildingCmd_SC", this.onRspStartProduce, this)
        EventManager.instance.addEventListener("GatherBrewBuildingCmd_SC", this.onRspGather, this)         
        EventManager.instance.addEventListener("AccelerateProduceBrewBuildingCmd_SC", this.onRspSpeedUp, this)
        //暂停生产恢复  刷新界面
        EventManager.instance.addEventListener("ResumeProduceBrewBuildingCmd_SC", this.onRspSpeedUp, this)
        
        EventManager.instance.addEventListener("OpenBuildingDetail", this.onOpenBuildingDetail,this)
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    public init(buildingData: BuildingData,needPosition = true): void {
        this.buildingData = buildingData
        this.buildingType = buildingData.buildingType;
        this.buildingIndex = buildingData.buildingIndex;
        
        GuideManager.instance.registerGuideNode(cc.js.formatStr("BuildingItem_%s_%s", this.buildingType, this.buildingIndex), this.iconSpr.node)

        let posId = buildingData.buildingType * 100 + buildingData.buildingIndex
        let itemData = BuildingPosConfig[posId]
        if (itemData && needPosition) {
            this.node.x = itemData.posX
            this.node.y = itemData.posY
            this.iconSpr.node.opacity = 0
            Tool.setSpriteFrame(this.iconSpr, itemData.iconPath, "map")

            this.itemInfo.node.x = itemData.uiPosX
            this.itemInfo.node.y = itemData.uiPosY
        }
        this.itemInfo.setBuildingName(this.buildingType)

        this.updateView()
    }

    updateView() {
        if (this.buildingData == null) {
            this.node.active = false;
            return;
        }
        this.itemInfo && this.itemInfo.updateView(this.buildingData)
        this.updateBuildingState()
    }
    updateBuildingState() {

    }

    showBuildingDetail() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.BuildingDetail,
            exData: {
                buildingData: this.buildingData
            }
        })
    }

    onClickItem(event?) {
        if(event)
        {
            let endPos = event.getLocation()
            let startPos = event.getStartLocation()
            if (cc.Vec2.distance(endPos, startPos) > 20) {
                return
            }
        }
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        this.showBuildingDetail()
    }

    onLongClickItem(isLong = false)
    {
        if (LandDataManager.instance.getIsEditing()) {

            if(!isLong)
            {
                //单击建筑物 可以编辑指定建筑物
                EventManager.instance.dispatchEvent(CustomEventEnum.MAP_ADD_BUILDING, {
                    buildingType: this.buildingData.buildingType,
                    buildingIndex: this.buildingData.buildingIndex,
                    position: this.node.position,
                    isCreate: false 
                })
                return
            }

        }else{
            if(isLong)
            {
                //不是编辑模式  且为长按建筑物  则进入编辑模式
                EventManager.instance.dispatchEvent(CustomEventEnum.MAP_ENTER_EDITING_VIEW,false)

                EventManager.instance.dispatchEvent(CustomEventEnum.MAP_ADD_BUILDING, {
                    buildingType: this.buildingData.buildingType,
                    buildingIndex: this.buildingData.buildingIndex,
                    position: this.node.position,
                    isCreate: false 
                })
            }else{
                this.showBuildingDetail()
            }
        }
    }

    showJumpMaterialFinger()
    {
        this.itemInfo.showJumpMaterialFinger()
    }

    protected _middlePosition = cc.v3(0,0)
    getMiddlePosition() {
        this._middlePosition.x = this.node.x + this.iconSpr.node.width / 2
        this._middlePosition.y = this.node.y + this.iconSpr.node.height / 2
        return this._middlePosition
    }

    public getBuildingType()
    {
        return this.buildingData.buildingType
    }

    public isBuilding(buildingType: number, buildingIndex: number): boolean {
        return (buildingType == this.buildingType) && (buildingIndex == this.buildingIndex)
    }
    onOpenBuildingDetail(eventData) {
        let buildingParam = eventData.split("|")
        if(this.isBuilding(parseInt(buildingParam[0]), parseInt(buildingParam[1]))) {
            this.showBuildingDetail()
        }
    }

    onRspStartProduce(eventData) {
        if (eventData.error_code) {
            return;
        }
        if (eventData.building_data.building_id != this.buildingData.buildingType || 
            eventData.building_data.building_index != this.buildingData.buildingIndex) {
            return
        }
        this.buildingData = BuildingDataManager.instance.getBuildingData(this.buildingType, this.buildingIndex)
        this.itemInfo && this.itemInfo.updateView(this.buildingData)
    }
    onRspGather(eventData) {
        if (eventData.error_code) {
            return
        }
        if (eventData.building_data.building_id != this.buildingData.buildingType || 
            eventData.building_data.building_index != this.buildingData.buildingIndex) {
            return
        }
        this.buildingData = BuildingDataManager.instance.getBuildingData(this.buildingType, this.buildingIndex)
        this.itemInfo && this.itemInfo.updateView(this.buildingData)
    }
    onRspSpeedUp(eventData) {
        if(eventData.error_code) {
            return
        }
        if (eventData.building_data.building_id != this.buildingData.buildingType || 
            eventData.building_data.building_index != this.buildingData.buildingIndex) {
            return
        }
        this.buildingData = BuildingDataManager.instance.getBuildingData(this.buildingType, this.buildingIndex)
        this.itemInfo && this.itemInfo.updateView(this.buildingData)
    }
    
}