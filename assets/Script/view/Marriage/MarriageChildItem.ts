
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../Constant/SoundEnum";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MarriageChildItem extends cc.Component {    
    @property(cc.Node)
    growthNode: cc.Node = null
    @property(cc.Label)
    nickname : cc.Label = null

    @property(cc.Node)
    borningNode: cc.Node = null
    @property(cc.Label)
    timeLabel: cc.Label = null
    @property(cc.Label)
    costLabel: cc.Label = null

    @property(cc.Label)
    childName : cc.Label = null
    
    @property(cc.Node)
    progress:cc.Node=null

    @property(cc.Node)
    slider:cc.Node=null

    private curData = null
    //private bornNeedTime = 1 * 3600

    private bornNeedTime = 120
    private bornSpeedCost = 100

    private sliderWidth=300

    private state



    onEnable() {
       

        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_CHILD_RENAMESUCEFF, this.onUpdateName, this)

        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_CHILD_SPEDD, this.onUpdateSpeed, this)
   
     //   EventManager.instance.addEventListener("stSpeedupChildCmd_SC", this.onStSpeedupChildCmd_SC, this)
        
    }

     start() {
        this.sliderWidth=this.slider.width
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    updateView(itemData) {
        this.curData = itemData
        cc.log("来不及",itemData)
        this.state=itemData.state
        let curTime = Math.floor((new Date().getTime()) / 1000)
        if(itemData.bornTime <= curTime) {
            this.growthNode.active = true
            this.borningNode.active = false
            this.childName.string=itemData.name
            if(itemData.petname==null||itemData.petname.length==0){
                this.nickname.string="无"
            }else{
                this.nickname.string=itemData.petname
            }
         
        } else {
            this.growthNode.active = false
            this.borningNode.active = true
            this.schedule(this.updateBornTime, 1)
            this.updateBornTime()
        }
    }

    onUpdateName(data){
        cc.log("来不加",data)
      if(this.curData.childId==data.childId){
        this.nickname.string=data.petname
        this.curData.petname=data.petname
      }
    }
    updateBornTime() {
        let curTime = Math.floor((new Date().getTime()) / 1000)
        let remainTime = this.curData.bornTime - curTime
        if(remainTime <= 0) {
            this.unschedule(this.updateBornTime)
            this.updateView(this.curData)
        } else {
           
            this.progress.width=(this.bornNeedTime -remainTime)/this.bornNeedTime*this.sliderWidth
            this.timeLabel.string = Tool.formatTime(remainTime)
            //this.costLabel.string = Math.ceil(remainTime / this.bornNeedTime * this.bornSpeedCost).toString()
        }
    }


    onUpdateSpeed(data){
    cc.log("这是加速了",data)
        if(this.curData.childId==data.childId){
            this.curData.bornTime= data.bornTime
        }

    }
    onClickSpeed() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        let curTime = Math.floor((new Date().getTime()) / 1000)
        let remainTime = this.curData.bornTime - curTime
        let needCost = Math.ceil(remainTime / this.bornNeedTime * this.bornSpeedCost)
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: cc.js.formatStr("是否花费%szqb加速孩子出生？", needCost),
            showCancel: true,
            confirmCallback: () => {
                NetManager.instance.sendMsg("stSpeedupChildCmd_CS", {
                    //childId: this.curData.id
                    propId:1,
                    propNum:1
                })
               
            }
        })
    }

    // onStSpeedupChildCmd_SC(data){
    //     this.curData.bornTime = 0
    //     this.updateView(this.curData)
    // }
    onClickRename() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.MarriageRename,
            exData: {
                childData: this.curData
            }
        })
      
    }
  
    onClickHeadInfo(){
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
    if(this.state==0)
        return

    
       EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.MarriageChildInfo,
            exData:this.curData
        })
    }
}