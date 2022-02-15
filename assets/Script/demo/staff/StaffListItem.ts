import PropConfig from "../../config/PropConfig";
import StaffConfig from "../../config/StaffConfig";
import { BuildingType } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import BagDataManager from "../../data/BagDataManager";
import BuildingDataManager from "../../data/BuildingDataManager";
import { StaffData } from "../../data/DataInterface";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class StaffListItem extends cc.Component {
    @property(cc.Node)
    unownedNode: cc.Node = null

    @property(cc.Sprite)
    iconSpr: cc.Sprite = null
    @property(cc.Label)
    nameLabel: cc.Label = null

    @property(cc.Node)
    starParent: cc.Node = null

    private curData: StaffData = null

    updateView(itemData: StaffData) {
        this.curData = itemData
        let staffId = this.curData.staffId

        let itemConfig = PropConfig[staffId]
        this.nameLabel.string = itemConfig.name
        let itemStaff = StaffConfig[staffId]

        let frameName = cc.js.formatStr("texture/staff/staff_icon_%s", itemStaff.baseStaff)
        Tool.loadSpriteFrame(frameName, this.iconSpr)
            
        let star = itemStaff.star
        for(let i = 0, len = this.starParent.children.length; i < len; i++) {
            let emptyNode = this.starParent.children[i]
            let starNode = emptyNode.getChildByName("star")
            emptyNode.active = (i < star)
        }
        this.unownedNode.active = (itemData.contractEndTime == 0)
    }

    onClickItem() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.StaffDetailView,
            exData: {
                staffData: this.curData
            }
        })
    }
}