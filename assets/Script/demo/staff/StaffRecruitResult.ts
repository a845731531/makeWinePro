import PropConfig from "../../config/PropConfig";
import StaffConfig from "../../config/StaffConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
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
export default class StaffRecruitResult extends BaseView
{
    @property(StaffBaseInfo)
    baseInfo: StaffBaseInfo = null

    @property(cc.Node)
    chipNode: cc.Node = null

    @property(cc.Label)
    chipLabel: cc.Label = null

    @property(cc.Label)
    costLabel: cc.Label = null

    private staffId: number = null
    onEnable() {
        EventManager.instance.addEventListener("HireBrewStaffCmd_SC", this.onNtfAddStaff, this)
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    initByExData(exData: any): void {
        this.staffId = exData.staffId
        this.baseInfo.updateView(this.staffId)

        let itemConfig = StaffConfig[this.staffId]
        this.costLabel.string = Tool.formatMoney(itemConfig.salary)

        let sameStaff = StaffDataManager.instance.getSameStaff(this.staffId)
        if(sameStaff) {
            let chipList = Tool.convertStrToList(itemConfig.chipNum)
            this.chipNode.active = true
            this.chipLabel.string = chipList[0].num
        } else {
            this.chipNode.active = false
        }
    }
    onClickHire() {   
        NetManager.instance.sendMsg("HireBrewStaffCmd_CS", {
            staff_id: this.staffId
        })
        //TODO
        let itemConfig = StaffConfig[this.staffId]
        this.costLabel.string = Tool.formatMoney(itemConfig.salary)

        let sameStaff = StaffDataManager.instance.getSameStaff(this.staffId)
        if(sameStaff) {
            let chipList = Tool.convertStrToList(itemConfig.chipNum)
            let serverChipList = []
            for(let i = 0, len = chipList.length; i < len; i++) {
                serverChipList.push({
                    id: chipList[i].propId,
                    num: chipList[i].num
                })
            }
            EventManager.instance.dispatchEvent("HireBrewStaffCmd_SC", {
                chip_list: serverChipList
            })
        } else {
            let curTime = UserDataManager.instance.getCurTime()
            EventManager.instance.dispatchEvent("HireBrewStaffCmd_SC", {
                staff: {
                    staff_id: this.staffId,
                    contract_end_time: (curTime + 365 * 24 * 3600)
                }
            })
        }
    }
    onNtfAddStaff(serverData) {
        if(serverData.error_code) {
            if(serverData.error_code == 1) {                
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "zqb不足，请充值"
                })
            }
            return
        }
        if(serverData.chip_list) {            
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "已拥有该员工，自动转换为碎片"
            })
            let chipList = []
            for(let i = 0, len = serverData.chip_list.length; i < len; i++) {
                chipList.push({
                    propId: serverData.chip_list[i].id,
                    customNum: serverData.chip_list[i].num
                })
            }
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.CongratulationsView,
                exData:{
                    propList: chipList,
                }
            })
        } else if(serverData.staff) {  
            let itemConfig = PropConfig[serverData.staff.staff_id]          
            EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                content: cc.js.formatStr("%s加入了您的团队", itemConfig.name)
            })
        }
        this.onCloseView()
    }

}