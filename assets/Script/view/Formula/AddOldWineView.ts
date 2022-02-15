import BagDataManager from "../../data/BagDataManager";
import List from "../../framework/component/List";
import BaseView from "../../framework/viewbase/BaseView";
import AddOldWineRowItem from "./AddOldWineRowItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AddOldWineView extends BaseView {

    @property(List)
    list: List = null;

    @property(cc.Node)
    tips: cc.Node = null;

    private _index = 0

    private _oldWinelist = []

    initByExData(param)
    {
        this._index = param.index
        this.updateView()
    }

    updateView()
    {
        this._oldWinelist = []
        for(let i = 1; i <= 50; i++)
        {
            let oldWineList = BagDataManager.instance.getBagOldWineByYearAndRound(i,this._index)
            if(oldWineList.length > 0)
            {
                this._oldWinelist.push(oldWineList)
            }
        }

        this.list.numItems = this._oldWinelist.length

        this.tips.active = this._oldWinelist.length == 0
    }

    onRenderEvent(item: cc.Node, index: number) {
        item.getComponent(AddOldWineRowItem).updateView(index + 3,this._index,this._oldWinelist[index],this.onCloseView.bind(this))
    }

}
