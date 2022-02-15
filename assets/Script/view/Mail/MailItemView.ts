import { MailStateType, MailType } from "../../Constant/GameEnum";
import UserDataManager from "../../data/UserDataManager";
import { Tool } from "../../framework/manager/Tool";
import BagItemView from "../Bag/BagItemView";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MailItemView extends cc.Component {

    @property(cc.Node)
    bgList: cc.Node[] = []

    @property(cc.Node)
    mailIconList: cc.Node[] = []

    @property(cc.Node)
    shengluehaoList: cc.Node[] = []

    @property(cc.Label)
    addresseeLabel: cc.Label = null

    @property(cc.Label)
    titleLabel: cc.Label = null

    @property(cc.Label)
    expireLabel: cc.Label = null

    @property(cc.Label)
    dateLabel: cc.Label = null

    @property(cc.Node)
    rewardItem: cc.Node[] = []

    private _mailData = null

    updateView(mailData)
    {

        this.node.active = true

        this._mailData = mailData

        this.addresseeLabel.string = cc.js.formatStr("发件人:%s",Tool.cuttingString(this._mailData.addressee,7,""))
        this.shengluehaoList[1].active = this._mailData.addressee.length > 7

        this.titleLabel.string = Tool.cuttingString(this._mailData.title,8,"")

        this.rewardItem[0].active = false

        let propList = this._mailData.itemList
        this.shengluehaoList[1].active = propList.length > 2
        if(propList[0])
        {
            this.rewardItem[0].active = true
            this.rewardItem[0].getComponent(BagItemView).updateView({
                propId: propList[0].propId,
                showName: true,
                customNum: propList[0].customNum,
                hideClick: true,
            })
        }

        let state = this._mailData.state
        this.bgList[0].active = state == MailStateType.NoRead
        this.bgList[1].active = state != MailStateType.NoRead && propList.length != 0
        this.bgList[2].active = state != MailStateType.NoRead && propList.length == 0

        this.mailIconList[0].active = state == MailStateType.NoRead
        this.mailIconList[1].active = state !=  MailStateType.NoRead

        this.expireLabel.string = cc.js.formatStr("剩余%s",Tool.formatTime(this._mailData.expireTimeStamp / 1000))

        this.dateLabel.string = Tool.formatDate("yyyy.MM.dd",this._mailData.timeStamp)

    }

    onClickDelete(){
       
    }
    
}