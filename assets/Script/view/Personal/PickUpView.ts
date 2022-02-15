import PropConfig from "../../config/PropConfig";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import PersonalManager from "../../data/personal/PersonalManager";
import EventManager from "../../framework/manager/EventManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";
import PackConfig from "../../config/PackConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PickUpVIew extends BaseView {

    @property(cc.Sprite)
    packIcon: cc.Sprite = null;

    @property(cc.Sprite)
    bottleIcon: cc.Sprite = null;

    @property(cc.Label)
    wineName1: cc.Label = null;

    @property(cc.Label)
    wineName2: cc.Label = null;

    @property(cc.Label)
    txtCount: cc.Label = null;
    
    @property(cc.Label)
    compositionDesc: cc.Label = null;

    @property(cc.Label)
    txtProductDate: cc.Label = null;

    @property(cc.Label)
    txtWineDesc: cc.Label = null;

    private _wineId = -1
    private _bottleId = 0
    private _packId = 0
    private _count = 0
    private _name = ""
    private _QRCode = ""

    initByExData(param)
    {
        this._wineId = param.wineId
        this._name = param.name
        this._count = param.count
        this._QRCode = param.QRCode
        this._bottleId = param.bottleId
        this._packId = param.packId
        this.updateView()
    }

    updateView()
    {
        let itemProp = PropConfig[this._wineId]

        //酒名
        this.wineName1.string = this._name
        this.wineName2.string = this._name

        //数量
        this.txtCount.string = cc.js.formatStr("数量：%d",this._count)

        //描述
        this.txtWineDesc.string = PersonalManager.instance.getWineDesc(this._wineId)

        //成分
        this.compositionDesc.string = cc.js.formatStr("酒精 > %s%\n小麦 > %s%\n高粱 > %s%",Tool.getRandomLimit(10,20),Tool.getRandomLimit(5,10),Tool.getRandomLimit(5,10))


        //出厂日期
        this.txtProductDate.string = PersonalManager.instance.getProductDateStr()
        
        Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s",PackConfig[this._bottleId].icon),this.bottleIcon)
        Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s",PackConfig[this._packId].icon),this.packIcon)
    }

    onClickPickUp()
    {
        this.onCloseView()

        if(cc.sys.os == cc.sys.OS_IOS)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.PickUpInfoView,
                exData:{
                    wineId: this._wineId,
                    name: this._name,
                    count: this._count,
                    QRCode: this._QRCode,
                    bottleId: this._bottleId,
                    packId: this._packId,
                }
            })
        }else{
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.PickUpInfoView2,
                exData:{
                    wineId: this._wineId,
                    name: this._name,
                    count: this._count,
                    QRCode: this._QRCode,
                    bottleId: this._bottleId,
                    packId: this._packId,
                }
            })
        }

    }

}
