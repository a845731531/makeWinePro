import PropConfig from "../../config/PropConfig";
import { ItemType } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import AuctionManager from "../../data/auction/AuctionManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";
import BagPropItemView from "../Bag/BagPropItemView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AuctionSaleView extends BaseView {

    @property(cc.Node)
    addNode: cc.Node = null;

    @property(BagPropItemView)
    itemView: BagPropItemView = null;

    @property(cc.Node)
    saleNode: cc.Node = null;

    @property(cc.Node)
    retrieveNode: cc.Node = null;

    @property(cc.Label)
    txtCurShelfTime: cc.Label = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Label)
    txtCount: cc.Label = null;

    @property(cc.Label)
    txtUnitPrice: cc.Label = null;

    @property(cc.Label)
    txtTotalPrice: cc.Label = null;

    @property(cc.EditBox)
    edCount: cc.EditBox = null;

    @property(cc.EditBox)
    edUnitPrice: cc.EditBox = null;

    @property(cc.EditBox)
    edTotalPrice: cc.EditBox = null;

    @property(cc.Node)
    btnSale: cc.Node = null;

    @property(cc.Node)
    btnRetrieve: cc.Node = null;

    @property(cc.Label)
    txtRetrieve: cc.Label = null;

    private _auctionData = null

    //上架时间类型
    private _shelfType = 2   // 24小时20%手续费

    //是否已经上架
    private _isSaleUp = true

    //物品类型
    private _itemType = null
    private _itemData = null

    onEnable()
    {
        EventManager.instance.addEventListener("rspAuctionShelfItem", this.onRspShelfItem, this)
        EventManager.instance.addEventListener("rspAuctionRetrieveItem", this.onRspRetrieveItem, this)
    }

    onDisable() {
        EventManager.instance.removeTargetListener(this)

        this.unscheduleAllCallbacks()
    }

    initByExData(exData: any): void {
        // if(exData && exData.isSelect)
        // {
        //     this.onSelectBagItem(exData.bagItemData)
        // }else{
        //     this.updateView(exData.auctionData)
        // }

        if (exData && exData.isSelect) {
            this.updateView(null)
            this.onSelectBagItem(exData.bagItemData)
        } else {
            this.updateView(exData.auctionData)
        }
    }

    updateShelfTime()
    {
        if(this._auctionData)
        {
            let shelfTime = AuctionManager.instance.getAuctionShelfDataByType(this._auctionData.shelfType).time * 3600
            let remainingTime = Math.floor(this._auctionData.createTime + shelfTime - (new Date().getTime() / 1000))
            if(remainingTime <= 0)
            {
                //物品上架时间结束
                this.txtCurShelfTime.string = "物品已过期"
                this.unscheduleAllCallbacks()
                this.txtRetrieve.string = "取回"
            }else{
                this.txtCurShelfTime.string = cc.js.formatStr("下架倒计时：%s",Tool.formatTime(remainingTime))
                this.txtRetrieve.string = "下架"
            }
        }
    }


    updateView(auctionData)
    {

        this._auctionData = auctionData

        this._isSaleUp = this._auctionData? true : false

        this.saleNode.active = !this._isSaleUp
        this.retrieveNode.active = this._isSaleUp

        if(this._isSaleUp)
        {

            let itemData = null
            if(this._auctionData.type == ItemType.EXCode)
            {
                itemData = this._auctionData.exData
            }else{
                itemData = {
                    propId: this._auctionData.propId,
                    customNum: this._auctionData.count
                }
            }

            this.updateShelfTime()
            this.schedule(this.updateShelfTime,1)

            this.itemView.node.active = true
            this.itemView.updateView(itemData,false)

            this.txtName.string = this._auctionData.type == ItemType.EXCode? this._auctionData.exData.name : PropConfig[this._auctionData.propId].name

            this.txtCount.string = this._auctionData.count + ""

            this.txtUnitPrice.string = this._auctionData.unitPrice + ""

            this.txtTotalPrice.string = this._auctionData.totalPrice + ""

            // let shelfTimeData = AuctionManager.instance.getAuctionShelfDataByType(this._auctionData.shelfType)
            // this.txtShelfTime.string = cc.js.formatStr("%s小时(%s%手续费)",shelfTimeData.time,shelfTimeData.cost)
            
            this.btnSale.active = false
            this.btnRetrieve.active = true
        }else{
            this.itemView.node.active = false

            this.txtName.string = ""

            this.btnSale.active = true
            this.btnRetrieve.active = false
        }

    }

    onEditBoxTextEnd()
    {
        let countStr = this.edCount.string
        if(countStr != "")
        {
            this.edCount.string = parseInt(countStr) + ""
        }

        let unitPriceStr = this.edUnitPrice.string
        if(unitPriceStr != "")
        {
            this.edUnitPrice.string = parseInt(unitPriceStr) + ""
        }

        let totalPriceStr = this.edTotalPrice.string
        if(totalPriceStr != "")
        {
            this.edTotalPrice.string = parseInt(totalPriceStr) + ""
        }

        // this.txtAllPrice.string = "0"
        // if(count > 0 && unitPrice > 0)
        // {
        //     this.txtAllPrice.string = count * unitPrice + ""
        // }

    }

    onClickAddNode()
    {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.AuctionSelectView,
            exData:{
                isAuction: true,
                callback: this.onSelectBagItem.bind(this)
            }
        })

    }

    onSelectBagItem(data)
    {
        // console.log("选中了物品",data)
        this._itemData = data

        this.itemView.node.active = true
        this.itemView.updateView(this._itemData)

        this.txtName.string = this._itemData.type == ItemType.EXCode? this._itemData.name : PropConfig[this._itemData.propId].name

        this._itemType = this._itemData.type? this._itemData.type : PropConfig[this._itemData.propId].type

        this.addNode.opacity = 0
    }

    onClickSale()
    {
        let countStr = this.edCount.string
        if(countStr == "")
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "数量不能为空！"
            })
            return
        }else{
            if(parseInt(countStr) <= 0)
            {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                    msg: "数量不能小于等于0！"
                })            
                return
            }
        }

        let unitPriceStr = this.edUnitPrice.string 
        if(unitPriceStr == "")
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "单价不能为空！"
            })            
            return
        }else{
            if(parseInt(unitPriceStr) <= 0)
            {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                    msg: "单价不能小于等于0！"
                })            
                return
            }
        }

        let totalPriceStr = this.edTotalPrice.string
        if(totalPriceStr != "")
        {
            if(parseInt(totalPriceStr) <= 0)
            {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                    msg: "一口价不能小于等于0！"
                })            
                return
            }
        }

        if(!this._itemData)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "请选择上架物品！"
            })     
            return
        }

        let exData = this._itemType == ItemType.EXCode? this._itemData : null

        EventManager.instance.dispatchEvent("reqAuctionShelfItem",{
            propId: this._itemData.propId,
            type: this._itemType,
            count: parseInt(countStr),
            unitPrice: parseInt(unitPriceStr) * 1000,
            totalPrice: totalPriceStr == ""? null : parseInt(totalPriceStr) * 1000,
            shelfType: this._shelfType,
            exData: exData
        })
    }

    onClickRetrieve()
    {
        if(this._auctionData)
        {
            EventManager.instance.dispatchEvent("reqAuctionRetrieveItem",{
                id: this._auctionData.id
            })
        }
    }

    onRspShelfItem(eventData)
    {
        if(eventData.error_code)
        {
            return
        }

        this.onCloseView()
    }

    onRspRetrieveItem(eventData)
    {
        if(eventData.error_code)
        {
            return
        }
        
        this.onCloseView()
    }
}
