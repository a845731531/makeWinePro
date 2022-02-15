import { ItemType } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import List from "../../framework/component/List";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import BagPropItemView from "../Bag/BagPropItemView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MarketView2 extends cc.Component {

    @property(List)
    list: List = null;

    private _auctionDataList = []


    onEnable()
    {
        EventManager.instance.addEventListener("rspMyMarketSaleList", this.onRspAuctionSaleList, this)

        EventManager.instance.addEventListener("rspMarketShelfItem", this.onRspShelfItem, this)

        EventManager.instance.addEventListener("rspMarketRetrieveItem", this.onRspRetrieveItem, this)
    }

    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    initView()
    {
        this.reqAuctionSaleList()
        this.updateView()
    }

    reqAuctionSaleList()
    {

        EventManager.instance.dispatchEvent("reqMarketSaleList")

    }

    onRspAuctionSaleList(eventData)
    {
        if(eventData.error_code)
        {
            return
        }

        this._auctionDataList = eventData.items
        while(this._auctionDataList.length < 8)
        {
            this._auctionDataList.push(null)
        }
        this.updateView()
    }

    onRspShelfItem(eventData)
    {
        if(eventData.error_code)
        {
            return
        }

        this.reqAuctionSaleList()
    }

    onRspRetrieveItem(eventData)
    {
        if(eventData.error_code)
        {
            return
        }

        this.reqAuctionSaleList()
    }

    updateView()
    {
        this.list.numItems = 8
    }

    onRenderEvent(item: cc.Node, index: number) {
        item.active = true

        let auctionData = this._auctionDataList[index]
        let addNode = item.getChildByName("addNode")
        let bagPropItem = item.getChildByName("bagItemNode")
        if(auctionData)
        {
            addNode.active = false
            bagPropItem.active = true

            let itemData = null
            if(auctionData.type == ItemType.EXCode)
            {
                itemData = auctionData.exData
            }else{
                itemData = {
                    propId: auctionData.propId,
                    customNum: auctionData.count,
                }
            }
            bagPropItem.getComponent(BagPropItemView).updateView(itemData,false)
        }else{
            addNode.active = true
            bagPropItem.active = false
        }
    }

    onSelectItem(itemNode,index)
    {
        if(!this._auctionDataList[index])
        {
            //打开背包 选择上架物品
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.AuctionSelectView,
                exData:{
                    isAuction: false,
                    callback: (bagItemData)=>{
                        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                            viewName: PrefabPathEnum.MarketSaleView,
                            exData:{
                                auctionData: null,
                                isSelect: true,
                                bagItemData: bagItemData
                            }
                        })
                    }
                }
            })
        }else{
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.MarketSaleView,
                exData:{
                    auctionData: this._auctionDataList[index],
                    isSelect: false
                }
            })
        }
    }

}
