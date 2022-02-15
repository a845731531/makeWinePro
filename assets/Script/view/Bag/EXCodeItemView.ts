import PropConfig from "../../config/PropConfig";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { EXCodeData } from "../../data/DataInterface";
import EventManager from "../../framework/manager/EventManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import { Tool } from "../../framework/manager/Tool";
import PackConfig from "../../config/PackConfig";

/**
 * 兑换码 item脚本
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class EXCodeItemView extends cc.Component {

    @property(cc.Node)
    nullNode: cc.Node = null;

    @property(cc.Node)
    itemNode: cc.Node = null;

    @property(cc.Sprite)
    packIcon: cc.Sprite = null;

    @property(cc.Sprite)
    bottleIcon: cc.Sprite = null;

    @property(cc.Sprite)
    framIcon: cc.Sprite = null;

    @property(cc.Node)
    newIcon: cc.Node = null;

    @property(cc.Label)
    txtNum: cc.Label = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Font)
    numFontList: cc.Font[] = [];

    private curData: EXCodeData = null;

    updateView(data: EXCodeData,needClick = true) {
        this.curData = data
        if(!this.curData)
        {
            this.itemNode.active = false
            this.nullNode.active = true
            this.txtName.node.active = false
            return   
        }

        this.itemNode.active = true
        this.nullNode.active = false

        let propId = data.propId
        let itemProp = PropConfig[propId]

        this.txtName.string = data.name

        this.txtNum.string = data.count + ""

        let index = itemProp.quality > 3? 3 : itemProp.quality
        this.txtNum.font = this.numFontList[index]

        Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s", PackConfig[data.packId].icon), this.packIcon)
        Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s", PackConfig[data.bottleId].icon), this.bottleIcon)

        let quality = itemProp.quality
        let frameName = cc.js.formatStr("texture/bag/icon_border_%d", quality)
        Tool.loadSpriteFrame(frameName, this.framIcon)

        // if(this.newIcon && cc.isValid(this.newIcon))
        // {
            this.newIcon.active = false
        //     if(data.showNew)
        //     {
        //         this.newIcon.active = BagDataManager.instance.checkPropIsNew(propId)
        //     }
        // }

        //是否取消点击时间
        if(this.itemNode && this.itemNode.getComponent(cc.Button))
        {
            this.itemNode.getComponent(cc.Button).interactable = needClick
        }
    }

    onClickItem() {
        if(!this.curData)
        {
            return
        }

        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.EXCodeInfoView,
            exData: this.curData
        })
    }
}
