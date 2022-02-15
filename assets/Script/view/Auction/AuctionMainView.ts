import EventManager from "../../framework/manager/EventManager";
import BaseView from "../../framework/viewbase/BaseView";
import AuctionView1 from "./AuctionView1";
import AuctionView2 from "./AuctionView2";
import AuctionView3 from "./AuctionView3";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AuctionMainView extends cc.Component {

    @property(cc.Node)
    hallNode: cc.Node = null;

    @property(cc.Node)
    auctionNode: cc.Node = null;

    @property(cc.Node)
    saleNode: cc.Node = null;

    private _toggleIndex = 0  //0交易大厅      1拍卖上架        2竞拍物品

    onEnable()
    {

    }

    onDisable() {
        // EventManager.instance.removeTargetListener(this)
    }

    start() {
        this.updateView()
    }

    updateView()
    {
        this.hallNode.active = this._toggleIndex == 0
        this.auctionNode.active = this._toggleIndex == 1
        this.saleNode.active = this._toggleIndex == 2

        switch(this._toggleIndex)
        {
            case 0:
                this.hallNode.getComponent(AuctionView1).initView()
                break
            case 1:
                this.auctionNode.getComponent(AuctionView2).initView()
                break
            case 2:
                this.saleNode.getComponent(AuctionView3).initView()
                break
        }

    }

    onClickToggle(toggle,index)
    {   
        let toggleIndex = parseInt(index)
        if(this._toggleIndex != toggleIndex)
        {
            this._toggleIndex = toggleIndex
            this.updateView()
        }
    }
}
