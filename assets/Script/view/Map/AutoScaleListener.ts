import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { CameraType } from "../../Constant/GameEnum";
import EventManager from "../../framework/manager/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AutoSclaleListener extends cc.Component {
    
    private _type = null

    onLoad()
    {
        EventManager.instance.addEventListener(CustomEventEnum.CAMERA_ZOOM_RATIO, this.onCameraZoomRatio, this)
    }

    start()
    {
        let camera = cc.Camera.findCamera(this.node)
        if(camera && camera.node.name == "map_camera")
        {
            this._type = CameraType.Map
        }else if(camera && camera.node.name == "land_camera"){
            this._type = CameraType.LandMap
        }

        this.scheduleOnce(() => {
            this.onCameraZoomRatio({
                type: this._type,
                camera: camera
            })
        }, 0.1)
    }

    onCameraZoomRatio(param)
    {
        if(param.type == this._type)
        {
            let zoomRatio = param.camera.zoomRatio
    
            let curZoomRation = 1 + (zoomRatio - 1) * 0.8  //0.9为autoScale物件缩放比例
            let needScale = 1 / curZoomRation
            this.node.setScale(needScale)
        }
    }

    onDestroy()
    {
        EventManager.instance.removeTargetListener(this)
    }
}