import PropConfig from "../../config/PropConfig";
import StaffConfig from "../../config/StaffConfig";
import { BuildingType } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import BagDataManager from "../../data/BagDataManager";
import BuildingDataManager from "../../data/BuildingDataManager";
import { BuildingData } from "../../data/DataInterface";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingStaffNode extends cc.Component {

    @property(cc.Node)
    addNode: cc.Node = null;

    @property(cc.Node)
    staffNode: cc.Node = null;
    @property(cc.Sprite)
    staffIcon: cc.Sprite = null;
    @property(cc.RichText)
    descLabel: cc.RichText = null;

    private _callback = null
    private _staffId = null
    private _buildingData: BuildingData = null

    private abilityKeyList = {
        [1]: "farmSpeed", 
        [3]: "zhiquSpeed", 
        [8]: "kaojiuSpeed", 
        [7]: "wineSuccess",
        [6]: "wineSpeed"
    }
    private abilityDescList = {
        [1]: "%s,%s,种植加速+%s%", 
        [3]: "%s,%s,制曲加速+%s%", 
        [8]: "%s,%s,烤酒加速+%s", 
        [7]: "%s,%s,高品质配方研究几率+%s%",
        [6]: "%s,%s,酿酒速度+%s%"
    }

    start()
    {
        this.addListener()
    }

    addListener()
    {
        EventManager.instance.addEventListener("StaffWorkOnBrewBuildingCmd_SC", this.onStaffWork, this)
    }

    updateView(param)
    {
        if(param)
        {
            this._buildingData = param.buildingData
            this._staffId = this._buildingData.staffId

            if(this._staffId)
            {
                this.addNode.active = false
                this.staffNode.active = true

                let itemStaff = StaffConfig[this._staffId]    
                let itemProp = PropConfig[this._staffId]            
                let frameName = BagDataManager.instance.getItemIconById(this._staffId)
                Tool.loadSpriteFrame(frameName, this.staffIcon)
                let buildingType = this._buildingData.buildingType
                let ability = itemStaff[this.abilityKeyList[buildingType]]
                let desc = cc.js.formatStr(this.abilityDescList[buildingType], itemProp.name, itemStaff.briefText, Math.floor(ability / 100))
                this.descLabel.string = desc
            }else{
                this.addNode.active = true
                this.staffNode.active = false
                let desc = "添加员工，据说可以<color=yellow>减少生产时间</color>哦"
                if(this._buildingData.buildingType == BuildingType.Laborary) {
                    desc = "添加员工，据说可以<color=yellow>有几率提高配方品质</color>哦"
                }
                this.descLabel.string = desc
            }
        }
    }

    onClickAddStaff() {
        if(this._buildingData)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.BuildingStaffSelectView,
                exData:{
                    staffId: this._staffId,
                    buildingData: this._buildingData,
                    callback: this.addStaff.bind(this)
                }
            })
        }
    }

    addStaff(curStaffId)
    {
        //正在生产需要请求服务器更换员工   换岗请求
        NetManager.instance.sendMsg("StaffWorkOnBrewBuildingCmd_CS", {
            building_id: this._buildingData.buildingType,
            building_index: this._buildingData.buildingIndex,
            staff_id: curStaffId
        })

        //TODO
        this._buildingData.staffId = curStaffId
        EventManager.instance.dispatchEvent("StaffWorkOnBrewBuildingCmd_SC",{
            building_data: this._buildingData
        })
    }
    onStaffWork(serverData) {
        if(serverData.error_code) {
            return
        }
        this._buildingData = BuildingDataManager.instance.getBuildingData(this._buildingData.buildingType, this._buildingData.buildingIndex)
        this.updateView({
            buildingData: this._buildingData
        })
    }
    removeListener()
    {
        EventManager.instance.removeTargetListener(this)
    }

    onDestroy() {
        this.removeListener()
    }
}
