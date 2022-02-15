import { ItemType } from "../../Constant/GameEnum";
import SignManager from "../../data/sign/SignManager";
import { Tool } from "../../framework/manager/Tool";

/**
 * 签到 item脚本
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class SignItemView extends cc.Component {

    @property(cc.Sprite)
    itemIcon: cc.Sprite = null;

    @property(cc.Sprite)
    dayIcon: cc.Sprite = null;

    @property(cc.Sprite)
    qualityIcon: cc.Sprite = null;

    @property(cc.Sprite)
    framIcon: cc.Sprite = null;

    @property(cc.Label)
    txtNum: cc.Label = null;

    @property(cc.Node)
    hasSign: cc.Node = null;

    onLoad() {
        this.addListener()
    }

    updateView(data, needDay) {

        let canShowDay = needDay && data.preview
        this.dayIcon.node.active = canShowDay
        if (canShowDay) {
            Tool.loadSpriteFrame(cc.js.formatStr("texture/sign/day%d", data.day), this.dayIcon)
        }

        this.qualityIcon.node.active = false
        if (data.type == ItemType.COIN || data.type == ItemType.DIAMOND) {
            this.txtNum.string = "x" + data.count
            Tool.loadSpriteFrame(cc.js.formatStr("texture/common/quality_word_%d", data.quality), this.qualityIcon)
        } else {
            this.qualityIcon.node.active = true
            this.txtNum.string = data.name
        }

        Tool.loadSpriteFrame(cc.js.formatStr("texture/bag/icon_border_%d", data.quality), this.framIcon)

        Tool.loadSpriteFrame(data.icon, this.itemIcon)

        this.hasSign.active = !SignManager.instance.checkCanGetSign(data.day)
    }

    addListener() {

    }

    removeListener() {

    }

    onDestroy() {
        this.removeListener()
    }


}
