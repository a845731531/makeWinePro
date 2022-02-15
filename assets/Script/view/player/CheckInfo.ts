import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { ChatMessageType, RelationType } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import FriendDataManager from "../../data/FriendDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";


const { ccclass, property } = cc._decorator;
// 关系枚举 
enum inviteState {
    invite_Can = 0,				//可以邀请
    invite_Had = 1,				// 邀请中
}
@ccclass
export default class CheckInfo extends BaseView {

    @property(cc.Sprite)
    headIcon: cc.Sprite = null;

    @property(cc.Label)
    playerName: cc.Label = null;

    @property(cc.Label)
    sex: cc.Label = null;

    @property(cc.Label)
    playerID: cc.Label = null;

    @property(cc.Label)
    posInfo: cc.Label = null;

    @property(cc.Label)
    spouse: cc.Label = null;

    @property(cc.Label)
    guildName: cc.Label = null;

    @property(cc.Node)
    proposalBtn: cc.Node = null;

    @property(cc.Node)
    inviteBtn: cc.Node = null;

    @property(cc.Label)
    inviteLabel: cc.Label = null;


    @property(cc.Node)
    deleteBtn: cc.Node = null;

    @property(cc.Node)
    addFriendBtn: cc.Node = null;


    @property(cc.Label)
    addFriendLabel: cc.Label = null;



    private needFriendNum = 1000
    private currendFriendNum = 0
    private inviteState = 0
    private data

    private isNpc: boolean = false

    RelationType: any;


    initByExData(data) {
        cc.log("显示信息", data)
        this.data = data
        this.isNpc = this.data.isNpc
        Tool.loadSpriteFrame(data.iconurl, this.headIcon)
        this.playerName.string = data.name
        if (data.face == 1) {
            this.sex.string = "男"
            this.proposalBtn.active = false
        } else {
            this.sex.string = "女"
            this.proposalBtn.active = true
        }
        this.posInfo.string = data.homeland
        this.guildName.string = data.clanname
        this.playerID.string = data.id.toString()

        if (FriendDataManager.instance.checkFriends(data.id)) {
            this.addFriendBtn.active = false
            this.deleteBtn.active = true
        } else {
            this.addFriendBtn.active = true
            this.deleteBtn.active = false
        }

        if (data.ismarriage == 0) {
            this.spouse.string = "未婚"
        } else {
            this.spouse.string = "已婚"
            this.proposalBtn.active = false
        }
        if (this.inviteState == 0)
            this.inviteLabel.string = "公会邀请"
        else
            this.inviteLabel.string = "邀请中"
    }

    onEnable() {
        EventManager.instance.addEventListener(CustomEventEnum.BAG_UPDATE_VIEW, this.updateView, this)
        EventManager.instance.addEventListener(CustomEventEnum.REFRESH_UPDATE_DELETE, this.onCloseView, this)

    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    start() {
        super.start()
        this.updateView()
    }
    updateView() {


    }

    onAddMessage() {
        this.updateView()

    }



    onGiveGiftBtn() {
        
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "敬请期待"
        })
        // EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
        //     viewName: PrefabPathEnum.GiftPanel,
        //     exData: {
        //         data: this.data,
        //         isNpc: this.isNpc
        //     }
        // })
    }

    onCloseView() {
        super.onCloseView()
    }

    onProposalBtn() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: cc.js.formatStr("是否消耗1枚戒指向%s求婚", this.data.name),
            showCancel: true,
            confirmCallback: () => {                    
                EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                    content: cc.js.formatStr("您已向%s发起求婚，请等待对方同意", this.data.name),
                })
            }
        })
    }

    onBlacklistBtn() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "此功能暂未开放",
        })
    }

    onReportBtn() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "此功能暂未开放",
        })
    }

    onAddFriendBtn() {
        NetManager.instance.sendMsg("stRequestAddRelationUserCmd", {
            type: RelationType.Relation_Friend,
            id:parseInt(this.data.id),
            agree:0
        })
        this.addFriendLabel.string = "申请中"
    }

    onDeleteBtn() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: cc.js.formatStr("是否删除该好友"),
            showCancel: true,
            confirmText: "确定",
            cancelText: "取消",
            confirmCallback: () => {
                NetManager.instance.sendMsg("stRequestKickRelationUserCmd", {
                    type: RelationType.Relation_Friend,
                    id: this.data.id
                })
            }
        })
        EventManager.instance.dispatchEvent(CustomEventEnum.REFRESH_UPDATE_SEND)
    }


    onInviteBtn() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "此功能暂未开放",
        })
    }

    onSendBtn() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "此功能暂未开放",
        })
        return
        EventManager.instance.dispatchEvent(EventEnum.CLOSE_ALL_POPUP)
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.ChatLayer,
            exData: {
                messageType: ChatMessageType.Private,
                playerData: this.data,
            }
        })
    }

}
