import { CustomEventEnum } from "../../../Constant/CustomEventEnum";
import { WineTabType } from "../../../Constant/GameEnum";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";
import TargetWineDataManager from "../../../data/TargetWineDataManager";
import List from "../../../framework/component/List";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import BaseView from "../../../framework/viewbase/BaseView";
import TargetWineItemView from "./TargetWineItemView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingTargetWineSelect extends BaseView {

    @property(TargetWineItemView)
    wineNode: TargetWineItemView = null;

    @property(List)
    list: List = null;

    @property(cc.ScrollView)
    tagList: cc.ScrollView = null;

    @property(cc.Node)
    confirmBtn: cc.Node = null;

    private _curTag: WineTabType = WineTabType.ALL //0全部  1金沙古酒  2百年慎初  3慎初斗酒
    private _curWineId = 0

    private _wineDataList = []

    onLoad()
    {
        // this.onClickRight()
        this.updateView()
    }

    updateView()
    {
        this._wineDataList = TargetWineDataManager.instance.getTargetWineListByType(this._curTag)
        if(this._wineDataList.length > 0)
        {
            this.list.numItems = this._wineDataList.length
            this._curWineId = this._wineDataList[0].id
            this.updateWineInfo()
        }else[
            this.list.numItems = 0
        ]
    }

    updateWineInfo()
    {
        this.confirmBtn.active = false

        if(this._curWineId != 0)
        {
            this.confirmBtn.active = true
            this.wineNode.updateView(this._curWineId)
        }
    }


    onRenderEvent(item: cc.Node, index: number) {
        item.getComponent(TargetWineItemView).updateView(this._wineDataList[index].id)
    }

    onSelectEvent(item: cc.Node, selectIndex: number, lastIndex: number) {
        this._curWineId = this._wineDataList[selectIndex].id
        this.updateWineInfo()
    }

    onClickWine()
    {
        //打开成品酒信息页面

        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.BuildingTargetWineInfo,
            exData:{
                wineId: this._curWineId
            },
        })
    }

    onClickTag(event,index)
    {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_TOGGLE)
        this._curTag = index
        if(index >= 2)
        {
            this.tagList.scrollToPercentHorizontal(1,0.5)
        }else{
            this.tagList.scrollToPercentHorizontal(0,0.5)
        }
        this.updateView()
    }

    onClickLeft()
    {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        this.tagList.scrollToPercentHorizontal(0,0.5)
    }

    onClickRight()
    {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        this.tagList.scrollToPercentHorizontal(1,0.5)
    }

    onClickConfirm(){
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        //开始酿造
        EventManager.instance.dispatchEvent(CustomEventEnum.TARGET_SET_WINE,{
            targetWineId: this._curWineId
        })
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.BuildingTargetWineProcess,
        })
    }
    
}