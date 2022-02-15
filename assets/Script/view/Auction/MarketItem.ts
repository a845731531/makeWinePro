import { ItemType } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import AuctionManager from "../../data/auction/AuctionManager";
import UserDataManager from "../../data/UserDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import BagPropItemView from "../Bag/BagPropItemView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MarketItem extends cc.Component {

    @property(BagPropItemView)
    itemView: BagPropItemView = null;

    @property(cc.Label)
    txtTime: cc.Label = null;

    //单价
    @property(cc.Label)
    txtUnitPrice: cc.Label = null;

    //一口价
    @property(cc.Label)
    txtTotalPrice: cc.Label = null;

    //一口价购买
    @property(cc.Node)
    btnBuy: cc.Node = null;

    private _auctionData = null

    updateView(auctionData) {
        this.node.active = true

        this.node.x = 0

        this._auctionData = auctionData

        let shelfTime = AuctionManager.instance.getAuctionShelfDataByType(auctionData.shelfType).time * 3600
        let remainingTime = Math.floor(auctionData.createTime + shelfTime - (new Date().getTime() / 1000))
        if (remainingTime <= 0 || auctionData.userId == UserDataManager.instance.getUserId()) {
            //物品上架时间结束  或者  这个物品是玩家自己的上架的则不显示
            this.node.active = false
            return
        }

        let itemData = null
        if (auctionData.type == ItemType.EXCode) {
            itemData = auctionData.exData
        } else {
            itemData = {
                propId: auctionData.propId,
                customNum: auctionData.count,
            }
        }

        this.itemView.updateView(itemData)

        this.node.active = true

        this.txtTime.string = Tool.formatTime(remainingTime)

        this.txtUnitPrice.string = auctionData.unitPrice

        this.btnBuy.active = false
        this.txtTotalPrice.node.parent.active = false
        if (auctionData.totalPrice != null) {
            this.btnBuy.active = true
            this.txtTotalPrice.node.parent.active = true
            this.txtTotalPrice.string = auctionData.totalPrice / 1000 + ""
        }
    }

    onClickBuy() {
        if (!this._auctionData) {
            return
        }

        if (this._auctionData.totalPrice) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.MarketSaleView,
                exData:{
                    auctionData: this._auctionData,
                    isSelect: false,
                    isBuy: true,
                }
            })


            // EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            //     content: cc.js.formatStr("是否花费%szqb购买该物品?", this._auctionData.totalPrice / 1000),
            //     showCancel: true,
            //     confirmCallback: () => {
            //         EventManager.instance.dispatchEvent("reqMarketBuyItem", {
            //             id: this._auctionData.id
            //         })
            //     }
            // })
        }
    }



}
