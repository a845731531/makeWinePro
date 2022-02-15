import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { ChatMessageType, RelationType } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { ChatMessageData, friendData } from "../../data/DataInterface";
import FriendDataManager from "../../data/FriendDataManager";
import UserDataManager from "../../data/UserDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ApplyItem extends cc.Component {

    @property(cc.Sprite)
    headIcon: cc.Sprite = null;

    @property(cc.Label)
    friendName: cc.Label = null;

    @property(cc.Label)
    posInfo: cc.Label = null;

    @property(cc.Label)
    sex: cc.Label = null;

   
    private data

    private totalCount = 0
    private currentCount=0

    private fillupNeed: number = 0;


    updateView(itemData) {

   cc.log("这是数据",itemData)
  
    this.data=itemData
    let frameName = itemData.iconurl
    Tool.loadSpriteFrame(frameName, this.headIcon)
    this.friendName.string=itemData.name
    this.posInfo.string=itemData.homeland
    if(itemData.face==1)
    this.sex.string="男"
    else
    this.sex.string="女"
   }

   onInfo(){
   cc.log("展示好友信息")

   EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
    viewName: PrefabPathEnum.CheckInfo,
    exData: this.data
  })


   }

   agreeBtn(){

    this.currentCount =FriendDataManager.instance.getFriendList().length
    this.totalCount=  Tool.getNumberParamConfig("numberoffriends")
    if( this.currentCount>=this.totalCount ){
      EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
        content: cc.js.formatStr("您的好友数量已经达到上限,请空出足够位置再进行好友添加"),
        showCancel: true,
        confirmText:"确定",
        cancelText:"取消",
       })
     }

     NetManager.instance.sendMsg("stAnswerAddRelationUserCmd", {
      type: RelationType.Relation_FriendReq,
      answer:1,
      isall:0,
      relationid:this.data.id

    })



    // EventManager.instance.dispatchEvent(CustomEventEnum.REFRESH_UPDATE_VIEW)

   }

   refuseBtn(){

      NetManager.instance.sendMsg("stAnswerAddRelationUserCmd", {
        type: RelationType.Relation_FriendReq,
        answer:0,
        isall:0,
        relationid:this.data.id

      })

    EventManager.instance.dispatchEvent(CustomEventEnum.REFRESH_UPDATE_VIEW)
  }
}