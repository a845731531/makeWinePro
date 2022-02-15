
const { ccclass, property } = cc._decorator;

@ccclass
export default class BottomNodeTool extends cc.Component {

    //起始父节点
    @property(cc.Node)
    bottomParent: cc.Node = null;

    start()
    {
        this.scheduleOnce(()=>{
            this.node.zIndex = 1
        },1)
    }

    protected onDestroy(): void {
        this.unscheduleAllCallbacks()
    }
}