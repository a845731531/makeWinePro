import OldWineConfig from "../config/OldWineConfig";
import ProductConfig from "../config/ProductConfig";
import PropConfig from "../config/PropConfig";
import WineQualilyConfig from "../config/WineQualilyConfig";
import { CustomEventEnum } from "../Constant/CustomEventEnum";
import { BuildingType, MoneyPropId } from "../Constant/GameEnum";
import GuideManager from "../framework/guide/GuideManager";
import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
import BagDataManager from "./BagDataManager";
import BaseDataManager from "./BaseDataManager";

export default class TargetWineDataManager extends BaseDataManager {
    private static _instance: TargetWineDataManager = null;

    private targetWineId: number = 0;
    private targetWineNum: number = 500;

    private baseWineTotalNeedNum = 0;  //总共需要烤酒数量

    /**
     * 全部标签的 目标酒
     */
    private allTaggetWineList = []

    private targetWineMap = {}
    
    public static get instance(): TargetWineDataManager {
        if (this._instance == null) {
            this._instance = new TargetWineDataManager();
        }
        return this._instance;
    }

    constructor() {
        super();

        this.reset();
    }
    
    reset() {
        //xiejinhui test  TODO  目标酒暂时先存本地先吧  后续服务器接口有了要接上!
        this.targetWineId = parseInt(localStorage.getItem("targetWineId")) || 0
        super.reset()
    }
    addNetListener() {
        EventManager.instance.addEventListener(CustomEventEnum.TARGET_SET_WINE,this.setTargetWineId,this,-1)
    }

    getTargetWineId() {
        return this.targetWineId
    }
    setTargetWineId(param) {
        let targetWineId = param.targetWineId
        let targetNum = param.targetNum ||  this.getTargetWineContainer()
        this.targetWineId = targetWineId
        this.targetWineNum = targetNum
        localStorage.setItem("targetWineId",param.targetWineId)
        this.calculateOriginNeed()
    }
    getTargetWineContainer()
    {
        return Tool.getNumberParamConfig("targetWineContainer")
    }
    calculateOriginNeed() {
        let itemData = ProductConfig[PropConfig[this.targetWineId].subId]
        if(!itemData) {
            return
        }
        
        this.baseWineTotalNeedNum = this._getNeedBaseWine(true).needNum
    }
    calculateOriginNeedById(targetWineId)
    {
        let itemData = ProductConfig[PropConfig[targetWineId].subId]
        if(!itemData) {
            return
        }
        
        let baseWineTotalNeedNum = this._getNeedBaseWine(true,targetWineId).needNum
        let resultObj = this._getAllMaterials(WineQualilyConfig[targetWineId].baseWineId)
        for(let i in resultObj)
        {
            resultObj[i] = resultObj[i] * baseWineTotalNeedNum * this.getTargetWineContainer()
        }
        return resultObj
    }
    //年份酒进度
    getOldWineProgress() {
        let progressList = []
        let itemData = ProductConfig[PropConfig[this.targetWineId].subId]
        if(!itemData) {
            return progressList
        }
        let materialList = Tool.convertStrToList(itemData.materials)
        let bagDataInstance = BagDataManager.instance
        for(let i = 0, len = materialList.length; i < len; i++) {
            let itemMaterial = materialList[i]
            let itemProgress = {
                propId: itemMaterial.propId,
                needNum: itemMaterial.num * this.targetWineNum,
                curNum: bagDataInstance.getItemNum(itemMaterial.propId),
            }
            progressList.push(itemProgress)
        }
        return progressList
    }
    //年份酒进度
    getOldWineProgressById(targetWineId) {
        let progressList = []
        let itemData = ProductConfig[PropConfig[targetWineId].subId]
        if(!itemData) {
            return progressList
        }
        let materialList = Tool.convertStrToList(itemData.materials)
        for(let i = 0, len = materialList.length; i < len; i++) {
            let itemMaterial = materialList[i]
            let itemProgress = {
                propId: itemMaterial.propId,
                needNum: itemMaterial.num * 1,
                curNum: 0,
            }
            progressList.push(itemProgress)
        }
        return progressList
    }
    //根据需要的年份酒获取需要烤酒的数量
    //excludeOwned: true不减去已拥有的，初始需要; false除去拥有的还需要
    private _getNeedBaseWine(excludeOwned: boolean = false,targetWineId?) {
        let oldWineList = []
        if(targetWineId)
        {
            oldWineList = this.getOldWineProgressById(targetWineId)
        }else{
            oldWineList = this.getOldWineProgress()
        }
        //构造筛选结构
        let totalNeedCount = 0
        let roundNumList = {}
        for(let i = 0, len = oldWineList.length; i < len; i++) {
            let itemData = oldWineList[i]
            let itemConfig = OldWineConfig[itemData.propId]
            let curNumList = roundNumList[itemConfig.round] || []
            let remainNeed = itemData.needNum
            if(!excludeOwned) {
                remainNeed = itemData.needNum - itemData.curNum
            }
            if(remainNeed > 0) {
                curNumList.push(remainNeed)
                curNumList.sort()  //从小到大排序
                totalNeedCount += 1
                roundNumList[itemConfig.round] = curNumList
            }
        }
        let baseWineNeedNum = 0
        let recommendNum = 0
        while(totalNeedCount > 0) {
            //每次找到最大的需要数量，以该值酿一次酒，每轮次相应可减少一份最大需要数量的某年份酒
            let maxNeed = 0
            for(let round in roundNumList) {
                let curNumList = roundNumList[round] || []
                if(curNumList.length > 0) {
                    maxNeed = Math.max(curNumList[curNumList.length - 1], maxNeed)

                    curNumList.pop()
                    totalNeedCount -= 1
                }
            }
            if(recommendNum == 0) {
                recommendNum = maxNeed
            }
            baseWineNeedNum += maxNeed
        }
        return {
            needNum: baseWineNeedNum,
            recommendNum: recommendNum,
        }
    }
    //根据建筑获取目标酒原材料进度
    getProgressOfBuilding(buildingType: BuildingType) {
        let progressList = {}
        let curNeedNum = this._getNeedBaseWine(false).needNum
        let originNeedNum = this.baseWineTotalNeedNum
        if(BuildingType.JiaoChi == buildingType) {
            let itemProduct = ProductConfig[WineQualilyConfig[this.targetWineId].baseWineId]
            let needMaterials = Tool.convertStrToObj(itemProduct.materials)   
            for(let propId in needMaterials) {
                let bagNum = BagDataManager.instance.getItemNum(parseInt(propId))  //背包数量
                let parentOwnedNum = (originNeedNum - curNeedNum) * needMaterials[propId] //已拥有父产物转换成进度
                progressList[propId] = {
                    propId: propId,
                    curNum: bagNum + parentOwnedNum,
                    needNum: originNeedNum * needMaterials[propId],
                }
            }

        } else if (BuildingType.ZhiQu == buildingType) {
            let itemProduct = ProductConfig[WineQualilyConfig[this.targetWineId].baseWineId]
            let needMaterials = Tool.convertStrToObj(itemProduct.materials)   
            for(let materialId in needMaterials) {
                itemProduct = ProductConfig[materialId]
                if(itemProduct.buildingType == buildingType) {
                    let parentNeedNum = needMaterials[materialId]
                    let parentCurNum = (originNeedNum - curNeedNum) * parentNeedNum + BagDataManager.instance.getItemNum(parseInt(materialId))
                    let itemNeedList = Tool.convertStrToObj(itemProduct.materials)
                    for(let propId in itemNeedList) {
                        let bagNum = BagDataManager.instance.getItemNum(parseInt(propId))
                        let parentOwnedNum = parentCurNum * itemNeedList[propId] //已拥有父产物转换成进度
                        progressList[propId] = {
                            propId: propId,
                            curNum: parentOwnedNum + bagNum,
                            needNum: originNeedNum * parentNeedNum * itemNeedList[propId],
                        }
                    }
                }
            }
        }
        return progressList
    }

    // //某种产物的目标酒还需要
    // getRecommendNum(propId) {
    //     let curNeedConfig = this._getNeedBaseWine(false)
    //     if(propId == MoneyPropId.BASEWINE) {
    //         return curNeedConfig.recommendNum
    //     }
    //     let needMaterials = this._getAllMaterials(MoneyPropId.BASEWINE)
    //     let itemNeedNum = needMaterials[propId] || 0
    //     return (itemNeedNum * curNeedConfig.needNum)
    // }

    //递归获取所有原材料
    _getAllMaterials(propId) {
        let itemProduct = ProductConfig[propId]
        if(!itemProduct)
        {
            return {}
        }
        let needMaterialList = Tool.convertStrToList(itemProduct.materials)
        let needMaterialObj = Tool.convertStrToObj(itemProduct.materials)
        for(let i = needMaterialList.length - 1; i >= 0; i--) {
            let itemMaterial = needMaterialList[i]
            let materialNeeds = this._getAllMaterials(itemMaterial.propId)
            for(let id in materialNeeds) {
                let oldNeed = needMaterialObj[id] || 0
                needMaterialObj[id] = (oldNeed + materialNeeds[id] * itemMaterial.num)
            }
        }
        return needMaterialObj
    }

    //根据本次烤酒数量获得各轮次推荐藏酒年份
    getStoreRecommend(wineNum) {
        let oldWineList = this.getOldWineProgress()
        
        let roundValidMaxList = {}
        let roundMaxList = {}
        for(let i = 0, len = oldWineList.length; i < len; i++) {
            let itemData = oldWineList[i]
            let itemConfig = OldWineConfig[itemData.propId]
            let remainNeed = itemData.needNum - itemData.curNum

            let storeMaxList = roundMaxList
            if(remainNeed <= wineNum) {
                storeMaxList = roundValidMaxList
            }
            let oldMax = storeMaxList[itemConfig.round]
            if(oldMax == null || oldMax.needNum < remainNeed) {
                storeMaxList[itemConfig.round] = {
                    year: itemConfig.year,
                    needNum: remainNeed
                }
            }
        }
        //优先设置为可以生产的需要最多年份，都不行的话取需要最多的年份
        let yearList = [3,3,3,3,3,3,3]
        for(let round in roundMaxList) {
            yearList[round] = roundMaxList[round].year
        }
        for(let round in roundValidMaxList) {
            yearList[round] = roundValidMaxList[round].year
        }
        return yearList
    }

    private _zhiquList = []
    private _kaojiuList = []
    private _niangjiuList = []

    /**
     * 获取选定酒当前的进程数据
     */
    getTargetWineProcessData()
    {
        let itemData = ProductConfig[PropConfig[this.targetWineId].subId]
        if(!itemData) {
            return null
        }

        this._zhiquList = []
        this._kaojiuList = []
        this._niangjiuList = []

        let noEnoughList = []

        //检查老酒
        let niangjiuEnough = true
        let niangjiuList = Tool.convertStrToList(ProductConfig[PropConfig[this.targetWineId].subId].materials)
        for(let i = 0; i < niangjiuList.length; i++)
        {
            if(niangjiuList[i].num * this.getTargetWineContainer() > BagDataManager.instance.getItemNum(niangjiuList[i].propId))
            {
                noEnoughList.push(niangjiuList[i].propId)
                niangjiuEnough = false
            }

            this._niangjiuList.push({
                propId: niangjiuList[i].propId,
                curCount: BagDataManager.instance.getItemNum(niangjiuList[i].propId),
                totalCount: niangjiuList[i].num * this.getTargetWineContainer()
            })
        }

        //检查制曲
        let zhiquEnough = true
        let zhiquData = TargetWineDataManager.instance.getProgressOfBuilding(BuildingType.ZhiQu)
        for(let i in zhiquData)
        {
            if(zhiquData[i].needNum > zhiquData[i].curNum)
            {
                noEnoughList.push(zhiquData[i].propId)
                zhiquEnough = false
            }

            this._zhiquList.push({
                propId: zhiquData[i].propId,
                curCount: zhiquData[i].curNum,
                totalCount: zhiquData[i].needNum
            })
        }


        //检查烤酒
        let kaojiuData = TargetWineDataManager.instance.getProgressOfBuilding(BuildingType.JiaoChi)
        for(let i in kaojiuData)
        {
            this._kaojiuList.push({
                propId: kaojiuData[i].propId,
                curCount: kaojiuData[i].curNum,
                totalCount: kaojiuData[i].needNum
            })
        }

        this._zhiquList.sort((a,b)=>{
            return a.propId - b.propId
        })
        this._kaojiuList.sort((a,b)=>{
            return a.propId - b.propId
        })
        this._niangjiuList.sort((a,b)=>{
            return a.propId - b.propId
        })

        let bagWater = BagDataManager.instance.getItemNum(this._kaojiuList[0].propId)

        //制曲多出的水
        let zhiquNeedWater = Math.max(0,this._zhiquList[0].curCount - this._zhiquList[0].totalCount)
        zhiquNeedWater = Math.min(zhiquNeedWater,bagWater)
        
        //烤酒反推的值
        let virsalNum = this._kaojiuList[0].curCount - bagWater
        this._kaojiuList[0].curCount = virsalNum + zhiquNeedWater

        let kaojiuEnough = true
        for(let i = 0; i < this._kaojiuList.length; i++)
        {
            if(this._kaojiuList[i].totalCount > this._kaojiuList[i].curCount)
            {
                noEnoughList.push(this._kaojiuList[i].propId)
                kaojiuEnough = false
            }
        }

        noEnoughList.sort((a,b)=>{
            return a - b
        })

        return{
            noEnoughList: noEnoughList,
            zhiquEnough: zhiquEnough,
            kaojiuEnough: kaojiuEnough,
            niangjiuEnough: niangjiuEnough,
            zhiquList: this._zhiquList,
            kaojiuList: this._kaojiuList,
            niangjiuList: this._niangjiuList,
        }
    }

    getAllTargetWineList()
    {
        if(this.allTaggetWineList.length == 0)
        {
            for(let i in WineQualilyConfig)
            {
                let type = WineQualilyConfig[i].wineType

                if(!this.targetWineMap[type])
                {
                    this.targetWineMap[type] = []
                }

                //自定义酒不放入全部标签
                if(type != 100)
                {
                    //处于新手引导中 才显示新手酒
                    if(WineQualilyConfig[i].id == MoneyPropId.GUIDEWINE)
                    {
                        if(GuideManager.instance.isInGuide())
                        {
                            this.allTaggetWineList.push(WineQualilyConfig[i])
                        }
                    }else{
                        this.allTaggetWineList.push(WineQualilyConfig[i])
                    }
                }

                this.targetWineMap[type].push(WineQualilyConfig[i])
            }
        }
        return this.allTaggetWineList
    }

    getTargetWineListByType(type)
    {
        if(!this.targetWineMap[type])
        {
            this.getAllTargetWineList()
        }

        let list = []

        if(type == 0)
        {
            list =  this.getAllTargetWineList()
        }else{
            if(!this.targetWineMap[type])
            {
                this.targetWineMap[type] = []
            }
            list =  this.targetWineMap[type]
        }

        //根据价格来排序  从小到大
        list.sort(function(a,b){
            return a.marketPrice - b.marketPrice
        })

        return list
    }
}
