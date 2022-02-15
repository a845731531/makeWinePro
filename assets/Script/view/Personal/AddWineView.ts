import PropConfig from "../../config/PropConfig";
import { itemDiscardType } from "../../Constant/GameEnum";
import BagDataManager from "../../data/BagDataManager";
import { BagItemData } from "../../data/DataInterface";
import List from "../../framework/component/List";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import BaseView from "../../framework/viewbase/BaseView";
import AddWineItemView from "./AddWineItemView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AddWineView extends BaseView {

    @property(List)
    list: List = null;
        
    @property(cc.Node)
    tips: cc.Node = null;

    private _bagDataList: BagItemData[] = []

    private _callback = null

    private _wineId = -1

    onEnable()
    {

    }

    onDisable() {

    }

    initByExData(param)
    {
        this._callback = param.callback
        this._wineId = param.wineId
        this.updateView()
    }

    updateView()
    {
        this._bagDataList = BagDataManager.instance.getWineBagData(itemDiscardType.PICKUP)
        if(this._bagDataList.length > 0)
        {
            this.tips.active = false
            this.list.node.active = true
            this.list.numItems = this._bagDataList.length
        }else{
            this.list.node.active = false
            this.tips.active = true
        }
    }

    onRenderEvent(item: cc.Node, index: number) {
        item.getComponent(AddWineItemView).updateView(this._bagDataList[index],this._wineId)
    }

    onSelectEvent(item: cc.Node, selectIndex: number, lastIndex: number) {
        if(this._bagDataList[selectIndex])
        {  
            let propId = this._bagDataList[selectIndex].propId
            let itemProp = PropConfig[propId]
            this._callback && this._callback(propId)
            this.onCloseView()
            EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                type: "AddWineSelectItem",
                param: itemProp.subId
            })
        }
    }

}
