import NpcConfig from "../config/NpcConfig";
import { CustomEventEnum } from "../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../Constant/PrefabPathEnum";
import { EventEnum } from "../framework/FrameWorkEnum";
import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
import { MarriageBuildingState } from "../view/Marriage/MarriageBuilding";
import BaseDataManager from "./BaseDataManager";
import { tWeddingData } from "./DataInterface";
import FriendDataManager from "./FriendDataManager";
import NpcManager from "./npc/NpcManager";
import PlayerInfoDataManager from "./PlayerInfoDataManager";


 export enum curState {
    applying = 1,//申请中
    waitHost = 2, //等待举办
    heldIn = 3, //举办中
}

export enum isdowedding {
    isNoWedding  = 0,//没有举办过婚礼
    isHadWedding = 1,//举办过婚礼
   
}

export default class MarriageDataManager extends BaseDataManager {
    private static _instance: MarriageDataManager = null;
    public static get instance(): MarriageDataManager {
        if (this._instance == null) {
            this._instance = new MarriageDataManager();
        }
        return this._instance;
    }
    private partnerData = null
    private marriageApplyList = []
    private canMarriageList = []
    private canMarriageTimeList = []

    private  auditoriumList = []


    private wineList:[] = []
    public haveMarriage:boolean=false
    public haveDistribute:boolean=false
    public marriageTime:number=0 //举办婚礼的日期
    public curState:number=0 //当前状态:1申请中、2等待举办、3举办中
    public isHadWedding
    //public needShowWishTimeTitle:boolean=false
    public needShowInviteTitle:boolean=false

    private partnerID:number=0
    private weddingData = {
        husbandId: 0, //丈夫id
        husbandName:"",//丈夫名字
        wifeId:0, //妻子id
        wifeName:"",//妻子名字
        applyId:0, //申请人id(丈夫或者妻子中的一个)
        curState:0, //(当前状态:1申请中、2等待举办、3举办中)
        startTime:0, //开始时间
        endTime:0, //结束时间
        weddingType:0, //婚礼类型
        peopleCount:0, //观礼人数
    }
    private childrenList = []

    constructor() {
        super();
        this.reset();
        //TODO
        let curTime = Math.floor((new Date().getTime()) / 1000)
        for(let i = 0; i < 2; i++) {
            let itemChild = {
                id: i,
                name: cc.js.formatStr("%s娃", Tool.getChinaEasyNumber(i + 1)),
                bornTime: curTime + Tool.getRandomLimit(-72*3600, 72*3600),
            }
            this.childrenList.push(itemChild)
        }
    }

    reset() {
        super.reset()
    }
    addNetListener() {
        EventManager.instance.addEventListener("NtfMarriageData", this.onNtfMarriageData, this, -1)
        EventManager.instance.addEventListener("stProposalReqListRelationUserCmd_SC", this.onApplyData, this)   
        EventManager.instance.addEventListener("stProposalReqListmd_SC", this.onMarriageSuccessful, this)   
        EventManager.instance.addEventListener("Relation_SpouseReq", this.onMarriageAgree, this)   
        EventManager.instance.addEventListener("GiftWineEffect", this.onGiftWineEffect, this)  
        
        EventManager.instance.addEventListener("stSendInvitationWeddingCmd_SC", this.onStSendInvitationWeddingCmd_SC, this)   

     

        EventManager.instance.addEventListener("stApplyWeddingCmd_SC", this.onStApplyWeddingCmd, this, -1)

        EventManager.instance.addEventListener("stDataWeddingCmd_NT", this.onRspOrderWedding, this, -1)

        EventManager.instance.addEventListener("stLookDayWeddingCmd_SC", this.onStLookDayWeddingCmd_SC, this, -1)

        EventManager.instance.addEventListener("stAgreeWeddingCmd_SC", this.onStAgreeWeddingCmd_SC, this, -1)

        EventManager.instance.addEventListener("stRefreshWeddingCmd_NT", this.onStRefreshWeddingCmd_NT, this, -1)

        EventManager.instance.addEventListener("stLookNearWeddingCmd_SC", this.onStLookNearWeddingCmd_SC, this, -1)
        
         
        //EventManager.instance.addEventListener(CustomEventEnum.FRIEND_UPDATE_VIEW, this.updateApplyList, this)
    }

   changePartnerData(partnerData){
      this.partnerData=partnerData
   }

    getPartnerData() {
        return this.partnerData
    }
    //判断是否结婚
    hasMarried() {
         if(this.partnerData!=null)
           return true
       return false
    }
     
     getCanMarriageList(){
        this.canMarriageList=[]
        let friendList = FriendDataManager.instance.getFriendList()
        let selfSex=PlayerInfoDataManager.instance.getSex()
         for(let i in friendList){
            if (friendList[i].face!=selfSex) {
                this.canMarriageList.push(friendList[i])
            }
         }
         return this.canMarriageList
     }

    // getCanMarriageList()
    // {
    //     let friendList = FriendDataManager.instance.getFriendList()
    //     let npcList = []
    //     for(let i in NpcConfig)
    //     {
    //         if(NpcManager.instance.checkNpcTriggerMarry(NpcConfig[i].type))
    //         {
    //             npcList.push({
    //                 name: NpcConfig[i].name,
    //                 degree:200  
    //             })
    //         }
    //     }

    //     return friendList.concat(npcList)

    // }
    getMarriageApplyList() {
        return this.marriageApplyList
    }
    getChildrenList() {
        return this.childrenList
    }
    onNtfMarriageData(eventData) {
        this.partnerData = eventData.partnerData
    }

    onStApplyWeddingCmd(data){
        if(data.errCode==1){
            if(this.curState==2){
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "您已经选择好婚礼日期,请耐心等待举行婚礼"
                })
            }else{
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "您已经选择好日期,请耐心等待对方反馈"
                })
            }
            
        }else if(data.errCode==0){
            EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                content: "您的婚礼计划已送达您的伴侣"
            })
        }
    }
    //eventData:tWeddingData
    onRspOrderWedding(eventData) {
        this. partnerID=eventData.weddingData.applyId
        this.curState=eventData.weddingData.curState
        if(eventData.weddingData.applyId!=PlayerInfoDataManager.instance.getPlayerInfo().id){
            if(eventData.weddingData.curState==1){
                cc.log("申请中")
                EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_SHOW_TITLE, MarriageBuildingState.wishTime)
            }else if(eventData.weddingData.curState==2){
                cc.log("等待举办")
               // this.curState=2
            }else if(eventData.weddingData.curState==3){
                cc.log("举办中")
              //  this.curState=3
            }else if(eventData.weddingData.curState==4){
                cc.log("婚礼结束")
               // this.curState=4
            }
        } 
        this.weddingData = eventData
       
    }

    onStLookDayWeddingCmd_SC(data){
        if(data.errCode==0){
            // EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            //     msg: "还没有"
            // })
        }
        this.canMarriageTimeList=data.weddingData
        EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_UPDATE_DATEITEM)
    }
    getCanMarriageTimeList(){
        return this.canMarriageTimeList
    }
    getRspOrderWedding(){
        return this.weddingData 
    }

   
    onApplyData(data){
        this.marriageApplyList  =data.fdata
        EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_UPDATE_APPLY)
    }

    onMarriageSuccessful(data){
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.MarriageSuccessful
        })
    }

    onMarriageAgree(data){
       if (data.error_code==0) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "结婚成功"
            })
        } else  {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "结婚失败"
            })
        }
        
    }

    getWineListView(){   
        return  this.wineList
    }


    
    //赠送成功刷新好感度
    onChangeWinList(data){
       // optional RelationType type = 3;
        for(let key in this.wineList){
         if(this.wineList[key]["id"]==data.data.id){
         // this.wineList[key]["degree"]=data.data.degree
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

     onGiftWineEffect(data){
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.GiftWineEffect,
            data:data.hndata
        })
     }

     onStAgreeWeddingCmd_SC(data){
         if(data.errCode==0){
           cc.log("发送成功")
         
         }else if(data.errCode==1){
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "您已经拒绝了这次婚礼时间，请重新选择时间"
            })
         }

     }

     onStRefreshWeddingCmd_NT(data){
      
         if(data.reason==0&&PlayerInfoDataManager.instance.getPlayerInfo().id==this.partnerID){
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "对方拒绝了你的申请,请重新选择结婚时间"
            })
         }else if(data.reason==1&&PlayerInfoDataManager.instance.getPlayerInfo().id==this.partnerID){
             if(this.curState==1){
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "对方同意了您提的结婚申请时间"
                })
             }
         }else if(data.reason==0&&PlayerInfoDataManager.instance.getPlayerInfo().id!=this.partnerID){
            EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_SHOW_TITLE, MarriageBuildingState.wishTime)
            EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_UPDATE_WISHTIME, MarriageBuildingState.wishTime)
         }else if(data.reason==1&&PlayerInfoDataManager.instance.getPlayerInfo().id!=this.partnerID){

            if(this.curState==2){
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "您已经同意了举办婚礼，请耐心等待婚礼举行"
                })  
            }else if(this.curState==1){
                EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_SHOW_TITLE, MarriageBuildingState.wishTime) 
            }
           
         }
         this.curState=data.weddingData.curState 
        
         if(this.curState==3){
            EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_SHOW_TITLE, MarriageBuildingState.startMarriage) 
         }

         if(this.curState==4){
            //EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_SHOW_TITLE, MarriageBuildingState.startMarriage)
            EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_SHOW_TITLE, MarriageBuildingState.startMarriage)
            cc.log("婚礼结束")
         }
     }

     onStLookNearWeddingCmd_SC(data){
        this.auditoriumList=data.weddingData
        EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_UPDATE_AUDITORIUM, data.weddingData) 
     
     }

     getAuditoriumList(){
         return this.auditoriumList 
     }

     onStSendInvitationWeddingCmd_SC(data){
         
     }
    
}