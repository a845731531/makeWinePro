import PropConfig from "../../../config/PropConfig";
import { ItemType } from "../../../Constant/GameEnum";
import BagDataManager from "../../../data/BagDataManager";
import { Tool } from "../../../framework/manager/Tool";

/**
 * 背包物品 item脚本
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingCostItem extends cc.Component {

    @property(cc.Sprite)
    itemIcon: cc.Sprite = null;

    @property(cc.Sprite)
    framIcon: cc.Sprite = null;

    @property(cc.Label)
    txtNum: cc.Label = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    private curData = null;

    updateView(data) {
        this.curData = data

        let propId = data.propId
        let itemProp = PropConfig[propId]

        this.txtName.string = itemProp.name
        this.txtNum.string = data.num

        let bagNum = BagDataManager.instance.getItemNum(propId)
        if(itemProp.type == ItemType.MATERIAL || itemProp.type == ItemType.BASEWINE || 
            itemProp.type == ItemType.OLD_WINE || itemProp.type == ItemType.WINE) {
            this.txtNum.string = Tool.unitConversion(parseFloat(data.num))
        } else {
            this.txtNum.string = data.num.toString()
        }
        this.txtNum.node.color = bagNum >= parseFloat(data.num)? cc.color(211,149,68) : cc.color(255,0,0)

        let frameName = BagDataManager.instance.getItemIconById(propId)
        Tool.loadSpriteFrame(frameName, this.itemIcon)

        let quality = itemProp.quality
        frameName = cc.js.formatStr("texture/bag/icon_border_%d", quality)
        Tool.loadSpriteFrame(frameName, this.framIcon)
    }
}
