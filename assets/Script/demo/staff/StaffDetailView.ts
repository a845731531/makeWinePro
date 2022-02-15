import PropConfig from "../../config/PropConfig";
import StaffConfig from "../../config/StaffConfig";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import BagDataManager from "../../data/BagDataManager";
import BuildingDataManager from "../../data/BuildingDataManager";
import { StaffData } from "../../data/DataInterface";
import StaffDataManager from "../../data/StaffDataManager";
import UserDataManager from "../../data/UserDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";
import StaffBaseInfo from "./StaffBaseInfo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StaffDetailView extends BaseView
{
    @property(StaffBaseInfo)
    baseInfo: StaffBaseInfo = null
    
    @property(cc.Label)
    riseCostLabel: cc.Label = null
    @property(cc.Label)
    tipLabel: cc.Label = null
    @property(cc.Label)
    hireCostLabel: cc.Label = null
    
    @property(cc.Node)
    riseNode: cc.Node = null
    @property(cc.Node)
    btnHire: cc.Node = null
    @property(cc.Node)
    btnRecruit: cc.Node = null

    private curData: StaffData = null

    initByExData(exData) {
        this.curData = exData.staffData

        this.updateView()
    }
    onEnable() {
        EventManager.instance.addEventListener("RenewalBrewStaffCmd_SC", this.onRenewalStaff, this)
        EventManager.instance.addEventListener("RiseStarBrewStaffCmd_SC", this.onRiseStarStaff, this)    
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    updateView() {
        this.baseInfo.updateView(this.curData.staffId)
        if(this.curData.contractEndTime == 0) { //未拥有
            this.riseNode.active = false
            this.btnHire.active = false
            this.btnRecruit.active = true
            this.tipLabel.string = "尚未拥有"
            return
        }
        let staffId = this.curData.staffId
        let itemStaff = StaffConfig[staffId]

        this.btnHire.active = true
        this.btnRecruit.active = false

        this.hireCostLabel.string = Tool.formatMoney(itemStaff.salary)
        let curTime = UserDataManager.instance.getCurTime()
        if(curTime >= this.curData.contractEndTime) {
            this.tipLabel.string = "合同已到期"
        } else {
            let remainTime = this.curData.contractEndTime - curTime
            let daySeconds = 3600 * 24
            let yearSecond = daySeconds * 365
            if(remainTime < daySeconds) {
                this.tipLabel.string = "合同剩余时间: 1天"
            } else if (remainTime < yearSecond) {
                this.tipLabel.string = cc.js.formatStr("合同剩余时间: %s天", Math.floor(remainTime / daySeconds))
            } else {
                let year = Math.floor(remainTime / yearSecond)
                let remainDay = Math.floor((remainTime - year * yearSecond) / daySeconds)
                if(remainDay > 0) {
                    this.tipLabel.string = cc.js.formatStr("合同剩余时间: %s年%s天", year, remainDay)
                } else {
                    this.tipLabel.string = cc.js.formatStr("合同剩余时间: %s年", year)
                }
            }
        }
        if(itemStaff.nextStaffId == 0) {
            this.riseNode.active = false
        } else {
            this.riseNode.active = true
            let costList = Tool.convertStrToList(itemStaff.riseStarNeed)
            let costData = costList[0]
            let curNum = BagDataManager.instance.getItemNum(costData.propId)
            let needNum = costData.num
            this.riseCostLabel.string = cc.js.formatStr("%s/%s", curNum, needNum)
            this.riseCostLabel.node.color = (curNum >= needNum) ? cc.Color.GREEN : cc.Color.RED
        }
    }

    onClickRise() {
        NetManager.instance.sendMsg("RiseStarBrewStaffCmd_CS", {
            staff_id: this.curData.staffId
        })
        //TODO
        let itemStaff = StaffConfig[this.curData.staffId]
        if(itemStaff.nextStaffId == 0) {
            EventManager.instance.dispatchEvent("RiseStarBrewStaffCmd_SC", {
                error_code: 2,
            })
        } else {
            EventManager.instance.dispatchEvent("RiseStarBrewStaffCmd_SC", {
                staff: {
                    staff_id: itemStaff.nextStaffId,
                    contract_end_time: this.curData.contractEndTime
                }
            })
        }
    }
    onClickRecruit() {
        EventManager.instance.dispatchEvent(EventEnum.CLOSE_ALL_POPUP)
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.StaffRecruitView
        })
    }
    onClickHire() {
        let staffId = this.curData.staffId
        let itemStaff = StaffConfig[staffId]
        let itemProp = PropConfig[staffId]
        
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: cc.js.formatStr("是否花费%s<img src='icon_30002'/>与%s续签一年合同?", Tool.formatMoney(itemStaff.salary), itemProp.name),
            showCancel: true,
            confirmCallback: () => {
                NetManager.instance.sendMsg("RenewalBrewStaffCmd_CS", {
                    staff_id: staffId
                })
                //TODO                
                let curTime = UserDataManager.instance.getCurTime()
                let startTime = Math.max(curTime, this.curData.contractEndTime)
                EventManager.instance.dispatchEvent("RenewalBrewStaffCmd_SC", {
                    staff: {
                        staff_id: staffId,
                        contract_end_time: (startTime + 365 * 24 * 3600)
                    }
                })
            }
        })
    }
    onRenewalStaff(serverData) {
        if(serverData.error_code) {
            if(serverData.error_code == 1) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "zqb不足，请充值"
                })
            }
            return
        }
        if(serverData.staff?.staff_id == this.curData.staffId) {
            this.curData = StaffDataManager.instance.getStaffData(this.curData.staffId)
            this.updateView()
        }
    }
    onRiseStarStaff(serverData) {
        if(serverData.error_code) {
            if(serverData.error_code == 1) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "碎片不足"
                })
            } else if (serverData.error_code == 2) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "员工已是最高星级"
                })
            }
            return
        }
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "升星成功"
        })
        this.curData = StaffDataManager.instance.getSameStaff(this.curData.staffId)
        this.updateView()
    }
    
}