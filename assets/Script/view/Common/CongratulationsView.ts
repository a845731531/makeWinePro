import List from "../../framework/component/List";
import EventManager from "../../framework/manager/EventManager";
import BaseView from "../../framework/viewbase/BaseView";
import BagItemView from "../Bag/BagItemView";
import BagPropItemView from "../Bag/BagPropItemView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CongratulationsView extends BaseView {
    @property(cc.Node)
    listNode: cc.Node = null;

    @property(cc.Node)
    itemParent: cc.Node = null;

    @property(cc.Node)
    bagPropItem: cc.Node = null;

    private _propList = null
    private closeBack = null

    initByExData(param)
    {
        this._propList = param.propList
        this.closeBack = param.closeBack
        this.updateView()
    }
    onCloseView() {
        super.onCloseView()
        if(this.closeBack) {
            this.closeBack()
        }
    }
    updateView()
    {
        if(this._propList && this._propList.length > 0)
        {
            for(let i = 0, len = this._propList.length; i < len; i++) {
                let itemData = this._propList[i]
                let itemNode = cc.instantiate(this.bagPropItem)
                itemNode.parent = this.itemParent
                itemNode.getComponent(BagPropItemView).updateView(itemData)
            }
        }

        this.listNode.y = (this._propList && this._propList.length > 4)? -100 : -165 

    }
}
