import NpcConfig from "../../config/NpcConfig";
import RandomEventConfig from "../../config/RandomEventConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { NpcType, SexType } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import NpcManager from "../../data/npc/NpcManager";
import RandomEventManager from "../../data/npc/RandomEventManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import GuideManager from "../../framework/guide/GuideManager";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import NpcMove from "./NpcMove";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NpcRole extends cc.Component {

    @property(cc.Label)
    npcName: cc.Label = null

    @property(cc.Label)
    playerName: cc.Label = null

    @property(cc.Sprite)
    tagIcon: cc.Sprite = null

    @property(cc.Node)
    eventClickNode: cc.Node = null

    private _playerData = null
    private _npcId = null
    private _npcConfig = null

    onLoad() {
    }

    addListener() {

        if(NpcManager.instance.checkNpcTriggerEvent(this._npcConfig.type) || NpcManager.instance.checkNpcTriggerTask(this._npcConfig.type))
        {
            EventManager.instance.addEventListener(CustomEventEnum.RANDOM_EVENT_UPDTAE,this.updateTag,this)
        }
    }

    updateNpcView(npcId, progress = 0) {
        this._playerData = null
        this._npcId = npcId
        this._npcConfig = NpcConfig[this._npcId]
        GuideManager.instance.registerGuideNode(cc.js.formatStr("NpcRole_%s", this._npcId), this.node)

        this.playerName.node.active = false
        this.npcName.node.active = true
        this.npcName.string = this._npcConfig.name
        this.npcName.node.color = cc.Color.YELLOW

        let modelId = this._npcConfig.modelId
        this.node.getComponent(NpcMove).initNpc(npcId, modelId, progress)

        this.updateTag()

        this.addListener()
    }

    updatePlayerView(playerData, npcId, progress = 0) {
        this._playerData = playerData
        this._npcId = npcId
        this._npcConfig = NpcConfig[this._npcId]

        this.playerName.node.active = true
        this.npcName.node.active = false
        this.playerName.string = playerData.name + ""
        this.playerName.node.color = cc.Color.WHITE

        let modelId = playerData.face == SexType.Man ? 1 : 2
        this.node.getComponent(NpcMove).initNpc(npcId, modelId, progress)

        this.updateTag()

        this.addListener()
    }

    updateTag() {
        this.tagIcon.node.active = false
        this.eventClickNode.active = false

        //除了玩家、事件、动物外  都可以触发任务
        if(NpcManager.instance.checkNpcTriggerTask(this._npcConfig.type))
        {
            //判断当前npc是否处于任务进程
            if (0) {
                //处于任务进程中
                this.tagIcon.node.active = true

                Tool.loadSpriteFrame("texture/hall/bubble_task",this.tagIcon)
    
                //任务类型  是否为对话任务
                if (1) {
                    // 对话任务直接为领取奖励状态
    
                } else {
                    //判断任务当前完成情况
                    if (1) {
                        //未完成
                    } else if (2) {
                        //进行中
                    } else {
                        //已完成
                    }
                }
    
            } else {
                //不在任务进程中
                this.tagIcon.node.active = false
            }
        }
        
        if(NpcManager.instance.checkNpcTriggerEvent(this._npcConfig.type))
        {
            //是否为随机事件状态
            let eventData = RandomEventManager.instance.getNpcEventData(this._npcId)
            if(eventData)
            {
                //处于随机事件中
                this.tagIcon.node.active = true
                Tool.loadSpriteFrame("texture/hall/bubble_event",this.tagIcon)

                //随机事件  气泡有额外的对话
                let eventId = eventData.id
                if(RandomEventConfig[eventId].bubbleDesc != "")
                {
                    this.eventClickNode.active = true
                }

            }else{
                //不处于随机事件
                this.tagIcon.node.active = false
            }
        }
    }

    onClickNpc(event) {

        if(event)
        {
            let endPos = event.getLocation()
            let startPos = event.getStartLocation()
            if (cc.Vec2.distance(endPos, startPos) > 20) {
                return
            }
        }

        if (this._playerData) {
            //展示玩家信息面板
            
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.CheckInfo,
                exData: this._playerData
            })
        } else {
            //展示npc信息界面
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.NpcTabInfoView,
                exData: {
                    npcId: this._npcId
                }
            })
        }
    }

    onClickBubble(event)
    {
        
        if(event)
        {
            let endPos = event.getLocation()
            let startPos = event.getStartLocation()
            if (cc.Vec2.distance(endPos, startPos) > 20) {
                return
            }
        }

        //展示npc对话界面
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.RandomEventView,
            exData:{
                npcId: this._npcId,
                useBubbleDesc: true,
                callback: null
            }
        })

    }

    removeListener() {
        EventManager.instance.removeTargetListener(this)
    }

    onDestroy() {
        this.removeListener()
    }
}