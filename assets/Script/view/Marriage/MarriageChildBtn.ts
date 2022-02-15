import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import EventManager from "../../framework/manager/EventManager";
export enum childDecorate{
    cap=0,
    clothes=1,
    decorate2=2,
    pants=3,
    decorate=4,
    shoes=5,
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class MarriageChildBtn extends cc.Component {

    @property
    public ID: number = 0

    @property(cc.Node)
    select: cc.Node = null


    onEnable() {
        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_CHILD_SELECTBTN, this.updateView, this)

    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    onBtnClick(event,CustomEventData) {
        cc.log("选择",CustomEventData)
        EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_CHILD_SELECTBTN,CustomEventData)
    }

    updateView(CustomEventData) {
        if(CustomEventData==this.ID)
        this.select.active=true
        else
        this.select.active=false
    }


}
