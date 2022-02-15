import PropConfig from "../../config/PropConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import BagDataManager from "../../data/BagDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StaffRecruitView extends BaseView
{
    @property(cc.Node)
    tipNode: cc.Node = null;

    @property(cc.Node)
    commonPropNode: cc.Node = null;
    @property(cc.Node)
    commonMoneyNode: cc.Node = null;
    @property(cc.Node)
    advancePropNode: cc.Node = null;
    @property(cc.Node)
    advanceMoneyNode: cc.Node = null;

    onEnable() {
        EventManager.instance.addEventListener("RecruitBrewStaffCmd_SC", this.onRecruitSuccess, this)
    }
    onDisable(): void {
        EventManager.instance.removeTargetListener(this)
    }
    start() {
        let commonPropId = Tool.getNumberParamConfig("commonRecruitProp")
        let itemProp = PropConfig[commonPropId]
        this.commonMoneyNode.getComponentInChildren(cc.Label).string = Tool.formatMoney(itemProp.price)
        let propNum = BagDataManager.instance.getItemNum(commonPropId)
        if(propNum > 0) {
            this.commonPropNode.active = true
            this.commonMoneyNode.active = false
        } else {
            this.commonPropNode.active = false
            this.commonMoneyNode.active = true
        }
        let advancePropId = Tool.getNumberParamConfig("advanceRecruitProp")
        itemProp = PropConfig[advancePropId]
        this.advanceMoneyNode.getComponentInChildren(cc.Label).string = Tool.formatMoney(itemProp.price)
        propNum = BagDataManager.instance.getItemNum(advancePropId)
        if(propNum > 0) {
            this.advancePropNode.active = true
            this.advanceMoneyNode.active = false
        } else {
            this.advancePropNode.active = false
            this.advanceMoneyNode.active = true
        }
    }
    onShowTipNode() {
        this.tipNode.active = true
    }
    onHideTipNode() {
        this.tipNode.active = false
    }
    onClickRecruit(event, recruitType) {
        recruitType = parseInt(recruitType)
        let propId = Tool.getNumberParamConfig("commonRecruitProp")
        if(recruitType == 2) {
            propId = Tool.getNumberParamConfig("advanceRecruitProp")
        }
        let propNum = BagDataManager.instance.getItemNum(propId)
        if(propNum > 0) {
            NetManager.instance.sendMsg("RecruitBrewStaffCmd_CS", {
                recruit_type: recruitType
            })
            //TODO
            EventManager.instance.dispatchEvent("RecruitBrewStaffCmd_SC", {
                staff_id: Tool.getRandomLimit(0, 9) * 5 + 36001
            })
        } else {
            let itemProp = PropConfig[propId]
            EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                content: cc.js.formatStr("是否花费%s<img src='icon_30002'/>招聘员工?", Tool.formatMoney(itemProp.price)),
                showCancel: true,
                confirmCallback: () => {
                    NetManager.instance.sendMsg("RecruitBrewStaffCmd_CS", {
                        recruit_type: recruitType
                    })
                    //TODO
                    EventManager.instance.dispatchEvent("RecruitBrewStaffCmd_SC", {
                        staff_id: Tool.getRandomLimit(0, 9) * 5 + 36001
                    })
                }
            })
        }
    }
    onRecruitSuccess(eventData) {
        if(eventData.error_code) {
            if(eventData.error_code == 1) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "zqb不足，请充值"
                })
            }
            return
        }
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "RecruitSuccess"
        })
        
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.StaffRecruitResult,
            exData: {
                staffId: eventData.staff_id
            }
        })
    }
}