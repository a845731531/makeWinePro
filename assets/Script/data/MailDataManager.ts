import { CustomEventEnum } from "../Constant/CustomEventEnum";
import { MailStateType, MailType } from "../Constant/GameEnum";
import { PrefabPathEnum } from "../Constant/PrefabPathEnum";
import { EventEnum } from "../framework/FrameWorkEnum";
import EventManager from "../framework/manager/EventManager";
import { NetManager } from "../framework/network/NetManager";
import BaseDataManager from "./BaseDataManager";

export default class MailDataManager extends BaseDataManager {
    private static _instance: MailDataManager = null;
    public static get instance(): MailDataManager {
        if (this._instance == null) {
            this._instance = new MailDataManager();
        }
        return this._instance;
    }

    private _mailList = []

    constructor() {
        super();

        this.reset();
    }

    reset() {
        super.reset()
    }

    addNetListener() {
        EventManager.instance.addEventListener("stAddListListMailUserCmd", this.onRspMailList, this, -1)
        EventManager.instance.addEventListener("stReadTollMailUserCmd", this.onRspMailRead, this, -1)
        EventManager.instance.addEventListener("stRemoveItemMailUserCmd", this.onRspGetItem, this, -1)
        EventManager.instance.addEventListener("stRetMailPageMailUserCmd", this.onRspGetAllItem, this, -1)
        EventManager.instance.addEventListener("stDelMailUserCmd", this.onRspMailDelete, this, -1)
    }

    convertMailData(serverData) {
        let content = ""
        let exData = {}
        let mailType = serverData.type
        if(mailType == MailType.QRCode)
        {
            let jsonData = JSON.parse(serverData.text)
            exData = {
                QRCode: jsonData.QRCode,//兑换码
                bottleId: jsonData.bottleId,//瓶子id
                packId: jsonData.packId,//包装id
            }
            content = jsonData.texts
        }else{
            mailType = (serverData.item.length > 0 || serverData.state == MailStateType.HasGet) ? MailType.Reward : MailType.Normal
            content = serverData.text
        }

        let itemList = []
        for(let i = 0; i < serverData.item.length; i++)
        {
            itemList.push({
                createid: serverData.item[i].createid,
                qwThisID: serverData.item[i].qwThisID,
                propId: serverData.item[i].dwObjectID,
                customNum: serverData.item[i].dwNum,
                pos: serverData.item[i].pos
            })
        }

        let mailData = {
            id: serverData.mailid,
            type: mailType,
            state: serverData.state,
            addressee: serverData.fromname,
            title: serverData.subject,
            content: serverData.text,
            itemList: itemList,
            exData: exData,
            timeStamp: serverData.createtime * 60000,
            expireTimeStamp: serverData.leftTime * 60000,
        }
        return mailData
    }

    onRspMailList(eventData) {
        this._mailList = []
        for(let i = 0, len = eventData.data.length; i < len; i++) {
            let itemData = eventData.data[i]
            this._mailList.push(this.convertMailData(itemData))
        }
    }

    onRspMailRead(eventData)
    {
        for(let i = 0; i < this._mailList.length; i++)
        {
            if(this._mailList[i].id == eventData.mailid)
            {
                console.log("邮件已读   id:"+eventData.mailid)
                this._mailList[i].state = MailStateType.HasRead
                EventManager.instance.dispatchEvent(CustomEventEnum.MAIL_UPDTAE_VIEW)
                return
            }
        }
    }

    onRspGetItem(eventData)
    {
        let propList = []
        for(let i = 0; i < this._mailList.length; i++)
        {
            if(this._mailList[i].id == eventData.mailid)
            {
                console.log("邮件附件已经领取   id:"+eventData.mailid)
                for(let k = 0; k < this._mailList[i].itemList.length; i++)
                {
                    propList.push({
                        propId: this._mailList[i].itemList[k].propId,
                        customNum: this._mailList[i].itemList[k].customNum
                    })
                }
                this._mailList[i].itemList = []
                this._mailList[i].state = MailStateType.HasGet
                break
            }
        }
        
        if(propList.length > 0)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.CongratulationsView,
                exData:{
                    propList: propList,
                    closeBack: () => {}
                }
            })
        }

        EventManager.instance.dispatchEvent(CustomEventEnum.MAIL_UPDTAE_VIEW)
    }

    onRspGetAllItem(eventData)
    {
        let propList = []
        let propMap = {}
        for(let i = 0; i < this._mailList.length; i++)
        {
            if(eventData.mailid && eventData.mailid.length > 0)
            {
                for(let k = 0; k < eventData.mailid.length; k++)
                {
                    if(this._mailList[i].id == eventData.mailid[k])
                    {
                        console.log("邮件附件已经领取   id:"+eventData.mailid[k])

                        for(let j = 0; j < this._mailList[i].itemList.length; i++)
                        {
                            let id = this._mailList[i].itemList[j].propId
                            if(!propMap[id])
                            {
                                propMap[id] = this._mailList[i].itemList[j].customNum
                            }else{
                                propMap[id] += this._mailList[i].itemList[j].customNum
                            }
                        }

                        this._mailList[i].itemList = []
                        this._mailList[i].state = MailStateType.HasGet
                    }
                }
            }
        }
    
        for(let i in propMap)
        {
            propList.push({
                propId: parseInt(i),
                customNum: propMap[i]
            })
        }
        if(propList.length > 0)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.CongratulationsView,
                exData:{
                    propList: propList,
                    closeBack: () => {}
                }
            })
        }

        EventManager.instance.dispatchEvent(CustomEventEnum.MAIL_UPDTAE_VIEW)
    }

    onRspMailDelete(eventData)
    {
        for(let k = 0; k < eventData.mailid.length; k++)
        {
            this.deleteMailData(eventData.mailid[k])
        }
        EventManager.instance.dispatchEvent(CustomEventEnum.MAIL_UPDTAE_VIEW)
    }

    deleteMailData(id)
    {
        for(let i = 0; i < this._mailList.length; i++)
        {
            if(this._mailList[i].id == id)
            {
                this._mailList.splice(i,1)
                console.log("邮件删除   id:"+id)
                return
            }
        }
    }

    getMailList() {
        this._mailList.sort((a, b) => {
            if (a.state < b.state) {
                return -1
            } else if (b.state < a.state) {
                return 1
            } else {
                if (b.itemList.length > 0 && a.itemList.length > 0) {
                    return b.timeStamp - a.timeStamp
                } else if (b.itemList.length == 0 && a.itemList.length == 0) {
                    return b.timeStamp - a.timeStamp
                } else if (a.itemList.length > 0) {
                    return -1
                } else {
                    return 1
                }
            }
        })
        return this._mailList
    }

    checkRedDot() {
        for (let i = 0; i < this._mailList.length; i++) {
            if (this._mailList[i].state == MailStateType.NoRead) {
                return true
            }
        }
        return false
    }

    onReqMailRead(id) {
        for (let i = 0; i < this._mailList.length; i++) {
            if (this._mailList[i].id == id) {
                if (this._mailList[i].state == MailStateType.NoRead) {
                    NetManager.instance.sendMsg("stReadTollMailUserCmd",{
                        mailid: this._mailList[i].id,
                        money: 0
                    })
                }
                return
            }
        }
    }

    onReqMailGetAll() {
        let serverData = []
        for (let i = 0; i < this._mailList.length; i++) {
            if (this._mailList[i].itemList.length > 0) {
                let propList = []
                for (let k = 0; k < this._mailList[i].itemList.length; k++) {
                    propList.push({
                        numbers: [],
                        strings: [],
                        qwThisID:this._mailList[i].itemList[k].qwThisID,
                        dwObjectID:this._mailList[i].itemList[k].propId,
                        createid:this._mailList[i].itemList[k].createid,
                        pos:this._mailList[i].itemList[k].pos,
                        dwNum: this._mailList[i].itemList[k].customNum
                    })
                }

                serverData.push({
                    mailid: this._mailList[i].id,
                    item: propList
                })
            }
        }

        if(serverData.length > 0)
        {            
            //领取一封邮件的全部奖励
            NetManager.instance.sendMsg("stGetItemPageMailUserCmd",{
                data:serverData
            })
        }
    }

    onReqMailGetItem(id) {
        for (let i = 0; i < this._mailList.length; i++) {
            if (this._mailList[i].id == id && this._mailList[i].itemList.length > 0) {
                let propList = []
                for (let k = 0; k < this._mailList[i].itemList.length; k++) {
                    propList.push({
                        numbers: [],
                        strings: [],
                        qwThisID:this._mailList[i].itemList[k].qwThisID,
                        dwObjectID:this._mailList[i].itemList[k].propId,
                        createid:this._mailList[i].itemList[k].createid,
                        pos:this._mailList[i].itemList[k].pos,
                        dwNum: this._mailList[i].itemList[k].customNum
                    })
                }
                if(propList.length > 0)
                {
                    //领取一封邮件的全部奖励
                    NetManager.instance.sendMsg("stGetItemMailUserCmd",{
                        mailid: id,
                        item: propList
                    })
                    return
                }
            }
        }
    }

    onReqMailDeleteAll() {
        let deleteIdList = []
        for (let i = 0; i < this._mailList.length; i++) {
            if (this._mailList[i].type != MailType.QRCode && this._mailList[i].state != MailStateType.NoRead && this._mailList[i].itemList.length == 0) {
                deleteIdList.push(this._mailList[i].id)
            }
        }
        if(deleteIdList.length > 0)
        {
            NetManager.instance.sendMsg("stDelMailUserCmd",{
                mailid: deleteIdList
            })
        }
    }

    onReqMailDelete(id) {
        NetManager.instance.sendMsg("stDelMailUserCmd",{
            mailid: [id]
        })
    }
}
