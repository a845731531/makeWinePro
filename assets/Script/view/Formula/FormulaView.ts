import { NetMsgDef } from "../../../resources/pb/NetMsgDef";
import WineQualilyConfig from "../../config/WineQualilyConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { BuildingType, MoneyPropId } from "../../Constant/GameEnum";
import BuildingDataManager from "../../data/BuildingDataManager";
import FormulaManager from "../../data/formula/FormulaManager";
import List from "../../framework/component/List";
import { EventEnum } from "../../framework/FrameWorkEnum";
import GuideManager from "../../framework/guide/GuideManager";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";
import BuildingStaffSelectNode from "../Staff/BuildingStaffNode";
import FormulaWineItem from "./FormulaWineItem";
import OldWineItem from "./OldWineItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FormulaView extends BaseView {

    @property(OldWineItem)
    oldWineItemLsit: OldWineItem[] = [];
    
    @property(cc.Label)
    txtContainer: cc.Label = null;

    @property(List)
    list: List = null;

    @property(cc.Node)
    StaffAddNode: cc.Node = null

    @property(cc.Node)
    mixAniNode: cc.Node = null

    @property(sp.Skeleton)
    mixSkeleton: sp.Skeleton = null

    private _tagType = 0

    /**
     * 选中的酒id
     */
    private _wineId = 0

    /**
     * 选中的配方id
     */
    private _formulaId = 0
    private _hasCustomNum = false
    private _formulaList = []

    private _rewardCallBack = null

    onLoad()
    {
        this.addListener()
    }

    addListener()
    {
        EventManager.instance.addEventListener(CustomEventEnum.FORMULA_UPDATE_VIEW,this.updateView,this)
        EventManager.instance.addEventListener(CustomEventEnum.FORMULA_ADD_OLD_WINE_COUNT,this.onMarkCustomed,this)
        
        EventManager.instance.addEventListener(CustomEventEnum.FORMULA_RUN_MIX_ANIMATION,this.runMixAnimation,this)
    }

    initByExData(param)
    {
        this.mixAniNode.active = false
        this.updateStaffView()
    }

    start(): void {
        super.start()
        this.updateView()
    }

    updateView()
    {   
        for(let i = 0; i < 7; i++)
        {
            this.oldWineItemLsit[i].updateView()
        }

        this.txtContainer.string = Tool.unitConversion(FormulaManager.instance.getFormulaCostAllContainer())

        this.updateList()
    }

    updateList()
    {
        this._formulaList = FormulaManager.instance.getFormulaConfigByWineType(this._tagType)
        this.list.numItems = this._formulaList.length
    }

    onRenderEvent(item: cc.Node, index: number) {
        item.getComponent(FormulaWineItem).updateView(this._formulaList[index])
    }

    onSelectTag(toggle, index)
    {
        this._formulaId = this._formulaList[index].id
        this._hasCustomNum = false

        this._wineId = this._formulaList[index].subId
        EventManager.instance.dispatchEvent(CustomEventEnum.FORMULA_SELECT_FORMULA,{
            wineId: this._wineId,
            formulaId: this._formulaId
        })
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE,{
            type: "FormulaSelectId",
            param: this._formulaId
        })
    }

    runMixAnimation(param)
    {
        this.unscheduleAllCallbacks()
        this.mixAniNode.active = true

        this._rewardCallBack = param.callback

        this.mixSkeleton.setAnimation(0,"animation",true)
        this.scheduleOnce(this.onStopAni,2)
    }

    onStopAni()
    {
        this.mixSkeleton.clearTracks()

        this._rewardCallBack && this._rewardCallBack()
        this._rewardCallBack = null
        this.mixAniNode.active = false
    }

    onClickTag(event,index)
    {
        this._tagType = index
        this.updateView()
    }

    private buildingData = null
    private staffId = 0
    updateStaffView()
    {
        this.buildingData = BuildingDataManager.instance.getBuildingData(BuildingType.Laborary,1)
        if(this.StaffAddNode)
        {
            this.StaffAddNode.getComponent(BuildingStaffSelectNode).updateView({
                buildingData: this.buildingData,
            })
        }
    }
    addStaff(staffId)
    {
        this.staffId = staffId
        this.updateStaffView()
    }

    onClickMix()
    {
        if(!FormulaManager.instance.checkCanMixWine())
        {
            return
        }
        FormulaManager.instance.reqMixWine()
    }
    onMarkCustomed() {
        this._hasCustomNum = true
    }
    onClickClearData()
    {
        EventManager.instance.dispatchEvent(CustomEventEnum.FORMULA_CLEAR_DATA)
    }

    removeListener()
    {
        EventManager.instance.removeTargetListener(this)
        this.onClickClearData()
    }

    onDestroy()
    {
        this.removeListener()
    }

}
