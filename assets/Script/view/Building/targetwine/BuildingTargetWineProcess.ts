import PropConfig from "../../../config/PropConfig";
import { JumpType, MaterialType } from "../../../Constant/GameEnum";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";
import JumpManager from "../../../data/JumpManager";
import TargetWineDataManager from "../../../data/TargetWineDataManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import BaseView from "../../../framework/viewbase/BaseView";
import MaterialProcessItemView from "./MaterialProcessItemView";
import TargetWineItemView from "./TargetWineItemView";
import TargetWineProView from "./TargetWineProView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingTargetWineProcess extends BaseView {

    @property(TargetWineItemView)
    wineNode: TargetWineItemView = null;

    @property(cc.Node)
    materialItem: cc.Node = null;

    @property(cc.Node)
    zhiquLayout: cc.Node = null;

    @property(cc.Node)
    zhiquSucc: cc.Node = null;

    @property(cc.Node)
    kaojiuLayout: cc.Node = null;

    @property(cc.Node)
    kaojiuSucc: cc.Node = null;

    @property(cc.Node)
    niangjiuLayout: cc.Node = null;

    @property(cc.Node)
    niangjiuSucc: cc.Node = null;

    @property(cc.Button)
    confirmBtn: cc.Button = null;

    @property(cc.Button)
    joinBtn: cc.Button = null;

    @property(TargetWineProView)
    TargetWineProList: TargetWineProView[] = [];

    private _curWineId = 0
    
    private _zhiquList = []
    private _kaojiuList = []
    private _niangjiuList = []

    private _processData = null

    onLoad()
    {
        this.updateView()
    }

    updateView()
    {
        this._curWineId = TargetWineDataManager.instance.getTargetWineId()
        if(this._curWineId > 0)
        {
            this.wineNode.updateView(this._curWineId)

            this.initNeedData()
        }
    }

    initNeedData()
    {
        this._processData = TargetWineDataManager.instance.getTargetWineProcessData()
        if(this._processData)
        {
            this._zhiquList = this._processData.zhiquList
            this._kaojiuList = this._processData.kaojiuList
            this._niangjiuList = this._processData.niangjiuList

            this.zhiquSucc.active = this._processData.zhiquEnough
            this.kaojiuSucc.active = this._processData.kaojiuEnough
            this.niangjiuSucc.active = this._processData.niangjiuEnough

            this.confirmBtn.interactable = this._processData.noEnoughList.length == 0
            this.joinBtn.interactable = this._processData.noEnoughList.length != 0

            this.updateMaterialView(this._zhiquList,this.zhiquLayout)
            this.updateMaterialView(this._kaojiuList,this.kaojiuLayout)
            this.updateMaterialView(this._niangjiuList,this.niangjiuLayout)

            this.TargetWineProList[0].updateView(this._zhiquList)
            this.TargetWineProList[1].updateView(this._kaojiuList)
            this.TargetWineProList[2].updateView(this._niangjiuList)
        }

    }

    updateMaterialView(arr,parent)
    {
        for(let i = 0; i < arr.length; i++)
        {
            let item = cc.instantiate(this.materialItem)
            item.y = 0
            item.parent = parent
            item.getComponent(MaterialProcessItemView).updateView(arr[i],this.jumpMaterial.bind(this))
        }
    }

    onClickConfirm(){
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        this.jumpMaterial()
    }

    onClickJoin()
    {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        this.jumpMaterial()
    }

    getJumpPropId()
    {

        for(let i = 0; i < this._zhiquList.length; i++)
        {
            if(this._zhiquList[i].curCount / this._zhiquList[i].totalCount < 1)
            {
                return this._zhiquList[i].propId
            }
        }

        return this._processData.noEnoughList[0]
    }

    jumpMaterial(id?)
    {
        this.onCloseView()
        EventManager.instance.dispatchEvent(EventEnum.CLOSE_POPUP_BYNAME,PrefabPathEnum.BuildingTargetWineSelect)
        EventManager.instance.dispatchEvent(EventEnum.CLOSE_POPUP_BYNAME,PrefabPathEnum.BuildingTargetWineInfo)

        let propId = 0
        let list = this._processData.noEnoughList
        let materialType = 0
        let jumpType = 0

        if(!id)
        {
            if(list.length > 0)
            {
                propId = this.getJumpPropId()
                materialType = PropConfig[propId].subId
            }
        }else{
            propId = id
            materialType = PropConfig[propId].subId
        }

        switch(materialType)
        {
            case MaterialType.Water:
                jumpType = JumpType.Water
                break
            case MaterialType.Wheat:
            case MaterialType.Sorghum:
                jumpType = JumpType.Farm
                break
            case MaterialType.Qu:
                jumpType = JumpType.ZhiQu
                break
            case MaterialType.OldWine:
                jumpType = JumpType.KaoJiu
                break
            default:
                jumpType = JumpType.Wine
                break
        }

        JumpManager.instance.jumpViewByType(jumpType)
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "JumpMaterialFinish"
        })
    }
    
}