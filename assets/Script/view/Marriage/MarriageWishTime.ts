import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { SoundEnum } from "../../Constant/SoundEnum";
import MarriageDataManager from "../../data/MarriageDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { NetManager } from "../../framework/network/NetManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MarriageWishTime extends cc.Component {

   @property(cc.Label)
   time:cc.Label=null

    onEnable() {
        this.updateView()
   
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    updateView(){
       let data  = MarriageDataManager.instance.getRspOrderWedding()["weddingData"]

       let time =  new Date(data.startTime*1000) 
       let month = time.getMonth()+1;
       let day = time.getDate();
       let hour=time.getHours(); 
       let minute=time.getMinutes(); 
       let weddingType =data.weddingType
       let styleStr
       if(weddingType==1)
       styleStr="中式婚礼"
       else
       styleStr="西式婚礼"
      this.time.string=month+"月"+day+"日"+"   "+hour+":"+minute +"   "+"举行"+styleStr
    }


    onDisAgree(){
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        NetManager.instance.sendMsg("stAgreeWeddingCmd_CS", {
            answer: 0
        })
        EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_UPDATE_WEDDING)
    }

    onAgree(){
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        NetManager.instance.sendMsg("stAgreeWeddingCmd_CS", {
            answer: 1
        })

    }
}
