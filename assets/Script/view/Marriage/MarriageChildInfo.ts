

import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../Constant/SoundEnum";
import MarriageDataManager from "../../data/MarriageDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";
import { childDecorate } from "./MarriageChildBtn";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MarriageChildInfo extends BaseView {
    @property(cc.EditBox)
    nameEdit: cc.EditBox = null

    @property(cc.Label)
    childName: cc.Label = null
    
    @property(cc.Label)
    nickname: cc.Label = null

    @property(cc.Label)
    desc: cc.Label = null

    @property(cc.Sprite)
    headIcon: cc.Sprite = null;
    


    private childData = null
    initByExData(exData) {
          
        cc.log("孩子信息",exData,cc.js.formatStr("你和%s的结晶","小王"))
        EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_CHILD_SELECTBTN,childDecorate.cap)
        return
        this.childData = exData
        this.childName.string = this.childData.name
        this.nickname.string = this.childData.petname
       // this.desc.string ="你和"+MarriageDataManager.instance.getPartnerData().name+"的结晶"
        this.desc.string =cc.js.formatStr("你和%s的结晶",MarriageDataManager.instance.getPartnerData().name)
        // let frameName = exData.iconurl
        // Tool.loadSpriteFrame(frameName, this.headIcon)
    }

    onClickRename() {
      
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.MarriageRename,
            data:this.childData
        })  
       // this.onCloseView()
       EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
    }

    onCloseView() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
    }
}