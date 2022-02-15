

import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { SoundEnum } from "../../Constant/SoundEnum";
import MarriageDataManager, { curState } from "../../data/MarriageDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MarriageAuditorium extends BaseView {

    @property(cc.Prefab)
    auditoriumItem:cc.Prefab=null

    @property(cc.Node)
    content:cc.Node=null

    @property(cc.Node)
    noWedding:cc.Node=null

    @property(cc.Node)
    marriaged:cc.Node=null

    @property(cc.Node)
    weddingPanel:cc.Node=null

    @property(cc.Node)
    invitation:cc.Node=null

    @property(cc.Node)
    mainPanel:cc.Node=null

    private  itemPool = null

    start () {
        if (this.itemPool==null) {
            this.itemPool=new cc.NodePool()
        }
       
    }

    onEnable() {
        this.showMarriaged()
        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_UPDATE_AUDITORIUM, this.updateCreate, this)
        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_AUDITORIUM_SHUTUP, this.onCloseView, this)

        NetManager.instance.sendMsg("stDoNpcRandBrewNpcCmd_CS",{
            randid: 1,
            randstat: 2,
        })
        

       
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    onCloseView(){
        super.onCloseView()
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
    }
    updateCreate(data){
        this.noWedding.active=false
        for(var i=0;i<this.content.childrenCount;i++){
            this.onItemKilled(this.content.children[0])
        }
       
        if(data.length==0){
            this.noWedding.active=true
            return
        }else{
            this.noWedding.active=false
        }
       for(let i in data){
           this.createItem(data[i])
       }
        
    }

  

    createItem(data){
        let auditoriumItem
         if(this.itemPool.size()>0){
            auditoriumItem=this.itemPool.get()
         }else{
            auditoriumItem=cc.instantiate(this.auditoriumItem)
         } 
         auditoriumItem.parent=this.content
         auditoriumItem.getComponent('AuditoriumItem').init(data,this.content); 
    }


    onItemKilled (item) {
        this.itemPool.put(item); 
    }

    onMarriedBtn(){
         if(MarriageDataManager.instance.isHadWedding){
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "您已经举办过婚礼"
            })
         }else{
            if(MarriageDataManager.instance.curState==curState.heldIn||MarriageDataManager.instance.curState==curState.applying||MarriageDataManager.instance.curState==curState.waitHost){
                this.marriaged.active=false
                this.invitation.active=true
            }else{
                this.marriaged.active=false
                this.weddingPanel.active=true
            }
         }
         EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
    }

    onAttendRitual(){
        this.mainPanel.active=true
        this.marriaged.active=false
        NetManager.instance.sendMsg("stLookNearWeddingCmd_CS", {
         
        })
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
    }

    showMarriaged(){
        this.marriaged.active=true
    }


    closePanel(){
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        if(this.marriaged.active){
            this.onCloseView()
        }else if(this.invitation.active||this.weddingPanel.active){
            this.marriaged.active=true
            this.invitation.active=false
            this.weddingPanel.active=false
        }else if(this.mainPanel.active){
            this.marriaged.active=true
            this.mainPanel.active=false
        }

         
    }
    
}
