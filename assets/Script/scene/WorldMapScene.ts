import { CameraType } from "../Constant/GameEnum";
import CameraManager from "../data/CameraManager";
import UserDataManager from "../data/UserDataManager";
import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
import WorldMapDynamicMap from "../view/WorldMap/WorldMapDynamicMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WorldMapScene extends cc.Component {

    @property(cc.Node)
    touchNode: cc.Node = null;

    @property(cc.Camera)
    MapCamera: cc.Camera = null;

    @property(WorldMapDynamicMap)
    dynamicMap: WorldMapDynamicMap = null;

    /**
     * 是否为双指缩放模式
     */
    private _isScaleModel = false
    /**
     * 屏幕上手指个数
     */
    private _fingerCount = 0

    /**
     * 手指按下
     */
    private _touchStart = false
    start() {        
        //初始化摄像头
        CameraManager.instance.getCameraInstance(CameraType.Map).setCameraZoomRatio(Constant.CameraZoomRatio[CameraType.Map][0])
    }

    onEnable() {
        EventManager.instance.addEventListener("RspWorldMapList", this.onRspWorldMapList, this)

        this.touchNode.on(cc.Node.EventType.MOUSE_WHEEL, this.onScrollWheel, this)

        this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this)
        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);

        this.touchNode["_touchListener"] && this.touchNode["_touchListener"].setSwallowTouches(false)
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    /**
     * 鼠标滚轮缩放地图
     * @param event 
     */
    onScrollWheel(event: cc.Event.EventMouse) {
        if (!cc.sys.isMobile) {
            let cameraRatioLimit = Constant.CameraZoomRatio[CameraType.Map]
            let zoomRatio = 0
            if (event.getScrollY() > 0) {
                zoomRatio = Math.min(cameraRatioLimit[1], this.MapCamera.zoomRatio + 0.2)
            } else {
                zoomRatio = Math.max(cameraRatioLimit[0], this.MapCamera.zoomRatio - 0.2)
            }
            this.MapCamera.zoomRatio = zoomRatio
            this.dynamicMap.updateMapView()
        }
    }

    /**
     * 记录屏幕手指个数
     * 个数大于2个时为双指缩放模式  屏蔽TOUCH_END事件的传入  防止误触地图
     * @param event 
     */
    onTouchStart(event: cc.Event.EventTouch) {
        this._touchStart = true
        this._fingerCount++
        this._isScaleModel = this._fingerCount >= 2
    }

    /**
     * 双指缩放地图
     * @param event 
     */
    onTouchMove(event: cc.Event.EventTouch) {
        let cameraRatioLimit = Constant.CameraZoomRatio[CameraType.Map]
        //双指缩放模式
        if (cc.sys.isMobile && this._isScaleModel) {
            var touches = event.getTouches();
            if (touches.length >= 2) {
                var touch1 = touches[0], touch2 = touches[1];
                var delta1 = touch1.getDelta(), delta2 = touch2.getDelta();
                var touchPoint1: cc.Vec2 = this.node.convertToNodeSpaceAR(touch1.getLocation());
                var touchPoint2: cc.Vec2 = this.node.convertToNodeSpaceAR(touch2.getLocation());
                //缩放
                var distance = touchPoint1.sub(touchPoint2);
                var delta = delta1.sub(delta2);
                var scale = 1;
                if (Math.abs(distance.x) > Math.abs(distance.y)) {
                    scale = (distance.x + delta.x) / distance.x
                }
                else {
                    scale = (distance.y + delta.y) / distance.y
                }
                let zoomRatio = 0
                if (scale > 1) {
                    zoomRatio = Math.min(cameraRatioLimit[1], this.MapCamera.zoomRatio * scale)
                } else {
                    zoomRatio = Math.max(cameraRatioLimit[0], this.MapCamera.zoomRatio * scale)
                }
                this.MapCamera.zoomRatio = zoomRatio
                this.dynamicMap.updateMapView()
            }
        }

        //不是双指缩放模式  且  编辑界面显示
        if (!this._isScaleModel && this._touchStart && this.MapCamera) {
            //只单独移动摄像机位置
            let cameraHelper = CameraManager.instance.getCameraInstance(CameraType.Map)
            let moveScale = cameraHelper.getMapTouchMoveScale() / (this.MapCamera.zoomRatio / cameraRatioLimit[0])
            let disX = -(event.getLocation().x - event.touch.getPreviousLocation().x) * moveScale
            let disY = -(event.getLocation().y - event.touch.getPreviousLocation().y) * moveScale
            this.MapCamera.node.x += disX
            this.MapCamera.node.y += disY
            this.dynamicMap.updateMapView()
        }
    }

    onTouchCancel() {
        this.clearFingerCount()
    }

    onTouchEnd(event: cc.Event.EventTouch) {
        this.clearFingerCount()
    }

    /**
     * 清除屏幕上的手指个数
     */
    clearFingerCount() {
        this._touchStart = false
        this._fingerCount > 0 && this._fingerCount--
        if (this._isScaleModel) {
            if (this._fingerCount == 0) {
                this._isScaleModel = false
            }
            return true
        }
        return false
    }

    removeListener() {
        this.touchNode.off(cc.Node.EventType.MOUSE_WHEEL, this.onScrollWheel, this)

        this.touchNode.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.touchNode.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this)
        this.touchNode.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)

        EventManager.instance.removeTargetListener(this)
    }

    onDestroy() {
        this.removeListener()
    }

    onRspWorldMapList() {
        this.dynamicMap.updateMapView()
    }

    onClickBack() {
        cc.director.loadScene("HallScene")
    }
}
