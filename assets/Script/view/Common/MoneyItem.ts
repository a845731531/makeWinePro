import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { MoneyPropId } from "../../Constant/GameEnum";
import BagDataManager from "../../data/BagDataManager";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";

const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export default class MoneyItem extends cc.Component {

    @property({type: cc.Enum(MoneyPropId)})
    moneyType: MoneyPropId = MoneyPropId.COIN
    
    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Label)
    numLabel: cc.Label = null;


    onEnable() {
        if(CC_EDITOR) return;
        if(this.moneyType == MoneyPropId.COIN) {
            EventManager.instance.addEventListener(CustomEventEnum.COIN_NUM_CHANGED, this.onUpdateMoney, this)
        } else if (this.moneyType == MoneyPropId.DIAMOND) {
            EventManager.instance.addEventListener(CustomEventEnum.DIAMOND_NUM_CHANGED, this.onUpdateMoney, this)
        }

        this.updateView()
    }
    onDisable() {
        if(CC_EDITOR) return;
        EventManager.instance.removeTargetListener(this)
    }

    onUpdateMoney() {
        this.updateView()
    }

    updateView() {
        let moneyNum = BagDataManager.instance.getItemNum(this.moneyType)
        this.numLabel.string = Tool.bigNumberTransform(moneyNum)
    }


}