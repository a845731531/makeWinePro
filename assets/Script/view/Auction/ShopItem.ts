import PropConfig from "../../config/PropConfig";
import ShopConfig from "../../config/ShopConfig";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import UserDataManager from "../../data/UserDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import BagPropItemView from "../Bag/BagPropItemView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopItem extends cc.Component {

    @property(BagPropItemView)
    itemView: BagPropItemView = null;

    @property(cc.Node)
    hasBuy: cc.Node = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Label)
    txtTotalPrice: cc.Label = null;

    @property(cc.Label)
    txtDiscount: cc.Label = null;

    @property(cc.Button)
    btnBuy: cc.Button = null;

    private _itemData = null

    updateView(itemData) {

        if(itemData)
        {
            this.node.active = true
    
            this._itemData = itemData
            
            //每日道具只会出现道具表中的道具
            this.itemView.updateView({
                propId: this._itemData.propId,
                customNum: this._itemData.count,
            },false)
            
            this.txtName.string = PropConfig[this._itemData.propId].name
    
            this.txtTotalPrice.string = this._itemData.price / 1000 + ""

            if(this._itemData.discountStr != "")
            {
                this.txtDiscount.string = this._itemData.discountStr
                this.txtDiscount.node.parent.active = true
            }else{
                this.txtDiscount.node.parent.active = false
            }
    
            this.hasBuy.active = this._itemData.state == 1

            this.btnBuy.interactable = this._itemData.state != 1
        }
    }

    onClickBuy() {
        if (!this._itemData) {
            return
        }

        if(this._itemData.state == 1)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "已售罄"
            })
            return
        }

        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.ShopSaleView,
            exData:{
                itemData: this._itemData
            }
        })
  
    }
}
