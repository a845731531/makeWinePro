import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import FormulaManager from "../../data/formula/FormulaManager";
import EventManager from "../../framework/manager/EventManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import { Tool } from "../../framework/manager/Tool";
import BagItemView from "../Bag/BagItemView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OldWineItem extends cc.Component {

    @property(BagItemView)
    bagItemView: BagItemView = null;

    @property(cc.Node)
    addBtn: cc.Node = null;

    @property(cc.Node)
    numNode: cc.Node = null;

    @property(cc.Label)
    txtProgress: cc.Label = null;

    @property(cc.Sprite)
    iconNumber: cc.Sprite = null;

    @property(cc.Label)
    txtCount: cc.Label = null;

    @property
    wineIndex: number = 1;

    private _index = 0
    private _curData = null
    
    updateView()
    {
        this._index = this.wineIndex

        Tool.loadSpriteFrame(cc.js.formatStr("texture/formula/tiaojiu_num_%s",this._index),this.iconNumber)

        this._curData = FormulaManager.instance.getOldWineData(this._index)
        if(this._curData && this._curData.wineId)
        {
            this.addBtn.active = false
            this.bagItemView.node.active = true

            this.bagItemView.updateView({
                propId: this._curData.wineId,
                customNum: "",
                showName: false,
                hideClick: true
            })


            let count = FormulaManager.instance.getOldWineCount(this._index)
            this.txtCount.string = count + ""
            let pro = FormulaManager.instance.getProgress(count)
            this.txtProgress.string = Tool.unitConversion(pro * FormulaManager.instance.getFormulaCostAllContainer())
        }else{
            //新增icon
            this.addBtn.active = true
            this.bagItemView.node.active = false

            this.txtCount.string = 0 + ""
            this.txtProgress.string = Tool.unitConversion(0)

        }
    }

    onClickAddCount()
    {

        if(!this._curData)
        {
            return
        }

        EventManager.instance.dispatchEvent(CustomEventEnum.FORMULA_ADD_OLD_WINE_COUNT,{
            index: this._index,
            count: 1
        })
    }

    onClickReduceCount()
    {

        if(!this._curData)
        {
            return
        }

        EventManager.instance.dispatchEvent(CustomEventEnum.FORMULA_ADD_OLD_WINE_COUNT,{
            index: this._index,
            count: -1
        })
    }

    onClickAdd()
    {
        //打开老酒选择弹窗
        if(!this._curData)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.AddOldWineView,
                exData:{
                    index: this._index
                }
            })

            // EventManager.instance.dispatchEvent(CustomEventEnum.FORMULA_ADD_OLD_WINE_COUNT,{
            //     index: this._index,
            //     count: 0
            // })
        }

    }

    
}