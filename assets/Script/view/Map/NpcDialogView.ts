import DialogueConfig from "../../config/DialogueConfig";
import NpcConfig from "../../config/NpcConfig";
import NpcManager from "../../data/npc/NpcManager";
import UserDataManager from "../../data/UserDataManager";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NpcDialogView extends BaseView {

    @property(cc.Sprite)
    npcIcon: cc.Sprite = null;

    @property(cc.Label)
    npcName: cc.Label = null;

    @property(cc.Sprite)
    playerIcon: cc.Sprite = null;

    @property(cc.Label)
    playerName: cc.Label = null;

    @property(cc.Node)
    npcNode: cc.Node = null;

    @property(cc.Node)
    playerNode: cc.Node = null;

    @property(cc.Label)
    desc: cc.Label = null;

    private _originalNpcId = 0
    private _dialogueId = -1
    private _npcId = 0
    private _curStepId = 0
    private _curConfig = null

    private _callback = null

    onLoad()
    {
        this.addListener()
    }

    addListener()
    {

    }

    initByExData(param)
    {
        this._originalNpcId = param.npcId
        this._dialogueId = param.dialogueId
        this._callback = param.callback
        this.updateDialogue()
    }

    updateDialogue()
    {
        this._curStepId++

        let id = this._dialogueId * 10000 + this._curStepId
        this._curConfig = DialogueConfig[id]

        if(this._curConfig)
        {
            this._npcId = this._curConfig.npcId
            if(this._npcId != 0)
            {
                //xiejinhui test
                Tool.loadSpriteFrame(cc.js.formatStr("texture/npc/npc_%s",NpcConfig[this._npcId].icon),this.npcIcon)

                this.npcName.string = NpcConfig[this._npcId].name
            }
     
            let userName = UserDataManager.instance.getUserName()
            this.desc.string = Tool.replaceUserName(this._curConfig.desc ,userName)

            this.playerName.string = "我"
            this.npcNode.active = this._npcId != 0
            this.playerNode.active = this._npcId == 0
        }else{
            this._callback && this._callback()
            this.onCloseView()
        }

    }

    onClickNext()
    {
        this.updateDialogue()
    }

    onCloseView()
    {
        super.onCloseView()
    }

    removeListener()
    {

    }

    onDestroy()
    {
        NpcManager.instance.setNpcCanMove(this._originalNpcId,true)
        this.removeListener()
    }

    
}