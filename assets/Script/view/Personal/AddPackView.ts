import PersonalManager from "../../data/personal/PersonalManager";
import List from "../../framework/component/List";
import BaseView from "../../framework/viewbase/BaseView";
import AddPackItemView from "./AddPackItemView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AddPackView extends BaseView {

    @property(List)
    list: List = null;

    private _callback = null

    private _wineId = -1

    private _type = -1

    private _packDataList = []

    onEnable()
    {

    }

    onDisable() {
        super.onDisable()
    }

    initByExData(param)
    {
        this._type = param.type
        this._wineId = param.wineId
        this._callback = param.callback
        this.updateView()
    }

    updateView()
    {
        this._packDataList = PersonalManager.instance.getPackDataList(this._wineId,this._type)
        this.list.numItems = this._packDataList.length
    }

    onRenderEvent(item: cc.Node, index: number) {
        if(this._packDataList[index])
        {
            item.getComponent(AddPackItemView).updateView(this._packDataList[index].id)
        }
    }

    onSelectEvent(item: cc.Node, selectIndex: number, lastIndex: number) {
        if(this._packDataList[selectIndex])
        {
            this._callback && this._callback(this._packDataList[selectIndex].id)
            this.onCloseView()
        }
    }

}
