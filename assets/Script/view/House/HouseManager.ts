import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import HouseDataManager from "../../data/HouseDataManager";
import List from "../../framework/component/List";
import EventManager from "../../framework/manager/EventManager";
import HouseItem from "./HouseItem";


const {ccclass, property} = cc._decorator;

@ccclass
export default class HouseManager extends cc.Component {

    @property(List)
    hourseListView: List = null;


    private hourseDataList = []

    onEnable() {
       // EventManager.instance.addEventListener(CustomEventEnum.FRIEND_UPDATE_VIEW, this.updateView, this)
        this.updateView()
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    updateView() {
        this.hourseDataList = HouseDataManager.instance.getHouseList()
        this.hourseListView.numItems = this.hourseDataList.length

    }

    onRenderItem(itemNode, index) {
        let itemData = this.hourseDataList[index]
        itemNode.getComponent(HouseItem).updateView(itemData,index)
    }

}
