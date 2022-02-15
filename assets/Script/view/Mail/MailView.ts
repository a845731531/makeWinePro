import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import MailDataManager from "../../data/MailDataManager";
import List from "../../framework/component/List";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import BaseView from "../../framework/viewbase/BaseView";
import MailItemView from "./MailItemView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MailView extends BaseView {

    @property(List)
    list: List = null;

    @property(cc.Node)
    tipsNode: cc.Node = null;

    private _mailList = []

    onLoad()
    {
        this.addListener()
        this.updateview()
    }

    addListener()
    {
        EventManager.instance.addEventListener(CustomEventEnum.MAIL_UPDTAE_VIEW,this.updateview,this)
    }

    updateview()
    {
        this._mailList = MailDataManager.instance.getMailList()
        this.list.numItems = this._mailList.length

        this.tipsNode.active = this._mailList.length == 0
    }

    onRenderEvent(item: cc.Node, index: number) {
        item.getComponent(MailItemView).updateView(this._mailList[index])
    }

    onSelectEvent(item: cc.Node, selectIndex: number, lastIndex: number) {

        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName:PrefabPathEnum.MailInfoView,
            exData:{
                mailData: this._mailList[selectIndex]
            }
        })
        
        MailDataManager.instance.onReqMailRead(this._mailList[selectIndex].id)

    }

    onClickGetAll(){
       MailDataManager.instance.onReqMailGetAll()
    }

    onClickDelete(){
        MailDataManager.instance.onReqMailDeleteAll()
    }

    removeListener()
    {
        EventManager.instance.removeTargetListener(this)
    }

    onDestroy()
    {
        this.removeListener()
    }
    
}