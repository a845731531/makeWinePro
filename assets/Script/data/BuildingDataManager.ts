import PropConfig from "../config/PropConfig";
import { BuildingType, ItemType, ProduceState } from "../Constant/GameEnum";
import { PrefabPathEnum } from "../Constant/PrefabPathEnum";
import EventManager from "../framework/manager/EventManager";
import { EventEnum } from "../framework/FrameWorkEnum";
import { Tool } from "../framework/manager/Tool";
import BaseDataManager from "./BaseDataManager";
import BagDataManager from "./BagDataManager";
import { BuildingData } from "./DataInterface";
import UserDataManager from "./UserDataManager";
import { NetManager } from "../framework/network/NetManager";
import BuildingPosConfig from "../config/BuildingPosConfig";
import ProductConfig from "../config/ProductConfig";
import SmallGameBuffConfig from "../config/SmallGameBuffConfig";
import { Config } from "../Constant/Config";
import BuildingConfig from "../config/BuildingConfig";
import { SoundEnum } from "../Constant/SoundEnum";


export default class BuildingDataManager extends BaseDataManager {
    private static _instance: BuildingDataManager = null;
    private buildingList: BuildingData[];

    private _workingStaffList = {}


    public static get instance(): BuildingDataManager {
        if (this._instance == null) {
            this._instance = new BuildingDataManager();
        }
        return this._instance;
    }
    constructor() {
        super();
        this.reset();
    }

    init() {
        super.init()
        this.buildingList = []

        if(Config.UseNetWork == 0) {
            //TODO
            for(let id in BuildingPosConfig) {
                let itemData = BuildingPosConfig[id]
                if(itemData.buildingType == 1)
                {
                    //假数据  2个普通农田  2个世界农田
                    if(itemData.buildingIndex <= 3)
                    {
                        this.buildingList.push({
                            buildingId: itemData.buildingType * 100 + itemData.buildingIndex,
                            worldId: Tool.getRandomLimit(1,10000),
                            buildingType: itemData.buildingType,
                            buildingIndex: itemData.buildingIndex
                        })
                    }
                } else {
                    this.buildingList.push({
                        buildingId: itemData.buildingType * 100 + itemData.buildingIndex,
                        buildingType: itemData.buildingType,
                        buildingIndex: itemData.buildingIndex
                    })   
                }         
            }
            this.buildingList.push({
                buildingId: BuildingType.JiaoChi * 100 + 1,
                worldId: Tool.getRandomLimit(1,10000),
                buildingType: BuildingType.JiaoChi,
                buildingIndex: 1,
                rentEndTime: UserDataManager.instance.getCurTime() + 10000
            })
        }
    }

    reset() {
        this.buildingList = []
        super.reset()
    }
    
    addNetListener() {
        EventManager.instance.addEventListener("BuildingListBrewBuildingCmd_SC", this.onRspBuildingList, this, -1)
        EventManager.instance.addEventListener("StartProduceBrewBuildingCmd_SC", this.onRspStartProduce, this, -1)
        EventManager.instance.addEventListener("GatherBrewBuildingCmd_SC", this.onRspGather, this, -1)
        EventManager.instance.addEventListener("RspRent", this.onRspRent, this, -1)
        EventManager.instance.addEventListener("BuildingInfoBrewBuildingCmd_SC", this.onNtfUpdateBuilding, this, -1)
        EventManager.instance.addEventListener("AccelerateProduceBrewBuildingCmd_SC", this.onRspSpeedup, this, -1)
        EventManager.instance.addEventListener("ResumeProduceBrewBuildingCmd_SC", this.onRspResumeBuilding, this, -1)
        EventManager.instance.addEventListener("BuyBrewUserCmd_SC", this.onRspBuyProp, this, -1)
        
        //xiejinhui 选择员工测试
        EventManager.instance.addEventListener("rspBuildingChangeStaff", this.onRspChangeStaff, this, -1)
        //xiejinhui 工业用地测试  正式版删掉
        EventManager.instance.addEventListener("reqLandBuildingCreate", this.onRspLandBuildingCreate, this, -2)
    }

    updateBuilding(buildingData: BuildingData) {
        let itemData = this.getBuildingDataById(buildingData.buildingId)
        if (itemData != null) {
            if(itemData.staffId)
            {
                this._workingStaffList[itemData.staffId] = null
            }
            Tool.deepCopyTo(buildingData, itemData)
        } else {
            this.buildingList.push(buildingData)
        }


        if(buildingData.staffId)
        {
            this._workingStaffList[buildingData.staffId] = buildingData
        }

    }

    getBuildingList() {
        return Tool.deepCopy(this.buildingList)
    }

    getBuildingListByType(buildingType: number) {
        let list: BuildingData[] = []
        for (let i = 0; i < this.buildingList.length; i++) {
            let itemData = this.buildingList[i]
            if (itemData.buildingType == buildingType) {
                list.push(Tool.deepCopy(itemData))
            }
        }
        return list
    }
    getBuildingDataById(buildingId: number) {
        for (let i = 0; i < this.buildingList.length; i++) {
            let itemData = this.buildingList[i]
            if (itemData.buildingId == buildingId) {
                return itemData;
            }
        }
        return null
    }
    getBuildingData(buildingType: number, buildingIndex: number) {
        for (let i = 0; i < this.buildingList.length; i++) {
            let itemData = this.buildingList[i]
            if (itemData.buildingType == buildingType && itemData.buildingIndex == buildingIndex) {
                return itemData;
            }
        }
        return null
    }
    getGameBuff(score) {
        let buffer = 0
        for(let id in SmallGameBuffConfig) {
            let itemConfig = SmallGameBuffConfig[id]
            if(score >= itemConfig.intervalMin && score <= itemConfig.intervalMax) {
                buffer = score * itemConfig.buffRate
                break
            }
        }
        return buffer.toFixed(2)
    }

    checkStaffIsWorking(staffId)
    {
        if(this._workingStaffList[staffId])
        {
            return true
        }
        return false 
    }
    getStaffWorkBuilding(staffId) {
        let buildingData = this._workingStaffList[staffId]
        return buildingData
    }

    convertBuildingData(serverData) {
        let itemProduce: any = ProductConfig[serverData.produce_id] || {}
        
        let unitTime = itemProduce.produceTime || 0
        let buildingData = {
            buildingId: serverData.building_id * 100 + serverData.building_index, 
            buildingType: serverData.building_id,
            buildingIndex: serverData.building_index,
            produceType: itemProduce.productId,
            produceNum: serverData.produce_num,
            produceState: serverData.status,
            pauseReason: serverData.pause_reason,
            produceStartTime: serverData.produce_cur_time - serverData.produce_passed_time,
            produceTime: unitTime,
            produceEndTime: serverData.produce_cur_time + (unitTime - serverData.produce_passed_time),
            smallGameScore: serverData.score,
            rentEndTime: serverData.expiration,
        }
        for(let key in buildingData) {
            if(buildingData[key] == null) {
                delete buildingData[key]
            }
        }
        return buildingData
    }
    onRspBuildingList(eventData) {        
        let buildingList = eventData.building_list
        this.buildingList = []
        for(let i = 0, len = buildingList.length; i < len; i++) {
            let itemData = buildingList[i]
            // this.buildingList.push(this.convertBuildingData(itemData))
            this.updateBuilding(this.convertBuildingData(itemData))
        }
    }
    
    onRspStartProduce(eventData) {
        if (eventData.error_code) {
            if(eventData.error_code == 4) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "zqb不足，请充值"
                })
            } else if(eventData.error_code == 3) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "材料不足"
                })
            }
            return
        }
        this.updateBuilding(this.convertBuildingData(eventData.building_data))
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "BuildingStartProduce",
            param: cc.js.formatStr("%s|%s", eventData.building_data.building_id, eventData.building_data.building_index)
        })
        
    }
    onRspRent(eventData) {
        if (eventData.error_code) {
            return
        }
        this.updateBuilding(this.convertBuildingData(eventData.building_data))
    }
    onNtfUpdateBuilding(eventData) {
        this.updateBuilding(this.convertBuildingData(eventData.building_data))
    }
    onRspSpeedup(eventData) {
        if (eventData.error_code) {
            if(eventData.error_code == 2) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "zqb不足，请充值"
                })
            }
            return
        }

        //加速音效
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_SPEEDUP)

        this.updateBuilding(this.convertBuildingData(eventData.building_data))
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "BuildingSpeedSuccess",
            param: cc.js.formatStr("%s|%s", eventData.building_data.building_id, eventData.building_data.building_index)
        })
        //获得弹窗
        if(eventData.building_data.building_id == BuildingType.Wine) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.BuildingWineResult,
                exData: eventData.gather_prop_list
            })
        } else {
            if(eventData.gather_prop_list && eventData.gather_prop_list.length > 0) {
                let propList = []
                for(let i = 0, len = eventData.gather_prop_list.length; i < len; i++) {
                    let itemData = eventData.gather_prop_list[i]
                    propList.push({
                        propId: itemData.id,
                        customNum: itemData.num
                    })
                }
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                    viewName: PrefabPathEnum.CongratulationsView,
                    exData:{
                        propList: propList,
                    }
                })
            }
        }
        
    }

    onRspResumeBuilding(eventData)
    {
        if (eventData.error_code) {
            return
        }
        this.updateBuilding(this.convertBuildingData(eventData.building_data))
    }
    onRspBuyProp(eventData)
    {
        if (eventData.error_code) {
            if(eventData.error_code == 2) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "zqb不足，请充值"
                })
            }
            return
        }
    }
    
    onRspGather(eventData) {
        if (eventData.error_code) {
            return
        }

        //收获音效
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_GATHER)

        let oldBuildingData = this.getBuildingData(eventData.building_data.building_id, eventData.building_data.building_index)
        let oldProductType = oldBuildingData.produceType
        this.updateBuilding(this.convertBuildingData(eventData.building_data))
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "BuildingGatherSuccess",
            param: cc.js.formatStr("%s|%s", eventData.building_data.building_id, eventData.building_data.building_index)
        })
        
        //获得弹窗
        if(eventData.building_data.building_id == BuildingType.Wine) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.BuildingWineResult,
                exData: eventData.gather_prop_list
            })
        } else {
            if(eventData.gather_prop_list && eventData.gather_prop_list.length > 0) {
                let propList = []
                for(let i = 0, len = eventData.gather_prop_list.length; i < len; i++) {
                    let itemData = eventData.gather_prop_list[i]
                    propList.push({
                        propId: itemData.id,
                        customNum: itemData.num
                    })
                }
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                    viewName: PrefabPathEnum.CongratulationsView,
                    exData:{
                        propList: propList,
                    }
                })
            }
        }
    }

    onTestGather(buildingData: BuildingData) {
        let buildingType = buildingData.buildingType
        if(buildingType == BuildingType.JiaoChi) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.BuildingStoreWine,
                exData: {
                    buildingData: buildingData,
                },
            })
        } else if(buildingType == BuildingType.Wine) {            
            let itemProp = PropConfig[buildingData.produceType]
            let wineId = itemProp.subId

            //分数算一下            
            let produceNum =  buildingData.produceNum
            let score = Tool.getRandomLimit(0, 100)
            
            let quality = Math.min(Math.floor(score / 20),4)
            let curWineId = wineId + quality
            let curCount = BagDataManager.instance.getItemNum(curWineId)
            BagDataManager.instance.addItem({
                id: Tool.getRandomLimit(0, 100),
                propId: wineId,
                customNum: produceNum
            })
            EventManager.instance.dispatchEvent("GatherBrewBuildingCmd_SC", {
                buildingData: {
                    buildingId: buildingData.buildingId,
                    buildingType: buildingType,
                    produceType: 0,         //清空记录
                    produceNum: 0,
                    produceStartTime: -1,
                    produceTime: 0,
                    produceFinishTime: 0,
                    produceState: ProduceState.Idle,
                },
                product: [
                    {
                        propId: wineId,
                        num: buildingData.produceNum,
                        score: score,
                    }
                ]
            })
        } else {
            let propId = buildingData.produceType
            let oldNum = BagDataManager.instance.getItemNum(propId)
            BagDataManager.instance.addItem({
                id: Tool.getRandomLimit(0, 100),
                propId: propId,
                customNum: buildingData.produceNum
            })
            EventManager.instance.dispatchEvent("GatherBrewBuildingCmd_SC", {
                buildingData: {
                    buildingId: buildingData.buildingId,
                    buildingType: buildingType,
                    produceType: 0,         //清空记录
                    produceNum: 0,
                    produceStartTime: -1,
                    produceTime: 0,
                    produceFinishTime: 0,
                    produceState: ProduceState.Idle,
                },
                product: [
                    {
                        propId: propId,
                        num: buildingData.produceNum,
                    }
                ]
            })
        }
    }

    onRspChangeStaff(serverData)
    {
        let data = this.getBuildingDataById(serverData.buildingId)
        data.staffId = serverData.staffId
    }

    onRspLandBuildingCreate(param)
    {   
        // 这里只添加生产流程的数据
        if(param.buildingType <= BuildingType.JiaoChi)
        {
            let index = this.getBuildingListByType(param.buildingType).length + 1
            this.buildingList.push({
                buildingId: param.buildingType * 100 + index,
                buildingType: param.buildingType,
                buildingIndex: index,
                worldId: 0,
                staffId: 0,
                produceType: 0,
                produceNum: 0,
                produceStartTime: 0,
                produceEndTime: 0,
                produceTime: 0,
                produceState: 0,
                pauseReason: 0,
                rentEndTime: 0,
                smallGameScore: 0,
            })
        }
    }
}