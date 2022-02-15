import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { ItemType } from "../../Constant/GameEnum";
import AuctionManager from "../../data/auction/AuctionManager";
import UserDataManager from "../../data/UserDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";
import BagPropItemView from "../Bag/BagPropItemView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AuctionItem extends cc.Component {

    @property(BagPropItemView)
    itemView: BagPropItemView = null;

    @property(cc.Node)
    iconAuction: cc.Node = null;

    @property(cc.Label)
    txtTime: cc.Label = null;

    // //单价
    // @property(cc.Label)
    // txtUnitPrice: cc.Label = null;

    // //当前竞价
    // @property(cc.Label)
    // txtCurPrice: cc.Label = null;

    //竞拍需要的价钱
    @property(cc.Label)
    txtAuctionPrice: cc.Label = null;

    //一口价
    @property(cc.Label)
    txtTotalPrice: cc.Label = null;

    //竞拍按钮
    @property(cc.Node)
    btnAuction: cc.Node = null;

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

        // this.txtUnitPrice.string = auctionData.unitPrice

        // this.txtCurPrice.string = "竞价:" + auctionData.curPrice

        //竞拍一次 需要的钻石  10%的价钱不足1 则 竞拍价为当前价+1
        let auctionPrice = Math.max(Math.floor(auctionData.curPrice * 1.1 / 1000), Math.floor(auctionData.curPrice / 1000 + 1))
        this.txtAuctionPrice.string = auctionPrice + ""

        this.btnBuy.active = false
        this.txtTotalPrice.node.parent.active = false
        if (auctionData.totalPrice != null) {
            this.btnBuy.active = true
            this.txtTotalPrice.node.parent.active = true
            this.txtTotalPrice.string = auctionData.totalPrice / 1000 + ""
        }

        if(auctionData.auctionCount == null)
        {
            //没有参与竞价
            this.iconAuction.active = false    
        }else{
            this.iconAuction.active = true

            //玩家竞拍次数  null为没竞猜过  0为竞猜过但是被别人刷掉了
            this.iconAuction.color = auctionData.auctionCount == 0? cc.Color.RED : cc.Color.GREEN
        }
    }

    onClickAuction() {
        if (!this._auctionData) {
            return
        }

        if (this._auctionData.auctionCount && this._auctionData.auctionCount >= 5) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "您当前为最高出价！"
            })
            return
        }
        EventManager.instance.dispatchEvent("reqAuctionAuctionItem", {
            id: this._auctionData.id
        })
    }

    onClickBuy() {
        if (!this._auctionData) {
            return
        }

        if (this._auctionData.totalPrice) {

            EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                content: cc.js.formatStr("是否花费%szqb购买该物品?", this._auctionData.totalPrice / 1000),
                showCancel: true,
                confirmCallback: () => {
                    EventManager.instance.dispatchEvent("reqAuctionBuyItem", {
                        id: this._auctionData.id
                    })
                }
            })
        }
    }



}
