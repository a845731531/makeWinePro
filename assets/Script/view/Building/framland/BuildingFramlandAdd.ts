import BuildingConfig from "../../../config/BuildingConfig";
import StringConfig from "../../../config/StringConfig";
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
export default class BuildingFramlandAdd extends BaseView {
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
    recommendParent: cc.Node = null

    @property(cc.Label)
    buyCostLabel: cc.Label = null

    @property(cc.Button)
    buyBtn: cc.Button = null

    // optional string 	code              = 1;  //编号
    // optional int32 		building_id       = 2;  //建筑类型
    // optional string 	owner_name 	      = 3;	//主人名
    // optional int32 		world_building_id = 4;  //id
    private recommendCodeList = []

    private recommendItemList: cc.Node[] = []

    private curData: any = null;
    private _state = 2

    start() {
        super.start()
        this.detailNode.active = false

        let price = BuildingConfig[BuildingType.Farm].price
        this.buyCostLabel.string = price / 1000 + ""

        this.recommendItemList = []
        for (let i = 0; i < 3; i++) {
            let itemNode = this.recommendParent.getChildByName("btn_id" + (i + 1))
            itemNode.active = false
            this.recommendItemList.push(itemNode)
        }

        this.onReqRecommendId()
    }

    onLoad()
    {
        this.addListener()
    }

    addListener() {
        EventManager.instance.addEventListener("IdleWorldBuildingBrewBuildingCmd_SC", this.onRspRecommendList, this, -1)

        EventManager.instance.addEventListener("BuyWorldBuildingBrewBuildingCmd_SC", this.onRspBuyFramland, this)

        EventManager.instance.addEventListener("WorldBuildingByCodeBrewBuildingCmd_SC", this.onRspQueryFramland, this)

    }

    onClickFramlandList() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.BuildingFramlandList,
            exData:{
                callback: this.updateFramlandDetail.bind(this)
            }
        })
    }

    updateRecommendDetail() {
        let len = Math.min(this.recommendCodeList.length,3)
        if(len > 0)
        {
            this.recommendParent.active = true
            for (let i = 0; i < len; i++) {
                this.recommendItemList[i].active = true
                this.recommendItemList[i].getChildByName("position").getComponent(cc.Label).string = cc.js.formatStr("No.%s", this.recommendCodeList[i].code)
            }

            this.onClickIdItem(null,0)
        }
    }

    updateFramlandDetail(serverData) {
        this.curData = serverData.world_building
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

        //可购买  才能点击按钮
        this.buyBtn.interactable = this._state == 0
    }

    onEditNumEnd()
    {
        if(this.idEditBox.string != "")
        {
            let inputNum = parseInt(this.idEditBox.string)
            inputNum = Math.max(1, inputNum)
            this.idEditBox.string = "" + inputNum
        }
    }

    onReqRecommendId() {
        this.recommendParent.active = false
        NetManager.instance.sendMsg("IdleWorldBuildingBrewBuildingCmd_CS",{
            building_id: BuildingType.Farm
        })
    }

    onClickIdItem(event, index) {
        if(!this.curData || this.curData.code != this.recommendCodeList[index].code)
        {
            this.updateFramlandDetail({
                world_building: this.recommendCodeList[index]
            })
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
            code: parseInt(code),
            building_id: BuildingType.Farm
        })
    }

    onClickBuy() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        if(this._state != 0)
        {
            //已售出
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "很遗憾，此地已被他人捷足先登了，请重新选择"
            })
            return
        }

        let price = BuildingConfig[BuildingType.Farm].price
        if(price <= UserDataManager.instance.getDiamondNum())
        {
            NetManager.instance.sendMsg("BuyWorldBuildingBrewBuildingCmd_CS", {
                world_building_id: this.curData.world_building_id
            })
        }else{
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "zqb不足!"
            })
        }
    }

    onRspQueryFramland(eventData)
    {
        if(eventData.error_code)
        {
            return
        }
    }

    onRspBuyFramland(eventData) {
        if(eventData.error_code)
        {
            return
        }
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
        this.updateRecommendDetail()
    }

    removeListener()
    {
        EventManager.instance.removeTargetListener(this)
    }

    onDestroy() {
        this.removeListener()
    }


}