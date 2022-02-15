import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../Constant/SoundEnum";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { NetManager } from "../../framework/network/NetManager";


const {ccclass, property} = cc._decorator;

export enum state{  
  underway=0,
  predict =1,
}

@ccclass
export default class AuditoriumItem extends cc.Component {
 
  @property(cc.Label)
  bridegroom:cc.Label=null

  @property(cc.Label)
  bride:cc.Label=null

  @property(cc.Label)
  style:cc.Label=null

  @property(cc.Label)
  personCount:cc.Label=null

  @property(cc.Label)
  expectedDes:cc.Label=null

  @property(cc.Node)
  proceedNode:cc.Node=null

  @property(cc.Node)
  predictNode:cc.Node=null

  @property([cc.SpriteFrame])
  kuang:cc.SpriteFrame[]=[]

  @property(cc.Sprite)
  marriageKuang:cc.Sprite=null
  

  private state=0

  private data
    
  init(data ,parent){
    this.data=data
    this.node.parent=parent
    this.bridegroom.string=data.husbandName+"&"+data.wifeName
    //this.bride.string=data.wifeName
    let str
    if(data.weddingType==1){
      str="中式婚礼"
    }else{
      str="西式婚礼"
    }
    this.style.string=str
    this.state=0

    let startTime=data.startTime
    let curRealDate = new Date().getTime()/1000
    if(curRealDate<startTime){
      this.state=state.predict
    }else{
      this.state=state.underway
    }
  
    if(this.state==state.underway){
      this.proceedNode.active=true
      this.predictNode.active=false
      this.personCount.string=data.peopleCount
      this.marriageKuang.spriteFrame=this.kuang[0]
    }else{
      this.proceedNode.active=false
      this.predictNode.active=true
      let time =  new Date(data.startTime*1000) 
      let month = time.getMonth()+1;
      let day = time.getDate();
      let hour=time.getHours(); 
      let minute=time.getMinutes(); 
      this.expectedDes.string="预计"+month+"月"+day+"日"+hour+":"+minute+"举行"
      this.marriageKuang.spriteFrame=this.kuang[1]
    }  
      
  }

    onClickBtn(){
      if(this.state==0){
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
          viewName: PrefabPathEnum.WeddingAuditorium,
          exData: this.data
        }) 
        NetManager.instance.sendMsg("stFriendInWeddingCmd_CS",{
       })

       EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_AUDITORIUM_SHUTUP) 
       EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
      }
    }
}
