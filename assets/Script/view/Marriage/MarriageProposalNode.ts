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
    friendListView: List = null

    private friendListData: friendData[] = []
    private selectFriend = null;

    start() {
        //this.friendListData = FriendDataManager.instance.getFriendList()
        this.friendListData=MarriageDataManager.instance.getCanMarriageList()  
      
        this.friendListView.numItems = this.friendListData.length
    }

    onRenderItem(itemNode, index) {
        let itemData = this.friendListData[index]
        itemNode.active = true
        itemNode.getChildByName("name").getComponent(cc.Label).string = itemData.name
        itemNode.getChildByName("dispose").getComponent(cc.Label).string = itemData.degree
    }

    onSelectItem(itemNode, index) {
        this.selectFriend = this.friendListData[index]
    }

    onClickPropose() {
     EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
     if(this.selectFriend == null) {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
        msg: "请选择求婚对象"
        })
     return
    }
     if(MarriageDataManager.instance.hasMarried()){
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "您已结婚"
        })
        return
     }else if (this.selectFriend.degree<0) {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "亲密度不足200"
        })
        return
     }
   
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: cc.js.formatStr("是否消耗1枚戒指向%s求婚", this.selectFriend.name),
            showCancel: true,
            confirmCallback: () => {    
                NetManager.instance.sendMsg("stRequestAddRelationUserCmd", {
                    type: RelationType.Relation_Spouse,
                    id:parseInt(this.selectFriend.id),
                })                   
            }
        })

      
    }
}