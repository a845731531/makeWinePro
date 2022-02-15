import BaseView from "../../framework/viewbase/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StoreView extends BaseView {

    @property(cc.Sprite)
    iconTitle: cc.Sprite = null;
    
    @property(cc.Node)
    auctionNode: cc.Node = null;

    @property(cc.Node)
    marketNode: cc.Node = null;

    @property(cc.Node)
    shopNode: cc.Node = null;

    private _toggleIndex = 0 // 0拍卖行   1市场    2商店

    onEnable()
    {
        
    }

    onDisable() {

    }

    start() {
        super.start()
        this.updateView()
    }

    updateView()
    {
        this.auctionNode.active = this._toggleIndex == 0
        this.marketNode.active = this._toggleIndex == 1
        this.shopNode.active = this._toggleIndex == 2

        switch(this._toggleIndex)
        {
            case 0:
                // this.txtTitle.string = "拍卖行"
                break
            case 1:
                // this.txtTitle.string = "市场"
                break
            case 2:
                // this.txtTitle.string = "商店"
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
