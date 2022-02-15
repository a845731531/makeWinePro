import BuildingConfig from "../../config/BuildingConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import EventManager from "../../framework/manager/EventManager";
import BaseDataManager from "../BaseDataManager";
import BuildingDataManager from "../BuildingDataManager";

export default class LandDataManager extends BaseDataManager {
    private static _instance: LandDataManager = null;
    public static get instance(): LandDataManager {
        if (this._instance == null) {
            this._instance = new LandDataManager();
        }
        return this._instance;
    }

    private _landId = null

    //总工业用地
    private _landDataMap = {}

    //是否正在编辑中
    private _isEditing = false

    constructor() {
        super();

        this.reset();
    }

    reset() {
        super.reset()

        this._landDataMap = {}
        this._isEditing = false
    }

    addNetListener() {
        EventManager.instance.addEventListener("reqLandBuildingData", this.onRspLandBuildingData, this, -1)

        EventManager.instance.addEventListener("reqLandBuildingCreate", this.onRspLandBuildingCreate, this, -1)
        EventManager.instance.addEventListener("reqLandBuildingEditing", this.onRspLandBuildingEditing, this, -1)


        EventManager.instance.addEventListener(CustomEventEnum.MAP_ENTER_EDITING_VIEW,this.onEnterEditingView,this,-1)
        EventManager.instance.addEventListener(CustomEventEnum.MAP_EXIT_EDITING_VIEW,this.onExitEditingView,this,-1)
        
    }

    setCurLandId(value)
    {
        this._landId = value
    }

    getCurLandId()
    {
        return this._landId
    }

    /**
     * 请求一块工业用地的建筑信息
     * @param param 
     */
    onRspLandBuildingData(param)
    {
        // this._landDataMap[param.landId] = data
    }

    /**
     * 请求创建建筑物
     * @param param 
     */
    onRspLandBuildingCreate(param)
    {
        if(!this._landDataMap[param.landId])
        {
            this._landDataMap[param.landId] = []
        }

        //xiejinhui TODO 
        let index = 0
        if(BuildingConfig[param.buildingType].worldLandTab == 1)
        {
            index = BuildingDataManager.instance.getBuildingListByType(param.buildingType).length
        }else{
            index = this.getLandBuildingItemDataList(null,param.buildingType).length + 1
        }
        this._landDataMap[param.landId].push(
            {
                landId: param.landId,
                buildingType: param.buildingType,
                buildingIndex: index,
                areaId: param.areaId,
                lastAreaId: param.areaId
            }
        )

    }

    onRspLandBuildingEditing(param)
    {

        if(this._landDataMap[param.landId])
        {
            let data = this._landDataMap[param.landId]
            for(let i = 0; i < data.length; i++)
            {
                if(data[i].buildingType == param.buildingType && data[i].buildingIndex == param.buildingIndex)
                {
                    data[i].areaId = param.areaId
                    data[i].lastAreaId = param.areaId
                    EventManager.instance.dispatchEvent(CustomEventEnum.MAP_MOVE_BUILDING_PREFAB,data[i])
                    return
                }
            }
        }

    }

    getLandBuildingDataList(landId?)
    {
        let curLandId = landId? landId : this._landId

        if(this._landDataMap[curLandId])
        {
            return this._landDataMap[curLandId]
        }
        return null
    }

    getLandBuildItemData(landId,buildingType,buildingIndex)
    {
        let curLandId = landId? landId : this._landId

        if(this._landDataMap[curLandId])
        {   
            let data = this._landDataMap[curLandId]
            for(let i = 0; i < data.length; i++)
            {
                if(data[i].buildingType == buildingType && data[i].buildingIndex == buildingIndex)
                {
                    return data[i]
                }
            }
        }
        return null

    }

    getLandBuildingItemDataList(landId,buildingType)
    {
        let curLandId = landId? landId : this._landId

        let result = []
        if(this._landDataMap[curLandId])
        {   
            let data = this._landDataMap[curLandId]
            for(let i = 0; i < data.length; i++)
            {
                if(data[i].buildingType == buildingType)
                {
                    result.push(data[i])
                }
            }
        }
        return result

    }

    onEnterEditingView()
    {
        this._isEditing = true
    }

    onExitEditingView()
    {
        this._isEditing = false
    }

    getIsEditing()
    {
        return this._isEditing
    }

   
}
