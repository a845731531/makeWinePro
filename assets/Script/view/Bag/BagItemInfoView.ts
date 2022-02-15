import PropConfig from "../../config/PropConfig";
import BagDataManager from "../../data/BagDataManager";
import { BagItemData } from "../../data/DataInterface";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";
import BagItemView from "./BagItemView";

/**
 * 背包物品 item信息弹窗脚本
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class BagItemInfoView extends BaseView {

    @property(BagItemView)
    bagItem: BagItemView = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Label)
    txtDesc: cc.Label = null;

    @property(cc.Label)
    txtNum: cc.Label = null;

    @property(cc.Node)
    useBtn: cc.Node = null;

    private _totalCount = 1

    initByExData(data:BagItemData) {
        let customData: BagItemData = Tool.deepCopy(data)
        customData.hideClick = true
        customData.showName = false
        this.bagItem.updateView(data)

        let propId = data.propId
        let itemProp = PropConfig[propId]
        this.txtDesc.string = itemProp.desc
        this.txtName.string = itemProp.name

        //数量
        // this._totalCount = BagDataManager.instance.getItemNum(propId)
        this._totalCount = data.customNum? data.customNum : BagDataManager.instance.getItemNum(propId)
        this.txtNum.string = cc.js.formatStr("数量：%d",this._totalCount)

        this.useBtn.active = false
    }

    onClickUse()
    {

    }
}
