// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { BagType } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { friendData } from "../../data/DataInterface";
import FriendDataManager from "../../data/FriendDataManager";
import List from "../../framework/component/List";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";
import BottomPop from "../Common/BottomPop";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MarriageSuccessful extends BaseView {


  @property(cc.Label)
  selfName:cc.Label=null

  @property(cc.Label)
  selfID:cc.Label=null

  @property(cc.Label)
  selfPosInfo:cc.Label=null

  @property(cc.Label)
  selfTitle:cc.Label=null

  @property(cc.Sprite)
  selfIcon:cc.Sprite=null
  


  @property(cc.Label)
  partnerName:cc.Label=null

  @property(cc.Label)
  partnerID:cc.Label=null

  @property(cc.Label)
  partnerPosInfo:cc.Label=null

  @property(cc.Label)
  partnerTitle:cc.Label=null

  @property(cc.Sprite)
  partnerIcon:cc.Sprite=null
    
  @property(cc.Label)
  holderName:cc.Label=null

  @property(cc.Label)
  holderTitle:cc.Label=null

  @property(cc.Label)
  holderID:cc.Label=null

  @property(cc.Label)
  holderPosInfo:cc.Label=null

  @property(cc.Label)
  year:cc.Label=null

  @property(cc.Label)
  month:cc.Label=null

  @property(cc.Label)
  day:cc.Label=null

  @property(cc.Label)
  documentSize:cc.Label=null

  @property(cc.Sprite)
  holderIcon:cc.Sprite=null
    



    initByExData(data) {
        return
       cc.log("传过来得数据",data)

       this.selfName.string=data.name
    
       this.partnerID.string=data.id

       this.partnerPosInfo.string=data.pos
    
       this.partnerTitle.string=data.title

       this.partnerName.string=data.name

       let partnerName = data.iconurl
       Tool.loadSpriteFrame(partnerName, this.partnerIcon)
        
       this.holderName.string=data.name
        
       this.selfID.string=data.id
        
       this.holderID.string=data.id

       this.selfPosInfo.string=data.pos

       this.holderPosInfo.string=data.pos

       this.selfTitle.string=data.title

       this.holderTitle.string=data.title

       this.documentSize.string=data.documentSize

       let selfName = data.iconurl
       Tool.loadSpriteFrame(selfName, this.selfIcon)
       Tool.loadSpriteFrame(selfName, this.holderIcon)

       let time =  new Date(data.time) 
       let year = time.getFullYear()
       let month = time.getMonth()+1;
       let day = time.getDate();

       this.year.string=year.toString()

       this.month.string=month.toString()

       this.day.string=day.toString()
      
    } 
    
   
    onEnable() {
       // EventManager.instance.addEventListener(CustomEventEnum.FRIEND_UPDATE_VIEW, this.updateView, this)
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    start() {
        super.start()
    }
    


 


}
