import PropConfig from "../../../config/PropConfig";
import WineQualilyConfig from "../../../config/WineQualilyConfig";
import BagDataManager from "../../../data/BagDataManager";
import { Tool } from "../../../framework/manager/Tool";

/**
 * 背包物品 item脚本
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class TargetWineItemView extends cc.Component {

    @property(cc.Sprite)
    itemIcon: cc.Sprite = null;

    @property(cc.Sprite)
    framIcon: cc.Sprite = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Label)
    txtDesc: cc.Label = null;

    @property(cc.Label)
    txtPrice: cc.Label = null;

    updateView(id) {

        this.node.active = true

        let propId = id
        let itemProp = PropConfig[propId]
       
        let frameName = BagDataManager.instance.getItemIconById(propId)
        Tool.loadSpriteFrame(frameName, this.itemIcon)

        let quality = itemProp.quality
        frameName = cc.js.formatStr("texture/bag/icon_border_%d", quality)
        Tool.loadSpriteFrame(frameName, this.framIcon)

        if(this.txtPrice)
        {
            this.txtPrice.string = cc.js.formatStr("%s元",WineQualilyConfig[id].marketPrice)
        }

        if(this.txtName)
        {
            this.txtName.string = PropConfig[propId].name
        }

        if(this.txtDesc)
        {
            this.txtDesc.string = PropConfig[propId].desc
        }
    }
}
