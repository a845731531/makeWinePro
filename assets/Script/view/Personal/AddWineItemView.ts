import PropConfig from "../../config/PropConfig";
import WineQualilyConfig from "../../config/WineQualilyConfig";
import BagDataManager from "../../data/BagDataManager";
import { BagItemData } from "../../data/DataInterface";
import GuideManager from "../../framework/guide/GuideManager";
import { Tool } from "../../framework/manager/Tool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AddWineItemView extends cc.Component {

    @property(cc.Sprite)
    itemIcon: cc.Sprite = null;

    @property(cc.Sprite)
    qualityIcon: cc.Sprite = null;

    @property(cc.Sprite)
    framIcon: cc.Sprite = null;

    @property(cc.Label)
    txtNum: cc.Label = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    // @property(cc.Label)
    // txtName: cc.Label = null;

    // @property(cc.Node)
    // selectIcon: cc.Node = null;

    updateView(data: BagItemData,selectWineId) {

        
        let propId = data.propId
        let itemProp = PropConfig[propId]

        GuideManager.instance.registerGuideNode(cc.js.formatStr("AddWineItem_%s", itemProp.subId), this.node)

        // this.selectIcon.active = selectWineId == propId

        this.txtName.string = itemProp.name

        if(data.customNum != null) {
            this.txtNum.string = data.customNum
        } else {
            let curNum = BagDataManager.instance.getItemNum(propId)
            this.txtNum.string = "" + curNum
        }
        let iconUrl = BagDataManager.instance.getItemIconById(propId)
        Tool.loadSpriteFrame(iconUrl, this.itemIcon)

        let quality = itemProp.quality
        Tool.loadSpriteFrame(cc.js.formatStr("texture/bag/icon_border_%d", quality), this.framIcon)


        //从成品酒中 读取评分等级
        let scoreQuality = WineQualilyConfig[propId].quality
        Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/wine_quality_%d", scoreQuality), this.qualityIcon)
    }
}
