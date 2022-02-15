import NpcConfig from "../../config/NpcConfig";
import RandomEventConfig from "../../config/RandomEventConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { JumpType } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import JumpManager from "../../data/JumpManager";
import NpcManager from "../../data/npc/NpcManager";
import RandomEventManager from "../../data/npc/RandomEventManager";
import UserDataManager from "../../data/UserDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RandomEventView extends BaseView {

    @property(cc.Sprite)
    npcIcon: cc.Sprite = null;

    @property(cc.Label)
    npcName: cc.Label = null;

    @property(cc.Node)
    btnJump: cc.Node = null;

    @property(cc.Node)
    btnKnow: cc.Node = null;

    @property(cc.Node)
    btnConfirm: cc.Node = null;

    @property(cc.Node)
    btnOption1: cc.Node = null;

    @property(cc.Node)
    btnOption2: cc.Node = null;

    @property(cc.Label)
    txtOption1: cc.Label = null;

    @property(cc.Label)
    txtOption2: cc.Label = null;

    @property(cc.Label)
    desc: cc.Label = null;

    private _npcId = 0

    //是否优先使用气泡描述
    private _useBubbleDesc = false

    private _callback = null

    private _eventConfig = null

    private _eventData = null

    private _propList = []

    onLoad()
    {
        this.addListener()
    }

    addListener()
    {
        EventManager.instance.addEventListener(CustomEventEnum.RANDOM_EVENT_OPTION_RESULT,this.showResult,this)
    }

    initByExData(param)
    {
        this._npcId = param.npcId
        this._useBubbleDesc = param.useBubbleDesc || false
        this._callback = param.callback
        this.updateDialogue()
    }

    updateDialogue()
    {
        this._eventData = RandomEventManager.instance.getNpcEventData(this._npcId)
        if(this._eventData)
        {
            //xiejinhui test
            Tool.loadSpriteFrame(cc.js.formatStr("texture/npc/npc_%s",NpcConfig[this._npcId].icon ),this.npcIcon)
    
            this.npcName.string = NpcConfig[this._npcId].name

            this._eventConfig = RandomEventConfig[this._eventData.id]

            let userName = UserDataManager.instance.getUserName()
            if(this._useBubbleDesc && this._eventConfig.bubbleDesc != "")
            {
                this.desc.string = Tool.replaceUserName(this._eventConfig.bubbleDesc ,userName)
            }else{
                this.desc.string = Tool.replaceUserName(this._eventConfig.desc ,userName)
            }


            this.btnConfirm.active = false

            if(this._eventData.type == 1)
            {
                // this.btnJump.active = true
                //xiejinhui TODO 跳转到指定npc没有配置
                this.btnJump.active = this._eventConfig.jumpType != JumpType.NPC && this._eventConfig.jumpType != JumpType.Party
                    && this._eventConfig.jumpType != JumpType.News

                this.btnKnow.active = !this.btnJump.active

                this.btnOption1.active = false
                this.btnOption2.active = false
            }else{
                this.btnJump.active = false
                this.btnOption1.active = true
                this.btnOption2.active = true

                this.txtOption1.string = this._eventConfig.option1

                this.txtOption2.string = this._eventConfig.option2

            }

        }else{
            this.onCloseView()
        }

    }

    showResult(param)
    {   
        let eventData = param.eventData
        this._propList = param.propList
        if(this._eventData.id == eventData.id)
        {
            this._eventData = eventData
            this._eventConfig = RandomEventConfig[eventData.id]

            let userName = UserDataManager.instance.getUserName()

            if(this._eventConfig.type == 2 && this._eventData.state == 1)
            {
                //奖惩事件
                switch(this._eventData.result)
                {
                    case 1:
                        this.desc.string = Tool.replaceUserName(this._eventConfig.success_desc_1 ,userName)
                        break
                    case 2:
                        this.desc.string = Tool.replaceUserName(this._eventConfig.fail_desc_1 ,userName)
                        break
                    case 3:
                        this.desc.string = Tool.replaceUserName(this._eventConfig.success_desc_2 ,userName)
                        break
                    case 4:
                        this.desc.string = Tool.replaceUserName(this._eventConfig.fail_desc_2 ,userName)
                        break
                }

                this.btnConfirm.active = true
                this.btnOption1.active = false
                this.btnOption2.active = false
            }
            return
        }
        
        this.onCloseView()
    }

    onClickOption1()
    {
        //TODO xiejinhui
        NetManager.instance.sendMsg("reqRandomEventSelectOption",{
            id: this._eventData.id,
            option: 1
        })
        EventManager.instance.dispatchEvent("reqRandomEventSelectOption",{
            data:{
                id: this._eventData.id,
                option: 1
            }
        })
    }

    onClickOption2()
    {
        //TODO xiejinhui
        NetManager.instance.sendMsg("reqRandomEventSelectOption",{
            id: this._eventData.id,
            option: 2
        })
        EventManager.instance.dispatchEvent("reqRandomEventSelectOption",{
            data:{
                id: this._eventData.id,
                option: 2
            }
        })
    }

    onClickJump()
    {
        this.removeListener()
        if(this._eventData.type == 1)
        {
            //TODO xiejinhui
            //如果为跳转事件的话 就请求结束该随机事件
            NetManager.instance.sendMsg("reqRandomEventCompelete",{
                id: this._eventData.id
            })
            EventManager.instance.dispatchEvent("reqRandomEventCompelete",{
                data:{
                    id: this._eventData.id
                }
            })
        }

        JumpManager.instance.jumpViewByType(this._eventConfig.jumpType)
        
        this.onCloseView()
    }

    removeListener()
    {
        EventManager.instance.removeTargetListener(this)
    }

    onDestroy()
    {
        this._callback && this._callback()
        this.removeListener()

        NpcManager.instance.setNpcCanMove(this._npcId,true)

        //恭喜获得界面
        if(this._propList.length > 0)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.CongratulationsView,
                exData:{
                    propList: this._propList,
                    closeBack: () => {}
                }
            })
        }
    }

    
}