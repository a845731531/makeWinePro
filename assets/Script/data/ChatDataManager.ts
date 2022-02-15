import { CustomEventEnum } from "../Constant/CustomEventEnum";
import { ChatMessageType } from "../Constant/GameEnum";
import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
import BaseDataManager from "./BaseDataManager";
import { ChatMessageData } from "./DataInterface";
import UserDataManager from "./UserDataManager";

export default class ChatDataManager extends BaseDataManager {
    private static _instance: ChatDataManager = null;

    private briefMsgList: ChatMessageData[] = []
    private systemMsgList: ChatMessageData[] = []
    private worldMsgList: ChatMessageData[] = []
    private clanMsgList: ChatMessageData[] = []
    private privateMsgList: {[playerId: number]: ChatMessageData[]} = {}
    
    private MAX_MESSAGE_NUM: number = 30;
    private MAX_BRIEF_MESSAGE_NUM: number = 30;

    public static get instance(): ChatDataManager {
        if (this._instance == null) {
            this._instance = new ChatDataManager();
        }
        return this._instance;
    }

    constructor() {
        super();

        this.reset();
        
    }
    reset() {
        this.briefMsgList = []
        this.systemMsgList = []
        this.worldMsgList = []
        this.clanMsgList = []
        
        super.reset()
    }
    addNetListener() {
        EventManager.instance.addEventListener(CustomEventEnum.ADD_CHAT_MESSAGE, this.onAddChatMessage, this, -1)
    }

    formatContent(originContent): string {
        let emojiContent = originContent.replace(/\[(\W+?)]/g, '<img src="emoji_$1" />');
        return emojiContent
    }
    addMessage(message: ChatMessageData) {
        let cachedMsgList = []
        switch(message.messageType) {
            case ChatMessageType.System:
                cachedMsgList = this.systemMsgList;
                break
            case ChatMessageType.World:
                cachedMsgList = this.worldMsgList;
                break
            case ChatMessageType.Clan:
                cachedMsgList = this.clanMsgList;
                break
            case ChatMessageType.Private:
                let otherId = message.receiveId
                if(otherId == UserDataManager.instance.getUserId()) {
                    otherId = message.fromId
                }
                cachedMsgList = this.privateMsgList[otherId]
                if(!cachedMsgList) {
                    cachedMsgList = this.privateMsgList[otherId] = []
                }
                break
        }
        message.content = this.formatContent(message.content)
        cachedMsgList.push(message)
        if(cachedMsgList.length > this.MAX_MESSAGE_NUM) {
            cachedMsgList.shift()
        }
        this.briefMsgList.push(message)
        if(this.briefMsgList.length > this.MAX_BRIEF_MESSAGE_NUM) {
            this.briefMsgList.shift()
        }
    }
    getMessageListByType(messageType: ChatMessageType) {
        switch(messageType) {
            case ChatMessageType.System:
                return this.systemMsgList;
            case ChatMessageType.World:
                return this.worldMsgList;
            case ChatMessageType.Clan:
                return this.clanMsgList;
            default:
                return []
        }
    }
    getBriefMessageList() {
        return this.briefMsgList.reverse()
    }
    onAddChatMessage(eventData) {
        this.addMessage(eventData)
    }
    getPrivateMessageListOf(playerID) {
        return this.privateMsgList[playerID] || []
    }
    
    //TODO
    testAddMessage() {
        let message = {
            messageType: Tool.getRandomLimit(0, 1),   //0系统，1世界，2公会
            content: "",
            userName: "玩家" + Tool.getRandomLimit(100, 999),
            userId: Tool.getRandomLimit(100, 999),
            avatarUrl: "",
            title: Tool.getRandomLimit(0, 3),
            clanName: "",
            params: "",
        }
        if(message.messageType == ChatMessageType.System) {
            message.userName = ""
            message.content = "恭喜某个玩家酿出了百年慎初"
        } else if (message.messageType == ChatMessageType.World) {
            message.content = "你们都来自哪里啊？"
            message.clanName = "慎初天地会"
        } else if (message.messageType == ChatMessageType.Clan) {
            if(Tool.getRandomLimit(0, 10) < 5) {
                message.content = "各位家人们欢迎加入家族群10086"
            } else {
                message.userName = ""
                message.userId = 0
                message.content = "欢迎来自广东的朋友加入公会"
            }
            message.clanName = "慎初天地会"
        }
        EventManager.instance.dispatchEvent(CustomEventEnum.ADD_CHAT_MESSAGE, message)
    }
}
