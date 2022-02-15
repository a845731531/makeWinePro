import { CustomEventEnum } from "../Constant/CustomEventEnum";
import { ChatMessageType, ItemType } from "../Constant/GameEnum";
import { EventEnum } from "../framework/FrameWorkEnum";
import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
import FriendItem from "../view/Friend/FriendItem";
import BaseDataManager from "./BaseDataManager";
import { ChatMessageData, friendData, GiftItemData } from "./DataInterface";
import PropConfig from "../config/PropConfig";
import MarriageDataManager, { isdowedding } from "./MarriageDataManager";
import { PrefabPathEnum } from "../Constant/PrefabPathEnum";

export default class FriendDataManager extends BaseDataManager {
    private static _instance: FriendDataManager = null;
    private propList: GiftItemData[] = []
    private friendList: friendData[] = []
    private applyList: [] = []
    private MAX_MESSAGE_NUM: number = 30;
    private MAX_BRIEF_MESSAGE_NUM: number = 30;
    public static get instance(): FriendDataManager {
        if (this._instance == null) {
            this._instance = new FriendDataManager();
        }
        return this._instance;
    }

    constructor() {
        super();
        this.reset();
    }
    reset() {
        this. propList = []
       for(let i in PropConfig)
       {
        if (PropConfig[i].type == ItemType.GIFT) {
            this.propList.push({
                propId: PropConfig[i].id,
                giftName: PropConfig[i].name,
                desc: PropConfig[i].desc,
                icon:PropConfig[i].icon,
                price:PropConfig[i].price
            })
        }
       }
        super.reset()
    }
  
   getGiftPropList(){
       return this.propList
   }

    addNetListener() {
        EventManager.instance.addEventListener("stAddListRelationUserCmd", this.onFriendData, this,-1)
        EventManager.instance.addEventListener("stNpcChangeBrewNpcCmd_NT",this.rspRandomEventdata,this,-1)
        EventManager.instance.addEventListener("stFriendReqListRelationUserCmd_SC",this.updateApplyDate,this)
        EventManager.instance.addEventListener("stFindFriendInfoQuestUserCmd_SC", this.onSearchData, this)
        EventManager.instance.addEventListener("stRequestAddRelationUserCmd_SC", this.onSearchAddFriend, this)
        EventManager.instance.addEventListener("stAnswerAddRelationUserCmd_SC", this.onUpdateApplyDateBack, this)
        EventManager.instance.addEventListener("stAddRelationUserCmd", this.onAgreeSucceed, this)
        EventManager.instance.addEventListener("stRemoveRelationUserCmd", this.onDeleteFriend, this)
        EventManager.instance.addEventListener("stSendFriendGiftsRelationUserCmd_SC", this.onGiftData, this)
        EventManager.instance.addEventListener("stRfreshFriendDataRelationUserCmd", this.onChangeDegree, this)
        EventManager.instance.addEventListener("refresh", this.onRedDot, this)
    }

    rspRandomEventdata(data){

    }
    formatContent(originContent): string {
        let emojiContent = originContent.replace(/\[\[(\d+)]]/, '<img src="emoji_$1" />');
        return emojiContent
    }
    addMessage(message: friendData) {
        let cachedMsgList = []
        cachedMsgList = this.friendList;

        cachedMsgList.push(message)
        if(cachedMsgList.length > this.MAX_MESSAGE_NUM) {
            cachedMsgList.shift()
        }
        
    }

    //检查是否是自己的好友
    checkFriends(playerID){
        for(let key in this.friendList){
            if(this.friendList[key].id==playerID){
               return true
             }
         }
         return false
    }


    //不需要经过排序的步骤
    getFriendListUnClap(){
        return  this.friendList
     }
    //经过排序的好友列表
    getFriendList() {
         let onLine=[]
         let unLine=[]
         let married=[]
         let npc=[]
         for(let key in this.friendList){
            if(this.friendList[key].online==1){
                unLine.push(this.friendList[key])
             }else if(this.friendList[key].online==0){
                onLine.push(this.friendList[key])
             }else if(this.friendList[key]["isNpc"]){
                npc.push(this.friendList[key])
             }
           
         }
         for(let i=0;i<unLine.length-1;i++){
            for(let j=0;j<unLine.length-i-1;j++){
                let temp=unLine[j]
                if(unLine[j].active<unLine[j+1].active){
                    unLine[j]=unLine[j+1]
                    unLine[j+1]=temp
                }

            }
        }
        for(let i=0;i<onLine.length-1;i++){
            for(let j=0;j<onLine.length-i-1;j++){
                let temp=onLine[j]
                if(onLine[j].onlinetime<onLine[j+1].onlinetime){
                    onLine[j]=onLine[j+1]
                    onLine[j+1]=temp
                }

            }
        }
        let temp=unLine.concat(npc)
        let NpcTemp=temp.concat(onLine)
        this.friendList=NpcTemp.concat(married)
        return this.friendList;
    }
    getFriendData(){
        let data={
            giftCount:56,
            selfSpouse:0,
            friendList:this.friendList
        }
        return data
    }


    getApplyList(){
        return this.applyList
    }

    updateApplyDate(data){

      if(data.rtype==0){
        this.applyList=data.fdata
      }else if(data.rtype==1){
          //移除
          cc.log("看下数据",this.applyList)
          for(let key in this.applyList){
              if(this.applyList[key]["id"]==data.userid){
                this.applyList.splice(parseInt(key),1)
              }
          }
      }
      EventManager.instance.dispatchEvent(CustomEventEnum.REFRESH_UPDATE_SEND)
      EventManager.instance.dispatchEvent(CustomEventEnum.REFRESH_UPDATE_APPLY)
    }

    onUpdateApplyDateBack(data){

        if(data.error_msg="ok"){
           
        }
    }

    onAgreeSucceed(data){
        if (data.type==2) {
            MarriageDataManager.instance.changePartnerData(data.hndata)  
            // EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            //     viewName: PrefabPathEnum.MarriageSuccessful,
            //     data:data.hndata
            // })
            EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_UPDATE_VIEW)
        }else{
            this.friendList.push(data.frdata)
            EventManager.instance.dispatchEvent(CustomEventEnum.FRIEND_UPDATE_VIEW)
        }
    }
    onRedDot(data){
        EventManager.instance.dispatchEvent(CustomEventEnum.REFRESH_UPDATE_REDDOT)
    }

    //赠送成功刷新好感度
    onChangeDegree(data){
      // optional RelationType type = 3;
       for(let key in this.friendList){
        if(this.friendList[key]["id"]==data.data.id){
         this.friendList[key]["degree"]=data.data.degree
         break
        }
      }
      EventManager.instance.dispatchEvent(CustomEventEnum.FRIEND_UPDATE_VIEW)
    }
    onGiftData(data){
       //赠送礼物的返回
       if(data.error_msg=="ok"){
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "赠送成功"
        })
       }else if(data.error_msg=="notok"){
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "此玩家不是您的好友"
        })
       }
       
    } 

    onFriendData(data){
        if(data.frdata.length>0)
         this.friendList = data.frdata
        if(data.hndata.length>0){
            MarriageDataManager.instance.changePartnerData(data.hndata[0])
            if(data.hndata[0].isdowedding==isdowedding.isHadWedding)
            MarriageDataManager.instance.isHadWedding=true
            else
            MarriageDataManager.instance.isHadWedding=false

        }else{
           // MarriageDataManager.instance.changePartnerData(null)
        }
    }


   
    //删除好友的返回
    onDeleteFriend(data){
        if(data.type==0){
            for(let key in this.friendList){
                if(this.friendList[key]["id"]==data.id){
                  this.friendList.splice(parseInt(key),1)
                }
            }
            EventManager.instance.dispatchEvent(CustomEventEnum.FRIEND_UPDATE_VIEW)
            EventManager.instance.dispatchEvent(CustomEventEnum.REFRESH_UPDATE_SEND)
        }
        EventManager.instance.dispatchEvent(CustomEventEnum.REFRESH_UPDATE_DELETE)
     
    }

    //搜索好友的返回 
    onSearchData(data){
        if(data.error_msg !=="ok"){
            if(data.error_msg=="err_noFindUser"){
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "用户不存在或者对方已下线"
                })
            }
            return
        }
        EventManager.instance.dispatchEvent(CustomEventEnum.REFRESH_UPDATE_SEARCH,data)
    }

    onSearchAddFriend(data){
        if (data.type==2) {    
           // error_code: 0   结婚的返回
            if (data.error_msg =="ok") {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                    content: cc.js.formatStr("已向对方发送求婚申请,请耐心等待"),
                    cancelText: "取消",
                    confirmText: "确定",
                    showCancel: false,           
                })
            }else{
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "求婚失败"
                })
            }

        }else{
            //好友的返回
            if(data.error_msg !=="ok"){
                if(data.error_msg=="err_noFindUser"){
                    EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                        msg: "用户不存在或者对方已下线"
                    })
                }else if(data.error_code==5){
                    EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                        msg: "对方已在你的好友列表中"
                    })
                }
               
                return
            }
            EventManager.instance.dispatchEvent(CustomEventEnum.REFRESH_UPDATE_ADD,data)
        }
       
    }
   
    onAddChatMessage(eventData) {
        this.addMessage(eventData)
    }

    

    // export function G_TipsString(key) {
    //     if (key == null) {
    //         return "";
    //     }
    
    //     if (key.length <= 0) {
    //         return "";
    //     }
    
    //     let tipsStringTable = Common.tables["tipsStringTable"];
    //     if (tipsStringTable == null) {
    //         return key;
    //     }
    
    //     if (tipsStringTable[key] == null) {
    //         return key;
    //     }
    
    //     //添加隐藏掉支付接口后的特殊处理
    //     if (SLGConfig.IsHidePayFunc && key == "com_moneynotenoughandbuy") {
    //         return "元宝不足，前往获取？";
    //     }
    //     return tipsStringTable[key].context || key;
    // }
    
}
