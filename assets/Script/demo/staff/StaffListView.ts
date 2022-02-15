import StaffDataManager from "../../data/StaffDataManager";
import UserDataManager from "../../data/UserDataManager";
import EventManager from "../../framework/manager/EventManager";
import BaseView from "../../framework/viewbase/BaseView";
import StaffListItem from "./StaffListItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StaffListView extends BaseView
{
    @property(cc.Node)
    ownedNode: cc.Node = null
    @property(cc.Node)
    expireNode: cc.Node = null
    @property(cc.Node)
    unownedNode: cc.Node = null

    @property(cc.Node)
    ownedList: cc.Node = null
    @property(cc.Node)
    expireList: cc.Node = null
    @property(cc.Node)
    unownedList: cc.Node = null

    @property(cc.Prefab)
    itemPre: cc.Prefab = null

    private staffList: any = null
    private staffItemPool: cc.NodePool = new cc.NodePool()

    start() {
        this.updateStaffList()
    }
    onEnable() {
        EventManager.instance.addEventListener("RenewalBrewStaffCmd_SC", this.onRenewalStaff, this)
        EventManager.instance.addEventListener("RiseStarBrewStaffCmd_SC", this.onRiseStarStaff, this)        
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    updateStaffList() {
        let staffList = StaffDataManager.instance.getStaffList()
        let expireListData = []
        let ownedListData = []
        let curTime = UserDataManager.instance.getCurTime()
        for(let i = 0, len = staffList.length; i < len; i++) {
            let itemData = staffList[i]
            if(itemData.contractEndTime < curTime) {
                expireListData.push(itemData)
            } else {
                ownedListData.push(itemData)
            }
        }
        this.reuseItem(this.ownedList)
        this.reuseItem(this.expireList)
        this.reuseItem(this.unownedList)

        this.updateStaffListWithTag(this.ownedNode, this.ownedList, ownedListData)
        this.updateStaffListWithTag(this.expireNode, this.expireList, expireListData)

        let unownedList = StaffDataManager.instance.getUnOwnedStaffList()
        this.updateStaffListWithTag(this.unownedNode, this.unownedList, unownedList)
    }
    reuseItem(listParent) {
        let children = listParent.children
        for(let i = children.length - 1; i >= 0; i--) {
            this.staffItemPool.put(children[i])
        }
    }
    updateStaffListWithTag(tagNode: cc.Node, listParent: cc.Node, listData) {
        if(listData.length == 0) {
            tagNode.active = false
            listParent.active = false
            return
        }
        tagNode.active = true
        listParent.active = true
        
        for(let i = 0, len = listData.length; i < len; i++) {
            let itemData = listData[i]
            let itemNode = this.staffItemPool.get()
            if(!itemNode) {
                itemNode = cc.instantiate(this.itemPre)
                itemNode.active = true
            }            
            itemNode.parent = listParent
            let itemScript = itemNode.getComponent(StaffListItem)
            itemScript?.updateView(itemData)
        }
    }
    onRenewalStaff(serverData) {
        if(serverData.error_code) {
            return
        }
        this.updateStaffList()
    }
    onRiseStarStaff(serverData) {
        if(serverData.error_code) {
            return
        }
        this.updateStaffList()
    }
    
}