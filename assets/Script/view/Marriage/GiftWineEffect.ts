

import BaseView from "../../framework/viewbase/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GiftWineEffect extends BaseView {

    @property(cc.RichText)
    des: cc.RichText = null;

   


    start () {

    }

    initByExData(exData) {
        this.des.string=exData.des
        this.scheduleOnce(()=>{
           this.onCloseView()
        },2)
    }

   
}
