import BuildingDataManager from "../../../data/BuildingDataManager";
import PropConfig from "../../../config/PropConfig";
import { BuildingType, ProduceState } from "../../../Constant/GameEnum";
import { BuildingData } from "../../../data/DataInterface";
import UserDataManager from "../../../data/UserDataManager";
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import { Tool } from "../../../framework/manager/Tool";
import { NetManager } from "../../../framework/network/NetManager";
import BuildingConfig from "../../../config/BuildingConfig";
import BagDataManager from "../../../data/BagDataManager";
import ProductConfig from "../../../config/ProductConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingMakingViewWaterwheel extends cc.Component {
    
    @property(cc.Node)
    staffAddNode: cc.Node = null;

    @property(cc.Sprite)
    itemIcon: cc.Sprite = null;

    @property(cc.Sprite)
    itemFrame: cc.Sprite = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    carLabel: cc.Label = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    @property(cc.Node)
    timeNode: cc.Node = null;

    @property(cc.Node)
    btnSpeedUp: cc.Node = null;

    @property(cc.Button)
    btnGather: cc.Button = null;

    @property(cc.Node)
    costNode: cc.Node = null;

    @property(cc.Label)
    costLabel: cc.Label = null;

    @property(cc.Label)
    costTip: cc.Label = null;

    private buildingData: BuildingData;
    private staffId = null

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
            this.carLabel.string = Tool.getStringParamConfig("waterWheelCar",index)

            let propId = this.buildingData.produceType
            let frameName = BagDataManager.instance.getItemIconById(propId)
            Tool.loadSpriteFrame(frameName, this.itemIcon)
    
            let quality = PropConfig[propId].quality
            frameName = cc.js.formatStr("texture/bag/icon_border_%d", quality)
    
            this.nameLabel.string = PropConfig[propId].name

            this.updateProduceState()
        }
    }

    onRspChangeStaff()
    {
        let data = BuildingDataManager.instance.getBuildingDataById(this.buildingData.buildingId)
        this.updateView(data)
    }

    
    onEnable() {
        if(this.buildingData != null) {
            this.updateProduceState()
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
        } else {
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
                    this.btnGather.interactable = true
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
        
        let itemProduct = ProductConfig[this.buildingData.produceType]
        let speedTime = remainTime - Tool.getNumberParamConfig("freeSpeedUp")
        let totalTime = this.buildingData.produceTime
        let totalCost = itemProduct.speedCost * this.buildingData.produceNum / 1000  //speedCost单位是/千克
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