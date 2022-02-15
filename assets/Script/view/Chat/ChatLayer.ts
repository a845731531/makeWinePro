import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { ChatMessageType } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import ChatDataManager from "../../data/ChatDataManager";
import { ChatMessageData, friendData } from "../../data/DataInterface";
import FriendDataManager from "../../data/FriendDataManager";
import UserDataManager from "../../data/UserDataManager";
import List from "../../framework/component/List";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";
import ChatFriendItem from "./ChatFriendItem";
import ChatItem from "./ChatItem";
import ChatPrivateInfo from "./ChatPrivateInfo";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ChatLayer extends BaseView {
    @property(cc.Node)
    toggleParent: cc.Node = null;

    @property(List)
    messageListView: List = null;

    @property(cc.Node)
    clanEmptyNode: cc.Node = null;

    @property(cc.Node)
    friendListNode: cc.Node = null;
    @property(List)
    friendListView: List = null;
    @property(ChatPrivateInfo)
    privateInfo: ChatPrivateInfo = null

    @property(cc.EditBox)
    msgEdit: cc.EditBox = null;

    @property(cc.Node)
    inputMask: cc.Node = null;

    @property(cc.Node)
    expressNode: cc.Node = null;
    @property(cc.Node)
    expressListContent: cc.Node = null;
    @property(cc.SpriteAtlas)
    expressAtlas: cc.SpriteAtlas = null;

    @property(cc.Node)
    addFriendBtn: cc.Node = null;

    private messageDataList: ChatMessageData[] = []
    private messageType: ChatMessageType = ChatMessageType.World
    private chatPlayerData = null
    private friendListData: friendData[] = []
    private messageListHeight = 0

    initByExData(exData) {
        if (exData.messageType) {
            this.messageType = exData.messageType
            let nodeName = cc.js.formatStr("item_toggle_%s", this.messageType)
            this.toggleParent.getChildByName(nodeName).getComponent(cc.Toggle).isChecked = true
        }
        if (exData.playerData) {
            this.chatPlayerData = exData.playerData
        }
    }
    start() {
        this.messageListHeight = this.messageListView.node.height
        this.updateView()
        this.initExpressView()
        this.messageListView.scrollView.scrollToBottom(0.01)
    }
    onEnable() {
        this.addFriendBtn.active = false
        EventManager.instance.addEventListener(CustomEventEnum.ADD_CHAT_MESSAGE, this.onAddMessage, this)
        EventManager.instance.addEventListener(CustomEventEnum.CHAT_WITH_PLAYER, this.onChatWithPlayer, this)

    }
    onDisable() {
        EventManager.instance.dispatchEvent(CustomEventEnum.CLOSE_CHAT_DETAIL)
        EventManager.instance.removeTargetListener(this)
    }

    initExpressView() {
        let frameList = this.expressAtlas.getSpriteFrames()
        frameList.sort((first, second) => {
            return parseInt(first.name.split("_")[1]) - parseInt(second.name.split("_")[1])
        })
        for (let i = 0; i < frameList.length; i++) {
            let frame = frameList[i]
            let itemNode = new cc.Node()
            itemNode.scale = 0.5
            let spriteComp = itemNode.addComponent(cc.Sprite)
            spriteComp.spriteFrame = frame
            spriteComp.sizeMode = cc.Sprite.SizeMode.RAW

            let frameName = frame.name
            itemNode.attr({
                emojiId: frameName.split("_")[1]
            })
            itemNode.on(cc.Node.EventType.TOUCH_END, this.onClickExpressItem, this)

            itemNode.parent = this.expressListContent
        }
    }
    updateView() {
        this.clanEmptyNode.active = false
        this.friendListNode.active = false
        this.privateInfo.node.active = false
        this.messageListView.node.height = this.messageListHeight
        this.messageDataList = []
        if (this.messageType == ChatMessageType.Clan) {
            let clanId = UserDataManager.instance.getClanId()
            if (clanId != 0) {
                this.messageDataList = ChatDataManager.instance.getMessageListByType(this.messageType)
            } else {
                this.clanEmptyNode.active = true
            }
        } else if (this.messageType == ChatMessageType.Private) {
            if (this.chatPlayerData != null) {
                this.messageDataList = ChatDataManager.instance.getPrivateMessageListOf(this.chatPlayerData.id)
                this.privateInfo.node.active = true
                this.privateInfo.updatePrivateInfo(this.chatPlayerData)
                this.messageListView.node.height = this.messageListHeight - 50
            } else {
                this.friendListNode.active = true
                this.updateFriendList()
            }
        } else {
            this.messageDataList = ChatDataManager.instance.getMessageListByType(this.messageType)
        }
        this.messageListView.numItems = this.messageDataList.length
    }

    onRenderItem(itemNode, index) {
        let itemData = this.messageDataList[index]
        itemNode.getComponent(ChatItem).updateView(itemData)
    }
    onSelectMessageType(event, messageType) {
        this.messageType = parseInt(messageType)
        this.updateView()
        this.messageListView.scrollView.scrollToBottom(0.01)
        this.inputMask.active = (this.messageType == ChatMessageType.System)
        this.addFriendBtn.active = false
        if (messageType == ChatMessageType.Private) {
            this.friendListData = FriendDataManager.instance.getFriendList()
            if (this.friendListData.length == 0) {
                // EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                //     msg: "您还未有好友请前往添加好友"
                // })
                this.addFriendBtn.active = true
            } else {
                this.addFriendBtn.active = false
            }
        }
    }
    updateFriendList() {
        this.friendListData = FriendDataManager.instance.getFriendList()
        if (this.friendListData.length == 0) {
            this.addFriendBtn.active = true
        } else {
            this.addFriendBtn.active = false
        }
        this.friendListView.numItems = this.friendListData.length
    }
    onAddFriendBtn() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.SearchPanel,
        })
    }
    onRenderFriendItem(itemNode, index) {
        let friendData = this.friendListData[index]
        if (!friendData) {
            return
        }
        let itemScript = itemNode.getComponent(ChatFriendItem)
        itemScript.updateView(friendData)
    }

    onAddMessage() {
        this.updateView()
        this.messageListView.scrollView.scrollToBottom(0.01)
    }
    onChatWithPlayer(playerData) {
        this.chatPlayerData = playerData
        this.updateView()
        this.messageListView.scrollView.scrollToBottom(0.01)
    }

    onClickSend() {
        let receiveId = this.messageType
        if (this.chatPlayerData) {
            receiveId = this.chatPlayerData.id
        }
        let content = this.msgEdit.string
        content = content.replace(/(^\s*)|(\s*$)/g, '');  //去除空格;

        if (content == '' || content == undefined || content == null) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "内容不可以为空哦~"
            })
            return
        }
        let sessionType = 1
        let toId = null
        if(this.messageType == ChatMessageType.Private) {
            sessionType = 0
            toId = receiveId
        }
        window["AppBridge"].sendChatMessage({
            "messageType" : 0,          //消息类型，0-文本消息，后续可增加
            "sessionType": sessionType,  //会话所属的类型，0-私聊，1-公会群聊，后续可增加
            "toId": "" + toId,          //根据会话类型有所不同，私聊时为对方账号id，公会群聊不需要传
            "text": content,            //消息文本, 目前只有文本消息有内容
        })


        let message = {
            messageType: this.messageType,   //0系统，1世界，2公会,3私聊
            content: content,
            userName: UserDataManager.instance.getUserName(),
            fromId: UserDataManager.instance.getUserId(),
            receiveId: receiveId,
            avatarUrl: "",
            title: UserDataManager.instance.getClanTitle(),
            clanName: UserDataManager.instance.getClanName(),
            params: "",
        }
        EventManager.instance.dispatchEvent(CustomEventEnum.ADD_CHAT_MESSAGE, message)

        this.msgEdit.string = ""
    }
    onClickJoinClan() {

    }
    onClickVoice() {

    }
    onClickExpress() {
        this.expressNode.active = true
    }
    onHideExpress() {
        this.expressNode.active = false
    }

    onClickExpressItem(event) {
        let receiveId = this.messageType
        if (this.chatPlayerData) {
            receiveId = this.chatPlayerData.id
        }
        let emojiId = event.target.emojiId
        let content = cc.js.formatStr("[%s]", emojiId)
        let sessionType = 1
        let toId = null
        if(this.messageType == ChatMessageType.Private) {
            sessionType = 0
            toId = receiveId
        }
        window["AppBridge"].sendChatMessage({
            "messageType" : 0,          //消息类型，0-文本消息，后续可增加
            "sessionType": sessionType,  //会话所属的类型，0-私聊，1-公会群聊，后续可增加
            "toId": "" + toId,          //根据会话类型有所不同，私聊时为对方账号id，公会群聊不需要传
            "text": content,            //消息文本, 目前只有文本消息有内容
        })

        let message = {
            messageType: this.messageType,   //0系统，1世界，2公会
            content: content,
            userName: UserDataManager.instance.getUserName(),
            fromId: UserDataManager.instance.getUserId(),
            receiveId: receiveId,
            avatarUrl: "",
            title: UserDataManager.instance.getClanTitle(),
            clanName: UserDataManager.instance.getClanName(),
            params: "",
        }
        EventManager.instance.dispatchEvent(CustomEventEnum.ADD_CHAT_MESSAGE, message)

        this.expressNode.active = false
    }
}