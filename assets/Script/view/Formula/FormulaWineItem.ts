import PropConfig from "../../config/PropConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import BagDataManager from "../../data/BagDataManager";
import FormulaManager from "../../data/formula/FormulaManager";
import TargetWineDataManager from "../../data/TargetWineDataManager";
import GuideManager from "../../framework/guide/GuideManager";
import EventManager from "../../framework/manager/EventManager";
import BagItemView from "../Bag/BagItemView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FormulaWineItem extends cc.Component {

    @property(BagItemView)
    bagItemView: BagItemView = null;

    @property(cc.Node)
    selectIcon: cc.Node = null;

    @property(cc.Node)
    targetIcon: cc.Node = null;

    private _wineId = 0

    protected onEnable(): void {
        EventManager.instance.addEventListener(CustomEventEnum.FORMULA_UPDATE_VIEW,this.updateSelect,this)
    }

    protected onDisable(): void {
        EventManager.instance.removeTargetListener(this)
    }

    updateSelect()
    {
        this.selectIcon.active = FormulaManager.instance.getSelectWineId() == this._wineId
    }

    updateView(formulaConfig)
    {
        this.node.active = true
        let formulaId = formulaConfig.id
        GuideManager.instance.registerGuideNode(cc.js.formatStr("FormulaWineItem_%s", formulaId), this.node)
        
        this._wineId = PropConfig[formulaId].subId

        this.bagItemView.updateView({
            propId: formulaId,
            customNum: "",
            showName: true,
            hideClick: true
        })

        //目标酒标签
        this.targetIcon.active = TargetWineDataManager.instance.getTargetWineId() == this._wineId

        this.updateSelect()
    }
}