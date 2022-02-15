import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import EventManager from "../../framework/manager/EventManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChatPrivateInfo extends cc.Component {
    @property(cc.Node)
    friendNode: cc.Node = null
    @property(cc.RichText)
    titleLabel: cc.RichText = null

    updatePrivateInfo(itemData) {        
        this.titleLabel.string = cc.js.formatStr("<bold>与<color=#00FF00>%s</color>聊天中...</bold>", itemData.name)
    }

    onClickBackList() {        
        EventManager.instance.dispatchEvent(CustomEventEnum.CHAT_WITH_PLAYER, null)
    }
}