import PackConfig from "../../config/PackConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import {MailType } from "../../Constant/GameEnum";
import MailDataManager from "../../data/MailDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";
import BagItemView from "../Bag/BagItemView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MailInfoView extends BaseView {

    @property(cc.Node  )
    mailNodeList: cc.Node[] = [];

    @property(cc.Label  )
    titleLabel: cc.Label = null;

    @property(cc.Label  )
    addresseeLabel: cc.Label = null;

    @property(cc.Label  )
    dateLabel: cc.Label = null;
    
    @property(cc.Label  )
    contentLabel: cc.Label = null;
    
    @property(cc.Node)
    rewardItem: cc.Node = null;

    @property(cc.Node)
    rewardLayout: cc.Node = null;

    @property(cc.Node)
    detailNode: cc.Node = null;

    @property(cc.Sprite)
    bottleIcon: cc.Sprite = null;
    
    @property(cc.Sprite)
    packIcon: cc.Sprite = null;

    @property(cc.Label)
    QRCode: cc.Label = null;

    @property(cc.Node)
    getBtn: cc.Node = null;

    @property(cc.Node)
    deleteBtn: cc.Node = null;


    private _mailData = null

    onEnable()
    {
        EventManager.instance.addEventListener(CustomEventEnum.MAIL_UPDTAE_VIEW,this.updateView,this)
    }

    onDisable()
    {
        EventManager.instance.removeTargetListener(this)
    }

    initByExData(exData: any): void {
        this._mailData = exData.mailData
        this.updateView()
    }

    updateView()
    {
        this.rewardLayout.removeAllChildren()

        let type = this._mailData.type
        this.mailNodeList[0].active = false
        this.mailNodeList[1].active = false
        this.mailNodeList[2].active = false
        if(type == MailType.Normal)
        {
            this.mailNodeList[0].active = true
            this.addresseeLabel.string = cc.js.formatStr("发件人:%s",Tool.cuttingString(this._mailData.addressee,6))
            this.detailNode.height = 500
        }else if(type == MailType.Reward){
            this.mailNodeList[1].active = true
            this.addresseeLabel.string = cc.js.formatStr("发件人:%s",Tool.cuttingString(this._mailData.addressee,6))
            this.detailNode.height = 330
            let propList = this._mailData.itemList
            for(let i = 0; i < propList.length; i++)
            {
                let item = cc.instantiate(this.rewardItem)
                let com = item.getComponentInChildren(BagItemView)
                com.updateView({
                    propId: propList[i].propId,
                    showName: true,
                    customNum: propList[i].customNum,
                    hideClick: false,
                })
                item.parent = this.rewardLayout
            }

            this.getBtn.active = propList.length > 0
            this.deleteBtn.active = propList.length == 0
        }else{
            this.mailNodeList[2].active = true
            this.addresseeLabel.string = cc.js.formatStr("发件人:%s",Tool.cuttingString(this._mailData.addressee,6))
            this.detailNode.height = 250

            if(this._mailData.exData)
            {
                let data = this._mailData.exData
                Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s",PackConfig[data.bottleId].icon),this.bottleIcon)
                Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s",PackConfig[data.packId].icon),this.packIcon)
                this.QRCode.string = data.QRCode
            }
        }

        this.titleLabel.string = this._mailData.title

        this.contentLabel.string = this._mailData.content

        this.dateLabel.string = Tool.formatDate("yyyy-MM-dd HH:mm:ss",this._mailData.timeStamp)
    }

    onClickGetAll(){
        this.onCloseView()
       MailDataManager.instance.onReqMailGetItem(this._mailData.id)
    }

    onClickDelete(){
        this.onCloseView()
        MailDataManager.instance.onReqMailDelete(this._mailData.id)
    }

    onClickCopy()
    {
        if(this.QRCode.string != "" && Tool.webCopyString(this.QRCode.string))
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "复制成功"
            })
        }
    }
    
}