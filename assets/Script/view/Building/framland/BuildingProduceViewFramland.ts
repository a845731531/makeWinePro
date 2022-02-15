import ProductConfig from "../../../config/ProductConfig";
import PropConfig from "../../../config/PropConfig";
import { MoneyPropId, ProduceState } from "../../../Constant/GameEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";
import BagDataManager from "../../../data/BagDataManager";
import TargetWineDataManager from "../../../data/TargetWineDataManager";
import UserDataManager from "../../../data/UserDataManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import { Tool } from "../../../framework/manager/Tool";
import { NetManager } from "../../../framework/network/NetManager";
import BagItemView from "../../Bag/BagItemView";
import PropItemView from "../../Bag/PropItemView";
import BuildingNumSelect from "../base/BuildingNumSelect";
import BuildingProduceView from "../base/BuildingProduceView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingProduceViewFramLand extends BuildingProduceView {

    @property(PropItemView)
    wheatItem: PropItemView = null

    @property(PropItemView)
    sorghumItem: PropItemView = null

    @property(cc.Label)
    costLabel: cc.Label = null;

    @property(cc.Label)
    txtPeople: cc.Label = null

    protected produceType: number = MoneyPropId.WHEAT
    protected zhongziType: number = MoneyPropId.WHEAT_Z

    private _produceList = [MoneyPropId.WHEAT,MoneyPropId.SORGHUM]
    private _zhongziList = [MoneyPropId.WHEAT_Z,MoneyPropId.SORGHUM_Z]

    onEnable() {
        super.onEnable()
    }

    onDisable() {
        super.onDisable()
    }

    start() {    
        super.start()

        this.wheatItem.updateView({
            propId: this._zhongziList[0],
            showName: true,
            customNum: "",
        })

        this.sorghumItem.updateView({
            propId: this._zhongziList[1],
            showName: true,
            customNum: "",
        })

        this.onSelectProduct(null,0)
    }

    updateView() {
        let needTime = this.getProduceTime()
        this.updateProduceTime(needTime)

        this.txtPeople.string = cc.js.formatStr("农民：%s人",Tool.getStringParamConfig("framlandStaffCount",this.produceNumIndex))

        this.numSelectNode.getComponent(BuildingNumSelect).setTargetNeedNum(this.produceType)

        let price = PropConfig[this.zhongziType].price
        let needCost = price * this.getProduceNum()
        this.costLabel.string = Tool.formatMoney(needCost)
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

    onSelectProduct(toggle,index) {
        this.produceType = this._produceList[index]
        this.zhongziType = this._zhongziList[index]
        this.updateProduct()
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "FarmlandSelectTarget",
            param: index,
        })
        
    }

    reqStart()
    {
        let itemProduct = ProductConfig[this.produceType]
        let selectProduce = this.getProduceNum()
        
        let buyList = []
        let materialList = Tool.convertStrToList(itemProduct.materials) 
        for(let i = 0, len = materialList.length; i < len; i++) {
            let itemData = materialList[i]
            let propId = itemData.propId
            let needNum = itemData.num * selectProduce
            if(needNum > 0) {
                buyList.push({
                    prop_id: propId,
                    num: needNum
                })
            }
        }
        NetManager.instance.sendMsg("BuyBrewUserCmd_CS", {
            items: buyList
        })

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
        //         staffId: this.staffId,
        //         produceType: this.produceType,
        //         produceNum: selectProduce,
        //         produceStartTime: curTime,
        //         produceTime: needTime,
        //         produceEndTime: curTime + needTime,
        //         produceState: ProduceState.Working,
        //     }
        // })
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

        let price = PropConfig[this.zhongziType].price
        let needCost = price * selectProduce
        let gold = UserDataManager.instance.getDiamondNum()
        if(gold < needCost)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "zqb不足，请前往充值"
            })
            return
        }
        this.reqStart()
    }
}