
import { friendData } from "../../data/DataInterface";
import FriendDataManager from "../../data/FriendDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";


/**
 * 背包物品 item信息弹窗脚本
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class GiftPanel extends BaseView {


    @property(cc.EditBox)
    idEditBox: cc.EditBox = null

    @property(cc.Node)
    content: cc.Node = null

    @property(cc.Prefab)
    giftItem: cc.Prefab = null


    @property(cc.Node)
    addBtn: cc.Node = null

    @property(cc.Node)
    reduceBtn: cc.Node = null

    private friendDataList: friendData[] = []

    private playerGifId
    propList: any;

    private isNpc: boolean = false

    //-------加减数量
    private currentPropId = 0
    private price = 0
    private currentCount = 1
    private coinCount = 300
    private max
    //-------加减数量


    //-------计时加减数量
    private time = 0
    private countBool = false
    private hadHint = false //持续中已经提示过了
    //-------计时加减数量


    onLoad() {
        this.addBtn.on(cc.Node.EventType.TOUCH_START, this.onAddBtnStart, this);
        this.addBtn.on(cc.Node.EventType.TOUCH_END, this.onAddBtnEnd, this);
        this.reduceBtn.on(cc.Node.EventType.TOUCH_START, this.onReduceBtnStart, this);
        this.reduceBtn.on(cc.Node.EventType.TOUCH_END, this.onReduceBtnEnd, this);
    }

    onEnable() {

        EventManager.instance.addEventListener("onCheckedItem", this.onCheckedItem, this)
        //EventManager.instance.addEventListener(CustomEventEnum.REFRESH_UPDATE_GIFT, this.onClosePanel, this)
        this.updateView()

    }
    onDisable() {
        this.init()
        EventManager.instance.removeTargetListener(this)
    }

    init() {
        this.currentPropId = 0
        this.price = 0
        this.currentCount = 1
        this.time = 0
        this.countBool = false
        this.hadHint = false
    }
    initByExData(exData) {
        cc.log("礼物", exData)
        if (exData.data != null) {
            this.playerGifId = exData.data.id
        }

        this.isNpc = exData.isNpc
        this.idEditBox.string = this.currentCount.toString()
    }


    onConfirm() {
        cc.log("发送")
        if (this.isNpc) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "赠送成功"
            })
        } else {
            NetManager.instance.sendMsg("stSendFriendGiftsRelationUserCmd_CS", {
                dstid: this.playerGifId,
                num: this.currentCount,
                gift: this.currentPropId
            })
        }

        this.currentCount = 1
        this.idEditBox.string = this.currentCount.toString()



        //     //送好友礼物
        // message stSendFriendGiftsRelationUserCmd_CS
        // {
        //     optional uint32 dstid = 1;          //目标玩家
        //     optional uint32 gift = 2;           //礼品
        //     optional uint32 num = 3;            //礼品数量
        //     optional string name = 4;           //礼品名
        // }

        this.max = Math.floor(this.coinCount / this.price)
    }

    updateView() {
        let propLists = FriendDataManager.instance.getGiftPropList()
        if (this.content.childrenCount > 0) {
            this.reset(propLists)
            return
        }

        let length = propLists.length
        for (var i = 0; i < length; i++) {
            let giftItem = cc.instantiate(this.giftItem)
            cc.log( "k卡巴",giftItem.getComponent("giftItem"),propLists[i])
             giftItem.getComponent("giftItem").init(propLists[i])
             giftItem.parent = this.content
        }
        this.content.width = length * (this.content.children[0].width + this.content.getComponent(cc.Layout).spacingX)
        this.reset(propLists)


    }

    reset(propLists) {
        //默认选中第一个
        let data = {
            propId: propLists[0].propId,
            price: propLists[0].price
        }
        this.currentPropId = propLists[0].propId
        this.price = propLists[0].price
        EventManager.instance.dispatchEvent("onCheckedItem", data)
    }

    onCheckedItem(data) {
        this.currentPropId = data.propId
        this.price = data.price
        this.currentCount = 1
        this.idEditBox.string = this.currentCount.toString()
        this.max = Math.floor(this.coinCount / this.price)
    }

    onAddBtn() {
        if (this.hadHint) {
            this.hadHint = false
            return
        }

        if (this.currentCount >= this.max) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "已达到最大购买数量"
            })
            return
        }
        this.currentCount += 1
        this.idEditBox.string = this.currentCount.toString()
    }

    onReduceBtn() {
        if (this.hadHint) {
            this.hadHint = false
            return
        }
        if (this.currentCount <= 1) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "最小数量为1"
            })
            return
        }
        this.currentCount -= 1
        this.idEditBox.string = this.currentCount.toString()
    }

    //输入事件
    onInput() {
        cc.log("输入结束的监听")
        let num = this.idEditBox.string
        this.currentCount = parseInt(num)
        if (this.currentCount >= this.max) {
            this.currentCount = this.max
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "最大购买数量为" + this.currentCount
            })
        }
        this.idEditBox.string = this.currentCount.toString()
    }


    onAddBtnStart() {
        this.countBool = true
        this.addTime("add")
    }

    onAddBtnEnd() {
        this.time = 0
        this.countBool = false

    }

    onReduceBtnStart() {
        this.countBool = true
        this.addTime("reduce")
    }

    onReduceBtnEnd() {
        this.time = 0
        this.countBool = false
    }

    //计时器
    addTime(data) {
        this.scheduleOnce(() => {
            if (!this.countBool || this.hadHint) {
                return
            }
            this.time += 0.1
            this.addTime(data)

            if (data == "add") {
                if (this.time > 0.5) {
                    if (this.currentCount >= this.max) {
                        this.hadHint = true
                        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                            msg: "已达到最大购买数量"
                        })
                        return
                    }

                    this.addCurrentCount()
                }
            } else if (data == "reduce") {
                if (this.time > 0.5) {
                    if (this.currentCount <= 1) {
                        this.hadHint = true
                        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                            msg: "最小数量为1"
                        })
                        return
                    }
                    this.reduceCurrentCount()
                }
            }

        }, 0.1)
    }

    addCurrentCount() {
        this.scheduleOnce(() => {
            if (this.currentCount >= this.max) {
                return
            }
            this.currentCount += 1
            this.idEditBox.string = this.currentCount.toString()
        }, 0.1)

    }

    reduceCurrentCount() {
        this.scheduleOnce(() => {
            if (this.currentCount <= 1) {
                return
            }
            this.currentCount -= 1
            this.idEditBox.string = this.currentCount.toString()
        }, 0.1)

    }

}
