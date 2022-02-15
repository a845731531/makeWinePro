
import { NetMsgDef } from "../../../../resources/pb/NetMsgDef";
import BuildingDataManager from "../../../data/BuildingDataManager";
import { BuildingData, OldWineData } from "../../../data/DataInterface";
import UserDataManager from "../../../data/UserDataManager";
import EventManager from "../../../framework/manager/EventManager";
import { NetManager } from "../../../framework/network/NetManager";
import PropConfig from "../../../config/PropConfig";
import List from "../../../framework/component/List";
import OldWineConfig from "../../../config/OldWineConfig";
import WareHouseDataManager from "../../../data/WareHouseDataManager";
import StoreTimeConfig from "../../../config/StoreTimeConfig";
import BaseView from "../../../framework/viewbase/BaseView";
import BuildingConfig from "../../../config/BuildingConfig";
import BuildingStoreYearChoose from "./BuildingStoreYearChoose";
import { Tool } from "../../../framework/manager/Tool";
import { SoundEnum } from "../../../Constant/SoundEnum";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import ProductConfig from "../../../config/ProductConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingStoreView extends BaseView {
    @property(cc.Label)
    nameLabel: cc.Label = null

    
    @property(BuildingStoreYearChoose)
    yearChoose: BuildingStoreYearChoose = null

    @property(List)
    itemList: List = null


    @property(cc.Label)
    capacityLabel: cc.Label = null
    @property(cc.Label)
    extendCapacityLabel: cc.Label = null
    @property(cc.Label)
    curStoreLabel: cc.Label = null

    private buildingData: BuildingData = null;
    private oldWineData: OldWineData[];
    private curYear: number = 0;

    initByExData(exData) {
        this.buildingData = exData.buildingData
        
        if(this.buildingData) {
            this.updateItemList()
        }
        this.yearChoose.addYearChangedListener(this.onSelectYear.bind(this))
    }
    onEnable() {
        EventManager.instance.addEventListener("CellarBrewBuildingCmd_SC", this.onRspCellarList, this)
        
        if(this.buildingData) {
            this.buildingData = BuildingDataManager.instance.getBuildingData(this.buildingData.buildingType, this.buildingData.buildingIndex)
            this.updateItemList()
        }
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
        super.onDisable()
    }
    
    updateItemList() {         
        this.oldWineData = WareHouseDataManager.instance.getOldWineByYear(this.curYear)
        let curVat = WareHouseDataManager.instance.getOldWineVatNum()
        let maxVat = WareHouseDataManager.instance.getWareHouseMaxVat()
        let emptyVat = Math.max(0, maxVat - curVat)

        if(curVat >= maxVat) {
            this.itemList.numItems = maxVat
        } else {
            this.itemList.numItems = this.oldWineData.length + 1 + emptyVat
        }

        let cellarCapacity = Tool.getNumberParamConfig("cellarCapacity")
        let curCapacity = cellarCapacity * curVat
        let extendCapacity = (curVat >= maxVat) ? curCapacity : (curCapacity + cellarCapacity)
        this.capacityLabel.string = Tool.unitConversion(curCapacity)
        this.extendCapacityLabel.string = Tool.unitConversion(extendCapacity)

        let storeNum = WareHouseDataManager.instance.getOldWineStoreNum()
        this.curStoreLabel.string = Tool.unitConversion(storeNum)
    }
    onRenderList(itemNode, index) {
        let itemScript = itemNode.getComponent("BuildingStoreViewItem")
        itemScript.updateView(this.oldWineData[index])
    }
    onSelectYear(customData) {
        this.curYear = parseInt(customData)
        this.updateItemList()
    }
    onClickCollectAll() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        NetManager.instance.sendMsg("GatherCellarBrewBuildingCmd_CS", {
            cellar_index: -1
        })        
    }
    onClickSpeedAll() {    
        let needDiamond = 0
        for(let i = 0; i < this.oldWineData.length; i++)
        {
            if(this.oldWineData[i].status == 1)
            {
                //生产中的才能加速
                let finishTime = this.oldWineData[i].storeEndTime
                let curTime = UserDataManager.instance.getCurTime()
                let remainTime = finishTime - curTime
                let itemProduct = ProductConfig[this.oldWineData[i].oldWineId]
                let speedTime = remainTime - Tool.getNumberParamConfig("freeSpeedUp")
                let totalTime = itemProduct.produceTime
                let totalCost = itemProduct.speedCost * this.oldWineData[i].customNum / 1000  //speedCost单位是/千克
                needDiamond += Math.ceil(speedTime / totalTime * totalCost / 1000)
            }
        }
        let curDiamond = UserDataManager.instance.getDiamondNum()
        if(needDiamond > 0 && curDiamond < needDiamond)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "zqb不足！"
            })
            return
        }

        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: cc.js.formatStr("是否花费%s<img src='icon_30002' />一键加速？", needDiamond),
            showCancel: true,
            confirmCallback: () => {
                NetManager.instance.sendMsg("AccelerateCellarBrewBuildingCmd_CS", {
                    cellar_index: -1,
                })
            }
        })

    }

    onRspCellarList() {
        this.updateItemList()
    }
}
