import BuildingDataManager from "../../../data/BuildingDataManager";
import ProduceStepConfig from "../../../config/ProduceStepConfig";
import PropConfig from "../../../config/PropConfig";
import { BuildingType, MoneyPropId, ProduceState } from "../../../Constant/GameEnum";
import { BuildingData } from "../../../data/DataInterface";
import UserDataManager from "../../../data/UserDataManager";
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import { Tool } from "../../../framework/manager/Tool";
import { NetManager } from "../../../framework/network/NetManager";
import BuildingConfig from "../../../config/BuildingConfig";
import { NetMsgDef } from "../../../../resources/pb/NetMsgDef";
import FramlandStepItemView from "./FramlandStrpItemView";
import BagDataManager from "../../../data/BagDataManager";
import ProductConfig from "../../../config/ProductConfig";
import BuildingStaffSelectNode from "../../Staff/BuildingStaffNode";
import { SoundEnum } from "../../../Constant/SoundEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingMakingViewFramland extends cc.Component {

    @property(cc.Node)
    staffAddNode: cc.Node = null;

    @property(cc.Sprite)
    itemIcon: cc.Sprite = null;

    @property(cc.Sprite)
    itemFrame: cc.Sprite = null;

    @property(cc.Label)
    countLabel: cc.Label = null;

    @property(cc.Label)
    peopleLabel: cc.Label = null;

    @property(cc.Node)
    timeNode: cc.Node = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    @property(cc.Node)
    stepParent: cc.Node = null;

    @property(cc.Node)
    btnSpeedUp: cc.Node = null;

    @property(cc.Button)
    btnGather: cc.Button = null;

    @property(cc.Node)
    costNode: cc.Node = null;

    @property(cc.Label)
    costLabel: cc.Label = null;

    private buildingData: BuildingData;
    private totalTimeRate = 0
    private stepTimeRateList = []

    private stepItemList = []

    private staffId = 0 

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
        let itemConfig = PropConfig[this.buildingData.produceType]
        if(itemConfig) {
            let staffOptions = BuildingConfig[this.buildingData.buildingType].yieldOptions
            let index = staffOptions.indexOf(this.buildingData.produceNum)
            this.peopleLabel.string = Tool.getStringParamConfig("framlandStaffCount",index)
            this.countLabel.string = Tool.unitConversion(this.buildingData.produceNum)

            let propId = this.buildingData.produceType
            let frameName = BagDataManager.instance.getItemIconById(propId)
            Tool.loadSpriteFrame(frameName, this.itemIcon)
    
            let quality = PropConfig[propId].quality
            frameName = cc.js.formatStr("texture/bag/icon_border_%d", quality)

            this.initStepList()
            this.updateStaffView()
            this.updateProduceState()
        }
    }

    onRspChangeStaff()
    {
        let data = BuildingDataManager.instance.getBuildingDataById(this.buildingData.buildingId)
        this.updateView(data)
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
    
    onEnable() {
        if(this.buildingData != null) {
            this.updateProduceState()
        }
    }

    initStepList() {
        this.totalTimeRate = 0;

        this.stepItemList = []
        this.stepTimeRateList = []
        let index = 0
        for(let id in ProduceStepConfig) {
            let itemConfig = ProduceStepConfig[id]
            if(itemConfig.buildingType == this.buildingData.buildingType) {

                this.stepTimeRateList.push(itemConfig.timeRate)
                this.totalTimeRate += itemConfig.timeRate

                if(this.stepParent.children.length > 0)
                {
                    this.stepItemList.push(this.stepParent.children[index])
                    index++
                }
            }
        }
    }

    updateProduceState() {
        let produceState = this.buildingData.produceState
        if(produceState == ProduceState.Finished){
            this.unschedule(this.updateProduceTime)
            this.btnSpeedUp.active = false;
            this.btnGather.node.active = true
            this.costNode.active = false
            this.timeNode.active = false
            this.updateStepNode()
        } else {
            this.timeNode.active = true
            let produceFinishTime = this.buildingData.produceStartTime + this.buildingData.produceTime
            if(produceFinishTime && produceFinishTime > 0) {
                let curTime = UserDataManager.instance.getCurTime()
                if(curTime >= produceFinishTime) {
                    this.btnSpeedUp.active = false;
                    this.btnGather.node.active = true
                } else {
                    this.btnSpeedUp.active = true;
                    this.btnGather.node.active = (this.buildingData.buildingType == BuildingType.JiaoChi)
                    this.updateProduceTime()
                    this.unschedule(this.updateProduceTime)
                    this.schedule(this.updateProduceTime, 1)
                }
            }
        }
    }

    updateProduceTime () {
        let produceState = this.buildingData.produceState
        if(produceState != ProduceState.Finished){
            let produceFinishTime = this.buildingData.produceStartTime + this.buildingData.produceTime
            if(produceFinishTime) {
                let curTime = UserDataManager.instance.getCurTime()
                if(curTime >= produceFinishTime) {
                    this.btnSpeedUp.active = false;
                    this.btnGather.node.active = true
                    this.unschedule(this.updateProduceTime)
                    this.updateProgress()
                } else {
                    this.updateProgress()
                }
            }
        }
    }

    updateProgress() {
        let produceFinishTime = this.buildingData.produceStartTime + this.buildingData.produceTime
        let curTime = UserDataManager.instance.getCurTime()
        curTime = Math.min(curTime, produceFinishTime)
        let remainTime = produceFinishTime - curTime
        this.timeLabel.string = Tool.formatTime(remainTime);

        this.updateStepNode(remainTime,this.buildingData.produceTime)
        let itemProduct = ProductConfig[this.buildingData.produceType]
        let speedTime = remainTime - Tool.getNumberParamConfig("freeSpeedUp")
        let totalTime = this.buildingData.produceTime
        let totalCost = itemProduct.speedCost * this.buildingData.produceNum / 1000  //speedCost单位是/千克
        let needDiamond = Math.ceil(speedTime / totalTime * totalCost)
        if(needDiamond > 0) {
            this.costNode.active = true
            this.costLabel.string = Tool.formatMoney(needDiamond)

        } else {
            this.costNode.active = false
        }
    }

    updateStepNode(remainTime?,produceTime?) {

        let curIndex = 0

        let produceState = this.buildingData.produceState
        if(produceState == ProduceState.Finished){
            curIndex = this.stepTimeRateList.length  - 1
        }else{
            //当前完成的进度
            let curPro = (produceTime - remainTime) / produceTime
            let stepPro = 0
            let isFind = false
            for(let i = 0; i < this.stepTimeRateList.length; i++)
            {
                stepPro += this.stepTimeRateList[i]
                if(!isFind && stepPro / this.totalTimeRate > curPro)
                {
                    curIndex = i == 0? i : i - 1
                    isFind = true
                    break
                }
            }
        }

        for(let i = 0; i < 10; i++)
        {
            let item = this.stepItemList[i]
            item.getComponent(FramlandStepItemView).updateView(i,curIndex)
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
        NetManager.instance.sendMsg("GatherBrewBuildingCmd_CS", {
            building_id: this.buildingData.buildingType,
            building_index: this.buildingData.buildingIndex
        })
        //TODO
        // BuildingDataManager.instance.onTestGather(this.buildingData)
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
}