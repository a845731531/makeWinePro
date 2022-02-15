import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";

enum BottomPopDir {
    None = 1,
    Bottom = 2,
    Left = 3,
    Right = 4,
}


const { ccclass, property } = cc._decorator;
@ccclass
export default class BottomPop extends cc.Component {
    @property({ type: cc.Enum(BottomPopDir)})
    popDir: BottomPopDir = BottomPopDir.None

    @property({ 
        type: cc.Float,
        visible() {
            return (this.popDir != BottomPopDir.None)
        }
    })
    distance: number = 0;
    @property({ 
        type: cc.Node,
        visible() {
            return (this.popDir != BottomPopDir.None)
        }
    })
    effectNode: cc.Node = null;

    private originPos: cc.Vec3 = null;

    initByExData(exData) {
    }
    start() {
        if(!this.effectNode) {
            this.effectNode = this.node
        }
        let widget = this.effectNode.getComponent(cc.Widget)
        widget && (widget.updateAlignment())
        
        this.originPos = this.effectNode.position
        this.showOpenAnimation(() => {
            EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                type: "OpenView",
                param: this.node.name
            })
        })
    }
    showOpenAnimation(callback) {
        if(this.popDir == BottomPopDir.None) {
            if(callback) {
                callback()
            }
        } else {
            let targetPos = new cc.Vec3(this.originPos.x, this.originPos.y, this.originPos.z)
            switch(this.popDir) {
                case BottomPopDir.Bottom:
                    targetPos.y -= this.distance
                    break;
                case BottomPopDir.Left:
                    targetPos.x -= this.distance
                    break
                case BottomPopDir.Right:
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
    }
    showCloseAnimation(callback) {
        if(this.popDir == BottomPopDir.None) {
            if(callback) {
                callback()
            }
        } else {
            let targetPos = new cc.Vec3(this.originPos.x, this.originPos.y, this.originPos.z)
            switch(this.popDir) {
                case BottomPopDir.Bottom:
                    targetPos.y -= this.distance
                    break;
                case BottomPopDir.Left:
                    targetPos.x -= this.distance
                    break
                case BottomPopDir.Right:
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
    }
    onCloseView() {
        this.showCloseAnimation(() => {
            this.node.destroy()
        })
    }
}