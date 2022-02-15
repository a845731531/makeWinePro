import DailyShopView from "./DailyShopView";
import MarketView1 from "./MarketView1";
import MarketView2 from "./MarketView2";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopMainView extends cc.Component {

    @property(cc.Node)
    dailyNode: cc.Node = null;

    private _toggleIndex = 0  //0每日商店

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
        this.dailyNode.active = this._toggleIndex == 0

        switch(this._toggleIndex)
        {
            case 0:
                this.dailyNode.getComponent(DailyShopView).initView()
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
