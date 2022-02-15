import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { BagType } from "../../Constant/GameEnum";
import BagDataManager from "../../data/BagDataManager";
import List from "../../framework/component/List";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";
import BagPropItemView from "./BagPropItemView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BagView extends BaseView {

    @property(List)
    list: List = null;

    private curTag = BagType.All
    private bagDataList = []

    onEnable()
    {
        EventManager.instance.addEventListener(CustomEventEnum.BAG_UPDATE_VIEW,this.updateView,this)

        EventManager.instance.dispatchEvent(CustomEventEnum.HIDE_MAP_NODE,this)
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)

        EventManager.instance.dispatchEvent(CustomEventEnum.SHOW_MAP_NODE,this)
    }
    start() {
        super.start()
        this.updateView()
    }
    updateView()
    {
        this.bagDataList = BagDataManager.instance.getBagDataByTag(this.curTag)
        while(this.bagDataList.length < 35)
        {
            this.bagDataList.push(null)
        }
        this.list.numItems = this.bagDataList.length
    }

    onRenderEvent(item: cc.Node, index: number) {
        item.getComponent(BagPropItemView).updateView(this.bagDataList[index])
    }

    onClickToggle(toggle, index)
    {
        this.curTag = index
        this.updateView()
    }
}
