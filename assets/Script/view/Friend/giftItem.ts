// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BagDataManager from "../../data/BagDataManager";
import { GiftItemData } from "../../data/DataInterface";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class giftItem extends cc.Component {

    @property(cc.Sprite)
    headIcon: cc.Sprite = null;

    @property(cc.Label)
    desc: cc.Label = null;

    @property(cc.Label)
    giftName: cc.Label = null;

    @property(cc.Node)
    select: cc.Node = null;

    private propId
    private price


    onEnable() {
        EventManager.instance.addEventListener("onCheckedItem", this.onCheckedItem, this)
    }

    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }





    init(data: GiftItemData) {
     
        this.price = data.price
        this.propId = data.propId
        this.giftName.string = data.giftName
        this.desc.string = data.desc
        cc.log("来来来s",this.propId )
        let frameName = BagDataManager.instance.getItemIconById(this.propId)
        Tool.loadSpriteFrame(frameName, this.headIcon)
    }


    checkedItem() {
        let data = {
            propId: this.propId,
            price: this.price
        }
        EventManager.instance.dispatchEvent("onCheckedItem", data)
    }

    onCheckedItem(data) {
        if (data.propId == this.propId) {
            this.select.active = true
        } else {
            this.select.active = false
        }
    }

}
