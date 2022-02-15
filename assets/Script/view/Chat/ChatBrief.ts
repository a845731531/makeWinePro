import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import ChatDataManager from "../../data/ChatDataManager";
import { ChatMessageData } from "../../data/DataInterface";
import MarriageDataManager from "../../data/MarriageDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { MarriageBuildingState } from "../Marriage/MarriageBuilding";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ChatBrief extends cc.Component {

    @property(cc.Node)
    itemNodeList: cc.Node[] = []

    @property(cc.Node)
    btnDetail: cc.Node = null

    @property(cc.Node)
    marriageTitle: cc.Node = null

  
    
    private marriageState=0

    start() {
        this.updateView()
        //TODO
        this.schedule(this.onTestAddMessage, 5)
        this.onTestAddMessage()
    }
    onTestAddMessage() {
        ChatDataManager.instance.testAddMessage()
    }

    onEnable() {
        EventManager.instance.addEventListener(CustomEventEnum.CLOSE_CHAT_DETAIL, this.onCloseDetail, this)
        EventManager.instance.addEventListener(CustomEventEnum.ADD_CHAT_MESSAGE, this.updateView, this)
        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_SHOW_TITLE, this.onShowTitle, this)
        this.needShowTitle()
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    updateView() {
        let messageList = ChatDataManager.instance.getBriefMessageList()
        let children = this.itemNodeList
        for(let i = 0, len = children.length; i < len; i++) {
            let itemNode = children[i]
            let itemData = messageList[i]
            if(itemData) {
                itemNode.active = true
                this.updateItem(itemNode, itemData)
            } else {
                itemNode.active = false
            }
        }
    }
    updateItem(itemNode, itemData: ChatMessageData) {
        let typeStrList = ["[系统]", "[世界]", "[公会]"]
        let typeColorList = [cc.color(255,54,54), cc.color(158,205,227), cc.color(158,227,158)]
        let messageType = itemData.messageType
        itemNode.typeLabel.string = typeStrList[messageType] || ""
        itemNode.typeLabel.node.color = typeColorList[messageType] || cc.Color.WHITE

        if(itemData.userName && itemData.userName != "") {
            itemNode.nameLabel.string = itemData.userName + ": "
            itemNode.nameLabel.active = true
        } else {
            itemNode.nameLabel.active = false
        }

        itemNode.contentNode.getComponent(cc.RichText).string = itemData.content

        itemNode.getComponent(cc.Layout).updateLayout()
    }

    onClickPanel() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.ChatLayer,
            callback: () => {
                this.btnDetail.active = false
            }
        })
    }
    onCloseDetail() {
        this.btnDetail.active = true

        
    }
    needShowTitle(){
      
        if(MarriageDataManager.instance.curState==1){
            cc.log("看下")
           this.onShowTitle(MarriageBuildingState.wishTime)
          // MarriageDataManager.instance.needShowWishTimeTitle=false
        }else if(MarriageDataManager.instance.needShowInviteTitle){
            this.onShowTitle(MarriageBuildingState.invitation)
            cc.log("看下")
            MarriageDataManager.instance.needShowInviteTitle=false
        }
    }
  

     onShowTitle(state){
        cc.log("进来",state)
        this.marriageTitle.active=!this.marriageTitle.active 
        //getPartnerData
        this.marriageState=state
        let extData
        if (this.marriageState==MarriageBuildingState.invitation) {
            extData={
                type: MarriageBuildingState.invitation,
                data:"婚礼请柬",  
             }
        }else if(this.marriageState==MarriageBuildingState.wishTime){
              extData={
                type: MarriageBuildingState.wishTime,
                data:MarriageDataManager.instance.getPartnerData(),  
             }
           
        }else if(this.marriageState==MarriageBuildingState.startMarriage){
            extData={
                type: MarriageBuildingState.startMarriage,
                data:MarriageDataManager.instance.getPartnerData(),  
             }
        }
        EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_SHOW_INFO,extData)
     }
    onClickIcon(){
        if (this.marriageState==MarriageBuildingState.wishTime) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.MarriageBuilding,
                exData:MarriageBuildingState.wishTime
            })
        }else if (this.marriageState==MarriageBuildingState.invitation) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.WeddingInvitation,
                exData:MarriageBuildingState.invitation
            })
        }else if (this.marriageState==MarriageBuildingState.startMarriage) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.MarriageAuditorium,
                exData:MarriageBuildingState.startMarriage
            })   
        } 
    }
}

