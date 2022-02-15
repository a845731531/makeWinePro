import PropConfig from "../../config/PropConfig";
import { ItemType } from "../../Constant/GameEnum";
import UserDataManager from "../../data/UserDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import BaseView from "../../framework/viewbase/BaseView";
import BagPropItemView from "../Bag/BagPropItemView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopSaleView extends BaseView {

    @property(BagPropItemView)
    itemView: BagPropItemView = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Label)
    txtCount: cc.Label = null;

    @property(cc.Label)
    txtAllPrice: cc.Label = null;

    @property(cc.Label)
    txtDesc: cc.Label = null;

    @property(cc.Node)
    hasBuy: cc.Node = null;

    @property(cc.Label)
    txtDiscount: cc.Label = null;

    private _itemData = null

    onEnable() {
        EventManager.instance.addEventListener("rspBuyShopItem",this.onRspBuyItem,this)
    }

    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    initByExData(exData: any): void {
        this.updateView(exData.itemData)
    }

    updateView(itemData) {
        this._itemData = itemData

        //每日道具只会出现道具表中的道具
        this.itemView.updateView({
            propId: this._itemData.propId,
            customNum: this._itemData.count,
        },false)

        this.txtName.string = PropConfig[this._itemData.propId].name

        this.txtCount.string = this._itemData.count + ""

        this.txtAllPrice.string = this._itemData.price / 1000 + "" 

        if(this._itemData.discountStr != "")
        {
            this.txtDiscount.string = this._itemData.discountStr
            this.txtDiscount.node.parent.active = true
        }else{
            this.txtDiscount.node.parent.active = false
        }

        this.hasBuy.active = this._itemData.state == 1
    }

    onClickBuy() {
        if (this._itemData.price > 0) {

            // let needProce = this._itemData.price
            // let curDiamond = UserDataManager.instance.getDiamondNum()
            // if (curDiamond < needProce) {
            //     EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            //         msg: "zqb不足!"
            //     })
            //     return
            // }

            EventManager.instance.dispatchEvent("reqBuyShopItem",{
                id: this._itemData.id
            })
        }
    }

    onRspBuyItem(eventData) {
        if (eventData.error_code) {
            return
        }

        this.onCloseView()
    }
}
