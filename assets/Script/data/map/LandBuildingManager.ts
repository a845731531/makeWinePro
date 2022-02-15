
import EventManager from "../../framework/manager/EventManager";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { NetMsgDef } from "../../../resources/pb/NetMsgDef";
import LandBuildingItem from "../../view/Building/item/LandBuildingItem";
import { Tool } from "../../framework/manager/Tool";
import BuildingConfig from "../../config/BuildingConfig";
import LandItem from "../../view/Building/item/LandItem";
import LandDataManager from "../land/LandDataManager";
import BuildingDataManager from "../BuildingDataManager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class LandBuildingManager extends cc.Component {

    @property(cc.Node)
    buildParent: cc.Node = null;

    private _buildintItemList = []

    onLoad() {
        this._buildintItemList = []

        this.addListener()
    }

    addListener() {
        EventManager.instance.addEventListener(CustomEventEnum.MAP_CREATE_BUILDING_PREFAB, this.onCreateBuildingPrefab, this, -2)
        EventManager.instance.addEventListener(CustomEventEnum.MAP_MOVE_BUILDING_PREFAB, this.onMoveBuildingPrefab, this)
        EventManager.instance.addEventListener(CustomEventEnum.MAP_SHOW_BUILDING_PREFAB, this.OnShowBuildingPrefab, this)
        EventManager.instance.addEventListener(CustomEventEnum.MAP_HIDE_BUILDING_PREFAB, this.OnHideBuildingPrefab, this)

        EventManager.instance.addEventListener(NetMsgDef.Building_RSP_DESTROY, this.onDestroyBuilding, this)

        EventManager.instance.addEventListener("reqLandBuildingData", this.onRspLandBuildingData, this)
        EventManager.instance.addEventListener("reqLandBuildingCreate", this.createBuildingPrefab, this)
    }

    onRspLandBuildingData()
    {
        this.initBuildingPrefab()
    }

    initBuildingPrefab() {
        let landDataList = LandDataManager.instance.getLandBuildingDataList()
        for (let i = 0; i < landDataList.length; i++) {
            let buildingType = landDataList[i].buildingType
            if(BuildingConfig[buildingType].worldLandTab != 0) 
            {
                EventManager.instance.dispatchEvent(CustomEventEnum.MAP_CREATE_BUILDING_PREFAB, landDataList[i])
            }
        }
    }

    createBuildingPrefab(param)
    {
        let landDataList = LandDataManager.instance.getLandBuildingItemDataList(param.landId,param.buildingType)
        if(landDataList.length > 0)
        {
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_CREATE_BUILDING_PREFAB, landDataList[landDataList.length -1])
        }
    }

    OnShowBuildingPrefab(param: { buildingType: number, buildingIndex: number }) {
        try {
            let buildingType = param.buildingType
            let buildingIndex = param.buildingIndex
            for (let i = 0; i < this._buildintItemList.length; i++) {
                let itemBuilding = this._buildintItemList[i]
                if (itemBuilding.isBuilding(buildingType, buildingIndex)) {
                    itemBuilding.showPrefab()
                    return
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    OnHideBuildingPrefab(param: { buildingType: number, buildingIndex: number }) {
        try {
            let buildingType = param.buildingType
            let buildingIndex = param.buildingIndex
            for (let i = 0; i < this._buildintItemList.length; i++) {
                let itemBuilding = this._buildintItemList[i]
                if (itemBuilding.isBuilding(buildingType, buildingIndex)) {
                    itemBuilding.hidePrefab()
                    return
                }
            }   
        } catch (error) {
            console.error(error)
        }
    }

    onCreateBuildingPrefab(landItemData) {
        try {
            if (landItemData) {

                Tool.loadPrefab(cc.js.formatStr("prefab/building/landItem/BuildingItem_%s",landItemData.buildingType),(prefab)=>{
                    if(prefab)
                    {
                        let itemNode = cc.instantiate(prefab)
                        let useType = BuildingConfig[landItemData.buildingType].worldLandTab
                        if(useType == 1)
                        {
                            let itemScript1: LandBuildingItem = itemNode.getComponent(LandBuildingItem)
                            let buildingData = BuildingDataManager.instance.getBuildingData(landItemData.buildingType,landItemData.buildingIndex)
                            itemScript1.init(buildingData)
                            itemScript1.createPrefab(this.buildParent)
                            this._buildintItemList.push(itemScript1)
                        }else{
                            let itemScript2: LandItem = itemNode.getComponent(LandItem)
                            itemScript2.init(landItemData)
                            itemScript2.createPrefab(this.buildParent)
                            this._buildintItemList.push(itemScript2)
                        }
                    }
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    onMoveBuildingPrefab(landItemData) {
        try {
            if (landItemData) {
                let buildingType = landItemData.buildingType
                let buildingIndex = landItemData.buildingIndex
                for (let i = 0; i < this._buildintItemList.length; i++) {
                    let itemBuilding = this._buildintItemList[i]
                    if (itemBuilding.isBuilding(buildingType, buildingIndex)) {
                        itemBuilding.movePrefab()
                        return
                    }
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    onDestroyBuilding(eventData) {
        try {
            let buildingType = eventData.buildingType
            let buildingIndex = eventData.buildingIndex
            for (let i = 0; i < this._buildintItemList.length; i++) {
                let itemBuilding = this._buildintItemList[i]
                if (itemBuilding.isBuilding(buildingType, buildingIndex)) {
                    //从列表中移除预设数据
                    this._buildintItemList.splice(i,1)
                    // itemBuilding.destroyPrefab()
                    return
                }
            }   
        } catch (error) {
            console.error(error)
        }
    }

    removeListener() {
        EventManager.instance.removeTargetListener(this)
    }

    onDestroy() {
        this.removeListener()
    }
}