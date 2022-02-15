import { NetMsgDef } from "../../../resources/pb/NetMsgDef";
import FormulaConfig from "../../config/FormulaConfig";
import OldWineConfig from "../../config/OldWineConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import EventManager from "../../framework/manager/EventManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import BagDataManager from "../BagDataManager";
import PropConfig from "../../config/PropConfig";
import { ItemType, MoneyPropId, WineTabType } from "../../Constant/GameEnum";
import WineQualilyConfig from "../../config/WineQualilyConfig";
import { Tool } from "../../framework/manager/Tool";
import ProductConfig from "../../config/ProductConfig";
import { NetManager } from "../../framework/network/NetManager";
import GuideManager from "../../framework/guide/GuideManager";
import TargetWineDataManager from "../TargetWineDataManager";

export default class FormulaManager {

    private static _instance: FormulaManager = null;

    public static get instance(): FormulaManager {
        if (this._instance == null) {
            this._instance = new FormulaManager();
        }
        return this._instance;
    }

    /**
     * 老酒配比信息
     */
    private _oldWineList = {}

    /**
     * 根据标签  区分配方
     */
    private _formulaList = []

    //当前选中的酒
    private _wineId = -1

    //是否为自定义模式
    private _isCustomWine = false

    constructor() {
        this.addNetListener()
        this.initFormulaConfig()
    }

    init() {

    }

    addNetListener() {

        EventManager.instance.addEventListener(CustomEventEnum.FORMULA_ADD_OLD_WINE_COUNT, this.addOldWineCount, this, -1)
        EventManager.instance.addEventListener(CustomEventEnum.FORMULA_SELECT_FORMULA, this.onSelectFormula, this, -1)
        EventManager.instance.addEventListener(CustomEventEnum.FORMULA_CLEAR_DATA, this.clearOldWineData, this, -1)
        
        EventManager.instance.addEventListener("MakeFormulaBrewUserCmd_SC", this.onRspMixWine, this, -1)
    }

    initFormulaConfig()
    {
        this._formulaList = []

        for(let i in PropConfig)
        {
            if(PropConfig[i].type == ItemType.FORMULA)
            {
                this._formulaList.push(PropConfig[i])
            }
        }
    }

    getFormulaConfigByWineType(targetType)
    {
        let targetWineData = null
        let list = []
        if(this._formulaList[targetType])
        {
            for(let i = 0; i < this._formulaList.length; i++)
            {   
                let wineId = this._formulaList[i].subId
                let wineType = WineQualilyConfig[wineId].wineType
                if(targetType == wineType || targetType == WineTabType.ALL)
                {
                    //自定义配方大于0才显示出来
                    if(targetType == WineTabType.CUSTOM && BagDataManager.instance.getItemNum(this._formulaList[i].id) > 0)
                    {
                        if(wineId == TargetWineDataManager.instance.getTargetWineId())
                        {
                            targetWineData = this._formulaList[i]
                        }else{
                            list.push(this._formulaList[i])
                        }
                    }
                    
                    if(targetType != WineTabType.CUSTOM){
                        if(wineId == TargetWineDataManager.instance.getTargetWineId())
                        {
                            targetWineData = this._formulaList[i]
                        }else{
                            list.push(this._formulaList[i])
                        }
                    }
                }
            }

            //新手引导中才显示新手酒配方
            if(!GuideManager.instance.isInGuide()) {
                for(let i = 0; i < list.length; i++)
                {
                    if(list[i].id == MoneyPropId.GUIDEFORMULA)
                    {
                        list.splice(i,1)
                        break
                    }
                }
            }

            //目标酒放在配方列表最前面
            if(targetWineData != null)
            {
                list.unshift(targetWineData)
            }

        }
        return list
    }

    onSelectFormula(param)
    {
        this.clearOldWineData()

        this._wineId = param.wineId
        let formulaId = param.formulaId
        let itemData = ProductConfig[formulaId]

        if(WineQualilyConfig[this._wineId].wineType == WineTabType.CUSTOM)
        {
            //自定义酒
            this._isCustomWine = true
        }else{
            //产物表 查找当前配方所需的老酒配比
            let materialList = Tool.convertStrToList(itemData.materials)
    
            let totalPro = 0
            for(let i = 0; i < materialList.length; i++)
            {
                let id = materialList[i].propId 
                if(PropConfig[id].type == ItemType.OLD_WINE)
                {
                    totalPro += materialList[i].num
                }
            }
    
            for(let i = 0; i < materialList.length; i++)
            {
                let id = materialList[i].propId
                if(PropConfig[id].type == ItemType.OLD_WINE)
                {
                    let index = OldWineConfig[id].round
                    this.addOldWineCount({
                        index: index,
                        wineId: id,
                        count: Math.floor(1000 * materialList[i].num)
                    },false)
                }
            }
        }

    }

    getSelectWineId()
    {
        return this._wineId
    }

    getOldWineData(index) {
        return this._oldWineList[index]
    }

    addOldWineCount(param,isCustom = true) {

        this._isCustomWine = isCustom
        this._wineId = isCustom? -1 : this._wineId

        if (!this._oldWineList[param.index]) {
            this._oldWineList[param.index] = {
                wineId: param.wineId,
                count: param.count? param.count : 0 
            }
        } else {
            let curCount = this._oldWineList[param.index].count
            if (param.count > 0) {
                this._oldWineList[param.index].count = Math.min(1000000, curCount + param.count)
            } else {
                this._oldWineList[param.index].count = Math.max(0, curCount + param.count)
            }
        }
        EventManager.instance.dispatchEvent(CustomEventEnum.FORMULA_UPDATE_VIEW)
    }

    getTotalAddCount() {
        let count = 0
        for (let i in this._oldWineList) {
            if (this._oldWineList[i] && this._oldWineList[i].count > 0) {
                count += this._oldWineList[i].count
            }
        }
        return count
    }

    /**
     * 判断能否添加或者减少 调酒比例
     */
    checkCanMixWine()
    {

        let isAdd = false
        let isSelect = false
        for (let i in this._oldWineList) {
            if (this._oldWineList[i] && this._oldWineList[i].count > 0) {
                isAdd = true
            }
            if (this._oldWineList[i] && this._oldWineList[i].wineId) {
                isSelect = true
            }
        }

        if(!isSelect)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "请先添加轮次酒！"
            })
            return false
        }

        if(!isAdd)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "请给轮次酒添加分配比例！"
            })
            return false
        }

        let count = 0
        for (let i in this._oldWineList) {
            if (this._oldWineList[i] && this._oldWineList[i].count > 0) {
                count = this._oldWineList[i].count
                let wineId = this._oldWineList[i].wineId

                //xiejinhui TODO 判断自定义配方是否解锁
                let bagCount = BagDataManager.instance.getItemNum(wineId)
                let curCost = this.getProgress(count) * FormulaManager.instance.getFormulaCostAllContainer()
                if(curCost > bagCount)
                {
                    EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                        msg: cc.js.formatStr("%s年份%s轮次酒不足,请重新分配比例!",OldWineConfig[wineId].year,Tool.getChinaNumber(OldWineConfig[wineId].round))
                    })
                    return false
                }
            }
        }

        return true
    }

    getProgress(count: number) {
        let total = this.getTotalAddCount()
        if(total > 0)
        {
            return count / total
        }
        return 0
    }

    getOldWineCount(index) {
        if (this._oldWineList[index]) {
            return this._oldWineList[index].count
        }
        return 0
    }

    checkOldWineIsAdd(wineId)
    {
        for (let i in this._oldWineList) {
            if (this._oldWineList[i] && this._oldWineList[i].wineId == wineId) {
                return true
            }
        }
        return false
    }

    clearOldWineData() {
        this._isCustomWine = false
        this._wineId = -1
        this._oldWineList = []
        EventManager.instance.dispatchEvent(CustomEventEnum.FORMULA_UPDATE_VIEW)
    }

    reqMixWine() {
        let produce_id = 0
        if(PropConfig[this._wineId]) {
            produce_id = PropConfig[this._wineId].subId
        }
        if(this._isCustomWine || WineQualilyConfig[this._wineId].wineType == WineTabType.CUSTOM) {
            produce_id = 0
        }
        let materialList = []
        for (let i in this._oldWineList) {
            if (this._oldWineList[i] && this._oldWineList[i].count > 0) {
                materialList.push({
                    id: this._oldWineList[i].wineId,
                    num: this._oldWineList[i].count
                })
            }
        }
        NetManager.instance.sendMsg("MakeFormulaBrewUserCmd_CS", {
            produce_id: produce_id,
            material_list: materialList
        })
    }
    /**
     * 开始调酒
     */
    onRspMixWine(serverData)
    {
        if(serverData.error_code) {
            return
        }
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "FormulaMixSuccess"
        })
        EventManager.instance.dispatchEvent(CustomEventEnum.FORMULA_RUN_MIX_ANIMATION,{
            callback:()=>{
                // 展示恭喜获得
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                    viewName: PrefabPathEnum.CongratulationsView,
                    exData:{
                        propList:[{
                            propId: serverData.formaula_id || PropConfig[this._wineId].subId,
                            customNum: 1
                        }]
                    }
                })
                //清除数据
                this.clearOldWineData()
            }
        })
    }

    getOldWineScore(wineId)
    {
        if(OldWineConfig[wineId])
        {
            return OldWineConfig[wineId].score
        }
        return 0
    }

    getFormulaByScore(score)
    {
        for(let i in FormulaConfig)
        {
            let config = FormulaConfig[i]
            if(score >= config.scoremin && score <= config.scoremax)
            {
                return config.id
            }
        }
        return 0
    }

    /**
     * 调酒消耗的总容量
     */
    getFormulaCostAllContainer()
    {
        return Tool.getNumberParamConfig("tiaoWineTotalCost")
    }


    reset() {
        EventManager.instance.removeTargetListener(this);
    }
}