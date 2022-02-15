import { NetMsgDef } from "../../resources/pb/NetMsgDef";
import BuildingConfig from "../config/BuildingConfig";
import OldWineConfig from "../config/OldWineConfig";
import { BuildingType } from "../Constant/GameEnum";
import { PrefabPathEnum } from "../Constant/PrefabPathEnum";
import { SoundEnum } from "../Constant/SoundEnum";
import { EventEnum } from "../framework/FrameWorkEnum";
import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
import { NetManager } from "../framework/network/NetManager";
import BagDataManager from "./BagDataManager";
import BaseDataManager from "./BaseDataManager";
import { OldWineData } from "./DataInterface";
import UserDataManager from "./UserDataManager";

export default class WareHouseDataManager extends BaseDataManager {
    private static _instance: WareHouseDataManager = null;
    

    private oldWineList: OldWineData[]; //老酒

    public static get instance(): WareHouseDataManager {
        if (this._instance == null) {
            this._instance = new WareHouseDataManager();
        }
        return this._instance;
    }
    constructor() {
        super();
        this.oldWineList = [];
        this.reset();
        this.addNetListener();
    }
    reset() {
        EventManager.instance.removeTargetListener(this);
    }

    addNetListener() {        
        EventManager.instance.addEventListener("CellarBrewBuildingCmd_SC", this.onRspStoreList, this, -1)
        EventManager.instance.addEventListener("BuyCellarBrewBuildingCmd_SC", this.onRspBuyCellar, this, -1)     
        EventManager.instance.addEventListener("AccelerateCellarBrewBuildingCmd_SC", this.onRspStoreSpeedup, this, -1)   
        EventManager.instance.addEventListener("GatherCellarBrewBuildingCmd_SC", this.onRspTakeout, this, -1)   
        
    }
    getOldWineVatNum() {
        return this.oldWineList.length
    }
    getOldWineStoreNum() {
        let totalNum = 0
        for(let i = 0, len = this.oldWineList.length; i < len; i++) {
            totalNum += (this.oldWineList[i].customNum)
        }
        return totalNum
    }
    getWareHouseMaxVat() {
        return Tool.getNumberParamConfig("extendMax")
    }

    getOldWineData(id?: number) {
        for (let i = 0, len = this.oldWineList.length; i < len; i++) {
            let itemData = this.oldWineList[i]
            if (itemData.id == id) {
                return itemData
            }
        }
    }

    getOldWineByYear(year?: number) {
        let wineList = []
        for (let i = 0, len = this.oldWineList.length; i < len; i++) {
            let itemData = this.oldWineList[i]
            if (itemData.oldWineId == 0) {
                continue
            }
            if(year == 0 || itemData.storeYear == year) {
                wineList.push(Tool.deepCopy(itemData))
            }
        }
        return wineList
    }
    getOldWineId(baseWineId, storeYear) {
        for(let oldWineId in OldWineConfig) {
            let itemConfig = OldWineConfig[oldWineId]
            if(itemConfig.baseWineId == baseWineId && itemConfig.year == storeYear) {
                return itemConfig.oldWineId
            }
        }
    }
    onRspStoreList(serverData) {
        if(serverData.error_code) {
            return
        }
        this.oldWineList.length = 0
        let cellDatas = serverData.items
        let curTime = UserDataManager.instance.getCurTime()
        for(let i = 0, len = cellDatas.length; i < len; i++) {
            let itemData = cellDatas[i]            
            let oldWineId = itemData.id || 0
            let itemOldWine: any = OldWineConfig[oldWineId] || {}
            this.oldWineList.push({
                id: i,
                oldWineId: oldWineId,
                propId: itemOldWine.baseWineId || 0,
                customNum: itemData.num || 0,
                storeYear: itemOldWine.year || 0,
                storeEndTime: curTime + parseInt(itemData.left_time || 0),
                status: itemData.status || 0,   //0：未生产 1：生产中 2：暂停 3:完成
            })
        }
    }
    onRspBuyCellar(serverData) {
        if(serverData.error_code) {
            if(serverData.error_code == 1) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "zqb不足，请充值"
                })
            } else if (serverData.error_code == 2) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "已达扩容上限"
                })
            }
            return
        }
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "扩容成功"
        })
        NetManager.instance.sendMsg("CellarBrewBuildingCmd_CS")
    }
    onRspStoreSpeedup(serverData) {
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "StoreSpeedSucess"
        })
        if (serverData.error_code) {
            return
        }

        //加速音效
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_SPEEDUP)

        NetManager.instance.sendMsg("CellarBrewBuildingCmd_CS")
        
        if(serverData.gather_prop_list && serverData.gather_prop_list.length > 0) {
            let propList = []
            for(let i = 0, len = serverData.gather_prop_list.length; i < len; i++) {
                let itemData = serverData.gather_prop_list[i]
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
    onRspTakeout(serverData) {
        if (serverData.error_code) {
            return
        }
        NetManager.instance.sendMsg("CellarBrewBuildingCmd_CS")
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "StoreGatherSuccess"
        })
        if(serverData.gather_prop_list && serverData.gather_prop_list.length > 0) {
            let propList = []
            for(let i = 0, len = serverData.gather_prop_list.length; i < len; i++) {
                let itemData = serverData.gather_prop_list[i]
                if(itemData.num > 0) {
                    propList.push({
                        propId: itemData.id,
                        customNum: itemData.num
                    })
                }
            }
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.CongratulationsView,
                exData:{
                    propList: propList,
                }
            })
        }else{
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "当前没有可以收货的藏酒"
            })
        }
    }
    
}