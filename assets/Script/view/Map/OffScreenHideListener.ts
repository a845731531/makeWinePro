import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { CameraType } from "../../Constant/GameEnum";
import EventManager from "../../framework/manager/EventManager";

//屏幕外节点透明度自动设置为0的组件工具
const { ccclass, property } = cc._decorator;

@ccclass
export default class OffScreenHideListener extends cc.Component {

    private _type = null

    private _camera = null

    onLoad()
    {
        EventManager.instance.addEventListener(CustomEventEnum.CAMERA_ZOOM_RATIO, this.onCameraZoomRatio, this)
        EventManager.instance.addEventListener(CustomEventEnum.CAMERA_MOVE, this.onCameraZoomRatio, this)
    }
    
    
    start()
    {
        this._camera = cc.Camera.findCamera(this.node)
        if(this._camera && this._camera.node.name == "map_camera")
        {
            this._type = CameraType.Map
        }else if(this._camera && this._camera.node.name == "land_camera"){
            this._type = CameraType.LandMap
        }

        this.scheduleOnce(this.onNodeMove,0.1)
    }

    onNodeMove()
    {
        if(this._type && this._camera)
        {
            return this.onCameraZoomRatio({
                type: this._type,
                camera: this._camera
            })
        }else{
            console.log("OffScreenHideListener未初始化完成")
        }
    }

    onCameraZoomRatio(param) {
        if (!cc.isValid(this.node) || param.type != this._type) {
            return
        }
        //获取屏幕矩形在世界地图的坐标和大小
        let screenNodeRect = this.getScreenRect()

        //移除在屏幕外的
        if(this.isInScreen(screenNodeRect)) {
            this.node.opacity = 255
            return true
        }else{
            this.node.opacity = 0
            return false
        }
    }

    //是否在屏幕内，可能有偏移，可能需要添加屏幕外区域
    isInScreen(screenRect: cc.Rect): boolean {
        let extralRect = screenRect.clone()
        let itemSize = this.getItemSize()
        extralRect.xMin -= itemSize.width + 500
        extralRect.yMin -= itemSize.height + 500
        extralRect.xMax += itemSize.width + 500
        extralRect.yMax += itemSize.height + 500
        
        let boundingBox = this.node.getBoundingBox()
        return extralRect.intersects(boundingBox)
    }

    /**
     * 获取屏幕矩形在世界地图的坐标和大小
     * @returns 
     */
    getScreenRect() {
        let camera = cc.Camera.findCamera(this.node)
        let screenLB = cc.Vec2.ZERO
        let worldLB = camera.getScreenToWorldPoint(screenLB)
        let screenRT = cc.v2(cc.winSize.width, cc.winSize.height)
        let worldRT = camera.getScreenToWorldPoint(screenRT)
        let screenNodeRect = cc.rect(worldLB.x, worldLB.y, worldRT.x - worldLB.x, worldRT.y - worldLB.y)
        return screenNodeRect
    }

    getItemSize() {
        return this.node.getContentSize()
    }

    onDestroy()
    {
        EventManager.instance.removeTargetListener(this)
    }
}