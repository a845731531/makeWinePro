import { NetMsgDef } from "../../../../resources/pb/NetMsgDef";
import BuildingConfig from "../../../config/BuildingConfig";
import ProductConfig from "../../../config/ProductConfig";
import PropConfig from "../../../config/PropConfig";
import { MoneyPropId, ProduceState } from "../../../Constant/GameEnum";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";
import BagDataManager from "../../../data/BagDataManager";
import BuildingDataManager from "../../../data/BuildingDataManager";
import UserDataManager from "../../../data/UserDataManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import { Tool } from "../../../framework/manager/Tool";
import { NetManager } from "../../../framework/network/NetManager";
import BuildingCostItem from "../base/BuildingCostItem";
import BuildingProduceView from "../base/BuildingProduceView";
import BuildingProductSelectBase from "../base/BuildingProductSelectBase";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingProduceViewBaseWine extends BuildingProduceView {    

    @property(cc.Node)
    costParent: cc.Node = null
    @property(cc.Node)
    costItemPre: cc.Node = null

    @property(BuildingProductSelectBase)
    productSelect: BuildingProductSelectBase = null  
    
    @property(cc.Label)
    costTypeNumLabel: cc.Label = null;

    @property(cc.Node)
    firstPitNode: cc.Node = null
    @property(cc.Label)
    rentCostLabel: cc.Label = null
    @property(cc.Label)
    buyCostLabel: cc.Label = null

    @property(cc.Label)
    numBuffLabel: cc.Label = null
    @property(cc.Node)
    numBuffEffect: cc.Node = null

    @property(cc.Node)
    btnFillUp: cc.Node = null
    @property(cc.Label)
    fillupNeedLabel: cc.Label = null
    
    protected produceType: number = 0
    private itemPool: cc.NodePool = new cc.NodePool()
    private fillupNeed: number = 0;
    private useType: number = 1;

    onEnable() {        
        EventManager.instance.addEventListener("BuyBrewUserCmd_SC", this.updateView, this)
        super.onEnable()
    }
  
    start() {      
        this.productSelect.initView({
            buildingData: this.buildingData,
            onSelect: this.onSelectProduct.bind(this)
        })
        super.start()
    }
    updateFirstPitNode() {
        if(this.buildingData.buildingIndex == 1) {
            let notOwn = true //TODO
            this.firstPitNode.active = notOwn
            if(notOwn) {
                let buildingConfig = BuildingConfig[this.buildingData.buildingType]
                this.rentCostLabel.string = (Tool.getNumberParamConfig("initJiaochiPrice") / 1000).toFixed(2)
                this.buyCostLabel.string = (buildingConfig.price / 1000).toFixed(0)
            }
        } else {
            this.firstPitNode.active = false
        }
    }
    updateView() {
        let needTime = this.getProduceTime()
        this.updateProduceTime(needTime)
        this.updateProduceCost()
        this.updateFirstPitNode()
        if(this.produceType > 0) {
            this.numSelect && this.numSelect.setTargetNeedNum(this.produceType)
        }
        this.updateNumBuff()
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
        return materialList
    }
    updateProduceCost() {
        if(this.produceType <= 0) {
            return 0
        }
        let materialList = this.getCostList()
        this.updateCost(materialList)
    }
    updateNumBuff() {
        let gameScore = this.buildingData.smallGameScore || 0
        if(gameScore <= 0) {
            this.numBuffLabel.string = ""
            this.numBuffEffect.active = false
        } else {
            let buff = BuildingDataManager.instance.getGameBuff(gameScore)
            this.numBuffLabel.string = cc.js.formatStr("+%s%", buff)
            this.numBuffEffect.active = true
        }
    }
    onSelectProduct(productId) {
        this.produceType = productId
        this.updateView()
    }

    updateCost(costDataList) {
        let children = this.costParent.children
        for(let i = children.length - 1; i >= 0; i--) {
            this.itemPool.put(children[i])
        }
        this.costTypeNumLabel.string = costDataList.length
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
                            num: needNum
                        })
                    }
                }
                NetManager.instance.sendMsg("BuyBrewUserCmd_CS", {
                    items: buyList
                })
            }
        })
    }
    onChangeUseType(toggle, index) {
        this.useType = parseInt(index)
    }
    onClickStart() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        let selectProduce = this.getProduceNum()
        let itemProduct = ProductConfig[this.produceType]
        NetManager.instance.sendMsg("StartProduceBrewBuildingCmd_CS", {
            building_id: this.buildingData.buildingType,
            building_index: this.buildingData.buildingIndex,
            produce_id: this.produceType,
            produce_num: selectProduce,
            use_type: (this.buildingData.buildingIndex == 1) ? this.useType : 0,
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
    onClickSmallGame() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.SmallGameBaseWine,
            exData: {
                buildingData: this.buildingData
            }
        })
    }
}