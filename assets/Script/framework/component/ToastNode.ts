const { ccclass, property } = cc._decorator;

@ccclass
export default class ToastNode extends cc.Component{

    @property(cc.Label)
    msgLabel:cc.Label = null

    onLoad() {

    }

    start() {
        this.node.scale = 0.1
        let action = cc.sequence(
            cc.scaleTo(0.1, 1.1),
            cc.scaleTo(0.05, 1.0),
            cc.delayTime(1),
            cc.removeSelf(),
        )
        this.node.runAction(action)
    }

    initMsg(msg){
        this.msgLabel.string = msg;
    }
    
}
