import StaffConfig from "../config/StaffConfig";
import { BuildingType } from "../Constant/GameEnum";
import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
import BaseDataManager from "./BaseDataManager";
import BuildingDataManager from "./BuildingDataManager";
import { StaffData } from "./DataInterface";


export default class StaffDataManager extends BaseDataManager {
    private static _instance: StaffDataManager = null;
    private staffList: StaffData[];   //拥有的配方列表

    public static get instance(): StaffDataManager {
        if (this._instance == null) {
            this._instance = new StaffDataManager();
        }
        return this._instance;
    }
    constructor() {
        super()
        
        this.staffList = JSON.parse(cc.sys.localStorage.getItem("StaffList") || "[]")

        this.reset();
        this.addNetListener();
    }

    reset() {
        EventManager.instance.removeTargetListener(this);
    }
    addNetListener() {
        EventManager.instance.addEventListener("HireBrewStaffCmd_SC", this.onRspHireStaff, this, -1)
        EventManager.instance.addEventListener("RenewalBrewStaffCmd_SC", this.onUpdateStaff, this, -1)   
        EventManager.instance.addEventListener("RiseStarBrewStaffCmd_SC", this.onRiseStarStaff, this, -1)         
    }


    getStaffList() {
        return this.staffList;
    }
    getUnOwnedStaffList() {
        let ownedBaseStaffSet = new Set()
        for (let i = 0; i < this.staffList.length; i++) {
            let itemStaff = this.staffList[i];
            let itemConfig = StaffConfig[itemStaff.staffId]
            ownedBaseStaffSet.add(itemConfig.baseStaff)
        }
        let unownedList: StaffData[] = []
        for(let staffId in StaffConfig) {
            let itemStaff = StaffConfig[staffId]
            if(ownedBaseStaffSet.has(itemStaff.baseStaff)) {
                continue
            } else if(itemStaff.nextStaffId == 0) {
                unownedList.push({
                    staffId: itemStaff.staffId,
                    contractEndTime: 0,
                })
            }
        }
        return unownedList
    }

    getSameStaff(staffId) {
        let targetConfig = StaffConfig[staffId]
        let baseStaffId =  targetConfig.baseStaff
        for (let i = 0; i < this.staffList.length; i++) {
            let itemStaff = this.staffList[i];
            let itemConfig = StaffConfig[itemStaff.staffId]
            if(itemConfig.baseStaff == baseStaffId) {
                return itemStaff
            }
        }
    }
    getStaffData(staffId) {
        for (let i = 0; i < this.staffList.length; i++) {
            let itemStaff = this.staffList[i];
            if (itemStaff.staffId == staffId) {
                return itemStaff
            }
        }
    }

    getStaffListByBuildingType(buildingType: BuildingType)
    {   
        if(this.staffList.length == 0)
        {
            return []
        }
        let list = Tool.deepCopy(this.staffList)
        list.sort((a,b)=>{
            let aWorking = BuildingDataManager.instance.checkStaffIsWorking(a.staffId)
            let bWorking = BuildingDataManager.instance.checkStaffIsWorking(b.staffId)
            if(aWorking == bWorking)
            {
                if(buildingType == BuildingType.Farm || BuildingType.Water)
                {
                    return StaffConfig[b.staffId].farmSpeed - StaffConfig[a.staffId].farmSpeed
                }else if(buildingType == BuildingType.KaoJiu || BuildingType.JiaoChi)
                {
                    return StaffConfig[b.staffId].zhiquSpeed - StaffConfig[a.staffId].zhiquSpeed
                }else if(buildingType == BuildingType.ZhiQu)
                {
                    return StaffConfig[b.staffId].farmSpeed - StaffConfig[a.staffId].farmSpeed
                }else if(buildingType == BuildingType.Wine)
                {
                    return StaffConfig[b.staffId].wineSpeed - StaffConfig[a.staffId].wineSpeed
                }
            }else{
                if(bWorking)
                {
                    return -1
                }else{
                    return 1
                }
            }
        })
        return list
    }

    onRspHireStaff(serverData) {
        if(serverData.error_code) {
            return
        }
        if(serverData.staff) {
            this.staffList.push({
                staffId: serverData.staff.staff_id,
                contractEndTime: serverData.staff.contract_end_time
            })
            cc.sys.localStorage.setItem("StaffList", JSON.stringify(this.staffList))
        }
    }
    onUpdateStaff(serverData) {
        if(serverData.error_code) {
            return
        }
        if(serverData.staff) {
            let staffId = serverData.staff.staff_id
            for(let i = 0, len = this.staffList.length; i < len; i++) {
                let itemData = this.staffList[i]
                if(itemData.staffId == staffId) {
                    itemData.contractEndTime = serverData.staff.contract_end_time
                    cc.sys.localStorage.setItem("StaffList", JSON.stringify(this.staffList))
                }
            }
        }
    }
    onRiseStarStaff(serverData) {
        if(serverData.error_code) {
            return
        }
        if(serverData.staff) {
            let staffId = serverData.staff.staff_id
            let oldStaff = this.getSameStaff(staffId)
            if(oldStaff) {
                oldStaff.staffId = staffId
                oldStaff.contractEndTime = serverData.staff.contract_end_time
                cc.sys.localStorage.setItem("StaffList", JSON.stringify(this.staffList))
            }
        }
    }
    
}