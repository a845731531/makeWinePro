
import { SoundEnum } from "../../Constant/SoundEnum";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MarriageRename extends BaseView {
    @property(cc.EditBox)
    nameEdit: cc.EditBox = null

    private childData = null
    initByExData(exData) {
        this.childData = exData.childData
        this.nameEdit.string = this.childData.name
    }

    onClickRename() {
        NetManager.instance.sendMsg("stNewPetnameChildCmd_CS", {
            childId: this.childData.childId,
            petname: this.nameEdit.string,
        })
        this.onCloseView()
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
    }

    onCloseView() {
        super.onCloseView()
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
    }
}