import ShopManager from "../../data/auction/ShopManager";
import List from "../../framework/component/List";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import ShopItem from "./ShopItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DailyShopView extends cc.Component {

    @property(cc.Label)
    txtUpdateTime: cc.Label = null;

    @property(List)
    list: List = null;

    private _shopDataList = []

    onEnable()
    {
        EventManager.instance.addEventListener("rspShopList",this.onRspShopList,this)
        EventManager.instance.addEventListener("rspBuyShopItem",this.reqShopData,this)
        EventManager.instance.addEventListener("rspUpdateShopList",this.reqShopData,this)

        this.schedule(this.updateTime,1)
    }

    onDisable() {
        EventManager.instance.removeTargetListener(this)
        this.unscheduleAllCallbacks()
    }

    initView()
    {
        this.reqShopData()
        this.updateView()
    }
    
    updateView()
    {
        this.list.numItems = this._shopDataList.length
    }

    updateTime()
    {
        let time = new Date().setHours(24, 0, 0, 0) - new Date().getTime()
        this.txtUpdateTime.string = cc.js.formatStr("刷新时间  %s",Tool.formatTime(time * 0.001))

    }

    onRenderEvent(item: cc.Node, index: number) {
        item.getComponent(ShopItem).updateView(this._shopDataList[index])
    }

    onRspShopList(eventData) {
        if(eventData.error_code) {
            return
        }
        this._shopDataList = eventData.items
        this.updateView()
    }

    reqShopData()
    {
        EventManager.instance.dispatchEvent("reqShopList", {
            type: 1,
        })
    }

    onClickUpdate()
    {
        if(!ShopManager.instance.checkDailyShopIsBuy())
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "未购买物品，不需要更新每日商店！"
            })
            return
        }

        //刷新物品
        EventManager.instance.dispatchEvent("reqUpdateShopList", {
            type: 0,
        })
    }
  
}
