import PropConfig from "../../config/PropConfig";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import BagDataManager from "../../data/BagDataManager";
import { BagItemData } from "../../data/DataInterface";
import EventManager from "../../framework/manager/EventManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import { Tool } from "../../framework/manager/Tool";
import { ItemType } from "../../Constant/GameEnum";
import WineQualilyConfig from "../../config/WineQualilyConfig";
import OldWineConfig from "../../config/OldWineConfig";

/**
 * 背包物品 item脚本
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class BagItemView extends cc.Component {

    @property(cc.Node)
    nullNode: cc.Node = null;

    @property(cc.Node)
    itemNode: cc.Node = null;

    @property(cc.Sprite)
    itemIcon: cc.Sprite = null;

    @property(cc.Sprite)
    framIcon: cc.Sprite = null;

    @property(cc.Sprite)
    wineQuality: cc.Sprite = null;

    @property(cc.Sprite)
    yearIcon: cc.Sprite = null;

    @property(cc.Label)
    txtYear: cc.Label = null;

    @property(cc.Node)
    newIcon: cc.Node = null;

    @property(cc.Label)
    txtNum: cc.Label = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Font)
    numFontList: cc.Font[] = [];

    private curData: BagItemData = null;
    private clickBack = null;

    updateView(data?: BagItemData) {
        this.curData = data
        if(!this.curData)
        {
            this.itemNode && (this.itemNode.active = false)
            this.nullNode && (this.nullNode.active = true)
            this.txtName.node.active = false
            return   
        }

        this.itemNode && (this.itemNode.active = true)
        this.itemNode && (this.nullNode.active = false)

        let propId = data.propId
        let itemProp = PropConfig[propId]

        if(this.txtName && cc.isValid(this.txtName.node))
        {
            if(data.showName) {
                this.txtName.node.active = true
                this.txtName.string = itemProp.name
                if(data.nameColor) {
                    this.txtName.node.color = data.nameColor
                }
            } else {
                this.txtName.node.active = false
            }
        }

        if(this.wineQuality && cc.isValid(this.wineQuality.node))
        {
            this.wineQuality.node.active = false
            if(itemProp.type == ItemType.WINE)
            {   
                this.wineQuality.node.active = true
                let scoreQuality = WineQualilyConfig[propId].quality
                Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/wine_quality_%d",scoreQuality), this.wineQuality)
            }

           
        }

        if(this.yearIcon && cc.isValid(this.yearIcon.node))
        {
            this.yearIcon.node.active = false

            //先不显示老酒  年份标签了
            if(itemProp.type == ItemType.OLD_WINE)
            {
                
                if(this.yearIcon && cc.isValid(this.yearIcon.node))
                {
                    this.yearIcon.node.active = true
                    let year = OldWineConfig[propId].year
                    let yearStr = Tool.getChinaNumber(year)
                    this.txtYear.string = year <= 10? (yearStr + "年") : yearStr
                }
            }

        }

        if(this.txtNum && cc.isValid(this.txtNum.node))
        {
            let curNum: any = 0
            if(data.customNum != null) {
                curNum = data.customNum
            } else {
                curNum = BagDataManager.instance.getItemNum(propId)
            }    
            if(itemProp.type == ItemType.MATERIAL || itemProp.type == ItemType.BASEWINE || 
                itemProp.type == ItemType.OLD_WINE || itemProp.type == ItemType.WINE) {
                let tempNum = parseInt(curNum)
                if(tempNum) {
                    this.txtNum.string = Tool.unitConversion(tempNum)
                } else {
                    this.txtNum.string = curNum.toString()
                }
            } else {
                this.txtNum.string = curNum.toString()
            }

            // let index = itemProp.quality > 3? 3 : itemProp.quality
            // this.txtNum.font = this.numFontList[index]
            this.txtNum.font = null
            this.txtNum.fontSize = 20
        }
        let frameName = BagDataManager.instance.getItemIconById(propId)
        Tool.loadSpriteFrame(frameName, this.itemIcon)

        let quality = itemProp.quality
        frameName = cc.js.formatStr("texture/bag/icon_border_%d", quality)
        Tool.loadSpriteFrame(frameName, this.framIcon)

        let btnItem = this.node.getComponent(cc.Button)
        btnItem && (btnItem.interactable = !data.hideClick)

        if(this.newIcon && cc.isValid(this.newIcon))
        {
            this.newIcon.active = false
            if(data.showNew)
            {
                this.newIcon.active = BagDataManager.instance.checkPropIsNew(propId)
            }
        }
    }
    onClick(clickBack) {
        if(this.curData)
        {
            this.clickBack = clickBack
        }
    }
    onClickItem() {
        if(!this.curData)
        {
            return
        }

        if(this.clickBack) {
            this.clickBack(this.curData)
        } else {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.BagItemInfoView,
                exData: this.curData
            })
        }
    }
}
