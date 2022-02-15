import BagDataManager from "../../data/BagDataManager";
import FormulaManager from "../../data/formula/FormulaManager";
import BagItemView from "../Bag/BagItemView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AddOldWineItem extends cc.Component {

    @property(BagItemView)
    bagItemView: BagItemView = null;

    @property(cc.Node)
    hasIcon: cc.Node = null;

    private _callback = null
    private _index = null

    updateView(index,wineId,callback)
    {
        this._index = index
        this._callback = callback
        let num = BagDataManager.instance.getItemNum(wineId)
        this.bagItemView.updateView({
            propId: wineId,
            customNum: num + "",
            showName: false,
            hideClick: true
        })
        
        // this.txtCount.string = (BagDataManager.instance.getItemNum(wineId) / 1000).toFixed(2) + "L"
        // this.txtCount.string = BagDataManager.instance.getItemNum(wineId) + ""

        this.hasIcon.active = FormulaManager.instance.checkOldWineIsAdd(wineId)
    }

    onClickItem()
    {
        this._callback && this._callback(this._index)
    }
    
}