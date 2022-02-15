// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { friendData } from "../../data/DataInterface";
import FriendDataManager from "../../data/FriendDataManager";
import List from "../../framework/component/List";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";
import BottomPop from "../Common/BottomPop";
import FriendItem from "./FriendItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FriendView extends BaseView {

    @property(List)
    friendListView: List = null;

    @property(cc.Node)
    applyPrompt: cc.Node = null;

    @property(cc.Label)
    giftCount: cc.Label = null;



    @property(cc.Label)
    friendCount: cc.Label = null;


    private friendDataList: friendData[] = []

    initByExData(data) {
        EventManager.instance.dispatchEvent(CustomEventEnum.REFRESH_UPDATE_SEND)
        this.updateView()
    }

    onEnable() {
        EventManager.instance.addEventListener(CustomEventEnum.FRIEND_UPDATE_VIEW, this.updateView, this)
        EventManager.instance.addEventListener(CustomEventEnum.REFRESH_UPDATE_APPLY, this.updateApply, this)
        EventManager.instance.addEventListener(CustomEventEnum.REFRESH_UPDATE_REDDOT, this.updateRedDot, this)
        EventManager.instance.addEventListener(CustomEventEnum.REFRESH_UPDATE_SEND, this.sendUpdateRedDot, this)
        EventManager.instance.addEventListener(CustomEventEnum.REFRESH_SHUPTUP_FRIEND, this.onCloseView, this)
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    start() {
        super.start()
    }
    updateView() {
        this.friendDataList = FriendDataManager.instance.getFriendList()
        this.friendListView.numItems = this.friendDataList.length
        //    if(this.friendDataList.length>0)
        //    this.applyPrompt.active=true
        //    else
        //    this.applyPrompt.active=false
        this.updateRedDot(true)
        this.upDateFriendCount()
        this.upDateGiftCount()

    }
  

    //刷新小红点
    updateRedDot(data) {
        if (data)
            this.applyPrompt.active = true
        else
            this.applyPrompt.active = false
    }

    upDateGiftCount() {
        this.giftCount.string = FriendDataManager.instance.getFriendData().giftCount.toString()
    }

    sendUpdateRedDot() {
        // NetManager.instance.sendMsg("stFriendReqListRelationUserCmd_CS", {
        //     rtype:0
        // })
    }

    upDateFriendCount() {
        let currentCount = FriendDataManager.instance.getFriendList().length
        let totalCount = Tool.getNumberParamConfig("numberoffriends")
        this.friendCount.string = currentCount + "/" + totalCount
    }

    onRenderItem(itemNode, index) {
        let itemData = this.friendDataList[index]
        itemNode.getComponent(FriendItem).updateView(itemData)
    }

    onSearchBtn() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.SearchPanel,
        })
    }

    onApplyBtn() {
        NetManager.instance.sendMsg("stFriendReqListRelationUserCmd_CS", {
            rtype: 0
        })
    }

    updateApply() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.ApplyPanel,
        })
    }


}
