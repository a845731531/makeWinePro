import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { ChatMessageType } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { ChatMessageData, friendData } from "../../data/DataInterface";
import UserDataManager from "../../data/UserDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";


const { ccclass, property } = cc._decorator;

@ccclass
export default class FriendItem extends cc.Component {

    @property(cc.Sprite)
    headIcon: cc.Sprite = null;

    @property(cc.Label)
    friendName: cc.Label = null;

    @property(cc.Label)
    sex: cc.Label = null;

    @property(cc.Label)
    likability: cc.Label = null;

    @property(cc.Label)
    online: cc.Label = null;

    @property(cc.Node)
    spouse: cc.Node = null;

    @property(cc.Node)
    lightNode: cc.Node = null;

    @property(cc.Node)
    grayNode: cc.Node = null;


    @property(cc.Node)
    marriageBtn: cc.Node = null;

    @property(cc.Label)
    marriageLabel: cc.Label = null;

    private data
    private ContentMaxWidth: number = 330;


    updateView(itemData) {
        this.data = itemData

        if (itemData.isNpc) {
            let frameName = cc.js.formatStr("npc/npc_%d", itemData.id)
            Tool.loadSpriteFrame(frameName, this.headIcon)
        } else {
            let frameName = itemData.iconurl
            Tool.loadSpriteFrame(frameName, this.headIcon)
        }
        this.friendName.string = itemData.name
        if (itemData.face == 0) {
            this.sex.string = "男"
        } else {
            this.sex.string = "女"
        }
        this.likability.string = itemData.degree
        //  this.likability.string=itemData.likability.toString()
        // if(itemData.spouse)
        // this.spouse.active=true
        // else
        this.spouse.active = false
        switch (itemData.online) {
            case 1:
                this.online.string = "在线"
                this.lightNode.active = true
                this.grayNode.active = false
                break;
            case 0:
                this.online.string = "离线"
                this.lightNode.active = false
                this.grayNode.active = true
                break;
        }
    }

    onInfo() {
        cc.log("展示好友信息")

        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.CheckInfo,
            exData: this.data
        })

        // EventManager.instance.dispatchEvent(CustomEventEnum.HALL_SHOW_BOTTOM_POP, {
        //     viewName: PrefabPathEnum.CheckInfo,
        //     exData: this.data
        // })
    }

    onGiftBtn() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.GiftPanel,
            exData: {
                data:this.data,
                isNpc:false
              }
        })
    }

    onMarriageBtn() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: cc.js.formatStr("是否发送求婚请求"),
            showCancel: true,
            confirmText: "确定",
            cancelText: "取消",
            confirmCallback: () => {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                    viewName: PrefabPathEnum.MarriageBuilding
                })

                EventManager.instance.dispatchEvent(CustomEventEnum.REFRESH_SHUPTUP_FRIEND)
            }
        })
    }

}