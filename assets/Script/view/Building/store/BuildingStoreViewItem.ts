import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import { OldWineData } from "../../../data/DataInterface";
import UserDataManager from "../../../data/UserDataManager";
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import { Tool } from "../../../framework/manager/Tool";
import { NetManager } from "../../../framework/network/NetManager";
import BagItemView from "../../Bag/BagItemView";
import ProductConfig from "../../../config/ProductConfig";
import { SoundEnum } from "../../../Constant/SoundEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingStoreViewItem extends cc.Component {
    @property(BagItemView)
    bagItemView: BagItemView = null;

    @property(cc.Node)
    emptyNode: cc.Node = null;
    @property(cc.Node)
    viewNode: cc.Node = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;
    @property(cc.ProgressBar)
    timeProgress: cc.ProgressBar = null;
    @property(cc.Label)
    numLabel: cc.Label = null;

    @property(cc.Node)
    timeNode: cc.Node = null;
    @property(cc.Node)
    finishNode: cc.Node = null;

    private curData: OldWineData = null

    updateView(itemData: OldWineData){
        this.curData = itemData
        this.unschedule(this.updateTime)

        if(itemData == null) {
            this.emptyNode.active = true
            this.viewNode.active = false
            return
        }
        this.emptyNode.active = false
        this.viewNode.active = true
        this.bagItemView.updateView({
            propId: itemData.propId,
            customNum: "",
            hideClick: true,
            showName: false
        })
        this.numLabel.string = Tool.unitConversion(itemData.customNum)

        let finishTime = itemData.storeEndTime
        let curTime = UserDataManager.instance.getCurTime()
        if(itemData.status == 3 || curTime >= finishTime) {
            this.timeNode.active = false
            this.finishNode.active = true
        } else {
            this.timeNode.active = true
            this.finishNode.active = false
            this.schedule(this.updateTime, 1)
            this.updateTime()
        }
    }
    updateTime() {
        let itemStore = ProductConfig[this.curData.oldWineId]
        let totalTime = itemStore.produceTime
        let finishTime = this.curData.storeEndTime
        let curTime = UserDataManager.instance.getCurTime()
        if(curTime < finishTime) {
            this.timeLabel.string = Tool.formatTime(finishTime - curTime)
            this.timeProgress.progress = (finishTime - curTime) / totalTime
        } else {
            this.timeNode.active = false
            this.finishNode.active = true
            this.unschedule(this.updateTime)
        }
    }
    onClickItem() {
        if(this.curData == null) {
            return
        }
        let finishTime = this.curData.storeEndTime
        let curTime = UserDataManager.instance.getCurTime()
        if(this.curData.status == 3 || curTime >= finishTime) {
            NetManager.instance.sendMsg("GatherCellarBrewBuildingCmd_CS", {
                cellar_index: this.curData.id
            })
        } else {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.BuildingInStoreView,
                exData: this.curData
            })
        }
    }
    onClickBuy() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        let expandCost = Tool.getNumberParamConfig("eachCellarCost")
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: cc.js.formatStr("是否花费%s<img src='icon_30002' />购买一个酒库格子？", expandCost / 1000),
            showCancel: true,
            confirmCallback: () => {
                NetManager.instance.sendMsg("BuyCellarBrewBuildingCmd_CS", {
                    num: 1
                })
            }
        })
    }
}