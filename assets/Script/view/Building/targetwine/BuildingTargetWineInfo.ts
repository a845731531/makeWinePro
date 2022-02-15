import ProductConfig from "../../../config/ProductConfig";
import PropConfig from "../../../config/PropConfig";
import { CustomEventEnum } from "../../../Constant/CustomEventEnum";
import { MaterialType } from "../../../Constant/GameEnum";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";
import TargetWineDataManager from "../../../data/TargetWineDataManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import { Tool } from "../../../framework/manager/Tool";
import BaseView from "../../../framework/viewbase/BaseView";
import MaterialItemView from "./MaterialItemView";
import TargetWineItemView from "./TargetWineItemView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingTargetWineInfo extends BaseView {

    @property(TargetWineItemView)
    wineNode: TargetWineItemView = null;

    @property(cc.Node)
    materialItem: cc.Node = null;

    @property(cc.Node)
    yuanliaoLayout: cc.Node = null;

    @property(cc.Node)
    quLayout: cc.Node = null;

    @property(cc.Node)
    zhenjiuLayout: cc.Node = null;

    private _curWineId = 0

    private _yuanliaoList = []
    private _quList = []
    private _zhenjiuList = []

    onLoad()
    {

    }

    initByExData(param)
    {
        this._curWineId = param.wineId
        if(this._curWineId > 0)
        {
            this.wineNode.updateView(this._curWineId)

            this.initNeedData()
            this.updateMaterialView(this._yuanliaoList,this.yuanliaoLayout)
            this.updateMaterialView(this._quList,this.quLayout)
            this.updateMaterialView(this._zhenjiuList,this.zhenjiuLayout)
        }
    }

    initNeedData()
    {
        let needData = TargetWineDataManager.instance.calculateOriginNeedById(this._curWineId)

        for(let i in needData)
        {
            switch(PropConfig[i].subId)
            {
                case MaterialType.Water:
                case MaterialType.Wheat:
                case MaterialType.Sorghum:
                    this._yuanliaoList.push({
                        propId: i,
                        curCount: 0,
                        totalCount: needData[i]
                    })
                    break
                case MaterialType.Qu:
                    this._quList.push({
                        propId: i,
                        curCount: 0,
                        totalCount: needData[i]
                    })
                    break
            }
        }

        let oldWineList = Tool.convertStrToList(ProductConfig[PropConfig[this._curWineId].subId].materials)
        for(let i = 0; i < oldWineList.length; i++)
        {
            this._zhenjiuList.push({
                propId: oldWineList[i].propId,
                curCount: 0,
                totalCount: oldWineList[i].num * TargetWineDataManager.instance.getTargetWineContainer()
            })
        }

        this._yuanliaoList.sort((a,b)=>{
            return a.propId - b.propId
        })
        this._quList.sort((a,b)=>{
            return a.propId - b.propId
        })
        this._zhenjiuList.sort((a,b)=>{
            return a.propId - b.propId
        })
    }

    updateMaterialView(arr,parent)
    {
        for(let i = 0; i < arr.length; i++)
        {
            let item = cc.instantiate(this.materialItem)
            item.parent = parent
            item.getComponent(MaterialItemView).updateView(arr[i])
        }
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
        this.onCloseView()
    }
    
}