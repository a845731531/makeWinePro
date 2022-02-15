import BuildingConfig from "../../../config/BuildingConfig";
import RentConfig from "../../../config/RentConfig";
import StringConfig from "../../../config/StringConfig";
import { CustomEventEnum } from "../../../Constant/CustomEventEnum";
import { BuildingType } from "../../../Constant/GameEnum";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";
import UserDataManager from "../../../data/UserDataManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import { Tool } from "../../../framework/manager/Tool";
import { NetManager } from "../../../framework/network/NetManager";
import BaseView from "../../../framework/viewbase/BaseView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingPitAdd extends BaseView {
    @property(cc.EditBox)
    idEditBox: cc.EditBox = null

    @property(cc.Node)
    detailNode: cc.Node = null
    @property(cc.Label)
    idLabel: cc.Label = null
    @property(cc.Label)
    statusLabel: cc.Label = null
    @property(cc.Label)
    descLabel: cc.Label = null

    @property(cc.Node)
    operateNode: cc.Node = null
    @property(cc.EditBox)
    monthEditBox: cc.EditBox = null
    @property(cc.Node)
    recommendParent: cc.Node = null

    @property(cc.Label)
    rentCostLabel: cc.Label = null
    @property(cc.Label)
    buyCostLabel: cc.Label = null

    private recommendMonthList: number[] = [1, 6, 12]

    private curData: any = null;

    private _state = 0

    private recommendCodeList = [];

    start() {
        super.start()
        this.detailNode.active = false
        
        let buyaCost = BuildingConfig[BuildingType.JiaoChi].price / 1000
        this.buyCostLabel.string = cc.js.formatStr("%s", buyaCost)

        let children = this.recommendParent.children
        for(let i = 0, len = children.length; i < len; i++) {
            let itemNode = children[i]
            let month = this.recommendMonthList[i]
            if(month) {
                itemNode.active = true
                itemNode.getChildByName("month").getComponent(cc.Label).string = cc.js.formatStr("%s个月", month)
            } else {
                itemNode.active = false
            }
        }

        NetManager.instance.sendMsg("IdleWorldBuildingBrewBuildingCmd_CS",{
            building_id: BuildingType.JiaoChi
        })
    }
    onEnable() {

        //获得未买的窖池列表
        EventManager.instance.addEventListener("IdleWorldBuildingBrewBuildingCmd_SC", this.onRspRecommendList, this,-1)

        //查
        EventManager.instance.addEventListener("WorldBuildingByCodeBrewBuildingCmd_SC", this.onRspQueryPit, this,-1)

        //租
        EventManager.instance.addEventListener("RentWorldBuildingBrewBuildingCmd_SC", this.onRspRent, this,-1)

        //买
        EventManager.instance.addEventListener("BuyWorldBuildingBrewBuildingCmd_SC", this.onRspRent, this,-1)
        
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
        EventManager.instance.dispatchEvent(CustomEventEnum.UPDATE_VIEW_VISIBLE, {
            viewName: "BuildingDetailBaseWine",
            visible: true,
        })
    }

    onClickPitList() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.BuildingPitList,
            exData:{
                callback: this.updatePitDetail.bind(this)
            }
        })
    }

    updatePitDetail(eventData) {
        this.curData = eventData.world_building
        if (this.curData == null) {
            this.detailNode.active = false
            return
        }
        this.detailNode.active = true

        this.idLabel.string = cc.js.formatStr("No.%s", this.curData.code)

        let descId = Tool.getRandomLimit(101, 105)
        this.descLabel.string = StringConfig[descId].string

        let userName = UserDataManager.instance.getUserName()
        this._state = (this.curData.owner_name == "" || this.curData.owner_name == null || this.curData.owner_name == undefined)? 0 : this.curData.owner_name == userName? 2 : 1 
        let statusTextList = ["可购买", "已售出", "已购买"]
        this.statusLabel.string = statusTextList[this._state]
        this.statusLabel.node.color = this._state == 0? cc.Color.GREEN : cc.Color.RED 

        this.operateNode.active = (this._state == 0)
        if(this.operateNode.active) {
            this.monthEditBox.string = "1"
            this.updateRentCost()
        }
    }

    updateRentCost() {
        let rentMonth = parseInt(this.monthEditBox.string || "0")
        if(rentMonth > 0) {
            this.rentCostLabel.node.parent.active = true
            let rentCost = RentConfig[BuildingType.JiaoChi].price / 1000
            this.rentCostLabel.string = cc.js.formatStr("%s", rentMonth * rentCost)
        } else {
            this.rentCostLabel.node.parent.active = false
        }
    }

    onEditNumEnd()
    {
        if(this.idEditBox.string != "")
        {
            let inputNum = parseInt(this.idEditBox.string)
            inputNum = Math.max(1, inputNum)
            this.idEditBox.string = "" + inputNum
        }

        if(this.monthEditBox.string != "")
        {
            let inputNum = parseInt(this.monthEditBox.string)
            inputNum = Math.max(1, inputNum)
            this.monthEditBox.string = "" + inputNum
        }
    }

    onClickQuery() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        let code = this.idEditBox.string
        if (code == "" || parseInt(code) <= 0 || parseInt(code) > 10000) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "请输入1~10000的数字进行查询"
            })
            return
        }

        //请求某个建筑信息
        NetManager.instance.sendMsg("WorldBuildingByCodeBrewBuildingCmd_CS", {
            code: code,
            building_id: BuildingType.JiaoChi
        })
    }
    onEditMonthFinish() {
        this.onEditNumEnd()
        this.updateRentCost()
    }
    onClickMonth(event, index) {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        let rentMonth = this.recommendMonthList[index]
        this.monthEditBox.string = "" + rentMonth
        this.updateRentCost()
    }
    onClickBuy() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)

        let buyaCost = BuildingConfig[BuildingType.JiaoChi].price / 1000
        let curDiamond = UserDataManager.instance.getDiamondNum()
        if(curDiamond < buyaCost)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "zqb不足!"
            })
            return
        }

        NetManager.instance.sendMsg("BuyWorldBuildingBrewBuildingCmd_CS",{
            world_building_id: this.curData.world_building_id
        })
        
    }
    onClickRent() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        let rentMonth = parseInt(this.monthEditBox.string || "0")
        if(rentMonth < 1) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "请输入租赁时间"
            })
            return
        }

        let rentCost = RentConfig[BuildingType.JiaoChi].price / 1000 * rentMonth
        let curDiamond = UserDataManager.instance.getDiamondNum()
        if(curDiamond < rentCost)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "zqb不足!"
            })
            return
        }

        NetManager.instance.sendMsg("RentWorldBuildingBrewBuildingCmd_CS",{
            world_building_id: this.curData.world_building_id,
            num: rentMonth
        })
    }

    onRspQueryPit(eventData) {
        this.updatePitDetail(eventData)
    }

    onRspRent(eventData) {

        //重新拉去一下 建筑数据
        NetManager.instance.sendMsg("BuildingListBrewBuildingCmd_CS")

        this.onCloseView()
    }

    onRspRecommendList(eventData) {
        if(eventData.error_code)
        {
            this.recommendCodeList = []
            return
        }

        this.recommendCodeList = eventData.items
        if(this.recommendCodeList.length > 0)
        {
            this.updatePitDetail({
                world_building: this.recommendCodeList[0]
            })
        }
    }
    
}