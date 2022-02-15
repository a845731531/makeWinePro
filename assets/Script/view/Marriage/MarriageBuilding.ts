import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../Constant/SoundEnum";
import MarriageDataManager from "../../data/MarriageDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";

const { ccclass, property } = cc._decorator;

export enum MarriageBuildingState{
    proposal=0,//
    wishTime=1,
    invitation=2,
    startMarriage=3,
}
@ccclass
export default class MarriageBuilding extends BaseView {
    @property(cc.Node)
    unMarriedNode: cc.Node = null
    @property(cc.Node)
    proposalNode: cc.Node = null
    @property(cc.Node)
    proposalApplyNode: cc.Node = null

    @property(cc.Node)
    marriedNode: cc.Node = null
    @property(cc.Node)
    divorceNode: cc.Node = null
    @property(cc.Node)
    weddingNode: cc.Node = null
    @property(cc.Node)
    childNode: cc.Node = null
    @property(cc.Node)
    wishTime: cc.Node = null

    @property(cc.Node)
    bgscraps: cc.Node = null
    
    @property(cc.Node)
    invitation: cc.Node = null


    start() {
        this.updateView()
    }
    onEnable() {
        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_UPDATE_VIEW, this.updateView, this)
        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_UPDATE_WISHTIME, this.onShowWishTime, this)

        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_UPDATE_WEDDING, this.onJumpWishTime, this)
        EventManager.instance.addEventListener("NtfMarriageData", this.onNtfMarriageData, this)
        EventManager.instance.addEventListener("RspOrderWedding", this.onRspOrderWedding, this)

    }

    initByExData(exData) {
        this.bgscraps.active=true
        if (exData==MarriageBuildingState.proposal) {
            this.onJumpProposal()
        }else if (exData==MarriageBuildingState.wishTime) {
            this.onJumpWishTime()
        }else if (exData==MarriageBuildingState.invitation) {
            this.onInvitationCard()
        }
    }

    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    updateView() {
        let hasMarried = MarriageDataManager.instance.hasMarried()
        this.unMarriedNode.active = !hasMarried
        this.marriedNode.active = hasMarried
        if(this.wishTime.active)
        this.marriedNode.active = false
        cc.log("进不来")
        this.proposalNode.active=false
        this.proposalApplyNode.active=false
    }
    backUnMarriedPanel() {
        this.proposalNode.active = false
        this.proposalApplyNode.active = false
        this.divorceNode.active = false
        this.unMarriedNode.active = true
    }
    backMarriedPanel() {
        this.divorceNode.active = false
        this.weddingNode.active = false
        this.childNode.active = false
        this.proposalNode.active=false
        this.marriedNode.active = true
    }

    onShowWishTime(){
        this.wishTime.active=false
        this.weddingNode.active=true
    }
    //求婚
    onJumpProposal() {
        this.unMarriedNode.active = false
        this.proposalNode.active = true
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
    }

    //求婚时间
    onJumpWishTime() {
        this.unMarriedNode.active = false
        this.marriedNode.active=false
        this.wishTime.active = true
      
     }

     //派发请柬
     onInvitationCard(){
         this.bgscraps.active=false
         this.unMarriedNode.active = false
         this.invitation.active=true
         EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
     }
    //求婚申请
    onJumpProposalApply() {
        this.unMarriedNode.active = false
        this.proposalApplyNode.active = true
        NetManager.instance.sendMsg("stProposalReqListRelationUserCmd_CS", {
            rtype:0
        })
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
    }
    //离婚
    onJumpDivorce() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "此功能暂未开放"
        })
        return
        this.marriedNode.active = false
        this.divorceNode.active = true
    }
    //婚礼预约
    onJumpWedding() {
        this.marriedNode.active = false
        this.weddingNode.active = true
        this.bgscraps.active=false
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
    }
    onJumpChild() {
        this.marriedNode.active = false
        this.childNode.active = true
    }
    
    onClickBack() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        if(this.unMarriedNode.active || this.marriedNode.active) {
            this.onCloseView()
            return
        }
        if(this.proposalNode.active || this.proposalApplyNode.active) {
            if(MarriageDataManager.instance.hasMarried()){
                this.backMarriedPanel()
            }else{
                this.backUnMarriedPanel()
            }
           
        }
        if(this.divorceNode.active || this.weddingNode.active || this.childNode.active) {
            if(MarriageDataManager.instance.hasMarried()){
                this.backMarriedPanel()
            }else{
                this.backUnMarriedPanel()
            }
        }

        if(this.wishTime.active){
            this.onShowWishTime()
        }

        
    }

    onNtfMarriageData() {
        this.backUnMarriedPanel()
        this.backMarriedPanel()
        this.updateView()
    }
    onRspOrderWedding() {
        // this.wishTime.active=true
        this.backMarriedPanel()
    }
    
}