import { ChatMessageType } from "../../Constant/GameEnum";
import { ChatMessageData } from "../../data/DataInterface";
import UserDataManager from "../../data/UserDataManager";
import { Tool } from "../../framework/manager/Tool";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ChatItem extends cc.Component {
    @property(cc.Node)
    otherNode: cc.Node = null;
    @property(cc.Node)
    myNode: cc.Node = null;

    private ContentMaxWidth: number = 330;

    updateView(itemData: ChatMessageData) {
        if(!itemData)  //切换的有时候是undefind 加了这个就好了
            return
        this.otherNode.active = false
        this.myNode.active = false
        let detailNode: any = this.otherNode
        let myName = UserDataManager.instance.getUserName()
     

        if(itemData.userName == myName) {
            detailNode = this.myNode
        }
        detailNode.active = true

        let messageType = itemData.messageType
        let userName = itemData.userName
        let titleText = ""
        if(messageType == ChatMessageType.System) {
            userName = "系统"
        } else if (messageType == ChatMessageType.Clan) {
            if(itemData.fromId == 0) {
                userName = itemData.clanName
            } else {                
                //0-未知，1-公会长，2-长老（管理员，3-酒师，4-酒徒
                let titleStrList = ["", "会长", "长老", "酒师", "酒徒"]
                titleText = titleStrList[itemData.title]
            }
        } else if (messageType == ChatMessageType.World) {
            titleText = itemData.clanName
        }
        detailNode.nameLabel.string = userName
        detailNode.titleLabel.string = titleText

        if(itemData.avatarUrl) {
            Tool.loadSpriteFrame(itemData.avatarUrl, detailNode.avatarSpr) 
        }

        let richComp = detailNode.contentNode.getComponent(cc.RichText)
        richComp.maxWidth = 0
        richComp.string = itemData.content
        if(detailNode.contentNode.width > this.ContentMaxWidth) {
            richComp.maxWidth = this.ContentMaxWidth
        }
    }
}