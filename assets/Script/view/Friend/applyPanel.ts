import PropConfig from "../../config/PropConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { itemDiscardType, ItemType, itemUseType, MoneyPropId } from "../../Constant/GameEnum";
import BagDataManager from "../../data/BagDataManager";
import { BagItemData, friendData } from "../../data/DataInterface";
import FriendDataManager from "../../data/FriendDataManager";
import List from "../../framework/component/List";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";
import ApplyItem from "./ApplyItem";


/**
 * 背包物品 item信息弹窗脚本
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class applyPanel extends BaseView {


    @property(List)
    friendListView: List = null;

    @property(cc.Label)
    friendCount: cc.Label = null;
    
    private friendDataList: friendData[] = []

    private totalCount = 0
    private currentCount=0
    private playerID
   

   onEnable()
   {
        
        EventManager.instance.addEventListener("RspQuery", this.onRspQuery, this)

        EventManager.instance.addEventListener("stCommonChatUserPmd_CS", this.cuowu, this)
        
        EventManager.instance.addEventListener(CustomEventEnum.REFRESH_UPDATE_VIEW,this.updateView,this)

        EventManager.instance.addEventListener(CustomEventEnum.REFRESH_UPDATE_APPLY,this.updateView,this)

   }
   onDisable() {
       EventManager.instance.removeTargetListener(this)
   }

   initByExData() { 
  
    this.updateView()

}

   updateView()
   {
      this.friendDataList = FriendDataManager.instance.getApplyList()
      cc.log("刷新好友",this.friendDataList)
      this.friendListView.numItems = this.friendDataList.length
      let currentCount =FriendDataManager.instance.getApplyList().length
      let totalCount=  Tool.getNumberParamConfig("numberoffriends")
      this.friendCount.string =currentCount+"/"+totalCount
   }
  

    
    onRenderItem(itemNode, index) {
        cc.log("看下这里",itemNode,index)
        let itemData = this.friendDataList[index]
        itemNode.getComponent(ApplyItem).updateView(itemData)
   }
  
    onClickQuery() {

    }
   


    cuowu(data){
        cc.log("错误的消息",data)
    }
    onAddBtn(){
        if(this.currentCount>=this.totalCount){
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "好友数量已达上限制"
            })
            return
        }    
        NetManager.instance.sendMsg("ReqQuery", {
            id: parseInt(this.playerID),
        })
        
        cc.log("点击了添加好友")
        EventManager.instance.dispatchEvent("addFriend", {
            status: "ok",
            data1:{
                playerName:"姚明",
                sex:"男",
                url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242332225H9-0-lp.jpg",
                likability:9999,
                online:0,
                spouse:true,
                playerID:1004,
                posInfo:"位置信息:大山勾",
                guildName:"酿酒吧"
            } 
        })
    }


    onRspQuery(data){
       if(data.status!=="ok"){
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "没有搜索到此玩家"
        })
        return
       }
     
    }
}
