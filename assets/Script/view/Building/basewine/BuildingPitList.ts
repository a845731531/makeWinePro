import { BuildingType } from "../../../Constant/GameEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";
import UserDataManager from "../../../data/UserDataManager";
import List from "../../../framework/component/List";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import { Tool } from "../../../framework/manager/Tool";
import { NetManager } from "../../../framework/network/NetManager";
import BaseView from "../../../framework/viewbase/BaseView";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BuildingPitList extends BaseView {
    @property(List)
    pitList: List = null;

    @property(cc.EditBox)
    posIdEdit: cc.EditBox = null

    private pitListData = [];

    private pageItemNum = 18;
    private lastPage = 0;

    private callback = null

    start() {
        super.start()
        this.reqNextData()
    }
    onEnable() {
        EventManager.instance.addEventListener("WorldBuildingListBrewBuildingCmd_SC", this.onRspPitList, this)
    }

    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    initByExData(exData: any): void {
        this.callback = exData.callback
    }

    onEditNumEnd()
    {
        if(this.posIdEdit.string != "")
        {
            let inputNum = parseInt(this.posIdEdit.string)
            inputNum = Math.max(1, inputNum)
            this.posIdEdit.string = "" + inputNum
        }
    }

    reqNextData() {
        let startId = this.lastPage * this.pageItemNum
        if(startId >= 10000 - this.pageItemNum)
        {
            return
        }
        this.reqData(startId)
    }
    reqPreData() {
        let lastId = this.lastPage * this.pageItemNum
        let startId = lastId - this.pitListData.length - this.pageItemNum
        if(startId < 0) {
            return
        }
        this.reqData(startId)
    }
    reqData(startId) {
        NetManager.instance.sendMsg("WorldBuildingListBrewBuildingCmd_CS", {
            building_id: BuildingType.JiaoChi,
            page_num: Math.floor(startId / this.pageItemNum),
            page_size: this.pageItemNum,
        })
    }

    onRspPitList(eventData) {
        // if(eventData.error_code) {
        //     return
        // }
        // let localLastId = this.lastPage * this.pageItemNum
        // let localStartId = localLastId - this.pitListData.length
        // let serverStartId = eventData.items[0].code
        // if(serverStartId == localLastId) {
        //     this.pitListData = this.pitListData.concat(eventData.items)
        // } else if (serverStartId == localStartId - this.pageItemNum){
        //     this.pitListData = eventData.items.concat(this.pitListData)
        // } else {
        //     this.pitListData = eventData.items
        // }
        // this.lastPage = Math.floor( (serverStartId + eventData.items.length) / this.pageItemNum)

        // this.pitList.numItems = this.pitListData.length


        if(eventData.error_code || eventData.items.length == 0) {
            return
        }
        let localLastId = this.lastPage * this.pageItemNum
        let localStartId = localLastId - this.pitListData.length + 1
        let serverStartId = parseInt(eventData.items[0].code)
        if(serverStartId == localLastId + 1) {
            this.pitListData = this.pitListData.concat(eventData.items)
        } else if (serverStartId == localStartId - this.pageItemNum){
            this.pitListData = eventData.items.concat(this.pitListData)
        } else {
            this.pitListData = eventData.items
        }
        this.lastPage = Math.floor( (serverStartId + eventData.items.length) / this.pageItemNum)

        this.pitList.numItems = this.pitListData.length
    }

    onScrollEvent(sender, event) {
        if(event == cc.ScrollView.EventType.BOUNCE_BOTTOM) {
            this.reqNextData()
        } else if (event == cc.ScrollView.EventType.BOUNCE_TOP) {
            this.reqPreData()
        }
    }
    onRenderListItem(itemNode, index) {
        let itemData = this.pitListData[index]
        itemNode.active = true

        itemNode.idLabel.string = cc.js.formatStr("NO.%s", itemData.code)
        
        if(itemData.owner_name) {
            let myName = UserDataManager.instance.getUserName()
            itemNode.emptyNode.active = false
            itemNode.ownedNode.active = true
            if(itemData.owner_name == myName) {
                Tool.loadSpriteFrame("texture/building/pit_detail_status_1", itemNode.statusSpr)
                itemNode.nameLabel.string = "属于你的窖池"
            } else {
                Tool.loadSpriteFrame("texture/building/pit_detail_status_0", itemNode.statusSpr)
                itemNode.nameLabel.string = "被人家买走了"
            }
            itemNode.nameLabel.color = cc.Color.BLACK
        } else {
            itemNode.emptyNode.active = true
            itemNode.ownedNode.active = false
            itemNode.nameLabel.string = "虚位以待"
            itemNode.nameLabel.color = cc.Color.RED
        }
        itemNode.attr({
            itemData: itemData
        })
    }

    onClickItem(event) {
        let itemData = event.target.itemData
        if(itemData.code) {
            // EventManager.instance.dispatchEvent("RspQueryFramland", itemData)

            ////由编号获取建筑信息
            // message WorldBuildingByCodeBrewBuildingCmd_CS {
            // 	required string 	code    		= 1;  //编号
            // 	required int32 		building_id    	= 2;  //建筑类型
            // }
            // NetManager.instance.sendMsg("WorldBuildingByCodeBrewBuildingCmd_CS",{
            //     code: itemData.code,
            //     building_id: itemData.building_id
            // })
            this.callback && this.callback({
                world_building: itemData
            })
            this.onCloseView()
        }
        // else{
        //     EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
        //         msg: "很遗憾，此地已被他人捷足先登了，请重新选择"
        //     })
        // }
    }

    onClickJump() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        // if(this.posIdEdit.string != "") {
        //     let posId = parseInt(this.posIdEdit.string)
        //     this.reqData(posId)
        //     this.posIdEdit.string = ""
        // }
        let id = this.posIdEdit.string 
        if(id == "" || parseInt(id) <= 0 ||  parseInt(id) > 10000)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "请输入1~10000的数字进行查询"
            })
            return
        }

        this.pitListData = []
        this.pitList.numItems = this.pitListData.length

        let posId = parseInt(id)
        this.reqData(posId)
        this.posIdEdit.string = ""
    }
}