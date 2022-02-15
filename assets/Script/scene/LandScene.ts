import { CustomEventEnum } from "../Constant/CustomEventEnum";
import EventManager from "../framework/manager/EventManager";
import { EventEnum } from "../framework/FrameWorkEnum";
import { Tool } from "../framework/manager/Tool";
import BuildingMovePrefab from "../view/Map/BuildingMovePrefab";
import CameraManager from "../data/CameraManager";
import MapDataManager from "../data/map/MapDataManager";
import { CameraType } from "../Constant/GameEnum";
import LandDataManager from "../data/land/LandDataManager";
import BaseView from "../framework/viewbase/BaseView";
import BaseLandInfo from "../view/WorldMap/BaseLandInfo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LandScene extends BaseView {

    @property(cc.TiledMap)
    map: cc.TiledMap = null;

    @property(cc.Node)
    touchNode: cc.Node = null;

    @property(cc.Camera)
    MapCamera: cc.Camera = null;

    @property(cc.Prefab)
    movePrefab: cc.Prefab = null;

    @property(cc.Node)
    movePrefabParent: cc.Node = null;

    @property(cc.Node)
    whiteGridParent: cc.Node = null;

    @property(cc.Prefab)
    whiteGridItem: cc.Prefab = null;

    @property(cc.Node)
    buildingConstruct: cc.Node = null;

    @property(cc.Node)
    bytLandNode: cc.Node = null;

    @property(cc.Node)
    btnConstruct: cc.Node = null;

    @property(cc.Node)
    btnClose: cc.Node = null;

    /**
     * 手指按下
     */
    private _touchStart = false

    /**
     * 是否为双指缩放模式
     */
    private _isScaleModel = false
    /**
     * 屏幕上手指个数
     */
    private _fingerCount = 0

    /**
     * 用于拖动的 建筑物预设
     */
    private _movePrefab = null

    private _movePrefabCom: BuildingMovePrefab = null

    private _landId = null

    onLoad() {
        this.addListener()
    }

    initByExData(exData: any): void {

        this._landId = exData.gridData.landId

        if(exData.gridData && exData.gridData.userId)
        {
            this.initLand()
        }else{
            this.btnConstruct.active = false
            this.btnClose.active = false
            this.bytLandNode.active = true

            this.bytLandNode.getComponent(BaseLandInfo).updateView({
                gridData: exData.gridData,
                callback: this.initLand.bind(this)
            })
        }

    }

    initLand()
    {
        this.btnConstruct.active = true
        this.btnClose.active = true
        this.bytLandNode.active = false

        LandDataManager.instance.init()
        LandDataManager.instance.setCurLandId(this._landId)

        //xiejinhui TODO
        // EventManager.instance.dispatchEvent("reqLandBuildingCreate",{
        //     landId: this._landId,
        //     buildingType: 11,
        //     areaId: {
        //         col: 28,
        //         row: 54
        //     },
        // })
        // EventManager.instance.dispatchEvent("reqLandBuildingCreate",{
        //     landId: this._landId,
        //     buildingType: 12,
        //     areaId: {
        //         col: 44,
        //         row: 32
        //     },
        // })

        this.updateLand(this._landId)
    }

    /**
     * 陆地id
     * @param landId 
     */
    updateLand(landId)
    {

        //xiejinhui  先屏蔽
        //获取当前工业用地的建筑信息
        // NetManager.instance.sendMsg("reqLandBuildingData",{
        //     landId: landId
        // })
        // EventManager.instance.dispatchEvent("reqLandBuildingData",{
        //     landId: landId
        // })
    }

    /**
     * 记录屏幕手指个数
     * 个数大于2个时为双指缩放模式  屏蔽TOUCH_END事件的传入  防止误触地图
     * @param event 
     */
    onClickMapStart(event: cc.Event.EventTouch)
    {
        this._fingerCount++
        this._isScaleModel = this._fingerCount >= 2
    }

    addListener()
    {
        EventManager.instance.addEventListener(CustomEventEnum.MAP_ADD_BUILDING,this.onAddBuilding,this)
        EventManager.instance.addEventListener(CustomEventEnum.MAP_EXIT_EDITING_VIEW,this.onEditingModelChange,this)
        EventManager.instance.addEventListener(CustomEventEnum.MAP_ENTER_EDITING_VIEW,this.onEditingModelChange,this)


        this.touchNode.on(cc.Node.EventType.MOUSE_WHEEL, this.onScrollWheel, this)

        this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this)
        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);

        
        MapDataManager.instance.init(this.map,this.whiteGridParent,this.whiteGridItem)

        let canvas = cc.director.getScene().getChildByName("Canvas")
        //初始化摄像头
        CameraManager.instance.getCameraInstance(CameraType.LandMap).init(canvas,this.MapCamera,this.map.node.parent)
        CameraManager.instance.getCameraInstance(CameraType.LandMap).setCameraZoomRatio(Constant.CameraZoomRatio[CameraType.LandMap][0])
        CameraManager.instance.getCameraInstance(CameraType.LandMap).moveCamera(0,0)
    }

    /**
     * 创建建筑物在地图移动的Prefab
     * @param param 
     */
    onAddBuilding(param:{buildingType:number,buildingIndex?:number,position?:cc.Vec3,isCreate?:boolean})
    {
        if(cc.isValid(this._movePrefab))
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: cc.js.formatStr("请先完成当前建筑的编辑")
            })
            return
        }

        //正在编辑建筑ing
        if(LandDataManager.instance.getIsEditing())
        {
            this._movePrefab = cc.instantiate(this.movePrefab)
            this._movePrefab.parent = this.movePrefabParent
            this._movePrefab.zIndex = Tool.getMaxZIndex()
            
            this._movePrefabCom = this._movePrefab.getComponent(BuildingMovePrefab)
            if(param.isCreate == false)
            {
                //隐藏当前地图中正在编辑的建筑物
                EventManager.instance.dispatchEvent(CustomEventEnum.MAP_HIDE_BUILDING_PREFAB,param)
                
                this._movePrefab.position = param.position
                this._movePrefabCom.updateView({
                    landId: this._landId,
                    viewNode: this.node,
                    buildingType:param.buildingType,
                    buildingIndex: param.buildingIndex,
                    originPos: param.position,
                    isCreate: false
                })
            }else{
                var worldPos = this.MapCamera.getScreenToWorldPoint(cc.v2(this.node.width/2,this.node.height/2))
                let targetPos = this.map.node.convertToNodeSpaceAR(worldPos)
                this._movePrefab.position = targetPos 
                this._movePrefabCom.updateView({
                    landId: this._landId,
                    viewNode: this.node,
                    buildingType:param.buildingType,
                    buildingIndex: -1,
                    originPos: targetPos,
                    isCreate: true
                })
            }
        }
    }

    /**
     * 鼠标滚轮缩放地图
     * @param event 
     */
     onScrollWheel(event: cc.Event.EventMouse) {
        if (!cc.sys.isMobile) {
            let arr = Constant.CameraZoomRatio[CameraType.LandMap]
            let zoomRatio = 0
            if (event.getScrollY() > 0) {
                zoomRatio = Math.min(arr[1], this.MapCamera.zoomRatio + 0.2)
            } else {
                zoomRatio = Math.max(arr[0], this.MapCamera.zoomRatio - 0.2)
            }
            CameraManager.instance.getCameraInstance(CameraType.LandMap).setCameraZoomRatio(zoomRatio)
            CameraManager.instance.getCameraInstance(CameraType.LandMap).moveCamera(0,0)
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
        //双指缩放模式
        if (cc.sys.isMobile && this._isScaleModel) {
            let arr = Constant.CameraZoomRatio[CameraType.LandMap]
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
                    zoomRatio = Math.min(arr[1], this.MapCamera.zoomRatio * scale)
                } else {
                    zoomRatio = Math.max(arr[0], this.MapCamera.zoomRatio * scale)
                }
                CameraManager.instance.getCameraInstance(CameraType.LandMap).setCameraZoomRatio(zoomRatio)
                CameraManager.instance.getCameraInstance(CameraType.LandMap).moveCamera(0,0)
            }
        }

        //不是双指缩放模式  且  编辑界面显示
        if (!this._isScaleModel && this._touchStart && this.MapCamera) {
            //只单独移动摄像机位置
            let moveScale = CameraManager.instance.getCameraInstance(CameraType.LandMap).getMapTouchMoveScale() / 
                    (this.MapCamera.zoomRatio / Constant.CameraZoomRatio[CameraType.LandMap][0])
            let disX = -(event.getLocation().x - event.touch.getPreviousLocation().x) * moveScale
            let disY = -(event.getLocation().y - event.touch.getPreviousLocation().y) * moveScale
            CameraManager.instance.getCameraInstance(CameraType.LandMap).moveCamera(disX,disY)
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

    onEditingModelChange()
    {
        let isEditing = LandDataManager.instance.getIsEditing() 
        this.buildingConstruct.active = isEditing 
        this.whiteGridParent.active = isEditing
    }

    onClickBuildingConstruct()
    {
        if(LandDataManager.instance.getIsEditing())
        {
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_EXIT_EDITING_VIEW)
        }else{
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_ENTER_EDITING_VIEW)
        }
    }

    removeListener()
    {
        MapDataManager.instance.saveWhiteGridPool()

        this.touchNode.off(cc.Node.EventType.MOUSE_WHEEL, this.onScrollWheel, this)

        this.touchNode.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.touchNode.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this)
        this.touchNode.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)

        EventManager.instance.removeTargetListener(this)
    }

    onDestroy() {

        LandDataManager.instance.reset()
        this.removeListener()
    }
}
