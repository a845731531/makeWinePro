import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import UserDataManager from "../../data/UserDataManager";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import BuildingDataManager from "../../data/BuildingDataManager";
import LandDataManager from "../../data/land/LandDataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingConstructItem extends cc.Component {

    @property(cc.Sprite)
    buildingIcon: cc.Sprite = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Label)
    txtDesc: cc.Label = null;

    @property(cc.Node)
    goldNode: cc.Node = null;

    @property(cc.Label)
    txtGold: cc.Label = null;

    @property(cc.Node)
    timeNode: cc.Node = null;
    @property(cc.Label)
    txtCostTime: cc.Label = null;

    @property(cc.Label)
    txtCount: cc.Label = null;

    /**
     * 建造需要的钱
     */
    private _goldCost = 0
    private curData = null

    updateView(data)
    {
        this.curData = data

        //TODO 城建icon
        let frameName = cc.js.formatStr("texture/building/buildingIcon_%s_0", this.curData.buildingId)
        Tool.loadSpriteFrame(frameName, this.buildingIcon)

        this.txtName.string = data.name
        this.txtDesc.string = data.desc

        this.goldNode.active = true
        this.timeNode.active = false

        this._goldCost = this.curData.price
        this.txtGold.string = (this._goldCost / 1000) + ""

        //判断当前建筑个数
        let buildingType = this.curData.buildingId
        if(this.curData.useType == 1)
        {
            //建筑类型
            let list = BuildingDataManager.instance.getBuildingListByType(buildingType)
            this.txtCount.string = list.length + ""
        }else{
            //装饰类型
            let list = LandDataManager.instance.getLandBuildingItemDataList(null,buildingType)
            this.txtCount.string = list.length + ""
        }
    }

    getBuildingCost()
    {
        return this._goldCost
    }

    onClickItem() {        
        let cost = this.getBuildingCost() 
        let curGold = UserDataManager.instance.getCoinNum()
        
        // if(curGold < cost)
        // {
        //     EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
        //         msg: "zqb不足"
        //     })
        //     return
        // }

        EventManager.instance.dispatchEvent(CustomEventEnum.MAP_ADD_BUILDING, {
            buildingType: this.curData.buildingId
        })
    }
}