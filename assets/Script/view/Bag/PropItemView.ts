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
export default class PropItemView extends cc.Component {

    @property(cc.Sprite)
    itemIcon: cc.Sprite = null;

    @property(cc.Sprite)
    framIcon: cc.Sprite = null;

    @property(cc.Label)
    txtNum: cc.Label = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Label)
    txtPrice: cc.Label = null;

    private curData = null;
    private clickBack = null;

    updateView(data: BagItemData) {
        this.curData = data

        let propId = data.propId
        let itemProp = PropConfig[propId]

        if(this.txtName && cc.isValid(this.txtName.node))
        {
            if(data.showName) {
                this.txtName.node.active = true
                this.txtName.string = itemProp.name
            } else {
                this.txtName.node.active = false
            }
        }

        if(this.txtNum && cc.isValid(this.txtNum.node))
        {
            if(data.customNum != null) {
                this.txtNum.string = data.customNum
            } else {
                let curNum = BagDataManager.instance.getItemNum(propId)
                this.txtNum.string = "" + curNum
            }
        }

        let frameName = BagDataManager.instance.getItemIconById(propId)
        Tool.loadSpriteFrame(frameName, this.itemIcon)

        let quality = itemProp.quality
        frameName = cc.js.formatStr("texture/bag/icon_border_%d", quality)
        Tool.loadSpriteFrame(frameName, this.framIcon)

        if(this.txtPrice && cc.isValid(this.txtPrice.node))
        {
            this.txtPrice.string = PropConfig[propId].price + ""
        }

    }
    onClick(clickBack) {
        this.clickBack = clickBack
    }

    onClickItem() {
        if(this.clickBack != null) {
            this.clickBack(this.curData)
        } else {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.BagItemInfoView,
                exData: this.curData
            })
        }
    }
}
