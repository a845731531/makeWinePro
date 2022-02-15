import OldWineConfig from "../../../config/OldWineConfig";
import PropConfig from "../../../config/PropConfig";
import StoreTimeConfig from "../../../config/StoreTimeConfig";
import { Config } from "../../../Constant/Config";
import { BuildingData, OldWineData } from "../../../data/DataInterface";
import UserDataManager from "../../../data/UserDataManager";
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import { Tool } from "../../../framework/manager/Tool";
import BaseView from "../../../framework/viewbase/BaseView";
import BagItemView from "../../Bag/BagItemView";
import { NetMsgDef } from "../../../../resources/pb/NetMsgDef";
import { MoneyPropId } from "../../../Constant/GameEnum";
import WareHouseDataManager from "../../../data/WareHouseDataManager";
import { NetManager } from "../../../framework/network/NetManager";
import ProductConfig from "../../../config/ProductConfig";
import { SoundEnum } from "../../../Constant/SoundEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingInStoreView extends BaseView {
    
    @property(BagItemView)
    bagItemView: BagItemView = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;
    @property(cc.Label)
    numLabel: cc.Label = null;

    @property(cc.Node)
    btnSpeedUp: cc.Node = null;
    @property(cc.Node)
    costNode: cc.Node = null;
    @property(cc.Label)
    costLabel: cc.Label = null;
    @property(cc.Label)
    costTip: cc.Label = null;

    protected oldWineData: OldWineData;

    initByExData(exData) {
        this.oldWineData = exData
        let oldWineId = this.oldWineData.oldWineId
        this.bagItemView.updateView({
            propId: oldWineId,
            customNum: "",
            showName: true
        })
        this.numLabel.string = Tool.unitConversion(this.oldWineData.customNum)
        this.updateStoreState()
    }
    onEnable() {
        EventManager.instance.addEventListener("AccelerateCellarBrewBuildingCmd_SC", this.onRspStoreSpeedup, this)
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    updateStoreState() {
        let finishTime = this.oldWineData.storeEndTime
        let curTime = UserDataManager.instance.getCurTime()
        if(this.oldWineData.status == 3 || curTime >= finishTime) {
            this.btnSpeedUp.active = false;
        } else {
            this.btnSpeedUp.active = true
            this.updateStoreTime()
            this.unschedule(this.updateStoreTime)
            this.schedule(this.updateStoreTime, 1)
        }
    }
    updateStoreTime () {
        let finishTime = this.oldWineData.storeEndTime
        let curTime = UserDataManager.instance.getCurTime()
        if(curTime >= finishTime) {
            this.btnSpeedUp.active = false;
            this.unschedule(this.updateStoreTime)
        } else {
            this.updateProgress()
        }
    }
    updateProgress() { 
        let storeConfig = StoreTimeConfig[this.oldWineData.storeYear]
        let finishTime = this.oldWineData.storeEndTime
        let curTime = UserDataManager.instance.getCurTime()
        let remainTime = finishTime - curTime
        this.timeLabel.string = Tool.formatTime(remainTime);
        
        let itemProduct = ProductConfig[this.oldWineData.oldWineId]
        let speedTime = remainTime - Tool.getNumberParamConfig("freeSpeedUp")
        let totalTime = itemProduct.produceTime
        let totalCost = itemProduct.speedCost * this.oldWineData.customNum / 1000  //speedCost单位是/千克
        let needDiamond = Math.ceil(speedTime / totalTime * totalCost)
        if(needDiamond > 0) {
            this.costNode.active = true
            this.costLabel.string = Tool.formatMoney(needDiamond)
            this.costTip.string = "立刻完成"            
        } else {
            this.costNode.active = false
            this.costTip.string = "立刻完成"
        }
    }

    onClickSpeedUp() {
        //TODO
        let storeConfig = StoreTimeConfig[this.oldWineData.storeYear]
        let finishTime = this.oldWineData.storeEndTime
        let curTime = UserDataManager.instance.getCurTime()
        let remainTime = finishTime - curTime
        let itemProduct = ProductConfig[this.oldWineData.oldWineId]
        let speedTime = remainTime - Tool.getNumberParamConfig("freeSpeedUp")
        let totalTime = itemProduct.produceTime
        let totalCost = itemProduct.speedCost * this.oldWineData.customNum / 1000  //speedCost单位是/千克
        let needDiamond = Math.ceil(speedTime / totalTime * totalCost)
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: cc.js.formatStr("是否花费%s<img src='icon_30002' />立刻完成?", Tool.formatMoney(needDiamond)),
            showCancel: true,
            confirmCallback: () => {
                NetManager.instance.sendMsg("AccelerateCellarBrewBuildingCmd_CS", {
                    cellar_index: this.oldWineData.id,
                })
            }
        })
    }
    onRspStoreSpeedup(serverData) {
        if (serverData.error_code) {
            return
        }
        this.onCloseView()
    }
}