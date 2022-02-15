
import { EventEnum } from "../FrameWorkEnum";
import EventManager from "../manager/EventManager"

const { ccclass, property } = cc._decorator;

enum PopUpEffect {
    None = 1,
    Scale = 2,
    Alpha = 3,
    Move = 4,
}
enum PopMoveDir {
    Bottom = 1,
    Left = 2,
    Right = 3,
}

@ccclass
export default class BaseView extends cc.Component{

    @property({ type: cc.Enum(PopUpEffect), tooltip: CC_DEV && '弹出类型', })
    popEffect: PopUpEffect = PopUpEffect.None;

    @property({ 
        type: cc.Enum(PopMoveDir),    
        visible() {
            return (this.popEffect == PopUpEffect.Move)
        }
    })
    popDir: PopMoveDir = PopMoveDir.Bottom

    @property({ 
        type: cc.Float,
        visible() {
            return (this.popEffect == PopUpEffect.Move)
        }
    })
    distance: number = 0;
    @property({ 
        type: cc.Node,
        visible() {
            return (this.popEffect != PopUpEffect.None)
        }
    })
    effectNode: cc.Node = null;

    private originPos: cc.Vec3 = null;
    private _isOnEffect = false
    start() {
        if(!this.effectNode) {
            this.effectNode = this.node
        }
        let effectNode = this.effectNode
        if(this.popEffect == PopUpEffect.Scale) {
            effectNode.scale = 0.1
            this._isOnEffect = true
            let action = cc.sequence(
                cc.scaleTo(0.15, 1.1),
                cc.scaleTo(0.05, 1.0),
                cc.callFunc(() => {
                    this._isOnEffect = false
                    EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                        type: "OpenView",
                        param: this.node.name
                    })
                })
            )
            effectNode.runAction(action)
        }else if(this.popEffect == PopUpEffect.Alpha){
            effectNode.opacity = 100
            let action = cc.sequence(
                cc.fadeIn(0.3),
                cc.callFunc(()=>{
                    this._isOnEffect = false
                    EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                        type: "OpenView",
                        param: this.node.name
                    })
                })
            )
            effectNode.runAction(action)
        } else if (this.popEffect == PopUpEffect.Move) {            
            this.originPos = this.effectNode.position
            this.showOpenAnimation(() => {
                EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                    type: "OpenView",
                    param: this.node.name
                })
            })
        } else {            
            EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                type: "OpenView",
                param: this.node.name
            })
        }
    }
    
    initByExData(exData) {
    }

    onDisable(){
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE,{
            type: "CloseView",
            param: this.node.name
        })
    }
    
    showOpenAnimation(callback) {
        let targetPos = new cc.Vec3(this.originPos.x, this.originPos.y, this.originPos.z)
        switch(this.popDir) {
            case PopMoveDir.Bottom:
                targetPos.y -= this.distance
                break;
            case PopMoveDir.Left:
                targetPos.x -= this.distance
                break
            case PopMoveDir.Right:
                targetPos.x += this.distance
                break
        }
        let layout = this.effectNode.getComponent(cc.Widget)
        layout && (layout.enabled = false)

        this.effectNode.position = targetPos
        this.effectNode.opacity = 255
        cc.tween(this.effectNode)
            .to(0.2, {position: this.originPos})
            .call(() => {
                let widget = this.effectNode.getComponent(cc.Widget)
                widget && (widget.enabled = true)
                if(callback) {
                    callback()
                }
            })
            .union()
            .start()
    }
    showCloseAnimation(callback) {
        let targetPos = new cc.Vec3(this.originPos.x, this.originPos.y, this.originPos.z)
        switch(this.popDir) {
            case PopMoveDir.Bottom:
                targetPos.y -= this.distance
                break;
            case PopMoveDir.Left:
                targetPos.x -= this.distance
                break
            case PopMoveDir.Right:
                targetPos.x += this.distance
                break
        }
        let widget = this.effectNode.getComponent(cc.Widget)
        widget && (widget.enabled = false)
        this.effectNode.position = this.originPos
        this.effectNode.opacity = 255

        cc.tween(this.effectNode)
            .to(0.2, {position: targetPos})
            .set({opacity: 0})
            .call(() => {
                let layout = this.effectNode.getComponent(cc.Widget)
                layout && (layout.enabled = true)
                if(callback) {
                    callback()
                }
            })
            .union()
            .start()
    }
    onCloseView() {

        let effectNode = this.effectNode
        if(this.popEffect == PopUpEffect.Scale) {
            this._isOnEffect = true
            let action = cc.sequence(
                cc.scaleTo(0.05, 1.1),
                cc.scaleTo(0.15, 0.1),
                cc.callFunc(() => {
                    this._isOnEffect = false
                    EventManager.instance.dispatchEvent(EventEnum.CLOSE_POPUP_BYVIEW,this.node)
                })
            )
            effectNode.runAction(action)
        }else if(this.popEffect == PopUpEffect.Alpha){
            this._isOnEffect = true
            let action = cc.sequence(
                cc.fadeOut(0.3),
                cc.callFunc(() => {
                    this._isOnEffect = false
                    EventManager.instance.dispatchEvent(EventEnum.CLOSE_POPUP_BYVIEW,this.node)
                })
            )
            effectNode.runAction(action)
        } 
        else if (this.popEffect == PopUpEffect.Move) {
            this._isOnEffect = true
            this.showCloseAnimation(() => {
                this._isOnEffect = false
                EventManager.instance.dispatchEvent(EventEnum.CLOSE_POPUP_BYVIEW,this.node)
            })
        }
        else {
            EventManager.instance.dispatchEvent(EventEnum.CLOSE_POPUP_BYVIEW,this.node)
        }
    }
}