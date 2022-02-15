import MapItemConfig from "../../../config/MapItemConfig";
import EventManager from "../../../framework/manager/EventManager";
import { CustomEventEnum } from "../../../Constant/CustomEventEnum";
import { Tool } from "../../../framework/manager/Tool";
import MapDataManager from "../../../data/map/MapDataManager";
import LandDataManager from "../../../data/land/LandDataManager";
import { BuildingType } from "../../../Constant/GameEnum";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import BuildingDataManager from "../../../data/BuildingDataManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import BuildingConfig from "../../../config/BuildingConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LandItem extends cc.Component{

    @property(cc.Sprite)
    iconSpr: cc.Sprite = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    private buildingType = 0
    private buildingIndex = 0
    private landItemData = null

    onEnable() {

    }

    onDisable() {

    }

    public init(data): void {

        this.landItemData = data
        this.buildingType = this.landItemData.buildingType
        this.buildingIndex = this.landItemData.buildingIndex

        if(cc.isValid(this.txtName))
        {
            this.txtName.string = BuildingConfig[this.buildingType].name
        }

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
        let landBuildingData = LandDataManager.instance.getLandBuildItemData(0,this.landItemData.buildingType,this.landItemData.buildingIndex)
        if(landBuildingData)
        {
            this.node.active = false
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_DESTROY_BUILDING_DATA,{
                landId: landBuildingData.landId,
                buildingType: this.landItemData.buildingType,
                buildingIndex: this.landItemData.buildingIndex,
            })
        }
    }

    public showPrefab()
    {
        let landBuildingData = LandDataManager.instance.getLandBuildItemData(0,this.landItemData.buildingType,this.landItemData.buildingIndex)
        if(landBuildingData)
        {
            this.node.active = true
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_CREATE_BUILDING_DATA,{
                landId: landBuildingData.landId,
                buildingType: this.landItemData.buildingType,
                buildingIndex: this.landItemData.buildingIndex,
            })
        }
    }

    public createPrefab(parent)
    {
        //TODO
        let landBuildingData = LandDataManager.instance.getLandBuildItemData(0,this.landItemData.buildingType,this.landItemData.buildingIndex)
        if(landBuildingData)
        {
            this.node.parent = parent;
            let pos = MapDataManager.instance.getTiledMiddlePos(landBuildingData.areaId.col, landBuildingData.areaId.row)
            this.node.x = pos.x
            this.node.y = pos.y
            this.node.zIndex = Tool.getBuildingZIndex(pos.y)
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_CREATE_BUILDING_DATA,{
                landId: landBuildingData.landId,
                buildingType: this.landItemData.buildingType,
                buildingIndex: this.landItemData.buildingIndex,
            })
        }
    }

    public movePrefab()
    {
        let landBuildingData = LandDataManager.instance.getLandBuildItemData(0,this.landItemData.buildingType,this.landItemData.buildingIndex)
        if(landBuildingData)
        {
            this.node.active = true
            let pos = MapDataManager.instance.getTiledMiddlePos(landBuildingData.areaId.col, landBuildingData.areaId.row)
            this.node.x = pos.x
            this.node.y = pos.y
            this.node.zIndex = Tool.getBuildingZIndex(pos.y)
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_MOVE_BUILDING_DATA,{
                landId: landBuildingData.landId,
                buildingType: this.landItemData.buildingType,
                buildingIndex: this.landItemData.buildingIndex,
            })
        }
    }

    public destroyPrefab()
    {
        this.node.destroy()
        let landBuildingData = LandDataManager.instance.getLandBuildItemData(0,this.landItemData.buildingType,this.landItemData.buildingIndex)
        if(landBuildingData)
        {
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_DESTROY_BUILDING_DATA,{
                landId: landBuildingData.landId,
                buildingType: this.landItemData.buildingType,
                buildingIndex: this.landItemData.buildingIndex,
            })
        }
    }

    onLongClickItem(isLong = false)
    {
        if (LandDataManager.instance.getIsEditing()) {

            if(!isLong)
            {
                //单击建筑物 可以编辑指定建筑物
                EventManager.instance.dispatchEvent(CustomEventEnum.MAP_ADD_BUILDING, {
                    buildingType: this.landItemData.buildingType,
                    buildingIndex: this.landItemData.buildingIndex,
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
                    buildingType: this.landItemData.buildingType,
                    buildingIndex: this.landItemData.buildingIndex,
                    position: this.node.position,
                    isCreate: false 
                })
            }
        }
    }

    public getBuildingType()
    {
        return this.landItemData.buildingType
    }

    public isBuilding(buildingType: number, buildingIndex: number): boolean {
        return (buildingType == this.buildingType) && (buildingIndex == this.buildingIndex)
    }

    
}