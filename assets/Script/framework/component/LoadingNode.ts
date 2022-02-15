
import { EventEnum } from "../FrameWorkEnum";
import EventManager from "../manager/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingNode extends cc.Component{
    
    @property(cc.Node)
    loadingSpr: cc.Node = null
    @property(cc.Label)
    loadingTip: cc.Label = null

    properties: {
        loadingSpr: cc.Node,
    }

    onLoad() {
        EventManager.instance.addEventListener(EventEnum.SHOW_LOADING_EFFECT,this.showLoading,this)
        EventManager.instance.addEventListener(EventEnum.HIDE_LOADING_EFFECT,this.hideLoading,this)
        this.node.active = false;  //为了激活事件监听
        this.node.opacity = 255
    }

    onDestroy(){
        EventManager.instance.removeTargetListener(this)
    }

    start() {
        let seqAct = cc.sequence(cc.rotateTo(1,180) , cc.rotateTo(1,360))
        this.loadingSpr.runAction(cc.repeatForever(seqAct))
    }

    showLoading(eventData) {
        eventData = eventData || {}
        this.node.active = true
        let time = eventData.time || 10
        let action = cc.sequence(
            cc.delayTime(time),
            cc.callFunc(() => {
                this.node.active = false
            })
        )
        action.setTag(100)
        this.node.stopActionByTag(100)
        this.node.runAction(action)
        this.loadingTip.string = eventData.msg || "加载中"
    }

    hideLoading()
    {
        this.node.active = false
    }
}
