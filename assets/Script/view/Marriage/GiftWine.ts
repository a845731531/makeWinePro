

import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import MarriageDataManager from "../../data/MarriageDataManager";
import List from "../../framework/component/List";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";
import GiftWineItem from "./GiftWineItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GiftWine extends BaseView {

    @property(List)
    wineListView: List = null;

    @property(cc.Label)
    winDes: cc.Label = null;


    @property(cc.EditBox)
    priceEdit: cc.EditBox = null

    @property(cc.Label)
    price: cc.Label = null;

    

    private wineList:[] = []

     
    private currentPropId=0
  
    private currentCount=0
    private max=5
    
    onEnable() {
        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_UPDATE_WINE, this.updateView, this)
        EventManager.instance.addEventListener("onCheckedItemMarriage", this.onCheckedItemMarriage, this)
        this.updateView()
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    start () {

    }

    updateView() {
        this.wineList = MarriageDataManager.instance.getWineListView()
        this.wineListView.numItems = this.wineList.length
        if(this.wineList.length>0){
            this.reset(this.wineList)
        }
    }


    reset(wineList){
        //默认选中第一个
        let data={
            propId:wineList[0].propId,
            price:wineList[0].price
         }
         this.currentPropId=wineList[0].propId
         this.price = wineList[0].price
         EventManager.instance.dispatchEvent("onCheckedItemMarriage",data)
    }


    onRenderItem(itemNode, index) {
        let itemData = this.wineList[index]
        itemNode.getComponent(GiftWineItem).updateView(itemData)
    }

       //输入事件
       onInput(){
        cc.log("输入结束的监听")
        let num = this.priceEdit.string
        this.currentCount=parseInt(num)  
        if(this.currentCount>=this.max){
            this.currentCount=this.max
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "玩家送礼数量已超过拥有数量,送贺礼失败"
            })
        }
        this.priceEdit.string=this.currentCount.toString()
    }

    onCheckedItemMarriage(data){
        this.currentPropId=data.propId
        this.price.string=data.price.toString()
        this.currentCount=1
        this.priceEdit.string=this.currentCount.toString()
        this.max=data.num
      
    }

    
    onSendBtn(){
        NetManager.instance.sendMsg("stSendFriendGiftsRelationUserCmd_CS", {
            dstid:1,
            num:this.currentCount,
            gift:this.currentPropId
        })
        this.currentCount=1
        this.priceEdit.string="请输入数量"
    }

}
