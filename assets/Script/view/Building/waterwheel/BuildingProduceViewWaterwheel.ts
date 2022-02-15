import ProductConfig from "../../../config/ProductConfig";
import PropConfig from "../../../config/PropConfig";
import { MoneyPropId, ProduceState } from "../../../Constant/GameEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";
import BagDataManager from "../../../data/BagDataManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import { Tool } from "../../../framework/manager/Tool";
import { NetManager } from "../../../framework/network/NetManager";
import BuildingNumSelect from "../base/BuildingNumSelect";
import BuildingProduceView from "../base/BuildingProduceView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingProduceViewWaterwheel extends BuildingProduceView {

    @property(cc.Sprite)
    itemIcon: cc.Sprite = null;

    @property(cc.Sprite)
    itemFrame: cc.Sprite = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    txtCar: cc.Label = null

    protected produceType: number = MoneyPropId.Water

    onEnable() {
        super.onEnable()
    }

    onDisable() {
        super.onDisable()
    }

    start() {    
        super.start()

        let propId = this.produceType
        let frameName = BagDataManager.instance.getItemIconById(propId)
        Tool.loadSpriteFrame(frameName, this.itemIcon)

        let quality = PropConfig[propId].quality
        frameName = cc.js.formatStr("texture/bag/icon_border_%d", quality)

        this.nameLabel.string = PropConfig[propId].name

    }

    updateView() {
        let needTime = this.getProduceTime()
        this.updateProduceTime(needTime)

        this.txtCar.string = Tool.getStringParamConfig("waterWheelCar",this.produceNumIndex)

        this.numSelectNode.getComponent(BuildingNumSelect).setTargetNeedNum(this.produceType)
    }

    getProduceTime() {
        if(this.produceType <= 0) {
            return 0
        }
        let itemConfig = ProductConfig[this.produceType]
        let needTime = Math.floor(itemConfig.produceTime * this.produceNum)
        return itemConfig.produceTime
    }
    
    
    updateProduct() {
        let itemProduct = ProductConfig[this.produceType]
        if(!itemProduct) {
            return
        }
        this.updateView()
    }

    onClickStart() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        let selectProduce = this.getProduceNum()
        let itemProduct = ProductConfig[this.produceType]
        NetManager.instance.sendMsg("StartProduceBrewBuildingCmd_CS", {
            building_id: this.buildingData.buildingType,
            // staff_id: this.staffId,
            building_index: this.buildingData.buildingIndex,
            produce_id: this.produceType,
            produce_num: selectProduce,
        })
        
        //TODO
        // let curTime = UserDataManager.instance.getCurTime()
        // let needTime = this.getProduceTime()
        // EventManager.instance.dispatchEvent("StartProduceBrewBuildingCmd_SC", {
        //     buildingData: {
        //         buildingId: this.buildingData.buildingId,
        //         staffId: this.buildingData.staffId,
        //         produceType: this.produceType,
        //         produceNum: selectProduce,
        //         produceStartTime: curTime,
        //         produceTime: needTime,
        //         produceEndTime: curTime + needTime,
        //         produceState: ProduceState.Working,
        //     }
        // })
    }
}