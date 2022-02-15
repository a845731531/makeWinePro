import PropConfig from "../../config/PropConfig";
import WineQualilyConfig from "../../config/WineQualilyConfig";
import { WineTabType } from "../../Constant/GameEnum";
import BagDataManager from "../../data/BagDataManager";
import FormulaManager from "../../data/formula/FormulaManager";
import List from "../../framework/component/List";
import GuideManager from "../../framework/guide/GuideManager";
import BaseView from "../../framework/viewbase/BaseView";
import BagItemView from "../Bag/BagItemView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FormulaSelectView extends BaseView {
    @property(List)
    formulaListView: List = null

    private callback = null
    private formulaList = []

    initByExData(exData: any): void {
        this.callback = exData.callback
    }
    start() {
        let formulaList = FormulaManager.instance.getFormulaConfigByWineType(WineTabType.ALL)
        for(let i = formulaList.length - 1; i >= 0;i--) {
            let itemData = formulaList[i]
            let wineId = itemData.subId
            let wineType = WineQualilyConfig[wineId].wineType 
            // let num = BagDataManager.instance.getItemNum(itemData.id)
            if(wineType == WineTabType.CUSTOM && itemData.num == 0) {
                formulaList.splice(i, 1)
            }
        }
        this.formulaList = formulaList
        this.formulaListView.numItems = formulaList.length
        super.start()
    }

    onRenderItem(itemNode, index) {
        let itemData =this.formulaList[index]
        itemNode.active = true
        let itemScript = itemNode.getComponentInChildren(BagItemView)
        itemScript.updateView({
            propId: itemData.id,
            showName: false,
            hideClick: true
        })
        itemNode.getChildByName('name').getComponent(cc.Label).string = itemData.name
        let btnSelect = itemNode.getChildByName('btn_select')
        btnSelect.attr({
            itemData: itemData
        })
        
        GuideManager.instance.registerGuideNode(cc.js.formatStr("FormulaSelectItem_%s", itemData.id), btnSelect)
    }
    onClickSelect(event) {
        let itemData = event.target.itemData
        if(this.callback) {
            this.callback(itemData.id)
        }
        this.onCloseView()
    }
}
    