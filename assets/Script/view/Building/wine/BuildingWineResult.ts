import PropConfig from "../../../config/PropConfig";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import { Tool } from "../../../framework/manager/Tool";
import BaseView from "../../../framework/viewbase/BaseView";
import BagItemView from "../../Bag/BagItemView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingWineResult extends BaseView {

    @property(BagItemView)
    bagItemView: BagItemView = null;
    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    numLabel: cc.Label = null;
    @property(cc.Sprite)
    scoreSpr: cc.Sprite = null;

    @property(cc.Node)
    attrParent: cc.Node = null;

    private ScoreName = ["不合格", "合格", "一般", "良好", "优质"]
    private AttrDefault = [
        {
            defaultValue: 53,
            randomLimit: 1,
            defaultText: "53±1"
        },
        {
            defaultValue: 1.4,
            randomLimit: 0.05,
            defaultText: "≥1.40"
        },
        {
            defaultValue: 2.2,
            randomLimit: 0.5,
            defaultText: "≥2.20"
        },
        {
            defaultValue: 0.7,
            randomLimit: 0.1,
            defaultText: "≤0.70"
        },
        {
            defaultValue: 0.6,
            randomLimit: 0.1,
            defaultText: "≤0.60"
        },
        {
            defaultValue: 0.3,
            randomLimit: 0.1,
            defaultText: "≤0.30"
        },
    ]
    initByExData(exData) {
        let wineData = exData[0]
        let itemProp = PropConfig[wineData.id]

        this.nameLabel.string = itemProp.name
        this.bagItemView.updateView({
            propId: wineData.id,
            customNum: "",
            hideClick: true
        })

        this.numLabel.string = wineData.num
        let scoreIndex = Math.min(Math.floor(wineData.score / 20),4)
        let frameName = cc.js.formatStr("texture/personal/wine_quality_%s", scoreIndex)
        Tool.loadSpriteFrame(frameName, this.scoreSpr)

        let children = this.attrParent.children
        for(let i = 0, len = children.length; i < len; i++) {
            let child = children[i]
            let itemAttr = this.AttrDefault[i]
            child.getChildByName("default").getComponent(cc.Label).string = itemAttr.defaultText
            let randomValue = itemAttr.defaultValue + Math.random() * itemAttr.randomLimit
            child.getChildByName("cur").getComponent(cc.Label).string = randomValue.toFixed(2)
        }
    }
    
    onClickGotoPersonal() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        EventManager.instance.dispatchEvent(EventEnum.CLOSE_ALL_POPUP)
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.PersonalView
        })
    }
}