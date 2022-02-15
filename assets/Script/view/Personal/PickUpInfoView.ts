import { NetMsgDef } from "../../../resources/pb/NetMsgDef";
import PropConfig from "../../config/PropConfig";
import PersonalManager from "../../data/personal/PersonalManager";
import EventManager from "../../framework/manager/EventManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";
import JudgeConfig from "../../config/JudgeConfig";
import WineQualilyConfig from "../../config/WineQualilyConfig";
import PackConfig from "../../config/PackConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PickUpInfoVIew extends BaseView {

    @property(cc.Sprite)
    bottleIcon: cc.Sprite = null;

    @property(cc.Sprite)
    packIcon: cc.Sprite = null;

    @property(cc.Label)
    wineName: cc.Label = null;

    @property(cc.Label)
    txtCount: cc.Label = null;

    @property(cc.Label)
    txtWineDesc: cc.Label = null;

    @property(cc.Label)
    txtQRCode: cc.Label = null;

    @property(cc.EditBox)
    edName: cc.EditBox = null;

    @property(cc.EditBox)
    edPhone: cc.EditBox = null;

    @property(cc.EditBox)
    edQQ: cc.EditBox = null;

    @property(cc.EditBox)
    edWx: cc.EditBox = null;

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
        //输入框默认值
        this.edName.string = PersonalManager.instance.getEditBoxCache("userName")
        this.edPhone.string = PersonalManager.instance.getEditBoxCache("phone")
        this.edQQ.string = PersonalManager.instance.getEditBoxCache("QQ")
        this.edWx.string = PersonalManager.instance.getEditBoxCache("Wx")

        //酒名
        this.wineName.string = this._name

        //数量
        this.txtCount.string = cc.js.formatStr("数量：%d",this._count)

        //描述
        this.txtWineDesc.string = PersonalManager.instance.getWineDesc(this._wineId)

        //兑换码
        this.txtQRCode.string = this._QRCode + ""
        
        Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s",PackConfig[this._bottleId].icon),this.bottleIcon)
        Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s",PackConfig[this._packId].icon),this.packIcon)
    }

    onClickPickUp()
    {

        if(this.edName.string == "" || this.edName.string == null || this.edName.string == undefined)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "姓名不能为空！"
            })
            return
        }

        if(this.edPhone.string == "" || this.edPhone.string == null || this.edPhone.string == undefined)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "手机不能为空！"
            })            
            return
        }

        if(!Tool.isPhoneNumber(this.edPhone.string))
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "请输入有效的手机号码！"
            })            
            return
        }
        
        NetManager.instance.sendMsg(NetMsgDef.Personal_REQ_PICK_UP_USERINFO)
        
        EventManager.instance.dispatchEvent(NetMsgDef.Personal_RSP_PICK_UP_USERINFO,{
            wineName: this._name,
            userName: this.edName.string,
            phone: this.edPhone.string,
            QQ: this.edQQ.string || "",
            Wx: this.edWx.string || "",
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
