import PropConfig from "../../config/PropConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { itemDiscardType, ItemType, itemUseType, MoneyPropId, RelationType } from "../../Constant/GameEnum";
import BagDataManager from "../../data/BagDataManager";
import { BagItemData } from "../../data/DataInterface";
import FriendDataManager from "../../data/FriendDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";


/**
 * 背包物品 item信息弹窗脚本
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class searchPanel extends BaseView {

    @property(cc.Node)
    playerNode: cc.Node = null

    @property(cc.EditBox)
    idEditBox: cc.EditBox = null

    @property(cc.Sprite)
    headIcon: cc.Sprite = null;

    
    @property(cc.Label)
    friendName: cc.Label = null;

    @property(cc.Label)
    sex: cc.Label = null;

    @property(cc.Label)
    posInfo: cc.Label = null;

    @property(cc.Label)
    friendCount: cc.Label = null;
    

    private totalCount = 0
    private currentCount=0
    private playerID
   

   onEnable()
   {
        EventManager.instance.addEventListener(CustomEventEnum.REFRESH_UPDATE_SEARCH, this.onSearch, this)
        EventManager.instance.addEventListener(CustomEventEnum.REFRESH_UPDATE_ADD, this.onAddFriend, this)
   }
   onDisable() {
       EventManager.instance.removeTargetListener(this)
   }
    initByExData() { 
    
    this.idEditBox.string=""
    this.playerNode.active=false
    this.currentCount =FriendDataManager.instance.getFriendList().length
    this.totalCount=  Tool.getNumberParamConfig("numberoffriends")
    this.friendCount.string =this.currentCount+"/"+this.totalCount
    
    }

    onEditNumEnd()
    {
        // if(this.idEditBox.string != "")
        // {
        //     // let inputNum = parseInt(this.idEditBox.string)
        //     // inputNum = Math.max(1, inputNum)
        //    // this.idEditBox.string = "" + inputNum
        //    cc.log("==",this.idEditBox.string)
        //    this.idEditBox.string = this.idEditBox.string
        // }
    }
  
    onClickQuery() {
        let pitId = this.idEditBox.string 
        if(pitId == "") {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "请输入玩家ID或姓名"
            })
            return
        }
        cc.log("发送",pitId)

        if(parseInt(pitId)){
            NetManager.instance.sendMsg("stFindFriendInfoQuestUserCmd_CS", {
                findid: parseInt(pitId),
            })
    
        }else{
            NetManager.instance.sendMsg("stFindFriendInfoQuestUserCmd_CS", {
                findname: pitId,
            })
        }
      
    }
    onbtnclear(){
        this.idEditBox.string=""
    }

    onAddFriend(){
        this.playerNode.active=false
    }
    onAddBtn(){
        if(this.currentCount>=this.totalCount){
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "好友数量已达上限制"
            })
            return
        }    
       
    let pitId = this.idEditBox.string
    if(pitId == "") {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "请输入玩家ID或姓名"
        })
        return
    }
    cc.log("添加好友")
    NetManager.instance.sendMsg("stRequestAddRelationUserCmd", {
        type: RelationType.Relation_Friend,
        id:parseInt(pitId),
        agree:0
    })
        
        // cc.log("点击了添加好友")
        // EventManager.instance.dispatchEvent("addFriend", {
        //     status: "ok",
        //     data1:{
        //         playerName:"姚明",
        //         sex:"男",
        //         url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242332225H9-0-lp.jpg",
        //         likability:9999,
        //         online:0,
        //         spouse:true,
        //         playerID:1004,
        //         posInfo:"位置信息:大山勾",
        //         guildName:"酿酒吧"
        //     } 
        // })
    }


    onSearch(data){   
       this.playerNode.active=true
       this.playerID=data.findid
       let frameName = data.iconurl
       Tool.loadSpriteFrame(frameName, this.headIcon)
       this.friendName.string=data.findname
       if(data.usersex==0){
        this.sex.string="男"
       }else if(data.usersex==1){
        this.sex.string="女"
       }
       this.posInfo.string=data.homeland
    }
}
