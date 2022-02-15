import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { CameraType } from "../../Constant/GameEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AutoHideListener extends cc.Component {

    private _isShowing = true

    private _npcHideZoomRation = null

    private _type = null

    onLoad()
    {
        EventManager.instance.addEventListener(CustomEventEnum.CAMERA_ZOOM_RATIO, this.onCameraZoomRatio, this)

        this._npcHideZoomRation = Tool.getNumberParamConfig("npcHideZoomRatio")
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
    }

    onCameraZoomRatio(param) {

        
        if (!cc.isValid(this.node) || param.type != this._type) {
            return
        }
        
        let zoomRatio = param.camera.zoomRatio

        let self = this
        let interval = 0.1

        //显示
        if (zoomRatio >= this._npcHideZoomRation && !this._isShowing) {
            // self.node.opacity = 0
            self.node.active = true

            // self.node.opacity = 255
            self._isShowing = true
            // cc.tween(self.node)
            //     .to(interval, { opacity: 255 })
            //     .call(()=>{ 
            //         self._isShowing = true
            //     })
            //     .start();
        }

        //隐藏
        if (zoomRatio < this._npcHideZoomRation && self._isShowing) {
            // self.node.opacity = 255
            self.node.active = true

            // self.node.opacity = 0
            self.node.active = false 
            self._isShowing = false
            // cc.tween(self.node)
            //     .to(interval, { opacity: 0 })
            //     .call(() => { 
            //         self.node.active = false 
            //         self._isShowing = false
            //     })
            //     .start();
        }
    }

    onDestroy()
    {
        EventManager.instance.removeTargetListener(this)
    }
}