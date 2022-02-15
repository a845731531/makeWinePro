import PropConfig from "../config/PropConfig";
import { CustomEventEnum } from "../Constant/CustomEventEnum";
import { BagType, MoneyPropId, ItemType, itemDiscardType } from "../Constant/GameEnum";
import EventManager from "../framework/manager/EventManager";
import { BagItemData, EXCodeData } from "./DataInterface";
import UserDataManager from "./UserDataManager";
import BaseDataManager from "./BaseDataManager";
import OldWineConfig from "../config/OldWineConfig";
import { EventEnum } from "../framework/FrameWorkEnum";
import { Tool } from "../framework/manager/Tool";
import { NetManager } from "../framework/network/NetManager";

export default class BagDataManager extends BaseDataManager {
    private static _instance: BagDataManager = null;

    /**
     * 道具列表
     */
    private propList: { [id: number]: any };

    /**
     * 兑换码列表
     */
    private EXCodeList: EXCodeData[] = []

    /**
     * 缓存中的新物品列表
     */
    private newPropCache = []

    /**
     * 本次登录的新物品列表
     */
    private curNewPropList = []

    public static get instance(): BagDataManager {
        if (this._instance == null) {
            this._instance = new BagDataManager();
        }
        return this._instance;
    }

    constructor() {
        super();

        this.reset();
    }
    reset() {
        this.propList = {};
        this.newPropCache = []
        super.reset()

        // for(let i in PropConfig)
        // {
        //     if(PropConfig[i].type == ItemType.OLD_WINE)
        //     {
        //         this.addItem({
        //             id: Tool.getRandomLimit(1,100000000),
        //             propId: PropConfig[i].id,
        //             customNum: 10000,
        //         })
        //     }
        // }
    }
    addNetListener() {
        EventManager.instance.addEventListener("stAddItemListPropertyUserCmd", this.onNtfAddPropList, this, -1)
        EventManager.instance.addEventListener("stAddItemPropertyUserCmd", this.onNtfNewProp, this, -1)
        EventManager.instance.addEventListener("stRefreshCountItemPropertyUserCmd", this.onNtfPropChanged, this, -1)
        EventManager.instance.addEventListener("stRemoveItemPropertyUserCmd", this.onNtfRemoveProp, this, -1)

        EventManager.instance.addEventListener("ExchangeCodeListBrewUserCmd_SC",this.onRspEXCodeDataList,this,-1)
    }

    /**
     * 获取item物品数量
     * @param itemId itemID
     * @returns 
     */
    getItemNum(itemId: number) {
        let itemConfig = PropConfig[itemId]
        if(!itemConfig)
        {
            // console.error("PropConfig not has this id",itemId)
            return 0
        }
        let itemType = itemConfig.type
        if (itemType == ItemType.MONEY) {
            if (itemId == MoneyPropId.COIN) {
                return UserDataManager.instance.getCoinNum();
            } else if (itemId == MoneyPropId.DIAMOND) {
                return UserDataManager.instance.getDiamondNum();
            }
        } else {
            let itemProp = this.propList[itemId] || {}
            return itemProp.num || 0;
        }
        return 0
    }

    /**
     * 获取基酒列表
     */
    getBaseWineList(subId: number) {
        let propList = [];
        for (let propId in this.propList) {
            let itemConfig = PropConfig[propId];
            let itemProp = this.propList[propId] || {}
            if (itemConfig && itemConfig.type == ItemType.BASEWINE && itemConfig.subId == subId) {
                propList.push({
                    propId: propId,
                    num: itemProp.num
                })
            }
        }
        propList.sort((first, second): number => {
            return PropConfig[second.propId].quality - PropConfig[first.propId].quality;
        })
        return propList;
    }

    /**
     * 添加物品
     * @param param 
     */
    addItem(param: {id?: number, propId: number, customNum: number}) {
        let itemConfig = PropConfig[param.propId]
        if (itemConfig.type == ItemType.MONEY) {
            EventManager.instance.dispatchEvent("NtfMoneyChanged", {
                moneyType: param.propId,
                num: UserDataManager.instance.getCoinNum() + param.customNum
            })
        } else {
            let itemProp = this.propList[param.propId]
            if(!itemProp) {
                this.propList[param.propId] = itemProp = {
                    id: param.id,
                    num: param.customNum,
                }
            } else {
                itemProp.num += param.customNum
            }

            this.updateViewNewPropList(param.propId)
        }
    }

    updateViewNewPropList(propId)
    {
        //更新最新标签数据缓存
        if (this.newPropCache.indexOf(propId) == -1) {
            this.newPropCache.push(propId)
            this.curNewPropList.push(propId)
        }
        EventManager.instance.dispatchEvent(CustomEventEnum.BAG_UPDATE_VIEW)
    }

    /**
     * 判断物品的标签是否为最新
     * @param propId 
     * @returns 
     */
    checkPropIsNew(propId) {
        // let itemProp = this.propList[propId] || {num: 0}
        // if (this.curNewPropList.indexOf(propId) != -1 && itemProp.num > 0) {
        //     return true
        // }
        return false
    }

    /**
     * 根据标签获取背包数据
     */
    getBagDataByTag(tag?) {

        tag = parseInt(tag)

        let data = []
        if(tag == BagType.EXCODE)
        {
            //xiejinhui TODO 需要提前请求号兑换码数据列表
            data = Tool.deepCopy(this.EXCodeList)
        }else{
            let itemTypeList = []
            switch(tag)
            {
                case BagType.All:
                    itemTypeList = Tool.getArrayParamConfig("bagAllToggleList")
                    break
                case BagType.WIEN:
                    itemTypeList = Tool.getArrayParamConfig("bagWineToggleList")
                    break
                case BagType.PROPERTY:
                    itemTypeList = Tool.getArrayParamConfig("bagPropertyToggleList")
                    break
                case BagType.OTHER:
                    itemTypeList = Tool.getArrayParamConfig("bagOtherToggleList")
                    break
                default:
                    break
            }
    
            for(let propId in this.propList)
            {
                if(PropConfig[propId] && itemTypeList.indexOf(PropConfig[propId].type + "") != -1)
                {
                    // data.push(this.propList[propId])
                    data.push({
                        propId: propId,
                        customNum: this.propList[propId].num
                    })
                }
            }
    
            if(tag == BagType.All)
            {
                data = data.concat(this.EXCodeList)
            }
        }

        //输出结果进行排序
        
        //排序 先按品质排再按id排
        if(data.length > 0)
        {
            data.sort(function(a,b){
                let aConfig = PropConfig[a.propId]
                let bConfig = PropConfig[b.propId]
                // if(aConfig.quality != bConfig.quality)
                // {
                //     if(aConfig.quality > bConfig.quality)
                //     {
                //         return -1
                //     }else{
                //         return 1
                //     }
                // }else{
                    // if(aConfig.id > bConfig.id)
                    // {
                    //     return -1
                    // }else{
                    //     return 1
                    // }
                // }
                return aConfig.id - bConfig.id
            })
        }
        return data
    }

    /**
     * 组装过的背包  配方数据
     * @returns 
     */
    getFormulaBagData() {
        let list: BagItemData[] = []
        for (let propId in this.propList) {
            let itemProp = this.propList[propId]
            if (PropConfig[propId] && PropConfig[propId].type == ItemType.FORMULA) {
                list.push({
                    propId: parseInt(propId),
                    customNum: itemProp.num
                })
            }
        }
        return list
    }

    /**
     * 组装过的背包  最新物品数据
     * @returns 
     */
    getNewBagData() {

        let list: BagItemData[] = []
        for (let propId in this.propList) {
            let itemProp = this.propList[propId]
            for (let k = 0; k < this.curNewPropList.length; k++) {
                let id = this.curNewPropList[k]
                if (propId == id && itemProp.num > 0) {
                    list.push({
                        propId: id,
                        customNum: this.getItemNum(id)
                    })
                }
            }
        }
        return list
    }

    /**
     * 组装过的背包  成品酒数据
     */
    getWineBagData(discardType?: itemDiscardType): BagItemData[] {
        let data = []
        for (let propId in this.propList) {
            let itemProp = this.propList[propId]
            let itemConfig = PropConfig[propId]
            let isAdapter = true
            if(discardType)
            {
                isAdapter = itemConfig.discardType == discardType
            }
            if (itemConfig.type == ItemType.WINE && isAdapter && itemProp.num > 0) {
                data.push(
                    {
                        propId: parseInt(propId),
                        customNum: itemProp.num
                    }
                )
            }
        }

        //排序 先按品质排再按id排
        if(data.length > 0)
        {
            data.sort(function(a,b){
                let aConfig = PropConfig[a.propId]
                let bConfig = PropConfig[b.propId]
                // if(aConfig.quality != bConfig.quality)
                // {
                //     if(aConfig.quality > bConfig.quality)
                //     {
                //         return -1
                //     }else{
                //         return 1
                //     }
                // }else{
                //     if(aConfig.id > bConfig.id)
                //     {
                //         return -1
                //     }else{
                //         return 1
                //     }
                // }
                return aConfig.id - bConfig.id
            })
        }

        return data
    }

    /**
     * 获取背包未拥有的成品酒数据
     */
    getUnOwnOrderWine() {
        let data = []
        for (let propId in PropConfig) {
            let itemConfig = PropConfig[propId]
            if (itemConfig.type == ItemType.WINE && this.checkWineCanOrder(propId)) {
                if(this.getItemNum(parseInt(propId)) <= 0)
                {
                    data.push({
                        propId: propId,
                        customNum: 0
                    })
                }
            }
        }
        return data
    }

    /**
     * 判断酒能否被订单使用
     */
    checkWineCanOrder(wineId)
    {
        let itemProp = PropConfig[wineId]
        return itemProp.discardType == itemDiscardType.ORDER
    }

    /**
     * 判断酒能否个性化提酒使用
     */
    checkWineCanPickUp(wineId)
    {
        let itemProp = PropConfig[wineId]
        return itemProp.discardType == itemDiscardType.PICKUP
    }

    /**
     * 获取背包指定年限的轮次酒
     */
    getBagOldWineByYearAndRound(year,round)
    {
        let result = []
        let oldList = this.getBagAllOldWine()
        for(let i = 0; i <  oldList.length; i++)
        {
            let propId = oldList[i].propId
            if(OldWineConfig[propId].year == year && OldWineConfig[propId].round == round)
            {
                result.push({
                    propId: propId,
                    customNum: oldList[i].customNum
                })
            }
        }
        if(result.length > 0)
        {
            //从品质大到小
            result.sort(function(a,b){
                return PropConfig[b.propId].quality - PropConfig[a.propId].quality 
            })
        }
        return result
    }

    getBagAllOldWine()
    {
        let list = []
        for(let propId in this.propList)
        {
            let itemProp = this.propList[propId]
            if(PropConfig[propId] && PropConfig[propId].type == ItemType.OLD_WINE)
            {
                list.push({
                    propId: parseInt(propId),
                    customNum: itemProp.num
                })
            }
        }
        return list
    }

    onNtfAddPropList(serverData) {
        this.propList = {}
        let propList = serverData.itemList
        for (let i = 0; i < propList.length; i++) {
            let itemProp = propList[i]
            this.addItem({
                propId: itemProp.dwObjectID,
                id: itemProp.qwThisID,
                customNum: itemProp.dwNum
            })
        }
    }
    onNtfNewProp(serverData) {
        let itemProp = serverData.obj
        if(!this.propList[itemProp.dwObjectID]) {
            this.propList[itemProp.dwObjectID] = {
                id: itemProp.qwThisID,
                num: itemProp.dwNum,
            }
        } else [
            console.warn("exist prop")
        ]
    }
    
    onNtfPropChanged(serverData) {
        for(let propId in this.propList) {
            let itemProp = this.propList[propId]
            if(itemProp.id == serverData.qwThisID) {
                itemProp.num = serverData.dwNum
                this.updateViewNewPropList(propId)
                break
            }
        }
    }
    onNtfRemoveProp(serverData) {
        for(let propId in this.propList) {
            let itemProp = this.propList[propId]
            if(itemProp.id == serverData.qwThisID) {
                delete this.propList[propId]
                break
            }
        }
    }

    reqEXCodeDataList()
    {

        //xiejinhui TODO 模拟假数据
        // let data: EXCodeData[] = []
        // for(let i = 0; i < 1; i++)
        // {
        //     data.push({
        //         id: 1000000 + i,
        //         type: ItemType.EXCode,
        //         count: 100 + i,
        //         code: "123",
        //         name: "慎初·成品酒" + i,
        //         autor: "玩家"+ Tool.getRandomLimit(1000,9999),
        //         createtime: new Date().getTime() / 1000,
        //         propId: 34700 + i,
        //         packId:  1 + i,
        //         bottleId: 10 + i,
        //     })
        // }

        NetManager.instance.sendMsg("ExchangeCodeListBrewUserCmd_CS")
    }


    onRspEXCodeDataList(eventData)
    {
        if(eventData.error_code)
        {
            return
        }
        
        //兑换码列表
        if(eventData.items && eventData.items.length > 0)
        {
            let list = eventData.items
            for(let i = 0; i < list.length; i++)
            {
                this.EXCodeList.push({
                    id: list[i].id,                 //兑换码id
                    type: ItemType.EXCode,          //类型
                    count: list[i].num,             //瓶数
                    code: "",                       //兑换码  （没用了）
                    name: list[i].name,             //酒自定义的名称
                    autor: list[i].create_user_name,    //制作人
                    createtime: list[i].create_time,    //制作日期
                    propId: list[i].wine_id,            //酒id
                    packId: list[i].box_id,             //包装id
                    bottleId: list[i].bottle_id,        //瓶子id
                    state: list[i].status,   //状态 '0:初始化状态， 1：拍卖中  2：已兑换',
                })
            }
        }


        //从品质大到小
        if(this.EXCodeList.length > 0)
        {
            this.EXCodeList.sort(function(a,b){
                return PropConfig[b.propId].quality - PropConfig[a.propId].quality 
            })
        }
    }

    getEXCodeDataList()
    {
        return this.EXCodeList
    }
    
    /**
     * 根据物品id返回物品icon地址
     */
    getItemIconById(id: number) {
        let propData = PropConfig[id]
        if (propData) {
            return cc.js.formatStr("texture/bag/%s", propData.icon)
        }
    }
}