import { NetMsgDef } from "../../../resources/pb/NetMsgDef";
import EventManager from "../../framework/manager/EventManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";
import PackConfig from "../../config/PackConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PickUpInfoVIew2 extends BaseView {

    @property(cc.Sprite)
    bottleIcon: cc.Sprite = null;

    @property(cc.Sprite)
    packIcon: cc.Sprite = null;

    @property(cc.Label)
    wineName: cc.Label = null;

    @property(cc.Label)
    txtCount: cc.Label = null;

    @property(cc.Label)
    txtQRCode: cc.Label = null;

    private _wineId = -1
    private _count = 0
    private _name = ""
    private _QRCode = ""
    private _bottleId = 0
    private _packId = 0

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

        //酒名
        this.wineName.string = this._name

        //数量
        this.txtCount.string = cc.js.formatStr("数量：%d",this._count)

        //兑换码
        this.txtQRCode.string = this._QRCode + ""
        
        Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s",PackConfig[this._bottleId].icon),this.bottleIcon)
        Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s",PackConfig[this._packId].icon),this.packIcon)
    }

    onClickPickUp()
    {
        NetManager.instance.sendMsg(NetMsgDef.Personal_REQ_PICK_UP_USERINFO)
        
        EventManager.instance.dispatchEvent(NetMsgDef.Personal_RSP_PICK_UP_USERINFO,{
            wineName: this._name,
            userName: "",
            phone: "",
            QQ: "",
            Wx: "",
        })
        this.onCloseView()
    }

    onClickCopy()
    {
        if(Tool.webCopyString(this._QRCode))
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "复制成功"
            })
        }
    }

}
