
import BuildingConfig from "../../../config/BuildingConfig";
import StaffConfig from "../../../config/StaffConfig";
import { BuildingType } from "../../../Constant/GameEnum";
import { BuildingData } from "../../../data/DataInterface";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import { Tool } from "../../../framework/manager/Tool";
import BuildingStaffSelectNode from "../../Staff/BuildingStaffNode";
import BuildingNumSelect from "./BuildingNumSelect";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingProduceView extends cc.Component {

    @property(cc.Button)
    startBtn: cc.Button = null

    @property(cc.Sprite)
    nameSpr: cc.Sprite = null

    @property(cc.Label)
    timeLabel: cc.Label = null
    @property(cc.Label)
    timeBuffLabel: cc.Label = null
    
    @property(cc.Node)
    numSelectNode: cc.Node = null

    @property(cc.Node)
    StaffAddNode: cc.Node = null

    protected buildingData: BuildingData = null;
    protected produceNum: number = 0;
    protected produceNumIndex: number = 0;
    protected numSelect: BuildingNumSelect = null

    protected staffId: number = null

    initByExData(exData) {
        this.buildingData = exData.buildingData
        this.staffId = this.buildingData.staffId
        let itemConfig = BuildingConfig[this.buildingData.buildingType]
        let nameFrameName = cc.js.formatStr("texture/building/building_name_%s", this.buildingData.buildingType)
        Tool.loadSpriteFrame(nameFrameName, this.nameSpr)
        
        this.updateView()
        this.updateStaffView()
    }
    onEnable() {
        // if(this.buildingData) {
        //     this.updateView()
        // }
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    onDestroy() {
        EventManager.instance.removeTargetListener(this)
    }
    start() {    
        this.numSelect = this.numSelectNode.getComponent(BuildingNumSelect)
        this.numSelect.setSelectBack(this.onChangeProduceNum.bind(this))
        this.numSelect.setBuildingId(this.buildingData.buildingType)
        // this.updateView()
    }
    updateView() {

    }
    updateStaffView()
    {
        if(this.StaffAddNode)
        {
            this.StaffAddNode.getComponent(BuildingStaffSelectNode).updateView({
                buildingData: this.buildingData,
            })
        }
    }
    getTimeBuff() {
        let itemStaff = StaffConfig[this.staffId]
        if(!itemStaff) {
            return 0
        }
        switch(this.buildingData.buildingType) {
            case BuildingType.Farm:
                return itemStaff.farmSpeed
            case BuildingType.ZhiQu:
                return itemStaff.zhiquSpeed
            case BuildingType.Water:
                return itemStaff.farmSpeed
            case BuildingType.KaoJiu:
                return itemStaff.kaojiuSpeed
            case BuildingType.Wine:
                return itemStaff.wineSpeed
            default:
                return 0
        }
    }
    addStaff(staffId)
    {
        this.staffId = staffId
        let buffNum = this.getTimeBuff()
        if(this.timeBuffLabel) {
            if(buffNum > 0) {
                this.timeBuffLabel.node.active = true
                this.timeBuffLabel.string = cc.js.formatStr("-%s%", buffNum)
            } else {
                this.timeBuffLabel.node.active = false
            }
        }
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "BuildingAddStaff",
            param: cc.js.formatStr("%s|%s|%s", this.buildingData.buildingType, this.buildingData.buildingIndex, this.staffId)
        })
        
        this.updateStaffView()
    }

    updateProduceTime(needTime) {
        this.timeLabel.string = cc.js.formatStr("%s", Tool.formatTime(needTime))
    }
    onChangeProduceNum(num, index) {
        this.produceNum = num
        this.produceNumIndex = index
        this.updateView()
    }
    getProduceNum() {
        return this.produceNum
    }
    getStaffId()
    {
        return this.staffId
    }
    onClickStart() {
    }
}
