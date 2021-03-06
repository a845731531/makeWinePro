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

        //??????npc????????????tab??????
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

        //?????????????????????????????????  ?????????????????????
        if(NpcManager.instance.checkNpcTriggerTask(this._npcConfig.type))
        {

            //????????????npc????????????????????????
            if(0)
            {
                //?????????????????????
                this.tabList[NpcTabType.TASK].active = true

                //????????????  ?????????????????????
                if(1)
                {
                    this.txtTaskInfo.string = "??????"
                }else{
                    //??????????????????????????????
                    if(0)
                    {
                        //?????????
                        this.txtTaskInfo.string = "??????"
                    }else if(1)
                    {
                        //?????????
                        this.txtTaskInfo.string = "????????????"
                    }
                }


            }else{
                //?????????????????????
                this.tabList[NpcTabType.TASK].active = false
            }

        }

        //????????????
        if(NpcManager.instance.checkNpcTriggerEvent(this._npcConfig.type))
        {

            //???????????????????????????
            let eventData = RandomEventManager.instance.getNpcEventData(this._npcId)
            if(eventData)
            {
                //?????????????????????
                this.tabList[NpcTabType.EVENT].active = true
            }else{
                //?????????????????????
                this.tabList[NpcTabType.EVENT].active = false
            }
        }

    }

    onClickTalk()
    {
        let npcConfig = NpcConfig[this._npcId]
        //?????????id
        let dialogueId = npcConfig.descRandom[Math.floor(Math.random() * npcConfig.descRandom.length)]
        //??????npc????????????
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
            msg: "????????????"
        })
        // EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
        //     viewName: PrefabPathEnum.GiftPanel,
        //     exData: {
        //       data:null,
        //       isNpc:true
        //     }
        // })
        // EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
        //     msg: "???????????????"
        // })
    }

    onClickTask()
    {
        if(1)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "???????????????"
            })
            return
        }

        //??????????????????

        //?????????id
        let dialogueId = 1

        //??????npc????????????
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.NpcDialogView,
            exData:{
                npcId: this._npcId,
                dialogueId: dialogueId,
                callback: ()=>{
                    //xiejinhui ???????????? ???????????????????????????

                    NetManager.instance.sendMsg("reqNpcDialogueEnd",this._npcId)

                }
            }
        })
    }

    onClickHotSpring()
    {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
            msg: "???????????????"
        })
    }

    onClickEvent()
    {
        //??????npc????????????
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
        //     msg: "???????????????"
        // })
        this.onCloseView()
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.MarriageBuilding
        })
    }

    onClickWine()
    {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
            msg: "???????????????"
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