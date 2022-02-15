import { Config } from "../../Constant/Config";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { MoneyPropId } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import UserDataManager from "../../data/UserDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PersonInfoNode extends cc.Component {
    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    moneyLabel: cc.Label = null;

    @property(cc.Sprite)
    iconSpr: cc.Sprite = null;

    private guideChargeNum = 0

    onLoad() {
        EventManager.instance.addEventListener(CustomEventEnum.UPDATE_TOP_VIEW_VISIBLE, this.onTopViewVisible, this)
        EventManager.instance.addEventListener(CustomEventEnum.DIAMOND_NUM_CHANGED, this.onMoneyChanged, this)
        EventManager.instance.addEventListener("TestAddMoneyBrewUserCmd_SC", this.onTestAddMoneyResult, this)
        EventManager.instance.addEventListener("GuideTestAddMoney", this.onTestAddMoney, this)
        
        this.node.active = false
    }
    start() {
        let curDiamond = UserDataManager.instance.getDiamondNum()
        this.moneyLabel.string = (curDiamond / 1000).toString()

        this.nameLabel.string = UserDataManager.instance.getUserName()
        let sex = UserDataManager.instance.getSex()
        let frameName = cc.js.formatStr("texture/staff/role_icon_%s", sex)
        Tool.loadSpriteFrame(frameName, this.iconSpr)
    }
    onDestroy() {
        EventManager.instance.removeTargetListener(this)
    }

    onMoneyChanged() {
        let curDiamond = UserDataManager.instance.getDiamondNum()
        this.moneyLabel.string = (curDiamond / 1000).toString()
    }
    onTopViewVisible(visible) {
        this.node.active = visible
    }

    onClickMoney() {
        if(Config.IsTestModel) {
            NetManager.instance.sendMsg("TestAddMoneyBrewUserCmd_CS", {
                money: 100000000
            })
        }
    }
    onTestAddMoney(chargeNum) {
        if(Config.IsTestModel) {
            this.guideChargeNum = parseFloat(chargeNum)
            NetManager.instance.sendMsg("TestAddMoneyBrewUserCmd_CS", {
                money: this.guideChargeNum
            })
        }
    }
    onTestAddMoneyResult(eventData) {
        if(Config.IsTestModel) {
            if(this.guideChargeNum > 0) {
                EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                    type: "ChargeSuccess"
                })
                this.guideChargeNum = 0
            } else {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                    content: "您充值的zqb已到账"
                })        
            } 
        }        
    }
}