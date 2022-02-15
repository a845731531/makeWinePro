import { NetMsgDef } from "../../../../resources/pb/NetMsgDef";
import BuildingConfig from "../../../config/BuildingConfig";
import ProductConfig from "../../../config/ProductConfig";
import { BuildingType, MoneyPropId, ProduceState } from "../../../Constant/GameEnum";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";
import BagDataManager from "../../../data/BagDataManager";
import BuildingDataManager from "../../../data/BuildingDataManager";
import { BuildingData } from "../../../data/DataInterface";
import UserDataManager from "../../../data/UserDataManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import { Tool } from "../../../framework/manager/Tool";
import { NetManager } from "../../../framework/network/NetManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingItemInfo extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Node)
    finishNode: cc.Node = null;

    @property(cc.Node)
    progressNode: cc.Node = null;
    @property(cc.Node)
    statusNode: cc.Node = null;

    @property(cc.ProgressBar)
    timeBar: cc.ProgressBar = null;
    @property(cc.Label)
    timeLabel: cc.Label = null;
    
    @property(cc.Node)
    pauseNode: cc.Node = null;
    @property(cc.Sprite)
    pauseIcon: cc.Sprite = null;

    @property(cc.Node)
    speedNode: cc.Node = null;
    @property(cc.Node)
    speedEffectNode: cc.Node = null;
    @property(cc.Label)
    speedCostLabel: cc.Label = null;

    @property(cc.Node)
    guideFinger: cc.Node = null;
    
    protected buildingData: BuildingData = null;
    protected buildingType: number = 0;
    protected buildingIndex: number = 0;

    setBuildingName(buildingType) {
        let itemBuilding = BuildingConfig[buildingType]
        this.nameLabel.string = itemBuilding.name
    }
    
    public updateView(buildingData: BuildingData): void {
        this.buildingType = buildingData.buildingType;
        this.buildingIndex = buildingData.buildingIndex;
        this.buildingData = buildingData

        this.updateProduceState()
    }
    onEnable() {
        if(this.buildingData != null) {
            this.updateProduceState()
        }
    }
    updateProduceState() {
        this.finishNode.active = false
        this.progressNode.active = false;
        this.statusNode.active = false;
        this.pauseNode.active = false
        this.speedNode.active = false

        this.unschedule(this.updateProduceTime)

        let produceState = this.buildingData.produceState
        if(produceState == ProduceState.Pause) {
            this.statusNode.active = true;
            this.pauseNode.active = true
            let frameName = cc.js.formatStr("texture/building/item_status_pause_%s", this.buildingData.pauseReason)
            Tool.loadSpriteFrame(frameName, this.pauseIcon)
        } else if(produceState == ProduceState.Finished){
            this.finishNode.active = true
        } else if (produceState == ProduceState.Working) {
            let curTime = UserDataManager.instance.getCurTime()
            let produceFinishTime = this.buildingData.produceStartTime + this.buildingData.produceTime
            if (curTime >= produceFinishTime) {
                this.finishNode.active = true;
            } else {
                this.progressNode.active = true;
                this.statusNode.active = true;
                this.speedNode.active = true

                this.updateProduceTime()
                this.schedule(this.updateProduceTime, 1)
                this.speedEffectNode.stopAllActions()
                cc.tween(this.speedEffectNode)
                    .set({angle: 0})
                    .by(1.2, {angle: -360})
                    .delay(0.5)
                    .union()
                    .repeatForever()
                    .start()
                    
            }
        }
    }
    updateProduceTime() {
        let produceFinishTime = this.buildingData.produceStartTime + this.buildingData.produceTime
        let curTime = UserDataManager.instance.getCurTime()
        if (curTime >= produceFinishTime) {
            this.finishNode.active = true;
            this.progressNode.active = false;
            this.statusNode.active = false;
            
            this.unschedule(this.updateProduceTime)
        } else {
            this.updateProgress()
        }
    }
    updateProgress() {
        let produceFinishTime = this.buildingData.produceStartTime + this.buildingData.produceTime
        let curTime = UserDataManager.instance.getCurTime()
        this.timeLabel.string = Tool.formatTime(produceFinishTime - curTime);

        let progress = (curTime - this.buildingData.produceStartTime) / this.buildingData.produceTime
        this.timeBar.progress = progress

        let remainTime = produceFinishTime - curTime

        let itemProduct = ProductConfig[this.buildingData.produceType]
        let speedTime = remainTime - Tool.getNumberParamConfig("freeSpeedUp")
        let totalTime = this.buildingData.produceTime
        let totalCost = itemProduct.speedCost * this.buildingData.produceNum / 1000  //speedCost单位是/千克
        let needDiamond = Math.ceil(speedTime / totalTime * totalCost)
        this.speedCostLabel.string = Tool.formatMoney(needDiamond)
    }

    /**
     * 跳转到指定场所后出现的引导手指
     */
    showJumpMaterialFinger()
    {
        if(cc.isValid(this.guideFinger))
        {
            this.guideFinger.active = true
            cc.tween(this.guideFinger)
            .to(.3, { scale: 0.4})
            .to(.3, { scale: 0.3})
            .union()
            .repeat(6) // 执行 2 次
            .call(() => { this.guideFinger.active = false })
            .start();
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
            let itemProduct = ProductConfig[this.buildingData.produceType]
            let speedTime = remainTime - Tool.getNumberParamConfig("freeSpeedUp")
            let totalTime = this.buildingData.produceTime
            let totalCost = itemProduct.speedCost * this.buildingData.produceNum / 1000  //speedCost单位是/千克
            let needDiamond = Math.ceil(speedTime / totalTime * totalCost)
            
            let curDiamond = UserDataManager.instance.getDiamondNum()
            if(curDiamond < needDiamond) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "zqb不足"
                })
                return
            } else {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                    content: cc.js.formatStr("是否花费%s<img src='icon_30002' />加速生产?", Tool.formatMoney(needDiamond)),
                    showCancel: true,
                    confirmCallback: () => {
                        NetManager.instance.sendMsg("AccelerateProduceBrewBuildingCmd_CS", {
                            building_id: this.buildingData.buildingType,
                            building_index: this.buildingData.buildingIndex
                        })
                        // this.buildingData.produceTime = 0
                        // BuildingDataManager.instance.onTestGather(this.buildingData)
                    }
                })
            }
        }

    }
    onClickGather() {        
        if(this.buildingData.buildingType == BuildingType.JiaoChi) {
            EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_GATHER)
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.BuildingStoreWine,
                exData: {
                    buildingData: this.buildingData,
                },
            })
        } else {
            NetManager.instance.sendMsg("GatherBrewBuildingCmd_CS", {
                building_id: this.buildingData.buildingType,
                building_index: this.buildingData.buildingIndex
            })
        }
    }


    onClickResume() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        //除草  施肥  test
        NetManager.instance.sendMsg("ResumeProduceBrewBuildingCmd_CS", {
            building_id: this.buildingData.buildingType,
            building_index: this.buildingData.buildingIndex
        })
    }
}