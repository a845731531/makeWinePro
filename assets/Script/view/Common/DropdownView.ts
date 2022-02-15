import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { SoundEnum } from "../../Constant/SoundEnum";
import MarriageDataManager from "../../data/MarriageDataManager";


import List from "../../framework/component/List";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";

//下拉框
const { ccclass, property } = cc._decorator;

@ccclass
export default class DropdownView extends cc.Component {
    @property(cc.Label)
    curSelectLabel: cc.Label = null

    @property(cc.Node)
    openArray: cc.Node = null
    @property(cc.Node)
    closeArray: cc.Node = null

    @property(cc.Node)
    optionsPanel: cc.Node = null
    @property(List)
    optionListView: List = null

    private curSelectIndex: number = 0;
    private optionList: string[] = []

    private time = 0

    start() {
        this.closeOptionPanel()
    }
    onEnable() {
        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_UPDATE_TIME, this.updateTime, this)

        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_UPDATE_TIMEOPEN, this.openOptionPanelUpdate, this)
    }

    updateTime(time) {
        this.time = time / 1000
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    setCurSelectIndex(index) {
        this.curSelectLabel.string = this.optionList[this.curSelectIndex] || ""

        this.optionListView.selectedId = parseInt(index)
    }
    setOptionList(optionTextList: string[]) {

        this.optionList = optionTextList
        this.optionListView.numItems = this.optionList.length
        this.setCurSelectIndex(this.curSelectIndex)
    }

    onRenderItem(itemNode, index) {
        itemNode.active = true
        let optionLabel = itemNode.getComponentInChildren(cc.Label)
        optionLabel && (optionLabel.string = this.optionList[index])
        let selectTime = this.optionList[index].split(":")
        let selectHour = parseInt(selectTime[0])
        let selectMinute = parseInt(selectTime[1])
        let time = this.time + selectHour * 3600 + selectMinute * 60
        let canMarriageTimeList = MarriageDataManager.instance.getCanMarriageTimeList()
        optionLabel.node.color = cc.color(200, 190, 190, 255)
        itemNode.getComponent(cc.Button).active = true
        itemNode.attr({
            canClick: true
        })
        for (var i = 0; i < canMarriageTimeList.length; i++) {
            if (time == canMarriageTimeList[i].startTime) {
                optionLabel.node.color = cc.color(110, 102, 102, 255)
                itemNode.getComponent(cc.Button).active = false
                itemNode.attr({
                    canClick: false
                })
                break
            }
        }

    }
    onSelectItem(itemNode, index) {
        if (!itemNode || !itemNode.canClick) {
            return
        }
        this.curSelectIndex = index
        this.curSelectLabel.string = this.optionList[this.curSelectIndex] || ""
        this.closeOptionPanel()
    }
    getSelectIndex() {
        return this.curSelectIndex
    }

    openOptionPanelUpdate() {
        if (this.optionsPanel.active) {
            this.closeOptionPanel()
            //this.openOptionPanel()
        }
    }
    onClickCurItem() {
     EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        if (this.optionsPanel.active) {
            this.closeOptionPanel()
        } else {
            this.openOptionPanel()
        }
    }
    openOptionPanel() {
        this.optionsPanel.active = true
        this.closeArray.active = true
        this.openArray.active = false
        this.optionListView.numItems = this.optionList.length
    }
    closeOptionPanel() {
        this.optionsPanel.active = false
        this.closeArray.active = false
        this.openArray.active = true
    }
}