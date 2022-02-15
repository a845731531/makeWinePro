import MarketManager from "../../data/auction/MarketManager";
import List from "../../framework/component/List";
import EventManager from "../../framework/manager/EventManager";
import DropdownBox from "../Common/DropDownBox";
import MarketItem from "./MarketItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MarketView1 extends cc.Component {

    @property(DropdownBox)
    typeDropDown: DropdownBox = null;

    @property(DropdownBox)
    qualityDropDown: DropdownBox = null;

    @property(DropdownBox)
    sortDropDown: DropdownBox = null;

    @property(cc.Node)
    txtTips: cc.Node = null;

    @property(List)
    list: List = null;

    /**
     * 下拉框物品类型
     */
    private curType = 0

    /**
     * 下拉框品质类型
     */
    private curQuality = 0

    /**
     * 当前排序类型
     */
    private sortType = 0

    /**
     * 当前分页数据
     */
    private _auctionDataList = []

    /**
     * 当前分页数据大小
     */
    private pageItemNum = 20

    /**
     * 当前分页
     */
    private curPage = 1

    onEnable()
    {
        EventManager.instance.addEventListener("rspMarketList",this.onRspAuctionList,this)

        EventManager.instance.addEventListener("rspMarketBuyItem",this.onRspAuctionDataChange,this)

        this.schedule(this.updateView,1)

    }

    onDisable() {
        EventManager.instance.removeTargetListener(this)
        this.unscheduleAllCallbacks()
    }

    start()
    {
        this.typeDropDown.initDropDownBox(MarketManager.instance.getMarketTypeConfig(),this.onSelectType.bind(this))
        this.qualityDropDown.initDropDownBox(MarketManager.instance.getMarketQualityConfig(),this.onSelectQuality.bind(this))
        this.sortDropDown.initDropDownBox(MarketManager.instance.getMarketSortTypeConfig(),this.onSelectSort.bind(this))
    }

    initView()
    {
        //请求首次打开数据
        this.reqFirstData()
        this.updateView()
    }
    
    updateView()
    {
        this.list.numItems = this._auctionDataList.length
        this.txtTips.active = this._auctionDataList.length == 0
    }

    onRenderEvent(item: cc.Node, index: number) {
        item.getComponent(MarketItem).updateView(this._auctionDataList[index])
    }

    onRspAuctionDataChange(eventData)
    {
        if(eventData.error_code) {
            return
        }
        this.reqFirstData()
    }

    onRspAuctionList(eventData) {
        if(eventData.error_code) {
            return
        }
        this._auctionDataList = this._auctionDataList.concat(eventData.items)
        this.updateView()
    }

    onScrollEvent(sender, event) {
        if(event == cc.ScrollView.EventType.BOUNCE_BOTTOM) {
            this.reqNextData()
        } 
    }

    reqFirstData()
    {
        this.curPage = 1
        this._auctionDataList = []
        EventManager.instance.dispatchEvent("reqMarketList", {
            type: this.curType,
            quality: this.curQuality,
            page_num: this.curPage,
            page_size: this.pageItemNum,
            sortType: this.sortType,
        })
    }

    reqNextData() {
        EventManager.instance.dispatchEvent("reqMarketList", {
            type: this.curType,
            quality: this.curQuality,
            page_num: ++this.curPage,
            page_size: this.pageItemNum,
            sortType: this.sortType,
        })
    }

    onSelectType(type)
    {
        this.curType = type
        this.reqFirstData()
    }

    onSelectQuality(quality)
    {
        this.curQuality = parseInt(quality)
        this.reqFirstData()
    }

    onSelectSort(sortType)
    {

        this.sortType = parseInt(sortType)
        this.reqFirstData()

    }

    // onClickSort()
    // {
    //     //逆序上架时间
    //     this._auctionDataList = this._auctionDataList.reverse()
    //     this.updateView()
    // }
  
}
