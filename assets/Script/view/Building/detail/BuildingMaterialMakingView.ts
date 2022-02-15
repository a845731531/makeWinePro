import { NetMsgDef } from "../../../../resources/pb/NetMsgDef";
import { BuildingType, MoneyPropId } from "../../../Constant/GameEnum";
import BuildingDataManager from "../../../data/BuildingDataManager";
import { BuildingData } from "../../../data/DataInterface";
import UserDataManager from "../../../data/UserDataManager";
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import { Tool } from "../../../framework/manager/Tool";
import { NetManager } from "../../../framework/network/NetManager";
import BagItemView from "../../Bag/BagItemView";
import { SoundEnum } from "../../../Constant/SoundEnum";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingMaterialMakingView extends cc.Component {

    @property(BagItemView)
    productItemInfo: BagItemView = null;

    @property(cc.Label)
    produceNumLabel: cc.Label = null
    @property(cc.Label)
    timeLabel: cc.Label = null;
    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    @property(cc.Node)
    btnSpeedUp: cc.Node = null;
    @property(cc.Node)
    costNode: cc.Node = null;
    @property(cc.Label)
    costLabel: cc.Label = null;
    @property(cc.Label)
    costTip: cc.Label = null;

    @property(cc.Button)
    btnGather: cc.Button = null;


    private buildingData: BuildingData;
    initByExData(exData) {
        this.buildingData = exData.buildingData

        this.produceNumLabel.string = Tool.unitConversion(this.buildingData.produceNum)
        this.updateProduceState()
    }
    onEnable() {
        this.updateProduceState()
    }
    updateProduceState() {
        if(this.buildingData == null) {
            return
        }
        let produceFinishTime = this.buildingData.produceStartTime + this.buildingData.produceTime
        if(produceFinishTime && produceFinishTime > 0) {
            let curTime = UserDataManager.instance.getCurTime()
            if(curTime >= produceFinishTime) {
                this.btnSpeedUp.active = false;
                this.btnGather.interactable = true
            } else {
                this.btnSpeedUp.active = true;
                this.btnGather.interactable = false
                this.updateProduceTime()
                this.unschedule(this.updateProduceTime)
                this.schedule(this.updateProduceTime, 1)
            }
            let produceId = this.buildingData.produceType
            this.productItemInfo.updateView({
                propId: produceId,
                showName: true,
                customNum: "",
                hideClick: true
            })
        }
    }
    updateProduceTime () {
        let produceFinishTime = this.buildingData.produceStartTime + this.buildingData.produceTime
        if(produceFinishTime) {
            let curTime = UserDataManager.instance.getCurTime()
            if(curTime >= produceFinishTime) {
                this.btnSpeedUp.active = false;
                this.btnGather.interactable = true
                this.btnGather.node.x = 0
                this.unschedule(this.updateProduceTime)
                this.updateProgress()
            } else {
                this.updateProgress()
            }
        }
    }
    updateProgress() {
        let produceFinishTime = this.buildingData.produceStartTime + this.buildingData.produceTime
        let curTime = UserDataManager.instance.getCurTime()
        curTime = Math.min(curTime, produceFinishTime)
        let remainTime = produceFinishTime - curTime
        this.timeLabel.string = Tool.formatTime(remainTime);
        this.progressBar.progress = (curTime - this.buildingData.produceStartTime) / this.buildingData.produceTime

        let needDiamond = Math.ceil((remainTime - Tool.getNumberParamConfig("freeSpeedUp") / 60 * Tool.getNumberParamConfig("speedUpDiamondCost")))
        if(needDiamond > 0) {
            this.costNode.active = true
            this.costLabel.string = "" + needDiamond
            this.costTip.string = "立刻完成"
        } else {
            this.costNode.active = false
            this.costTip.string = "立刻完成"
        }
    }

    onClickSpeedUp() {
        //TODO
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
            //TODO
            let price = Tool.getNumberParamConfig("speedUpDiamondCost")            
            let needDiamond = Math.ceil((remainTime - freeTime) / 60 * price)
            let curDiamond = UserDataManager.instance.getDiamondNum()
            if(curDiamond < needDiamond) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "zqb不足"
                })
                return
            } else {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                    content: cc.js.formatStr("是否花费%s<img src='icon_30002' />加速生产?", needDiamond),
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
    onClickGather() {
        NetManager.instance.sendMsg("GatherBrewBuildingCmd_CS", {
            building_id: this.buildingData.buildingType,
            building_index: this.buildingData.buildingIndex
        })
        // BuildingDataManager.instance.onTestGather(this.buildingData)
    }
}