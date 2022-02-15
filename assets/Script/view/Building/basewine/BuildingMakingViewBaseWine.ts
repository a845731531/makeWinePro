import { ProduceState } from "../../../Constant/GameEnum";
import UserDataManager from "../../../data/UserDataManager";
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import { Tool } from "../../../framework/manager/Tool";
import { NetManager } from "../../../framework/network/NetManager";
import ProductConfig from "../../../config/ProductConfig";
import DropConfig from "../../../config/DropConfig";
import BuildingMakingView from "../base/BuildingMakingView";
import BuildingCostItem from "../base/BuildingCostItem";
import { SoundEnum } from "../../../Constant/SoundEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingMakingViewBaseWine extends BuildingMakingView {

    @property(cc.Node)
    stepNode: cc.Node = null;
    @property(cc.Node)
    finishNode: cc.Node = null;
    @property(cc.Node)
    rewardParent: cc.Node = null;
    @property(cc.Node)
    rewardItem: cc.Node = null;

    onEnable() {
        this.rewardParent.removeAllChildren()
        super.onEnable()
    }
    updateProduceState() {
        this.unschedule(this.updateProduceTime)

        let produceState = this.buildingData.produceState
        if(produceState == ProduceState.Finished){
            this.updateFinishNode()
        } else if (produceState == ProduceState.Working) {
            let curTime = UserDataManager.instance.getCurTime()
            let produceFinishTime = this.buildingData.produceStartTime + this.buildingData.produceTime
            if (curTime >= produceFinishTime) {
                this.updateFinishNode()
            } else {
                this.stepNode.active = true
                this.finishNode.active = false
                this.btnSpeedUp.active = true;
                this.btnCancel.active = true;
                this.btnGather.active = false;

                this.updateProgress()
                this.schedule(this.updateProduceTime, 1)
            }
        }
    }
    updateProduceTime () {
        let produceFinishTime = this.buildingData.produceStartTime + this.buildingData.produceTime
        let curTime = UserDataManager.instance.getCurTime()
        if(curTime >= produceFinishTime) {
            this.updateFinishNode()
        } else {
            this.updateProgress()
        }
    }

    updateFinishNode() {
        this.btnSpeedUp.active = false;
        this.btnCancel.active = false;
        this.btnGather.active = true;

        this.stepNode.active = false
        this.finishNode.active = true

        if(this.rewardParent.childrenCount == 0) {
            let itemProduct = ProductConfig[this.buildingData.produceType]
            let itemDrop = DropConfig[itemProduct.dropId]
            let rewardList = Tool.getDropList(itemDrop)
            for(let i = 0, len = rewardList.length; i < len; i++) {
                let itemData = rewardList[i]
                let itemNode = cc.instantiate(this.rewardItem)
                itemNode.active = true
                itemNode.parent = this.rewardParent
                
                let itemScript = itemNode.getComponent(BuildingCostItem)
                itemScript && (itemScript.updateView({
                    propId: itemData.propId,
                    num: itemData.num * this.buildingData.produceNum
                }))
            }
        }
    }
    onClickSpeedUp() {
        let produceFinishTime = this.buildingData.produceStartTime + this.buildingData.produceTime
        let curTime = UserDataManager.instance.getCurTime()
        let remainTime = produceFinishTime - curTime
        let freeTime = Tool.getNumberParamConfig("freeSpeedUp")
        if(remainTime <= freeTime) {
            NetManager.instance.sendMsg("AccelerateProduceBrewBuildingCmd_CS", {
                building_id: this.buildingData.buildingType,
                building_index: this.buildingData.buildingIndex
            })
        } else {
            let itemProduct = ProductConfig[this.buildingData.produceType]
            let speedTime = remainTime - Tool.getNumberParamConfig("freeSpeedUp")
            let totalTime = this.buildingData.produceTime
            let totalCost = itemProduct.speedCost * this.buildingData.produceNum / 1000  //speedCost单位是/千克
            let needDiamond = Math.ceil(speedTime / totalTime * totalCost)
            
            EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                content: cc.js.formatStr("是否花费%szqb立刻完成生产?", Tool.formatMoney(needDiamond)),
                showCancel: true,
                confirmCallback: () => {
                    NetManager.instance.sendMsg("AccelerateProduceBrewBuildingCmd_CS", {
                        building_id: this.buildingData.buildingType,
                        building_index: this.buildingData.buildingIndex
                    })
                }
            })
        }
    }
}