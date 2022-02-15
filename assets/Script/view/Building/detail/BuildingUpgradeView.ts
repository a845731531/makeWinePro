import { NetMsgDef } from "../../../../resources/pb/NetMsgDef";
import BuildingConfig from "../../../config/BuildingConfig";
import { BuildingType, MoneyPropId } from "../../../Constant/GameEnum";
import BagDataManager from "../../../data/BagDataManager";
import BuildingDataManager from "../../../data/BuildingDataManager";
import { BuildingData } from "../../../data/DataInterface";
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import { NetManager } from "../../../framework/network/NetManager";
import { Tool } from "../../../framework/manager/Tool";
import WareHouseDataManager from "../../../data/WareHouseDataManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingUpgradeView extends cc.Component {
    @property(cc.Label)
    nameLabel: cc.Label = null
    @property(cc.Label)
    levelLabel: cc.Label = null

    @property(cc.Sprite)
    curIcon: cc.Sprite = null
    @property(cc.Sprite)
    nextIcon: cc.Sprite = null

    @property(cc.Node)
    nextNode: cc.Node = null

    @property(cc.Node)
    curAttrNode: cc.Node = null
    @property(cc.Node)
    nextAttrNode: cc.Node = null
    
    @property(cc.Label)
    upgradeCostLabel: cc.Label = null
    @property(cc.Node)
    maxLevelNode: cc.Node = null

    private buildingData: BuildingData = null;

    initByExData(exData) {
        this.buildingData = exData.buildingData
        let itemConfig = BuildingConfig[this.buildingData.buildingType]
        this.nameLabel.string = itemConfig.name

        let frameName = cc.js.formatStr("texture/building/buildingIcon_%s_0", this.buildingData.buildingType)
        Tool.loadSpriteFrame(frameName, this.curIcon)
        frameName = cc.js.formatStr("texture/building/buildingIcon_%s_0", this.buildingData.buildingType)
        Tool.loadSpriteFrame(frameName, this.nextIcon)

        this.updateLevel(this.buildingData.level)
    }
    onEnable() {
        EventManager.instance.addEventListener(NetMsgDef.Building_RSP_UPGRADE, this.onRspUpgrade, this)
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    updateLevel(level) {  
        this.levelLabel.string = cc.js.formatStr("等级：%s", this.buildingData.level)
        
        let curLevelConfig = BuildingLevelConfig[level]
        let curDescList = this.getDescList(curLevelConfig)
        let children = this.curAttrNode.children
        for(let i = 0, len = children.length; i < len; i++) {
            let child = children[i] 
            this.updateAttr(child, curDescList[i])
        }
        let maxLevel = BuildingDataManager.instance.getMaxBuildingLevel()
        this.nextNode.active = (level < maxLevel)
        this.maxLevelNode.active = (level >= maxLevel)
        if(level < maxLevel) {
            this.upgradeCostLabel.string = cc.js.formatStr("%s", curLevelConfig.upgradeCost)

            let nextLevelConfig = BuildingLevelConfig[level + 1]
            let nextDescList = this.getDescList(nextLevelConfig)
            let children = this.nextAttrNode.children
            for(let i = 0, len = children.length; i < len; i++) {
                let child = children[i] 
                this.updateAttr(child, nextDescList[i])
            }
        }
    }

    getDescList(levelConfig) {
        let descList = []
        if(this.buildingData.buildingType == BuildingType.JiuCang) {
            let itemConfig = BuildingConfig[this.buildingData.buildingType]
            let yieldOptionNum = levelConfig.yieldOptions.length
            let maxProduce = levelConfig.yieldOptions[yieldOptionNum - 1]
            maxProduce *= itemConfig.baseYield
            descList.push({
                tipText: "藏酒容量:",
                value: maxProduce
            })
            descList.push({
                tipText: "耗时减少:",
                value: cc.js.formatStr("%s%", levelConfig.timeBuff)
            })
            descList.push({
                tipText: "当前储存:",
                value: WareHouseDataManager.instance.getOldWineStoreNum()
            })
        } else {
            descList.push({
                tipText: "生产设备:",
                value: levelConfig.machineNum
            })
            descList.push({
                tipText: "耗时减少:",
                value: cc.js.formatStr("%s%", levelConfig.timeBuff)
            })
            let itemConfig = BuildingConfig[this.buildingData.buildingType]
            let yieldOptionNum = levelConfig.yieldOptions.length
            let maxProduce = levelConfig.yieldOptions[yieldOptionNum - 1]
            maxProduce *= itemConfig.baseYield
            descList.push({
                tipText: "最大产量:",
                value: maxProduce
            })
            let tipText = ["少许","一些","许多","丰厚"]
            descList.push({
                tipText: "生产数量:",
                value: tipText[yieldOptionNum - 1] || ""
            })
        }
        return descList
    }
    updateAttr(itemNode, descData) {
        if(descData == null) {
            itemNode.active = false
            return
        }
        itemNode.active = true
        itemNode.getChildByName("tip").getComponent(cc.Label).string = descData.tipText
        itemNode.getChildByName("value").getComponent(cc.Label).string = descData.value
    }

    onClickUpgrade() {
        //广播建筑升级
        NetManager.instance.sendMsg(NetMsgDef.Building_REQ_UPGRADE, {
            buildingType: this.buildingData.buildingType,
            buildingIndex: this.buildingData.buildingIndex
        })
        //FIXME 测试
        let levelConfig = BuildingLevelConfig[this.buildingData.level]
        let needCoin = levelConfig.upgradeCost
        let curCoin = BagDataManager.instance.getItemNum(MoneyPropId.COIN)
        if (needCoin > curCoin) {
            EventManager.instance.dispatchEvent(NetMsgDef.Building_RSP_UPGRADE, {
                errorCode: 1001,
                errorMsg: "金币不足"
            })
        } else {
            EventManager.instance.dispatchEvent(NetMsgDef.Building_RSP_UPGRADE, {
                buildingData: {
                    buildingType: this.buildingData.buildingType,
                    buildingIndex: this.buildingData.buildingIndex,
                    level: this.buildingData.level + 1
                }
            })
            EventManager.instance.dispatchEvent("NtfMoneyChanged", {
                moneyType: MoneyPropId.COIN,
                num: curCoin - needCoin
            })
        }
    }
    onRspUpgrade(eventData) {
        if (eventData.building_data.building_id != this.buildingData.buildingType || 
            eventData.building_data.building_index != this.buildingData.buildingIndex) {
            return
        }
        if (eventData.error_code) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: eventData.error_msg
            })
            return
        }
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "升级成功"
        })
        this.buildingData = BuildingDataManager.instance.getBuildingData(this.buildingData.buildingType, this.buildingData.buildingIndex)
        this.updateLevel(this.buildingData.level)
    }
}