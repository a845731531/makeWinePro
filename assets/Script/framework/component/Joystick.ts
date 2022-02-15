import { Direction, EventEnum } from "../FrameWorkEnum";
import EventManager from "../manager/EventManager";
import { Tool } from "../manager/Tool";

//摇杆
const { ccclass, property } = cc._decorator;

@ccclass
export default class Joystick extends cc.Component {
    //中心的杆
    @property(cc.Node)
    poleNode: cc.Node = null;
    //可移动的最大半径
    @property({type: cc.Float, tooltip: "可移动的最大半径"})
    radius: number = 1.0;
    //灵敏度，触发移动的最小位移
    @property({type: cc.Float, tooltip: "灵敏度，触发移动的最小位移"})
    sensitivity: number = 1.0;
    @property({tooltip: "是否允许斜着移动"})
    allowDiag = true;
    
    private _poleOriginPos = cc.Vec2.ZERO;
    
    onEnable() {
        this.setListenerEnable(true)
        EventManager.instance.addEventListener(EventEnum.JOYSTICK_CHANGE_STATE, this.onChangeState, this)
    }
    onDisable() {
        this.setListenerEnable(false)
        EventManager.instance.removeTargetListener(this)
    }
    start() {
        this._poleOriginPos = this.poleNode.getPosition()
    }

    setListenerEnable(enabled: boolean) {
        if(enabled) {
            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this)
        } else {
            this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
            this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
            this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
            this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this)
        }
    }
    onChangeState(enabled) {
        this.setListenerEnable(enabled)
        this.node.opacity = (enabled ? 255 : 128)
    }

    limitInRadius() {
        let curPos = this.poleNode.getPosition()
        let deltaPos = curPos.sub(this._poleOriginPos)
        let distance = deltaPos.len()
        if(distance < this.radius) {
            return;
        }
        let direction = deltaPos.normalize()
        let targetPos = direction.mul(this.radius)
        this.poleNode.setPosition(targetPos)
    }
    shouldMove(): boolean {
        let distance = cc.Vec2.distance(this._poleOriginPos, this.poleNode.getPosition())
        return (distance >= this.sensitivity)
    }
    onTouchStart(event: cc.Event.EventTouch, touch: cc.Touch) {
        let touchPos = this.poleNode.parent.convertTouchToNodeSpaceAR(touch)
        this.poleNode.setPosition(touchPos);
        this.limitInRadius()
        if(this.shouldMove()) {
            let direction = Tool.getDirection(this._poleOriginPos, this.poleNode.getPosition(), this.allowDiag)
            EventManager.instance.dispatchEvent(EventEnum.JOYSTICK_MOVE_TOWARD, direction)
        }
    }
    onTouchMove(event: cc.Event.EventTouch, touch: cc.Touch) {
        let touchPos = this.poleNode.parent.convertTouchToNodeSpaceAR(touch)
        this.poleNode.setPosition(touchPos);
        this.limitInRadius()
        
        if(this.shouldMove()) {
            let direction = Tool.getDirection(this._poleOriginPos, this.poleNode.getPosition(), this.allowDiag)
            EventManager.instance.dispatchEvent(EventEnum.JOYSTICK_MOVE_TOWARD, direction)
        } else {
            EventManager.instance.dispatchEvent(EventEnum.JOYSTICK_STOP_MOVE, null)
        }
    }
    onTouchEnd(event: cc.Event.EventTouch, touch: cc.Touch) {
        this.poleNode.setPosition(this._poleOriginPos)
        EventManager.instance.dispatchEvent(EventEnum.JOYSTICK_STOP_MOVE, null)
    }
}