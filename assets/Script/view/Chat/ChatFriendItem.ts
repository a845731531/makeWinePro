import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import ChatDataManager from "../../data/ChatDataManager";
import { friendData } from "../../data/DataInterface";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ChatFriendItem extends cc.Component {
    @property(cc.Sprite)
    iconSpr: cc.Sprite = null;
    @property(cc.Label)
    nameLabel: cc.Label = null;
    @property(cc.RichText)
    recentMessage: cc.RichText = null;
    @property(cc.Label)
    messageNumLabel: cc.Label = null;

    private curData: friendData = null
    updateView(itemData: friendData) {
        this.curData = itemData
        this.nameLabel.string = itemData.name

        let messageList = ChatDataManager.instance.getPrivateMessageListOf(itemData.id)
        this.messageNumLabel.string = "" + messageList.length

        if(messageList.length > 0) {
            let itemMessage = messageList[messageList.length - 1]
            this.recentMessage.string = itemMessage.content
        } else {
            this.recentMessage.string = ''
        }
    }

    onClickItem() {
        EventManager.instance.dispatchEvent(CustomEventEnum.CHAT_WITH_PLAYER, this.curData)
    }
    onClickHead() {
        if(this.curData) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.CheckInfo,
                exData: this.curData
            })
        }
    }
}