import EventManager from "../framework/manager/EventManager";
import { CustomEventEnum } from "../Constant/CustomEventEnum";
import { EventEnum } from "../framework/FrameWorkEnum";
import { Tool } from "../framework/manager/Tool";
import UserDataManager from "../data/UserDataManager";
import StaffDataManager from "../data/StaffDataManager";
import BagDataManager from "../data/BagDataManager";
import BuildingDataManager from "../data/BuildingDataManager";
import WareHouseDataManager from "../data/WareHouseDataManager";
import { PrefabPathEnum } from "../Constant/PrefabPathEnum";
import { itemDiscardType } from "../Constant/GameEnum";
import TargetWineDataManager from "../data/TargetWineDataManager";
import { SoundEnum } from "../Constant/SoundEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HallScene extends cc.Component {

    onLoad() {
        EventManager.instance.dispatchEvent(CustomEventEnum.UPDATE_TOP_VIEW_VISIBLE, true)
    }
    start() {
        this.checkGuide()
        EventManager.instance.dispatchEvent(EventEnum.PLAY_MUSIC, SoundEnum.BGM_HALL)
    }
    
    onEnable(): void {
        EventManager.instance.addEventListener("ManualOpenView", this.onManualOpenView, this)
    }
    checkGuide() {
        this.scheduleOnce(() => {
            EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                type: "EnterHall"
            })           
            
            EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                type: "OwnedMoneyNum",
                param: UserDataManager.instance.getDiamondNum()
            })       
            EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                type: "QuNum",
                param: BagDataManager.instance.getItemNum(31024)
            }) 
        }, 0)
        
        this.scheduleOnce(() => {
            let buildingList = BuildingDataManager.instance.getBuildingList()
            for(let i = 0, len = buildingList.length; i < len; i++) {
                let buildingData = buildingList[i]
                EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                    type: "ProduceState",
                    param: cc.js.formatStr("%s|%s|%s", buildingData.buildingType, buildingData.buildingIndex, buildingData.produceState)
                })
            }
        }, 0.015)
        this.scheduleOnce(() => {
            let staffList = StaffDataManager.instance.getStaffList()
            EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                type: "StaffNum",
                param: staffList.length
            }) 

            let storeNum = WareHouseDataManager.instance.getOldWineStoreNum()
            EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                type: "StoreNum",
                param: storeNum
            }) 

            let formulaList = BagDataManager.instance.getFormulaBagData()
            EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                type: "FormulaNum",
                param: formulaList.length
            }) 

            let oldWineList = BagDataManager.instance.getBagAllOldWine()
            EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                type: "OldWineNum",
                param: oldWineList.length
            }) 

            let codeList = BagDataManager.instance.getEXCodeDataList()
            EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                type: "CodeNum",
                param: codeList.length
            })            

            let wineList = BagDataManager.instance.getWineBagData(itemDiscardType.PICKUP)
            EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                type: "WineNum",
                param: wineList.length
            }) 
            
            let targetWineId = TargetWineDataManager.instance.getTargetWineId()
            EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                type: "TargetWine",
                param: targetWineId
            }) 
            
        }, 0.03)
        
    }
    onDestroy() {
        EventManager.instance.removeTargetListener(this)
    }

    onManualOpenView(viewName) {
        if(PrefabPathEnum[viewName]) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum[viewName]
            })
        }
    }
}
