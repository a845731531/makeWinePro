import ShopConfig from "../../config/ShopConfig";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import BaseDataManager from "../BaseDataManager";

export default class ShopManager extends BaseDataManager {

    private static _instance: ShopManager = null;

    public static get instance(): ShopManager {
        if (this._instance == null) {
            this._instance = new ShopManager();
        }
        return this._instance;
    }

    /**
     * 今日商店物品列表
     */
    private _dailyShopList = null

    addNetListener(): void {
        EventManager.instance.addEventListener("reqShopList", this.onReqShopList, this, -1)
        EventManager.instance.addEventListener("reqBuyShopItem", this.onReqBuyShopItem, this, -1)
        EventManager.instance.addEventListener("reqUpdateShopList", this.onReqUpdateShopList, this, -1)
    }

    /**
     * 检查今日商店物品是否被购买过
     */
    checkDailyShopIsBuy()
    {
        for(let i = 0; i < this._dailyShopList.length; i++)
        {
            if(this._dailyShopList[i].state == 1)
            {
                return true
            }
        }
        return false
    }

    onReqShopList(param)
    {
        if(this._dailyShopList == null)
        {
            this._dailyShopList = []
            for(let i in ShopConfig)
            {
                if(ShopConfig[i].type == param.type)
                {
                    let itemStrList = ShopConfig[i].item.split("_")
                    this._dailyShopList.push({
                        id: ShopConfig[i].id,
                        propId: parseInt(itemStrList[0]),
                        count: parseInt(itemStrList[1]),
                        discountStr: ShopConfig[i].discount == 1? "" : cc.js.formatStr("-%s%",Math.floor((1 - ShopConfig[i].discount) * 100)),
                        price: ShopConfig[i].unitPrice * parseInt(itemStrList[1]) * ShopConfig[i].discount,
                        state: 0, //0未购买 1已购买
                    })
                }
            }
        }

        EventManager.instance.dispatchEvent("rspShopList",{
            items: this._dailyShopList
        })
    }

    onReqBuyShopItem(param)
    {

        for(let i in this._dailyShopList)
        {
            if(this._dailyShopList[i].id == param.id)
            {
                this._dailyShopList[i].state = 1

                //恭喜获得
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                    viewName: PrefabPathEnum.CongratulationsView,
                    exData:{
                        propList: [
                            {
                                propId: this._dailyShopList[i].propId,
                                customNum: this._dailyShopList[i].count,
                            },
                        ]
                    }
                })

                EventManager.instance.dispatchEvent("rspBuyShopItem",{})
                break
            }
        }

    }

    onReqUpdateShopList()
    {
        for(let i in this._dailyShopList)
        {
            this._dailyShopList[i].state = 0
        }

        EventManager.instance.dispatchEvent("rspUpdateShopList",{})
    }
  
    reset() {
        EventManager.instance.removeTargetListener(this);
    }

}