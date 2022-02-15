
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../Constant/SoundEnum";
import ChildrenDataManager from "../../data/ChildrenDataManager";
import List from "../../framework/component/List";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import BaseView from "../../framework/viewbase/BaseView";
import MarriageChildItem from "./MarriageChildItem";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MarriageChildren extends BaseView {

    @property(List)
    childrenListView: List = null;

    private childrenList  = []
    curData: any;

    initByExData(data) {
        EventManager.instance.dispatchEvent(CustomEventEnum.REFRESH_UPDATE_SEND)
        this.updateView()
    }

    onEnable() {
        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_CHILD_UPDATELIST, this.updateView, this)

        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_CHILD_CLOSE, this.onCloseView, this)
      
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    start() {
        super.start()
    }
    updateView() {
        this.childrenList = ChildrenDataManager.instance.getChildrenList()
        this.childrenListView.numItems = this.childrenList.length
    }
  
    onCloseView(){
        super.onCloseView()
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
    }

    onRenderItem(itemNode, index) {
        let itemData = this.childrenList[index]
        itemNode.getComponent(MarriageChildItem).updateView(itemData)
    }


   showChildrenInfo(){
    EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
        viewName: PrefabPathEnum.MarriageChildInfo,
        exData:null
    })
   }


}
