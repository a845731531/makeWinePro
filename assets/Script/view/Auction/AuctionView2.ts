import List from "../../framework/component/List";
import EventManager from "../../framework/manager/EventManager";
import AuctionItem from "./AuctionItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AuctionView2 extends cc.Component {
    
    @property(cc.Node)
    txtTips: cc.Node = null;

    @property(List)
    list: List = null;

    private _auctionDataList = []

    onEnable()
    {
        EventManager.instance.addEventListener("rspMyAuctionList",this.onRspMyAuctionList,this)

        EventManager.instance.addEventListener("rspAuctionAuctionItem",this.onRspAuctionDataChange,this)

        EventManager.instance.addEventListener("rspAuctionBuyItem",this.onRspAuctionDataChange,this)

        this.schedule(this.updateView,1)

    }

    onDisable() {
        EventManager.instance.removeTargetListener(this)

        this.unscheduleAllCallbacks()
    }

    start() {

    }

    initView()
    {
        this.reqFirstData()
        this.updateView()
    }

    updateView()
    {
        this.list.numItems = this._auctionDataList.length
        this.txtTips.active = this._auctionDataList.length == 0
    }

    onRenderEvent(item: cc.Node, index: number) {
        item.getComponent(AuctionItem).updateView(this._auctionDataList[index])
    }

    reqFirstData()
    {
        EventManager.instance.dispatchEvent("reqMyAuctionList")
    }

    onRspAuctionDataChange(eventData)
    {
        if(eventData.error_code) {
            return
        }
        this.reqFirstData()
    }

    onRspMyAuctionList(eventData)
    {
        if(eventData.error_code) {
            return
        }

        this._auctionDataList = eventData.items
        this.updateView()   
    }

}
