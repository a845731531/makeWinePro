import { BagType } from "../../Constant/GameEnum";
import AuctionManager from "../../data/auction/AuctionManager";
import MarketManager from "../../data/auction/MarketManager";
import List from "../../framework/component/List";
import BaseView from "../../framework/viewbase/BaseView";
import BagPropItemView from "../Bag/BagPropItemView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AuctionSelectView extends BaseView {

    @property(List)
    list: List = null;

    private curTag = BagType.All

    //是否为可拍卖物品
    private isAuction = true
    
    private bagDataList = []

    private callback = null

    onEnable()
    {
        // EventManager.instance.addEventListener(CustomEventEnum.BAG_UPDATE_VIEW,this.updateView,this)
    }
    onDisable() {
        // EventManager.instance.removeTargetListener(this)
    }
    
    initByExData(exData: any): void {
        this.callback = exData.callback
        this.isAuction = exData.isAuction
        this.updateView()
    }

    updateView()
    {
        if(this.isAuction)
        {
            this.bagDataList = AuctionManager.instance.getAuctionBagDataByType(this.curTag)
        }else{
            this.bagDataList = MarketManager.instance.getMarketBagDataByType(this.curTag)
        }
        while(this.bagDataList.length < 35)
        {
            this.bagDataList.push(null)
        }
        this.list.numItems = this.bagDataList.length
    }

    onRenderEvent(item: cc.Node, index: number) {
        item.getComponent(BagPropItemView).updateView(this.bagDataList[index],false)
    }

    onSelectItem(itemNode: cc.Node, index: number){
        this.callback && this.callback(this.bagDataList[index])
        this.onCloseView()
    }

    onClickToggle(toggle, index)
    {
        this.curTag = index
        this.updateView()
    }
}
