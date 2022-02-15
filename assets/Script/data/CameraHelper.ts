import { CustomEventEnum } from "../Constant/CustomEventEnum";
import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
export default class CameraHelper {

    private _canvas: cc.Node = null;
    private _camera: cc.Camera = null;
    private _mapNode: cc.Node = null;

    private _type = null

    private _intervalId = null

    init(canvas, camera, mapNode) {
        this._canvas = canvas
        this._camera = camera
        this._mapNode = mapNode

        let minZoomY = this._canvas.height / this._mapNode.height
        let minZoomX = this._canvas.width / this._mapNode.width

        this.initCameraZoomRatioLimit()

        //设置的最大缩小比例  当前屏幕/zoomRatio的话  修改最小缩放比例
        Constant.CameraZoomRatio[this._type][0] = Math.max(Math.max(minZoomY, minZoomX), Constant.CameraZoomRatio[this._type][0])
    }

    initCameraZoomRatioLimit() {
        Constant.CameraZoomRatio[this._type] = [
            Tool.getNumberParamConfig("cameraZoomRatio", 0),
            Tool.getNumberParamConfig("cameraZoomRatio", 1)
        ]
    }

    constructor(type) {
        this._type = type
        this.addNetListener()
    }

    addNetListener() {

    }

    setCameraZoomRatio(zoomRatio) {
        if (this._camera && this._canvas) {
            if (this._camera.zoomRatio != zoomRatio) {
                this._camera.zoomRatio = zoomRatio
                EventManager.instance.dispatchEvent(CustomEventEnum.CAMERA_ZOOM_RATIO, {
                    type: this._type,
                    camera: this._camera,
                })
            }
        }
    }
    getCameraZoomRatio() {
        if (this._camera) {
            return this._camera.zoomRatio
        } else {
            return Constant.CameraZoomRatio[this._type][0]
        }
    }
    /**
     * 移动摄像机
     */
    moveCamera(disX, disY) {
        if (this._camera && this._canvas) {
            let align = this.checkCameraBeyondMap(this._camera.node)
            let cameraPos = this._camera.node.position

            let maxX = (this.getMapWidth() - this.getCameraWidth()) / 2
            if (align.alignX && (cameraPos.x * disX > 0 || disX == 0 || this._camera.node.x == 0)) {
                this._camera.node.x = cameraPos.x > 0 ? maxX : -maxX
            } else {
                if (cameraPos.x > 0) {
                    this._camera.node.x = Math.min(this._camera.node.x + disX, maxX)
                } else {
                    this._camera.node.x = Math.max(this._camera.node.x + disX, -maxX)
                }
            }

            let maxY = (this.getMapHeight() - this.getCameraHeight()) / 2
            if (align.alignY && (cameraPos.y * disY > 0 || disY == 0 || this._camera.node.y == 0)) {
                this._camera.node.y = cameraPos.y > 0 ? maxY : -maxY
            } else {
                if (cameraPos.y > 0) {
                    this._camera.node.y = Math.min(this._camera.node.y + disY, maxY)
                } else {
                    this._camera.node.y = Math.max(this._camera.node.y + disY, -maxY)
                }
            }

            EventManager.instance.dispatchEvent(CustomEventEnum.CAMERA_MOVE, {
                type: this._type,
                camera: this._camera,
            })

        }
    }

    //缩放摄像机
    cameraZoomTo(time, zoomRatio, callback = null) {
        let self = this
        cc.tween(this._camera)
            .to(time, { zoomRatio: zoomRatio },{
                'onUpdate': (target,ratio) => {
                    EventManager.instance.dispatchEvent(CustomEventEnum.CAMERA_ZOOM_RATIO, {
                        type: self._type,
                        camera: self._camera,
                    })
                }
            })
            .call(() => {
                if (callback) {
                    callback(this)
                }
            })
            .start()
    }
    moveAndZoom(zoomRatio, targetPos, callback = null) {
        let self = this
        let curPos = this._camera.node.position
        let time = Math.sqrt(2 * cc.Vec2.distance(curPos, targetPos) / 10000)
        cc.tween(this._camera)
            .to(time, { zoomRatio: zoomRatio }, {
                'onUpdate': (target,ratio) => {
                    EventManager.instance.dispatchEvent(CustomEventEnum.CAMERA_ZOOM_RATIO, {
                        type: self._type,
                        camera: self._camera,
                    })
                }
            })
            .call(() => {
                if (callback) {
                    callback(this)
                }
            })
            .start()

        cc.tween(this._camera.node)
            .to(time, { position: targetPos })
            .start()
    }
    /**
     * 移动摄影机到指定位置 并 放大
     * @param targetPos 
     */
    moveCanmeraTo(targetPos) {
        this.moveAnmation(targetPos)
    }

    moveAnmation(targetPos, callback = null) {

        let targetZoom = 1

        //摄像头的位置是否会超出屏幕 有黑边出现
        // let maxX = (this.getMapWidth() - this.getCameraWidth()) / 2
        // let maxY = (this.getMapHeight() - this.getCameraHeight()) / 2
        // let align = this.checkCameraBeyondMap({
        //     position: targetPos
        // })
        // if (align.alignX) {
        //     targetPos.x = targetPos.x > 0 ? maxX : -maxX
        // }
        // if (align.alignY) {
        //     targetPos.y = targetPos.y > 0 ? maxY : -maxY
        // }

        

        // cc.tween(this._camera)
        // .to(.3, { zoomRatio:targetZoom })
        // .start();

        // cc.tween(this._camera.node)
        //     .to(.3, { position:targetPos})
        //     .call(() => {
        //         if(callback) {
        //             callback(this)
        //         }
        //     })
        //     .start();

        this.moveAndZoom(targetZoom, targetPos, callback)
    }

    /**
     * 检查摄像机是否超出边界
     * @returns 
     */
    checkCameraBeyondMap(node?) {
        let result = {
            alignX: true,
            alignY: true,
        }

        //当前摄像机实际缩放比率
        let cameraWidth = this.getCameraWidth()
        let cameraHeight = this.getCameraHeight()
        let cameraPos = node ? node.position : this._camera.node

        //摄像机坐标 + 摄像机宽度/2的值
        let cameraPosX = Math.abs(cameraPos.x) + cameraWidth / 2
        //此时超出了摄像机渲染的范围超出了边界
        if (!this.checkCameraIsBigger(false)) {
            if (cameraPosX >= this.getMapWidth() / 2) {
                result.alignX = true
            } else {
                result.alignX = false
            }
        }

        //摄像机坐标 +  摄像机宽度/2的值
        let cameraPosY = Math.abs(cameraPos.y) + cameraHeight / 2
        if (!this.checkCameraIsBigger(true)) {
            if (cameraPosY >= this.getMapHeight() / 2) {
                result.alignY = true
            } else {
                result.alignY = false
            }
        }
        return result
    }

    /**
     * 当前屏幕实际可视宽度
     * @returns 
     */
    getCameraWidth() {
        return this._canvas.width / this._camera.zoomRatio
    }

    /**
     * 当前屏幕实际可视高度
     * @returns 
     */
    getCameraHeight() {
        return this._canvas.height / this._camera.zoomRatio
    }

    /**
     * 检查摄影机视图是否大于地图
     */
    checkCameraIsBigger(isHeight) {
        if (isHeight) {
            return this.getCameraHeight() >= this.getMapHeight()
        } else {
            return this.getCameraWidth() >= this.getMapWidth()
        }
    }

    getMapWidth() {
        return this._mapNode.width
    }

    getMapHeight() {
        return this._mapNode.height
    }

    getMapTouchMoveScale() {
        return Tool.getNumberParamConfig("touchMoveMapScale")
    }


    reset() {
        EventManager.instance.removeTargetListener(this);
    }
}