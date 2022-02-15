

import BaseView from "../../framework/viewbase/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WeddingInvitation extends BaseView {

    
    @property(cc.Node)
    giftNode:cc.Node=null

    @property(cc.Node)
    openNode:cc.Node=null

    @property(cc.Label)
    sendName:cc.Label=null

    @property(cc.Label)
    sendNameGift:cc.Label=null
    
    
    initByExData(exData)  {
        this.sendName.string=exData

        this.sendNameGift.string=this.sendName.string+": 我要和"+"强哥结婚了"
    }
    
    onOpenBtn(){
       this.giftNode.active=true
       this.openNode.active=false
    }
}
