import PackConfig from "../../config/PackConfig";
import { Tool } from "../../framework/manager/Tool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AddPackItemView extends cc.Component {

    @property(cc.Sprite)
    itemIcon: cc.Sprite = null;

    @property(cc.Sprite)
    framIcon: cc.Sprite = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    updateView(id) {

        this.txtName.string = PackConfig[id].name

        Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s", PackConfig[id].icon), this.itemIcon)
    }
}
