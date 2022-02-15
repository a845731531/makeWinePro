import { SexType } from "../../Constant/GameEnum";
import UserDataManager from "../../data/UserDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CreateRole extends BaseView {
    @property(cc.EditBox)
    nameEdit: cc.EditBox = null
    @property(cc.Sprite)
    roleSpr: cc.Sprite = null
    @property(cc.Label)
    clothesLabel: cc.Label = null

    private selectSex: SexType = SexType.Man;
    private selectTalent = 1
    private clothesStrs: string[] = ["默认", "中国风", "休闲"]

    protected onEnable(): void {        
        EventManager.instance.addEventListener("stCheckNameSelectUserCmd", this.onRspCheckName, this)
        EventManager.instance.addEventListener("stLoginStepSelectUserCmd", this.onRspLoginStep, this)
    }
    protected onDisable(): void {
        EventManager.instance.removeTargetListener(this)
    }
    onSelectSex(toggle, index) {
        this.selectSex = parseInt(index)
        let frameName = cc.js.formatStr("texture/staff/role_icon_%s", this.selectSex)
        Tool.loadSpriteFrame(frameName, this.roleSpr)
    }
    onSelectClothes(toggle, index) {
        index = parseInt(index)
        this.clothesLabel.string = this.clothesStrs[index]
    }
    onSelectTalent(toggle, index) {

    }
    onNameEditEnd() {
        // NetManager.instance.sendMsg("stCheckNameSelectUserCmd", {
        //     name: "" + this.nameEdit.string,
        // })
    }
    onClickCreate() {
        if(this.nameEdit.string == "") {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "请输入用户昵称"
            })
            return
        }
        NetManager.instance.sendMsg("stCheckNameSelectUserCmd", {
            name: "" + this.nameEdit.string,
        })
    }
    startCreate(name) {
        NetManager.instance.sendMsg("stCreateSelectUserCmd", {
            strUserName: name,
            type: this.selectTalent,
            country: 3,
            wdFace: this.selectSex,
            dwMarket: ""
        })
    }
    onRspCheckName(eventData) {
        if(!eventData.err_code) {
            this.startCreate(eventData.name)       
        } else if (eventData.err_code == 1) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "名字重复"
            })
        } else if (eventData.err_code == 2) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "名字包含非法字符"
            })
        }
    }
    onRspLoginStep(eventData: any) {
        if(eventData.step == 6) {            
            cc.director.loadScene("HallScene", () => {
                this.onCloseView()
            })
        }
    }
}