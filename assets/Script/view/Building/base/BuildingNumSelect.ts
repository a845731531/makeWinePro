
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import { Tool } from "../../../framework/manager/Tool";
import BuildingConfig from "../../../config/BuildingConfig";
import TargetWineDataManager from "../../../data/TargetWineDataManager";
import { SoundEnum } from "../../../Constant/SoundEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingNumSelect extends cc.Component {

    @property(cc.Node)
    targetNode: cc.Node = null;
    @property(cc.Label)
    targetNum: cc.Label = null;

    @property(cc.Toggle)
    numToggles: cc.Toggle[] = [];

    @property(cc.Label)
    numLabels: cc.Label[] = [];

    private selectBack: Function = null;
    private numList: number[] = [];
    private produceNumType: number = 0;
    
    start() {
        let targetWineId = TargetWineDataManager.instance.getTargetWineId()
        this.targetNode.active = (targetWineId > 0) 
    }
    setTargetNeedNum(propId) {
        let targetWineId = TargetWineDataManager.instance.getTargetWineId()
        if(targetWineId > 0){

            
            let targetData = TargetWineDataManager.instance.getTargetWineProcessData()
            let zhiquList = targetData.zhiquList
            let kaojiuList = targetData.kaojiuList
    
            let needCount = 0
            for(let i = 0; i < zhiquList.length; i++)
            {
                if(zhiquList[i].propId == propId)
                {
                    needCount += zhiquList[i].totalCount - zhiquList[i].curCount
                }
            }
    
            for(let i = 0; i < kaojiuList.length; i++)
            {
                if(kaojiuList[i].propId == propId)
                {
                    needCount += kaojiuList[i].totalCount - kaojiuList[i].curCount
                }
            }

            needCount = Math.max(0,needCount)
            this.targetNum.string = Tool.unitConversion(needCount)
        }
    }
    setSelectBack(selectBack) {
        this.selectBack = selectBack
    }
    setBuildingId(buildingType) {
        let itemData = BuildingConfig[buildingType]
        this.numList = itemData.yieldOptions
        for(let i = 0, len = this.numLabels.length; i < len; i++) {
            let itemLabel = this.numLabels[i]
            let num = this.numList[i]
            if(num) {
                itemLabel.string = cc.js.formatStr("%s", num / 500)
            } else {
                this.numToggles[i].node.active = false
            }
        }
        this.updateProgress()
    }

    onClickAdd() {
        let nextStep = this.produceNumType + 1
        if(nextStep < this.numList.length) {
            this.produceNumType = nextStep
            this.updateProgress()
            EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        }
    }
    onClickSub() {
        let nextStep = this.produceNumType - 1
        if(nextStep >= 0) {
            this.produceNumType = nextStep
            this.updateProgress()
            EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        }
    }
    onClickToggle(toggle, index) {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_TOGGLE)
        this.produceNumType = parseInt(index)
        this.updateProgress()
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "BuildingSelectNum",
            param: index
        })
    }
    updateProgress() {
        for(let i = 0, len = this.numToggles.length; i < len; i++) {
            let numToggle = this.numToggles[i]
            numToggle.isChecked = (i <= this.produceNumType)
        }
        if(this.selectBack) {
            this.selectBack(this.numList[this.produceNumType], this.produceNumType)
        }
    }
}