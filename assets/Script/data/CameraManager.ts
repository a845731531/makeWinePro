import { CameraType } from "../Constant/GameEnum";
import { EventEnum } from "../framework/FrameWorkEnum";
import EventManager from "../framework/manager/EventManager";
import CameraHelper from "./CameraHelper";
export default class CameraManager {

    private static _instance: CameraManager = null;

    public static get instance(): CameraManager {
        if (this._instance == null) {
            this._instance = new CameraManager();
        }
        return this._instance;
    }

    private _cameraList = {}

    private constructor() {
        EventManager.instance.addEventListener("CameraZoomTo", this.onCameraZoomTo, this)
        EventManager.instance.addEventListener("CameraMoveTo", this.onCameraMoveTo, this)
    }

    onCameraZoomTo(zoomStr) {
        let zoomParam = zoomStr.split("|")
        let cameraType = parseInt(zoomParam[0])
        let zoomTime = parseFloat(zoomParam[1])
        let zoomScale = parseFloat(zoomParam[2])
        this.getCameraInstance(cameraType).cameraZoomTo(zoomTime, zoomScale, (cameraHelper) => {
            EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {            
                type: "CameraZoomFinished",
                param: cameraHelper.getCameraZoomRatio()
            })
        })
    }
    onCameraMoveTo(moveStr) {
        let moveParam = moveStr.split("|")
        let cameraType = parseInt(moveParam[0])
        let x = parseFloat(moveParam[1])
        let y = parseFloat(moveParam[2])
        let targetZoom = parseFloat(moveParam[3])
        let cameraHelper = this.getCameraInstance(cameraType)
        let zoomRatio = cameraHelper.getCameraZoomRatio() - 0.5
        zoomRatio = Math.max(zoomRatio, Constant.CameraZoomRatio[cameraType][0])
        cameraHelper.cameraZoomTo(0.2, zoomRatio, () => {
            cameraHelper.moveAndZoom(targetZoom, cc.v2(x, y), () => {
                EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {            
                    type: "CameraMoveFinished",
                    param: cameraHelper
                })
            })
        })
    }

    getCameraInstance(cameraType: CameraType): CameraHelper
    {
        if(!this._cameraList[cameraType])
        {
            this._cameraList[cameraType] = new CameraHelper(cameraType)
        }
        return this._cameraList[cameraType]
    }

    reset() {
        this._cameraList = {}
    }
}