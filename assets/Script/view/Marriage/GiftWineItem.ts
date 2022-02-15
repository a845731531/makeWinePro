// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BagDataManager from "../../data/BagDataManager";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GiftWineItem extends cc.Component {

    @property(cc.Label)
    numLabel: cc.Label = null;

    @property(cc.Label)
    numYears: cc.Label = null;
 
    @property(cc.Sprite)
    itemIcon: cc.Sprite = null;

    @property(cc.Node)
    select: cc.Node = null;

    
    private num=0

    private propId=0

    private price=0


    
    onEnable() {
        EventManager.instance.addEventListener("onCheckedItemMarriage", this.onCheckedItemMarriage, this)
    }

    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }


    init(data) {
        this.num = data.num
        this.propId = data.propId
        this.numYears.string = data.numYears
        this.numLabel.string = data.numLabel
        this.price=data.price
        let frameName = BagDataManager.instance.getItemIconById(this.propId)
        Tool.loadSpriteFrame(frameName, this.itemIcon)
    }

    
    CheckedItemMarriage() {
        let data = {
            propId: this.propId,
            num: this.num,
            price:this.price
        }
        EventManager.instance.dispatchEvent("onCheckedItemMarriage", data)
    }

    onCheckedItemMarriage(data){
        if (data.propId == this.propId) {
            this.select.active = true
        } else {
            this.select.active = false
        }
    }
}
