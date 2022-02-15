

import { Config } from "../../Constant/Config";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";

const {ccclass, property} = cc._decorator;

export enum fireworksStyle{  
    Non=0,
    Shut=1,
    Hair =2,
    Live=3,
  }

@ccclass
export default class AuditoriumPanel extends BaseView {

    @property([cc.Node])  
    btnArr: cc.Node[] = [];

    @property(cc.Label)  
    newPeople: cc.Label = null;

    @property(cc.Label)  
    stytle: cc.Label = null;

    
    @property(cc.Node)  
    select: cc.Node = null;

    
   
    private fireworksStyle=fireworksStyle.Shut
 
  initByExData(exData) {
      this.newPeople.string=exData.husbandName+"&"+exData.wifeName

      let str
      if(exData.weddingType==1){
        str="中式婚礼"
      }else{
        str="西式婚礼"
      }
      this.stytle.string=str
  }

    onShutBtn(){
       this.fireworksStyle=fireworksStyle.Shut
       this.select.setPosition(this.btnArr[0].position)
    }

    onHairBtn(){
        this.fireworksStyle=fireworksStyle.Hair
        this.select.setPosition(this.btnArr[1].position)
    }

    onLiveBtn(){
        this.fireworksStyle=fireworksStyle.Live
        this.select.setPosition(this.btnArr[2].position)
    }

    onFireworksBtn(){ 
        // if( this.fireworksStyle=fireworksStyle.Non){
        //     EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
        //         msg: "请先选择一种烟花"
        //     })
        // }

        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "此功能暂未开放"
        })

        return
        if(Config.IsTestModel) {
            NetManager.instance.sendMsg("TestAddMoneyBrewUserCmd_CS", {
                money: -100
            })
        }
        EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_SHOW_FIREWORKS)
    }

    onLiquorBtn(){
        
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "此功能暂未开放"
        })
        return
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.GiftWine,
        })  
        
    }
}
