import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import BagDataManager from "../../data/BagDataManager";
import List from "../../framework/component/List";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import AddOldWineItem from "./AddOldWineItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AddOldWineRowItem extends cc.Component {

    @property(cc.Label)
    txtYear: cc.Label = null;

    @property(cc.Prefab)
    oldWineItem: cc.Prefab = null;

    @property(cc.Node)
    itemLayout: cc.Node = null;

    private _oldWineList = []

    private _index = 0

    private _callback = null

    private _itemList = []

    /**
     * @param year 年份  
     * @param index 轮次酒
     * @param callbakc 回调
     */
    updateView(year,index,wineList,callbakc?)
    {
        this._index = index

        this._callback = callbakc

        this.txtYear.string = year <= 10? (Tool.getChinaNumber(year) + "年") : Tool.getChinaNumber(year)

        this._oldWineList = wineList

        this.itemLayout.removeAllChildren()
        for(let i = 0; i < this._oldWineList.length; i++)
        {
            let item = null
            if(!this._itemList[i])
            {
                item = cc.instantiate(this.oldWineItem)
            }else{
                item = this._itemList[i]
            }
            item.parent = this.itemLayout
            item.getComponent(AddOldWineItem).updateView(i,this._oldWineList[i].propId,this.onSelectOldWine.bind(this))
        }
    }

    onSelectOldWine(selectIndex) {
        if(this._oldWineList[selectIndex])
        {
            let propId = this._oldWineList[selectIndex].propId
            EventManager.instance.dispatchEvent(CustomEventEnum.FORMULA_ADD_OLD_WINE_COUNT,{
                index: this._index,
                wineId: propId,
                count: 0
            })

            this._callback && this._callback()
        }
    }
    
}