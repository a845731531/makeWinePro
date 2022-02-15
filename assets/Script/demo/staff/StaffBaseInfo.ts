import PropConfig from "../../config/PropConfig";
import StaffConfig from "../../config/StaffConfig";
import BagDataManager from "../../data/BagDataManager";
import { Tool } from "../../framework/manager/Tool";


const {ccclass, property} = cc._decorator;

@ccclass
export default class StaffBaseInfo extends cc.Component {
    @property(cc.Label)
    nameLabel: cc.Label = null;
    @property(cc.Sprite)
    iconSpr: cc.Sprite = null
    @property(cc.Label)
    briefLabel: cc.Label = null;
    @property(cc.Label)
    descLabel: cc.Label = null;
    @property(cc.Node)
    starParent: cc.Node = null
    
    @property(cc.Label)
    valueLabelList: cc.Label[] = []
    @property(cc.Label)
    abilityLabelList: cc.Label[] = []

    @property(cc.Graphics)
    abilityGraphics: cc.Graphics = null;

    private abilityKeyList = ["farmSpeed", "zhiquSpeed", "kaojiuSpeed", "wineSuccess", "wineSpeed"]
    private abilityDescList = ["种田%s", "踩曲%s", "烤酒%s", "调酒%s", "酿酒%s"]
    private abilityPointList: cc.Vec2[] = [cc.v2(111, -10),cc.v2(45, 102),cc.v2(-81, 73),cc.v2(-96, -58),cc.v2(25, -108)]

    updateView(staffId: number) {
        let itemProp = PropConfig[staffId]
        this.nameLabel.string = itemProp.name
        this.descLabel.string = itemProp.desc
        let frameName = BagDataManager.instance.getItemIconById(staffId)
        Tool.loadSpriteFrame(frameName, this.iconSpr)

        let itemStaff = StaffConfig[staffId]
        this.briefLabel.string = itemStaff.briefText

        let star = itemStaff.star
        for(let i = 0, len = this.starParent.children.length; i < len; i++) {
            let emptyNode = this.starParent.children[i]
            let starNode = emptyNode.getChildByName("star")
            starNode.active = (i < star)
        }
        let maxAbility = Tool.getNumberParamConfig("staffAbilityMax")
        this.abilityGraphics.clear()
        for(let i = 0, len = this.valueLabelList.length; i < len; i++) {
            let key = this.abilityKeyList[i]
            let value = itemStaff[key]
            this.valueLabelList[i].string = cc.js.formatStr("%s%", value / 100)
            let percent = Math.floor(value / maxAbility * 100)
            this.abilityLabelList[i].string = cc.js.formatStr(this.abilityDescList[i], percent)
            let pos = this.abilityPointList[i].mul(percent * 0.01)
            if(i == 0) {
                this.abilityGraphics.moveTo(pos.x, pos.y)
            } else {
                this.abilityGraphics.lineTo(pos.x, pos.y)
            }            
        }
        this.abilityGraphics.close()
        this.abilityGraphics.stroke()
        this.abilityGraphics.fill()
    }
}