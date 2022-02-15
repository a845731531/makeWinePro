import MarketView1 from "./MarketView1";
import MarketView2 from "./MarketView2";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MarketMainView extends cc.Component {

    @property(cc.Node)
    hallNode: cc.Node = null;

    @property(cc.Node)
    saleNode: cc.Node = null;

    private _toggleIndex = 0  //0摊货   1集市上架

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
        this.saleNode.active = this._toggleIndex == 1

        switch(this._toggleIndex)
        {
            case 0:
                this.hallNode.getComponent(MarketView1).initView()
                break
            case 1:
                this.saleNode.getComponent(MarketView2).initView()
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
