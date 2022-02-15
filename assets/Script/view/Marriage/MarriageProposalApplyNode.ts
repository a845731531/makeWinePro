import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { RelationType } from "../../Constant/GameEnum";
import { SoundEnum } from "../../Constant/SoundEnum";
import { friendData } from "../../data/DataInterface";
import FriendDataManager from "../../data/FriendDataManager";
import MarriageDataManager from "../../data/MarriageDataManager";
import List from "../../framework/component/List";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { NetManager } from "../../framework/network/NetManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MarriageProposalNode extends cc.Component {
    @property(List)
    applyListView: List = null

    private applyListData = []
    private selectFriend = null;

    start() {
      
    } 

    onEnable() {
        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_UPDATE_APPLY, this.updateApplyList, this)
        cc.log("检测")
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    updateApplyList(){
        this.applyListData = MarriageDataManager.instance.getMarriageApplyList()
        this.applyListView.numItems = this.applyListData.length
    }

    onRenderItem(itemNode, index) {
        let itemData = this.applyListData[index]
        itemNode.active = true
        itemNode.getChildByName("name").getComponent(cc.Label).string = itemData.name
        itemNode.getChildByName("dispose").getComponent(cc.Label).string = itemData.degree
    }

    onSelectItem(itemNode, index) {
        this.selectFriend = this.applyListData[index]
    }

    onClickPropose() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        if(this.selectFriend == null) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "请选择结婚对象"
            })
            return
        }
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: cc.js.formatStr("%s向你求婚,是否同意？", this.selectFriend.name),
            cancelText: "取消",
            confirmText: "同意",
            showCancel: true,
            confirmCallback: () => {   
                NetManager.instance.sendMsg("stAnswerAddRelationUserCmd", {
                    type: RelationType.Relation_SpouseReq,
                    relationid:this.selectFriend.id,
                    answer:1
                })
            },
  
        })
    }
}