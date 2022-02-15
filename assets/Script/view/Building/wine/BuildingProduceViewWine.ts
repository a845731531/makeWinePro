
import BagDataManager from "../../../data/BagDataManager";
import UserDataManager from "../../../data/UserDataManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import { Tool } from "../../../framework/manager/Tool";
import { NetManager } from "../../../framework/network/NetManager";
import PropConfig from "../../../config/PropConfig";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import ProductConfig from "../../../config/ProductConfig";
import { CustomEventEnum } from "../../../Constant/CustomEventEnum";
import BuildingProduceView from "../base/BuildingProduceView";
import BagItemView from "../../Bag/BagItemView";
import TargetWineDataManager from "../../../data/TargetWineDataManager";
import BuildingCostItem from "../base/BuildingCostItem";
import { ProduceState } from "../../../Constant/GameEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingProduceViewWine extends BuildingProduceView {

    @property(cc.Node)
    costParent: cc.Node = null
    @property(cc.Node)
    costItemPre: cc.Node = null
    @property(cc.Label)
    costTypeNumLabel: cc.Label = null;

    @property(cc.Node)
    btnFillUp: cc.Node = null
    @property(cc.Label)
    fillupNeedLabel: cc.Label = null
    
    @property(cc.Node)
    emptyNode: cc.Node = null

    @property(BagItemView)
    productItemInfo: BagItemView = null;
    
    protected produceType: number = 0
    private itemPool: cc.NodePool = null;  
    private fillupNeed: number = 0;

    start() {
        this.itemPool = new cc.NodePool()    

        let targetWineId = TargetWineDataManager.instance.getTargetWineId()
        let itemProp = PropConfig[targetWineId]
        if(itemProp) {
            this.produceType = itemProp.subId
        }

        this.updateProduceType()
        super.start()
    }
    onEnable() {
        EventManager.instance.addEventListener("BuyBrewUserCmd_SC", this.updateView, this)
        super.onEnable()
    }
    onDisable(): void {
        EventManager.instance.removeTargetListener(this)
        super.onDisable()
    }
    updateProduceType() {
        if(this.produceType > 0) {
            this.productItemInfo.updateView({
                propId: this.produceType,
                customNum: "",
                showName: true,
                hideClick: true
            })
            this.emptyNode.active = false
            this.productItemInfo.node.active = true
        } else {
            this.emptyNode.active = true
            this.productItemInfo.node.active = false
        }
    }
    updateView() {
        let needTime = this.getProduceTime()
        this.updateProduceTime(needTime)
        this.updateProduceCost()
    }
    getProduceTime() {
        if(this.produceType <= 0) {
            return 0
        }
        let itemConfig = ProductConfig[this.produceType]
        let needTime = Math.floor(itemConfig.produceTime * this.produceNum)
        return itemConfig.produceTime
    }
    getCostList() {
        let selectProduce = this.getProduceNum()
        let itemProduct = ProductConfig[this.produceType]
        let materialStrList = itemProduct.materials
        let materialList = []
        for(let i = 0; i < materialStrList.length; i++) {
            let itemMaterial = materialStrList[i].split("_")
            let propId = parseInt(itemMaterial[0])
            let needNum = parseFloat(itemMaterial[1]) * selectProduce
            materialList.push({
                propId: propId,
                num: needNum
            })
        }
        materialList.unshift({
            propId: this.produceType,
            num: 1
        })
        return materialList
    }
    updateProduceCost() {
        if(this.produceType <= 0) {
            return 0
        }
        let materialList = this.getCostList()
        this.updateCost(materialList)
    }

    updateCost(costDataList) {
        let children = this.costParent.children
        for(let i = children.length - 1; i >= 0; i--) {
            this.itemPool.put(children[i])
        }
        let needFillUpNum = 0
        for(let i = 0; i < costDataList.length; i++) {
            let itemData = costDataList[i]
            let itemNode = this.itemPool.get()
            if(!itemNode) {
                itemNode = cc.instantiate(this.costItemPre)
                itemNode.active = true
            }
            itemNode.parent = this.costParent
            let propId = itemData.propId
            let needNum = itemData.num
            let curNum = BagDataManager.instance.getItemNum(propId)
            let itemScript = itemNode.getComponent(BuildingCostItem)
            itemScript && (itemScript.updateView({
                propId: propId,
                num: "" + needNum,
            }))
            let itemProp = PropConfig[propId]
            if(curNum < needNum) {
                needFillUpNum += (needNum - curNum) * itemProp.price
            }
        }
        this.fillupNeed = needFillUpNum
        if(needFillUpNum > 0) {
            this.btnFillUp.active = true
            this.startBtn.interactable = false
            this.fillupNeedLabel.string = Tool.formatMoney(needFillUpNum)
        } else {
            this.btnFillUp.active = false
            this.startBtn.interactable = true
        }
    }
    
    onClickFillup() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        if(this.produceType <= 0) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "请先选择配方"
            })
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.FormulaSelectView,
                exData: {
                    callback: this.onUpdateFormula.bind(this)
                }
            })
            return
        }
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: cc.js.formatStr("是否花费%szqb补齐所需原料?", Tool.formatMoney(this.fillupNeed)),
            showCancel: true,
            confirmCallback: () => {
                let buyList = []
                let materialList = this.getCostList()
                for(let i = 0, len = materialList.length; i < len; i++) {
                    let itemData = materialList[i]
                    let propId = itemData.propId
                    let needNum = itemData.num
                    let curNum = BagDataManager.instance.getItemNum(propId)
                    needNum -= curNum
                    if(needNum > 0) {
                        buyList.push({
                            prop_id: propId,
                            num: Math.ceil(needNum)
                        })
                    }
                }
                NetManager.instance.sendMsg("BuyBrewUserCmd_CS", {
                    items: buyList
                })
            }
        })
    }
    onClickStart() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        if(this.produceType <= 0) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "请先选择配方"
            })
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.FormulaSelectView,
                exData: {
                    callback: this.onUpdateFormula.bind(this)
                }
            })
            return
        }
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
        //         produceType: this.produceType,
        //         produceNum: selectProduce,
        //         produceStartTime: curTime,
        //         produceTime: needTime,
        //         produceEndTime: curTime + needTime,
        //         produceState: ProduceState.Working,
        //     }
        // })
    }
    onClickAdd() {       
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK) 
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.FormulaSelectView,
                exData: {
                    callback: this.onUpdateFormula.bind(this)
                }
        })
    }
    onUpdateFormula(produceType) {
        this.produceType = produceType
        this.updateProduceType()
        this.updateView()
    }
}
