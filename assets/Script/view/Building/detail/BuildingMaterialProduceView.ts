import { NetMsgDef } from "../../../../resources/pb/NetMsgDef";
import BuildingConfig from "../../../config/BuildingConfig";
import ProductConfig from "../../../config/ProductConfig";
import PropConfig from "../../../config/PropConfig";
import BagDataManager from "../../../data/BagDataManager";
import BuildingDataManager from "../../../data/BuildingDataManager";
import { BuildingData } from "../../../data/DataInterface";
import UserDataManager from "../../../data/UserDataManager";
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import { Tool } from "../../../framework/manager/Tool";
import { NetManager } from "../../../framework/network/NetManager";
import BuildingProductSelectBase from "../base/BuildingProductSelectBase";
import { ProduceState } from "../../../Constant/GameEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BuildingMaterialProduceView extends cc.Component {

    @property(cc.Label)
    timeLabel: cc.Label = null
    @property(cc.Label)
    produceNumLabel: cc.Label = null
    @property(cc.Button)
    startBtn: cc.Button = null

    @property(BuildingProductSelectBase)
    productSelect: BuildingProductSelectBase = null

    private buildingData: BuildingData;
    protected produceType: number = 0

    initByExData(exData) {
        this.buildingData = exData.buildingData
    }
    start() {    
        this.productSelect.initView({
            buildingData: this.buildingData,
            onSelect: this.onSelectProduct.bind(this)
        })
        this.produceNumLabel.string = Tool.unitConversion(this.getProduceNum())
        this.updateView()
    }
    updateView() {
        this.updateProduceTime()
    }
    getProduceNum() {
        let itemBuild = BuildingConfig[this.buildingData.buildingType]
        let levelConfig = BuildingLevelConfig[this.buildingData.level]
        let yieldScale = levelConfig.yieldOptions[levelConfig.yieldOptions.length - 1]
        let selectProduce = Math.floor(yieldScale * itemBuild.baseYield)
        return selectProduce
    }
    getTimeBuff() {
        let levelConfig = BuildingLevelConfig[this.buildingData.level]
        let buff = levelConfig.timeBuff
        return buff
    }
    getProduceTime() {
        if(this.produceType <= 0) {
            return 0
        }
        let timeBuff = this.getTimeBuff()
        let itemConfig = ProductConfig[this.produceType]
        let selectProduce = this.getProduceNum()

        let needTime = Math.floor(itemConfig.produceTime * (1 - timeBuff / 100) * selectProduce)
        return itemConfig.produceTime
    }
    updateProduceTime() {
        let needTime = this.getProduceTime()
        if(needTime > 0) {
            this.timeLabel.string = cc.js.formatStr("%s", Tool.formatTime(needTime))
        } else {
            this.timeLabel.string = ""
        }
    }
    updateProduct() {
        let itemProduct = ProductConfig[this.produceType]
        if(!itemProduct) {
            return
        }
        this.updateProduceTime()
    }
    onSelectProduct(productId, canProduce) {
        this.produceType = productId
        if(this.startBtn) {
            this.startBtn.interactable = canProduce
        }
        this.updateProduct()
    }
    onClickStart() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        if(this.produceType <= 0) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "请选择产物"
            })
            return
        }
        let selectProduce = this.getProduceNum()
        NetManager.instance.sendMsg(NetMsgDef.Building_REQ_START_PRODUCE, {
            buildingType: this.buildingData.buildingType,
            buildingIndex: this.buildingData.buildingIndex,
            produceType: this.produceType,
            produceNum: selectProduce,
        })
        //FIXME 测试
        this.onTestStart()
    }
    onTestStart() {
        let selectProduce = this.getProduceNum()
        
        let propList = []
        let itemProduct = ProductConfig[this.produceType]
        let materialStrList = itemProduct.materials
        for(let i = 0; i < materialStrList.length; i++) {
            let itemMaterial = materialStrList[i].split("_")
            let propId = parseInt(itemMaterial[0])
            let curNum = BagDataManager.instance.getItemNum(propId)
            let needNum = parseInt(itemMaterial[1]) * selectProduce
            if(curNum < needNum) {
                let itemConfig = PropConfig[propId]
                EventManager.instance.dispatchEvent("StartProduceBrewBuildingCmd_SC", {
                    buildingType: this.buildingData.buildingType,
                    buildingIndex: this.buildingData.buildingIndex,
                    errorCode: 2002,
                    errorMsg: cc.js.formatStr("%s不足", itemConfig.name)
                })
                return
            } else {
                propList.push({
                    propId: propId,
                    num: curNum - needNum
                })
            }
        }
        EventManager.instance.dispatchEvent("StartProduceBrewBuildingCmd_SC", {
            buildingType: this.buildingData.buildingType,
            buildingIndex: this.buildingData.buildingIndex,
            produceType: this.produceType,
            produceNum: selectProduce,
            produceStartTime: UserDataManager.instance.getCurTime(),
            produceTime: this.getProduceTime(),
            produceState: ProduceState.Working,
        })
        EventManager.instance.dispatchEvent(NetMsgDef.Common_NTF_PROP_CHANGED, {
            propList: propList,
        })
    }
}