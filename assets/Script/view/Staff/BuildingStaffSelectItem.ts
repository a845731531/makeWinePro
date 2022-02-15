import PropConfig from "../../config/PropConfig";
import StaffConfig from "../../config/StaffConfig";
import BuildingDataManager from "../../data/BuildingDataManager";
import GuideManager from "../../framework/guide/GuideManager";
import { Tool } from "../../framework/manager/Tool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingStaffSelectItem extends cc.Component {

    @property(cc.Sprite)
    staffIcon: cc.Sprite = null;

    @property(cc.Label)
    staffName: cc.Label = null;

    @property(cc.Node)
    starLayout: cc.Node = null;

    @property(cc.Node)
    attrLayout: cc.Node = null;

    @property(cc.Node)
    workingIcon: cc.Node = null;

    @property(cc.Label)
    txtChange: cc.Label = null;

    @property(cc.Node)
    btnSelect: cc.Node = null;

    private _callback = null
    private _staffData = null
    private _staffId = null

    private _attrDesc = [
        "生产加速+%s%",
        "制曲加速+%s%",
        "烤酒加速+%s%",
        "酿酒加速+%s%",
    ]

    updateView(param) {
        this._staffId = param.staffId
        this._staffData = param.staffData
        this._callback = param.callback
        if (this._staffData) {
            this.node.active = true
            GuideManager.instance.registerGuideNode(cc.js.formatStr("StaffItemBtnSelect_%s", this._staffData.staffId), this.btnSelect)
            
            let staffConfig = StaffConfig[this._staffData.staffId]
            if (!staffConfig) {
                return
            }

            this.txtChange.string = this._staffId ? "换岗" : "上岗"

            let isWorking = BuildingDataManager.instance.checkStaffIsWorking(this._staffData.staffId)
            this.workingIcon.active = isWorking

            let itemComfig = PropConfig[this._staffData.staffId]
            this.staffName.string = itemComfig.name

            Tool.loadSpriteFrame(cc.js.formatStr("texture/staff/%s", itemComfig.icon), this.staffIcon)

            let quality = itemComfig.quality
            for (let i = 0; i < this.starLayout.children.length; i++) {
                this.starLayout.children[i].active = quality >= i
            }

            for (let i = 0; i < this.attrLayout.children.length; i++) {
                let txtItem = this.attrLayout.children[i]
                txtItem.active = false
                let staffconfig = StaffConfig[this._staffData.staffId]
                if (i == 0 && staffconfig.farmSpeed > 0) {
                    txtItem.active = true
                    txtItem.getComponent(cc.Label).string = cc.js.formatStr(this._attrDesc[i], staffconfig.farmSpeed)
                }
                if (i == 1 && staffconfig.zhiquSpeed > 0) {
                    txtItem.active = true
                    txtItem.getComponent(cc.Label).string = cc.js.formatStr(this._attrDesc[i], staffconfig.zhiquSpeed)
                }
                if (i == 2 && staffconfig.kaojiuSpeed > 0) {
                    txtItem.active = true
                    txtItem.getComponent(cc.Label).string = cc.js.formatStr(this._attrDesc[i], staffconfig.kaojiuSpeed)
                }
                if (i == 3 && staffconfig.wineSpeed > 0) {
                    txtItem.active = true
                    txtItem.getComponent(cc.Label).string = cc.js.formatStr(this._attrDesc[i], staffconfig.wineSpeed)
                }
            }
        }

    }

    onClickAdd() {
        this._callback && this._callback(this._staffData.staffId)
    }

}
