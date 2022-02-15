import { EventEnum, GuideClickType, GuideData } from "../FrameWorkEnum";
import EventManager from "../manager/EventManager";
import { Tool } from "../manager/Tool";
import { GuideAlwaysMatchExecuter } from "./GuideAlwaysMatchExecuter";
import GuideManager from "./GuideManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GuideLayer extends cc.Component {
    @property(cc.Node)
    maskNode: cc.Node = null;

    @property(cc.Node)
    highLightNode: cc.Node = null;
    @property(cc.Node)
    fingerNode: cc.Node = null;

    @property(cc.Node)
    msgNode: cc.Node = null;
    @property(cc.Sprite)
    iconSpr: cc.Sprite = null;
    @property(cc.Label)
    nameLabel: cc.Label = null;
    @property(cc.Label)
    msgLabel: cc.Label = null;

    private curGuideData: GuideData = null;
    private dialogOriginPos = null;

    onLoad() {
        GuideManager.instance.setGuideLayer(this)
        this.maskNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.maskNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)

        this.maskNode["_touchListener"].setSwallowTouches(false)
        GuideManager.instance.registerConditionExecuter("TouchGuideMask", new GuideAlwaysMatchExecuter());
        GuideManager.instance.registerConditionExecuter("ShowGuideLayer", new GuideAlwaysMatchExecuter());

        
        this.hideView()
    }
    start() {        
        if(this.dialogOriginPos == null) {
            this.dialogOriginPos = this.msgNode.position
        }
    }
    hideView() {
        if(this.curGuideData) {
            let guideNode = GuideManager.instance.getGuideNode(this.curGuideData.guideNodeName)
            if(guideNode) {            
                let nodeCamera = cc.Camera.findCamera(guideNode)
                nodeCamera.node.off(cc.Node.EventType.POSITION_CHANGED, this.updateHighLight, this)
                guideNode.off(cc.Node.EventType.POSITION_CHANGED, this.updateHighLight, this)
            }
        }

        this.node.active = false
        this.curGuideData = null
        this.msgNode.active = false
        this.maskNode.active = false
        this.fingerNode.active = false        
        this.highLightNode.active = false
        this.nameLabel.node.active = false
        this.iconSpr.node.active = false
        this.highLightNode.width = 0
    }
    showView(guideData: GuideData) {
        this.hideView()
        this.node.active = true
        this.curGuideData = guideData

        if(guideData.guideText != "") {
            this.msgNode.active = true
            this.msgLabel.string = guideData.guideText
            if(guideData.speakerName != "") {
                this.nameLabel.node.active = true
                this.nameLabel.string = guideData.speakerName
            }
            this.iconSpr.node.active = true
            
            let offsetPos = guideData.dialogOffset.split("|")
            if(this.dialogOriginPos == null) {
                this.dialogOriginPos = this.msgNode.position
            }
            this.msgNode.x = this.dialogOriginPos.x + (parseInt(offsetPos[0] || "0"))
            this.msgNode.y = this.dialogOriginPos.y + (parseInt(offsetPos[1] || "0"))

            
        }
        
        this.maskNode.active = (guideData.clickType != GuideClickType.Tip)
        if(guideData.clickType == GuideClickType.Tip) {
            this.highLightNode.active = false
        } else if (guideData.clickType == GuideClickType.Hight) {
            this.highLightNode.active = true
        } else {
            this.highLightNode.active = this.msgNode.active
        }

        let guideNode = GuideManager.instance.getGuideNode(guideData.guideNodeName)
        if(guideNode) {
            this.updateHighLight()
            this.scheduleOnce(this.updateHighLight) //widget等更新位置

            let nodeCamera = cc.Camera.findCamera(guideNode)
            nodeCamera.node.on(cc.Node.EventType.POSITION_CHANGED, this.updateHighLight, this)
            guideNode.on(cc.Node.EventType.POSITION_CHANGED, this.updateHighLight, this)
        }

        if(guideData.customEventName != '') {
            let eventName = parseInt(guideData.customEventName) || guideData.customEventName
            EventManager.instance.dispatchEvent(eventName, guideData.eventParam)
        }
        GuideManager.instance.onCheckGuide({
            type: "ShowGuideLayer"
        })
        if(guideData.nextConditionType == "DelayTime") {
            this.scheduleOnce(() => {
                GuideManager.instance.nextStep()
            }, parseFloat(guideData.nextConditionParam))
        }
    }
    updateHighLight() {
        if(this.curGuideData == null) {
            return
        }
        let guideNode = GuideManager.instance.getGuideNode(this.curGuideData.guideNodeName)
        if(guideNode == null) {
            return
        }
        let worldBox = Tool.getCameraBoundingBox(guideNode)
        this.highLightNode.width = worldBox.width
        this.highLightNode.height = worldBox.height

        let nodePos = this.highLightNode.parent.convertToNodeSpaceAR(worldBox.center)
        this.highLightNode.setPosition(nodePos)

        if(this.curGuideData.clickType == GuideClickType.Hight) {
            this.fingerNode.active = true
            let offsetPos = this.curGuideData.fingerOffset.split("|")
            this.fingerNode.x = nodePos.x + (parseInt(offsetPos[0] || "0"))
            this.fingerNode.y = nodePos.y + (parseInt(offsetPos[1] || "0"))
            
            this.fingerNode.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 1.1), cc.scaleTo(0.3, 1))))
        }
    }
    onTouchStart(event: cc.Event.EventTouch) {
        if(this.curGuideData) {
            if(this.curGuideData.clickType == GuideClickType.Hight) {
                let guideNode = GuideManager.instance.getGuideNode(this.curGuideData.guideNodeName)
                if(guideNode) {
                    let worldBox = this.highLightNode.getBoundingBox()
                    let leftBottomWorld = this.highLightNode.parent.convertToWorldSpaceAR(cc.v2(worldBox.x, worldBox.y))
                    worldBox.x = leftBottomWorld.x
                    worldBox.y = leftBottomWorld.y
                    let touchPos = event.getLocation()
                    if(worldBox.contains(touchPos)) {  //在高亮区域内不吞噬
                        return
                    }
                }
            }
        }
        event.stopPropagationImmediate()
    }

    onTouchEnd(event: cc.Event.EventTouch) {
        GuideManager.instance.onCheckGuide({
            type: "TouchGuideMask"
        })
    }

    onJumpGuide() {
        GuideManager.instance.closeGuide()
    }
}