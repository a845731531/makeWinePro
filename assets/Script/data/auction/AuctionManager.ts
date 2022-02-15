import PropConfig from "../../config/PropConfig";
import { ItemType } from "../../Constant/GameEnum";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import BagDataManager from "../BagDataManager";
import BaseDataManager from "../BaseDataManager";
import UserDataManager from "../UserDataManager";

export default class AuctionManager extends BaseDataManager {

    private static _instance: AuctionManager = null;

    public static get instance(): AuctionManager {
        if (this._instance == null) {
            this._instance = new AuctionManager();
        }
        return this._instance;
    }

    private _shelfTimeList = null

    private _auctionDataList = []

    addNetListener(): void {
        EventManager.instance.addEventListener("reqAuctionList", this.onReqAuctionList, this, -1)

        EventManager.instance.addEventListener("reqMyAuctionList", this.onReqMyAuctionList, this, -1)

        EventManager.instance.addEventListener("reqAuctionSaleList", this.onReqAuctionSaleList, this, -1)

        EventManager.instance.addEventListener("reqAuctionAuctionItem", this.onReqAuctionAuctionItem, this, -1)

        EventManager.instance.addEventListener("reqAuctionBuyItem", this.onReqAuctionBuyItem, this, -1)

        EventManager.instance.addEventListener("reqAuctionShelfItem", this.onReqShelfItem, this, -1)

        EventManager.instance.addEventListener("reqAuctionRetrieveItem", this.onReqRetrieveItem, this, -1)


        this.initTestData()
    }

    initTestData() {
        let index = 1
        for (let i in PropConfig) {
            if (PropConfig[i].auction == 1) {
                let propId = PropConfig[i].id
                for (let k = 0; k <= 5; k++) {
                    this._auctionDataList.push({
                        id: 150000 + index++,   //拍卖行唯一id
                        userId: 150000 + index++,   //玩家id
                        propId: propId,  //物品id
                        type: PropConfig[propId].type,  //拍卖行物品类型
                        count: Tool.getRandomLimit(1, 1000), //数量
                        createTime: Math.floor(new Date().getTime() / 1000 - 3600 * Math.random() * 6), //上拍时间
                        shelfType: Tool.getRandomValue([0, 1, 2]),   //上架时长
                        unitPrice: Tool.getRandomLimit(1, 100) * 1000,//单价
                        curPrice: Tool.getRandomLimit(100, 10000) * 1000,//当前竞拍价格
                        auctionCount: Math.random() > 0.4 ? 1 : (Math.random() > 0.4? 0 : null), //当前玩家竞拍次数
                        totalPrice: Math.random() > 0.7 ? Tool.getRandomLimit(1000, 10000) * 1000 : null,
                        exData: null
                    })
                }
            }
        }

        //兑换码造假
        for (let i = 0; i < 10; i++) {
            let propId = 34700 + (i % 9)
            this._auctionDataList.push({
                id: 150000 + index++,   //拍卖行唯一id
                userId: 150000 + index++,   //玩家id
                propId: propId,  //物品id
                type: ItemType.EXCode,  //拍卖行物品类型
                count: Tool.getRandomLimit(1, 1000), //数量
                createTime: Math.floor(new Date().getTime() / 1000 - 3600 * Math.random() * 6), //上拍时间
                shelfType: Tool.getRandomValue([0, 1, 2]),   //上架时长
                unitPrice: Tool.getRandomLimit(1, 100) * 1000,//单价
                curPrice: Tool.getRandomLimit(100, 10000) * 1000,//当前竞拍价格
                auctionCount: Math.random() > 0.4 ? 1 : (Math.random() > 0.4? 0 : null), //当前玩家竞拍次数
                totalPrice: Math.random() > 0.7 ? Tool.getRandomLimit(1000, 10000) * 1000 : null,
                exData: {
                    id: 1000000 + i,
                    type: ItemType.EXCode,
                    count: 100 + i,
                    code: "123",
                    name: "慎初·成品酒" + i,
                    autor: "酿酒大师00" + i,
                    createtime: new Date().getTime() / 1000,
                    propId: propId,
                    packId: 1 + (i % 9),
                    bottleId: 60 + (i % 9),
                }
            })
        }
    }

    /**
     * 请求拍卖行物品数据
     * @param param 
     */
    onReqAuctionList(param) {
        let type = param.type
        let quality = param.quality

        let result = []
        for (let i = 0; i < this._auctionDataList.length; i++) {
            let propId = this._auctionDataList[i].propId
            let isType = !type || this._auctionDataList[i].type == type
            let isQuality = !quality || PropConfig[propId].quality == (quality - 1)

            //xiejinhui TODO 临时处理
            if (quality == 4 && PropConfig[propId].quality >= (quality - 1)) {
                isQuality = true
            }

            if (isType && isQuality) {
                result.push(this._auctionDataList[i])
            }
        }

        let page_num = param.page_num - 1
        let page_size = param.page_size

        result.sort(function (a, b) {

            let aPropConfig = PropConfig[a.propId]
            let bPropConfig = PropConfig[b.propId]

            //先根据品质排序
            if (bPropConfig.quality > aPropConfig.quality) {
                return 1
            } else if (bPropConfig.quality < aPropConfig.quality) {
                return -1
            } else {

                //品质相同  根据上架时间排序  
                return a.createTime - b.createTime
            }
        })

        let items = result.slice(page_num * page_size, (page_num + 1) * page_size)
        EventManager.instance.dispatchEvent("rspAuctionList", {
            items: items
        })
    }

    /**
     * 请求玩家竞拍过的物品数据
     */
    onReqMyAuctionList() {
        let result = []
        for (let i = 0; i < this._auctionDataList.length; i++) {
            if (this._auctionDataList[i].auctionCount != null) {
                result.push(this._auctionDataList[i])
            }
        }

        result.sort(function (a, b) {

            let aPropConfig = PropConfig[a.propId]
            let bPropConfig = PropConfig[b.propId]

            //先根据品质排序
            if (bPropConfig.quality > aPropConfig.quality) {
                return 1
            } else if (bPropConfig.quality < aPropConfig.quality) {
                return -1
            } else {

                //品质相同  根据上架时间排序  
                return a.createTime - b.createTime
            }
        })

        EventManager.instance.dispatchEvent("rspMyAuctionList", {
            items: result
        })
    }

    /**
     * 请求玩家上架的物品
     */
    onReqAuctionSaleList() {
        let result = []
        for (let i = 0; i < this._auctionDataList.length; i++) {
            if (this._auctionDataList[i].userId == UserDataManager.instance.getUserId()) {
                result.push(this._auctionDataList[i])
            }
        }

        result.sort(function (a, b) {
            //品质相同  根据上架时间排序  
            return a.createTime - b.createTime
        })

        EventManager.instance.dispatchEvent("rspMyAuctionSaleList", {
            items: result
        })
    }

    /**
     * 竞拍某个物品
     * @param param 
     */
    onReqAuctionAuctionItem(param)
    {
        for(let i  = 0; i < this._auctionDataList.length; i++)
        {

            if(param.id == this._auctionDataList[i].id)
            {
                this._auctionDataList[i].curPrice = 
                    Math.max(Math.floor(this._auctionDataList[i].curPrice * 1.1), this._auctionDataList[i].curPrice+ 1)
                this._auctionDataList[i].auctionCount++
                break
            }
        }

        EventManager.instance.dispatchEvent("rspAuctionAuctionItem",{})
    }

    /**
     * 一口价购买物品
     * @param param 
     */
    onReqAuctionBuyItem(param)
    {
        for(let i  = 0; i < this._auctionDataList.length; i++)
        {

            if(param.id == this._auctionDataList[i].id)
            {
                this._auctionDataList.splice(i,1)
                break
            }
        }

        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
            msg: "购买成功，物品将发送到邮件中",
        })

        EventManager.instance.dispatchEvent("rspAuctionBuyItem",{})

    }

    /**
     * 请求上架物品
     */
    private _index = 1
    onReqShelfItem(param) {
        //param
        // propId: this._itemData.propId,
        // type: this._itemType,
        // count: parseInt(countStr),
        // unitPrice: parseInt(unitPriceStr),
        // totalPriceStr: totalPriceStr == ""? null : parseInt(totalPriceStr),
        // shelfType: this._shelfType,
        // exData: exData

        let exData = param.type == ItemType.EXCode ? param.exData : null
        this._auctionDataList.push({
            id: 1500000+ this._index++,   //拍卖行唯一id
            userId: UserDataManager.instance.getUserId(),   //玩家id
            propId: param.propId,  //物品id
            type: param.type,  //拍卖行物品类型
            count: param.count, //数量
            createTime: new Date().getTime() / 1000, //上拍时间
            shelfType: param.shelfType,   //上架时长
            unitPrice: param.unitPrice,//单价
            curPrice: 0,//当前竞拍价格
            auctionCount: 0, //当前玩家竞拍次数
            totalPrice: param.totalPrice,
            exData: exData
        })

        EventManager.instance.dispatchEvent("rspAuctionShelfItem", {})
    }

    /**
     * 请求下拍物品
     */
    onReqRetrieveItem(param) {

        //传入拍卖id
        for(let i = 0; i < this._auctionDataList.length ; i++)
        {
            if(param.id == this._auctionDataList[i].id)
            {
                this._auctionDataList.splice(i,1)
                break
            }
        }

        EventManager.instance.dispatchEvent("rspAuctionRetrieveItem", {})
    }

    /**
     * 获取背包中可以拍卖的物品
     * @param type 
     * @returns 
     */
    getAuctionBagDataByType(type?) {
        let result = []
        let list = BagDataManager.instance.getBagDataByTag(type)
        for (let i = 0; i < list.length; i++) {
            let propId = list[i].propId
            if (list[i].type && list[i].type == ItemType.EXCode) {
                //兑换码
                result.push(list[i])
            } else if (PropConfig[propId].auction == 1) {
                //物品表中  可拍卖的物品
                result.push(list[i])
            }
        }
        return result
    }

    getAuctionTypeConfig() {
        return this._auctionTypeConfig
    }

    getAuctionQualityConfig() {
        return this._auctionQualityConfig
    }

    getAuctionSortTypeConfig() {
        return this._marketSortTypeConfig
    }

    getAuctionShelfDataByType(type) {
        if (!this._shelfTimeList) {
            this.getAuctionShelfTimeConfig()
        }

        if (this._shelfTimeList[type]) {
            return this._shelfTimeList[type]
        }
        return null
    }

    getAuctionShelfTimeConfig() {
        if (!this._auctionShelfTimeConfig) {
            this._shelfTimeList = []
            this._auctionShelfTimeConfig = []

            let list = Tool.getArrayParamConfig("auctionShelfTimeList")
            for (let i = 0; i < list.length; i++) {
                let shelfTimeList = list[i].split("_")
                this._shelfTimeList.push({
                    time: shelfTimeList[0],
                    cost: shelfTimeList[1],
                })
                this._auctionShelfTimeConfig.push({
                    index: i,
                    name: cc.js.formatStr("%s小时(%s%手续费)", shelfTimeList[0], shelfTimeList[1]),
                    value: i,
                    children: [],
                })
            }
        }
        return this._auctionShelfTimeConfig
    }

    reset() {
        EventManager.instance.removeTargetListener(this);
    }


    // private _auctionTypeConfig = [
    //     {
    //         index: 0,
    //         name: "全部",
    //         value: 0,
    //         children: [],
    //     },
    //     {
    //         index: 1,
    //         name: "酒类",
    //         value: null,
    //         children: [
    //             {
    //                 index: 2,
    //                 name: "酒液",
    //                 value: 4,
    //                 children: [],

    //             },
    //             {
    //                 index: 3,
    //                 name: "成品酒",
    //                 value: 100,
    //                 children: [],
    //             },
    //         ],
    //     },
    //     {
    //         index: 4,
    //         name: "家园类",
    //         value: null,
    //         children: [
    //             {
    //                 index: 5,
    //                 name: "房产",
    //                 value: 9,
    //                 children: [],
    //             },
    //         ],
    //     },
    // ]

    private _auctionTypeConfig = [
        {
            index: 0,
            name: "全部",
            value: 0,
            children: [],
        },
        {
            index: 1,
            name: "酒液",
            value: 4,
            children: [],

        },
        {
            index: 2,
            name: "成品酒",
            value: 100,
            children: [],
        },
        {
            index: 3,
            name: "房产",
            value: 9,
            children: [],
        },
    ]

    private _auctionQualityConfig = [
        {
            index: 0,
            name: "全部",
            value: 0,
            children: [],
        },
        {
            index: 1,
            name: "白色",
            value: 1,
            children: [],
        },
        {
            index: 2,
            name: "蓝色",
            value: 2,
            children: [],
        },
        {
            index: 3,
            name: "紫色",
            value: 3,
            children: [],
        },
        {
            index: 4,
            name: "橙色",
            value: 4,
            children: [],
        },
    ]

    private _marketSortTypeConfig = [
        {
            index: 0,
            name: "上级时间（↓）",
            value: 0,
            children: [],
        },
        {
            index: 1,
            name: "上级时间（↑）",
            value: 1,
            children: [],
        },
        {
            index: 2,
            name: "价格（↓）",
            value: 2,
            children: [],
        },
        {
            index: 3,
            name: "价格（↑）",
            value: 3,
            children: [],
        },
        {
            index: 4,
            name: "单价（↓）",
            value: 4,
            children: [],
        },
        {
            index: 5,
            name: "单价（↑）",
            value: 5,
            children: [],
        },
    ]

    private _auctionShelfTimeConfig = null
}