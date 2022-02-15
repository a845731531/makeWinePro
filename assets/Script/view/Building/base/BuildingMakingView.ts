import BuildingDataManager from "../../../data/BuildingDataManager";
import ProduceStepConfig from "../../../config/ProduceStepConfig";
import PropConfig from "../../../config/PropConfig";
import { BuildingType, MoneyPropId, ProduceState } from "../../../Constant/GameEnum";
import { BuildingData } from "../../../data/DataInterface";
import UserDataManager from "../../../data/UserDataManager";
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import { Tool } from "../../../framework/manager/Tool";
import { NetMsgDef } from "../../../../resources/pb/NetMsgDef";
import { NetManager } from "../../../framework/network/NetManager";
import BagItemView from "../../Bag/BagItemView";
import ProductConfig from "../../../config/ProductConfig";
import BuildingStaffSelectNode from "../../Staff/BuildingStaffNode";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingMakingView extends cc.Component {

    @property(cc.Node)
    staffAddNode: cc.Node = null;

    @property(cc.Label)
    stepLabel: cc.Label = null;
    @property(cc.Label)
    stepNumLabel: cc.Label = null;

    @property(BagItemView)
    targetItemInfo: BagItemView = null;

    @property(cc.Sprite)
    nameSpr: cc.Sprite = null;
    @property(cc.Label)
    timeLabel: cc.Label = null;
    @property(cc.Label)
    numBuffLabel: cc.Label = null;
    @property(cc.Node)
    numBuffEffect: cc.Node = null;
    
    @property(cc.Node)
    stepParent: cc.Node = null;
    @property(cc.Node)
    stepItemPre: cc.Node = null;

    @property(cc.Node)
    btnSpeedUp: cc.Node = null;
    @property(cc.Node)
    costNode: cc.Node = null;
    @property(cc.Label)
    costNumLabel: cc.Label = null;

    @property(cc.Node)
    btnGather: cc.Node = null;
    @property(cc.Node)
    btnCancel: cc.Node = null;

    protected buildingData: BuildingData;
    private allStepList = {}
    private stepTotalTimeRate = {}
    private totalTimeRate = 0;
    private lastStep = -1;
    private lastSubStep = -1;
    private staffId = null;

    onLoad()
    {
        this.addListener()
    }

    addListener()
    {
        EventManager.instance.addEventListener("rspBuildingChangeStaff",this.onRspChangeStaff,this)
        EventManager.instance.addEventListener("AccelerateProduceBrewBuildingCmd_SC", this.onRspSpeedUp, this)
        EventManager.instance.addEventListener("ResumeProduceBrewBuildingCmd_SC", this.onRspSpeedUp, this)
    }

    removeListener()
    {
        EventManager.instance.removeTargetListener(this)
    }

    onDestroy() {
        this.removeListener()
    }

    initByExData(exData) {
        this.updateView(exData.buildingData)
    }

    updateView(buildingData)
    {
        this.buildingData = buildingData
        if(this.nameSpr) {
            let nameFrameName = cc.js.formatStr("texture/building/building_name_%s", this.buildingData.buildingType)
            Tool.loadSpriteFrame(nameFrameName, this.nameSpr)
        }

        this.initStepList()
        if(this.node.active && this.buildingData.produceType > 0) {
            this.updateProduceState()
        }

        this.updateStaffView()
        this.updateNumBuff()

    }

    updateStaffView()
    {
        this.staffId = this.buildingData.staffId
        if(this.staffAddNode)
        {
            this.staffAddNode.getComponent(BuildingStaffSelectNode).updateView({
                buildingData: this.buildingData,
            })
        }
    }
    addStaff(staffId)
    {
        this.buildingData.staffId = staffId
        this.updateStaffView()
    }
    
    updateNumBuff() {
        if(!this.numBuffLabel) {
            return
        }
        let gameScore = this.buildingData.smallGameScore || 0
        if(gameScore <= 0) {
            this.numBuffLabel.string = "+0%"
            this.numBuffEffect.active = false
        } else {
            let buff = BuildingDataManager.instance.getGameBuff(gameScore)
            this.numBuffLabel.string = cc.js.formatStr("+%s%", buff)
            this.numBuffEffect.active = true
        }
    }

    initStepList() {
        this.totalTimeRate = 0;
        this.stepTotalTimeRate = {}

        let maxStep = 100
        if(this.buildingData.buildingType == BuildingType.JiaoChi) {
            let productId = this.buildingData.produceType
            let itemProp = PropConfig[productId]
            if(!itemProp) {
                return
            }
            maxStep = itemProp.subId + 2
        }
        for(let id in ProduceStepConfig) {
            let itemConfig = ProduceStepConfig[id]
            if(itemConfig.buildingType == this.buildingData.buildingType) {
                let curStepList = this.allStepList[itemConfig.stepId]
                let curStepTime = this.stepTotalTimeRate[itemConfig.stepId] || 0
                if(!curStepList) {
                    curStepList = {}
                    this.allStepList[itemConfig.stepId] = curStepList
                }
                curStepList[itemConfig.subStepId] = itemConfig
                curStepTime += itemConfig.timeRate
                if(itemConfig.stepId <= maxStep) {
                    this.totalTimeRate += itemConfig.timeRate
                    this.stepTotalTimeRate[itemConfig.stepId] = curStepTime
                }
            }
        }
    }
    onEnable() {
        if(this.buildingData != null) {
            this.updateProduceState()
        }
    }
    updateProduceState() {        
        if(this.targetItemInfo) {
            this.targetItemInfo.updateView({
                propId: this.buildingData.produceType,
                customNum: "",
                showName: true,
                hideClick: true,
            })
        }
        this.unschedule(this.updateProduceTime)

        let produceState = this.buildingData.produceState
        if(produceState == ProduceState.Finished){
            this.btnSpeedUp.active = false;
            this.btnCancel.active = false;
            this.btnGather.active = true;
            this.updateProgress()
        } else {
            let produceFinishTime = this.buildingData.produceStartTime + this.buildingData.produceTime
            if(produceFinishTime && produceFinishTime > 0) {
                let curTime = UserDataManager.instance.getCurTime()
                if(curTime >= produceFinishTime) {
                    this.btnSpeedUp.active = false;
                    this.btnCancel.active = false;
                    this.btnGather.active = true;
                    
                    this.updateProgress()
                } else {
                    this.btnSpeedUp.active = true;
                    this.btnCancel.active = true;
                    this.btnGather.active = false;
                    
                    this.updateProduceTime()
                    this.unschedule(this.updateProduceTime)
                    this.schedule(this.updateProduceTime, 1)
                }
            }
        }
    }
    updateProduceTime () {
        let produceFinishTime = this.buildingData.produceStartTime + this.buildingData.produceTime
        if(produceFinishTime) {
            let curTime = UserDataManager.instance.getCurTime()
            if(curTime >= produceFinishTime) {
                this.btnSpeedUp.active = false;
                this.btnCancel.active = false;
                this.btnGather.active = true;
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
        
        let passedTime = curTime - this.buildingData.produceStartTime
        let singleTime = this.buildingData.produceTime / this.totalTimeRate
        let curStep = 1
        for(let i = 1; i < 10; i++) {
            let stepRate = this.stepTotalTimeRate[i]
            if(!stepRate) {
                continue
            }
            let stepTime = singleTime * stepRate
            if(passedTime < stepTime) {
                curStep = i
                break
            } else {
                passedTime -= stepTime
            }
        }
        let curSubStep = 1
        let subStepPassTime = passedTime
        let stepConfig = this.allStepList[curStep]
        for(let i = 1; i < 10; i++) {
            let itemConfig = stepConfig[i]
            if(!itemConfig) {
                continue
            }
            let subStepTime = singleTime * itemConfig.timeRate
            if(subStepPassTime < subStepTime) {
                curSubStep = i
                break
            } else {
                subStepPassTime -= subStepTime
            }
        }
        
        let curConfig = stepConfig[curSubStep]

        if(this.lastStep != curStep || this.lastSubStep != curSubStep) {
            this.updateStepDesc(curConfig, singleTime)
            this.lastStep = curStep
            this.lastSubStep = curSubStep
        }

        let itemProduct = ProductConfig[this.buildingData.produceType]
        let speedTime = remainTime - Tool.getNumberParamConfig("freeSpeedUp")
        let totalTime = this.buildingData.produceTime
        let totalCost = itemProduct.speedCost * this.buildingData.produceNum / 1000  //speedCost单位是/千克
        let needDiamond = Math.ceil(speedTime / totalTime * totalCost)
        if(needDiamond > 0) {
            this.costNode.active = true
            this.costNumLabel.string =Tool.formatMoney(needDiamond)
        } else {
            this.costNode.active = false
        }
    }

    updateStepDesc(stepConfig, singleTime) {
        this.stepLabel.string = cc.js.formatStr("%s工序流程", stepConfig.stepName)
        this.stepParent.removeAllChildren()
        let subStepList = this.allStepList[stepConfig.stepId]
        subStepList = Object.values(subStepList)
        this.stepNumLabel.string = cc.js.formatStr("%s", subStepList.length)
        for(let i = 0, len = subStepList.length; i < len; i++) {
            let subStepConfig = subStepList[i]
            let itemStepNode = cc.instantiate(this.stepItemPre) as any
            itemStepNode.active = true
            itemStepNode.parent = this.stepParent
            itemStepNode.indexLabel.string = Tool.getChinaNumber(i + 1)
            itemStepNode.nameLabel.string = subStepConfig.subStepName
            itemStepNode.timeLabel.string = Tool.formatTime(Math.floor(singleTime * subStepConfig.timeRate))
            itemStepNode.finishNode.active = (subStepConfig.subStepId < stepConfig.subStepId)
            itemStepNode.todoNode.active = (subStepConfig.subStepId >= stepConfig.subStepId)

            cc.Tween.stopAllByTarget(itemStepNode.indexLabel.node.parent)
            if(subStepConfig.subStepId == stepConfig.subStepId) {
                itemStepNode.timeLabel.node.color = cc.color(251, 238, 234, 255)
                itemStepNode.timeLabel.node.opacity = 255
                itemStepNode.todoNode.opacity = 255
                cc.tween(itemStepNode.indexLabel.node.parent)
                    .to(0.8, {scale: 1.5})
                    .to(0.2, {scale: 1})
                    .union()
                    .repeatForever()
                    .start()
                itemStepNode.timeLabel.node
            } else if (subStepConfig.subStepId > stepConfig.subStepId) {
                itemStepNode.timeLabel.node.opacity = 180
                itemStepNode.todoNode.opacity = 180
            } else {
                itemStepNode.timeLabel.node.opacity = 41
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
    onClickGather() {
        if(this.buildingData.buildingType == BuildingType.JiaoChi) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.BuildingStoreWine,
                exData: {
                    buildingData: this.buildingData,
                },
            })
        }  else {
            NetManager.instance.sendMsg("GatherBrewBuildingCmd_CS", {
                building_id: this.buildingData.buildingType,
                building_index: this.buildingData.buildingIndex
            })
        }
    }
    onClickCancel() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: "取消后资源不返回，确定取消？",
            showCancel: true,
            confirmCallback: () => {
                NetManager.instance.sendMsg("ReqCancel", {
                    buildingId: this.buildingData.buildingId,
                })
                
                EventManager.instance.dispatchEvent("UpdateBrewBuildingCmd_SC", {
                    buildingData: {
                        buildingId: this.buildingData.buildingId,
                        produceState: ProduceState.Idle
                    }
                })
            }
        })
    }
    onClickSmallGame() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        if(this.buildingData.buildingType == BuildingType.ZhiQu) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.SmallGameZhiqu,
                exData: {
                    buildingData: this.buildingData
                }
            })
        } else if (this.buildingData.buildingType == BuildingType.JiaoChi) {            
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.SmallGameBaseWine,
                exData: {
                    buildingData: this.buildingData
                }
            })
        }
    }
    onRspSpeedUp(eventData) {
        if(eventData.error_code) {
            return
        }
        if (eventData.building_data.building_id != this.buildingData.buildingType || 
            eventData.building_data.building_index != this.buildingData.buildingIndex) {
            return
        }
        this.buildingData = BuildingDataManager.instance.getBuildingData(this.buildingData.buildingType, this.buildingData.buildingIndex)
        this.updateView(this.buildingData)
    }
    
    onRspChangeStaff()
    {
        let data = BuildingDataManager.instance.getBuildingDataById(this.buildingData.buildingId)
        this.updateView(data)
    }
}