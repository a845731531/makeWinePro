import NpcConfig from "../../config/NpcConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { NpcTabType, NpcType } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import NpcManager from "../../data/npc/NpcManager";
import RandomEventManager from "../../data/npc/RandomEventManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NpcTabInfoView extends BaseView {

    @property(cc.Sprite)
    npcIcon: cc.Sprite = null;

    @property(cc.Label)
    npcName: cc.Label = null;

    @property(cc.Label)
    npcTag: cc.Label = null;

    @property(cc.Label)
    txtTaskInfo: cc.Label = null;

    @property(cc.Label)
    desc: cc.Label = null;

    @property(cc.Node)
    tabList: cc.Node[] = [];

    private _npcId = 0
    private _npcConfig = null

    onLoad()
    {
        this.addListener()
    }
    setText(text,exStr){
        var str = exStr;
        var j = 0;
        text.string = "";
        this.schedule(()=>{
            text.string += str[j];
            j++;
        },0.1,str.length-1,0.2)
     }

    addListener()
    {
        EventManager.instance.addEventListener(CustomEventEnum.RANDOM_EVENT_UPDTAE,this.updateTabList,this)
    }

    initByExData(param)
    {
        this._npcId = param.npcId

        this._npcConfig = NpcConfig[this._npcId]

        this.npcName.string = this._npcConfig.name

        this.setText(this.desc, this._npcConfig.desc)

        Tool.loadSpriteFrame(cc.js.formatStr("texture/npc/npc_%s",NpcConfig[this._npcId].icon),this.npcIcon)
        this.npcTag.string = this._npcConfig.introduce

        this.updateTabList()

        NpcManager.instance.setNpcCanMove(this._npcId,false)

        if(param.openEvent && this.tabList[NpcTabType.EVENT].active)
        {
            this.onClickEvent()
        }

        if(this._npcConfig.sound)
        {
            EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, this._npcConfig.sound)
        }
    }

    updateTabList()
    {

        //根据npc类型筛选tab标签
        let npcType = this._npcConfig.type
        for(let i = 0; i < this.tabList.length; i++)
        {
            this.tabList[i].active = false
        }

        let needTabList = NpcManager.instance.getTabListByNpcType(npcType)
        for(let i = 0; i < needTabList.length; i++)
        {
            this.tabList[Number(needTabList[i])].active = true
        }

        //除了玩家、事件、动物外  都可以触发任务
        if(NpcManager.instance.checkNpcTriggerTask(this._npcConfig.type))
        {

            //判断当前npc是否处于任务进程
            if(0)
            {
                //处于任务进程中
                this.tabList[NpcTabType.TASK].active = true

                //任务类型  是否为对话任务
                if(1)
                {
                    this.txtTaskInfo.string = "任务"
                }else{
                    //判断任务当前完成情况
                    if(0)
                    {
                        //未完成
                        this.txtTaskInfo.string = "任务"
                    }else if(1)
                    {
                        //进行中
                        this.txtTaskInfo.string = "任务详情"
                    }
                }


            }else{
                //不在任务进程中
                this.tabList[NpcTabType.TASK].active = false
            }

        }

        //随机事件
        if(NpcManager.instance.checkNpcTriggerEvent(this._npcConfig.type))
        {

            //是否为随机事件状态
            let eventData = RandomEventManager.instance.getNpcEventData(this._npcId)
            if(eventData)
            {
                //处于随机事件中
                this.tabList[NpcTabType.EVENT].active = true
            }else{
                //不处于随机事件
                this.tabList[NpcTabType.EVENT].active = false
            }
        }

    }

    onClickTalk()
    {
        let npcConfig = NpcConfig[this._npcId]
        //对话表id
        let dialogueId = npcConfig.descRandom[Math.floor(Math.random() * npcConfig.descRandom.length)]
        //展示npc对话界面
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.NpcDialogView,
            exData:{
                npcId: this._npcId,
                dialogueId: dialogueId,
                callback: null
            }
        })

        this.onCloseView()
    }

    onClickGift()
    {

        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "敬请期待"
        })
        // EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
        //     viewName: PrefabPathEnum.GiftPanel,
        //     exData: {
        //       data:null,
        //       isNpc:true
        //     }
        // })
        // EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
        //     msg: "敬请期待！"
        // })
    }

    onClickTask()
    {
        if(1)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "敬请期待！"
            })
            return
        }

        //判断任务状态

        //对话表id
        let dialogueId = 1

        //展示npc对话界面
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.NpcDialogView,
            exData:{
                npcId: this._npcId,
                dialogueId: dialogueId,
                callback: ()=>{
                    //xiejinhui 对话完毕 发送对话结束的请求

                    NetManager.instance.sendMsg("reqNpcDialogueEnd",this._npcId)

                }
            }
        })
    }

    onClickHotSpring()
    {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
            msg: "敬请期待！"
        })
    }

    onClickEvent()
    {
        //展示npc对话界面
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.RandomEventView,
            exData:{
                npcId: this._npcId,
                callback: null
            }
        })

        this.onCloseView()
    }

    onClickMarry()
    {
        // EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
        //     msg: "敬请期待！"
        // })
        this.onCloseView()
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.MarriageBuilding
        })
    }

    onClickWine()
    {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
            msg: "敬请期待！"
        })
    }

    onClickClose()
    {
        NpcManager.instance.setNpcCanMove(this._npcId,true)
        this.onCloseView()
    }

    removeListener()
    {
        EventManager.instance.removeTargetListener(this)
    }

    onDestroy()
    {
        this.removeListener()
    }
    
}