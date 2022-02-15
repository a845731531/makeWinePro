

import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import EventManager from "../../framework/manager/EventManager";
import { MarriageBuildingState } from "./MarriageBuilding";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MarriageTitle extends cc.Component {
   
    @property(cc.Label)
    info:cc.Label=null

    @property([cc.SpriteFrame])
    titleSpr: cc.SpriteFrame[] = []

    @property(cc.Sprite)
    iconTitle: cc.Sprite =null

    private type

    onEnable() {
        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_SHOW_INFO, this.updateView, this)
    }
    
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    updateView(extData) {
        cc.log("进来",extData)
        this.type=extData.type
       if (extData.type==MarriageBuildingState.wishTime) {
          this.info.string=extData.data.name+"想和你举办婚礼"
          this.iconTitle.spriteFrame=this.titleSpr[0]
       }else if (extData.type==MarriageBuildingState.invitation) {
          this.info.string=extData.data
          this.iconTitle.spriteFrame=this.titleSpr[1]
       }else if (extData.type==MarriageBuildingState.startMarriage) {
        this.info.string=extData.data.name+"和你的婚礼开始了"
        this.iconTitle.spriteFrame=this.titleSpr[0]
     }
    }
   
  
 
}
