import { NetMsgDef } from "../../../resources/pb/NetMsgDef";
import BuildingConfig from "../../config/BuildingConfig";
import MapItemConfig from "../../config/MapItemConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { MoneyPropId } from "../../Constant/GameEnum";
import LandDataManager from "../../data/land/LandDataManager";
import MapDataManager from "../../data/map/MapDataManager";
import UserDataManager from "../../data/UserDataManager";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingMovePrefab extends cc.Component {

    @property(cc.Sprite)
    buildingIcon: cc.Sprite = null;
    
    @property(cc.Node)
    cancelNode: cc.Node = null;

    @property(cc.Node)
    confirmNode: cc.Node = null;

    /**
     * 编辑模式  创建还是移动
     */
    private _isCreate: boolean = true

    /**
     *  建筑物id 
     */
    private _buildingType: number = 0
    /**
     *  建筑物index
     */
    private _buildingIndex: number = 0

    /**
     * 建筑物移动后的行列位置
     */
    private _curArea = {
        col:-1,
        row:-1
    }

    /**
     * 建筑按下
     */
    private _clickBuilding = false

    /**
     * 屏幕按下
     */
    private _clickCanvas = false

    /**
     * 建筑图标icon节点
     */
    private _gameNode: cc.Node = null

    /**
     * 当前Canvas
     */
    private _canvas: cc.Node = null

    /**
     * 当前节点的摄像机
     */
    private _camera: cc.Camera = null

    /**
     * 建筑初始位置
     */
     private _buildingStartPos = null

    /**
     * 偏移距离
     */
    private _moveDis = null

    /**
     * 当前手指按下位置的世界坐标
     */
    private _curWorldPosition = null

    private _landId = null

    onLoad()
    {
        // this._canvas = cc.director.getScene().getChildByName("Canvas")
        // this.addListener()
    }

    addListener()
    {
        this.buildingIcon.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this)
        this._canvas.on(cc.Node.EventType.TOUCH_START,this.onTouchStart2,this)
        this._canvas.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this)
        this._canvas.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this)
        this._canvas.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancle,this)

        EventManager.instance.addEventListener(CustomEventEnum.MAP_BUILDING_IN_OBSTACLE,this.onBuildingInObstacle,this)
        EventManager.instance.addEventListener(CustomEventEnum.MAP_EXIT_EDITING_VIEW,this.onClickCancelBtn,this)
    }

    /**
     * @param param.buildingType 建筑物id
     * @param param.buildingIndex 建筑物index
     * @param param.originPos 建筑物初始坐标
     * @param param.isCreate 是否为创建模式
     */
    updateView(param)
    {
        this._landId = param.landId
        this._canvas = param.viewNode
        this.removeListener()
        this.addListener()

        this._buildingType = param.buildingType
        this._buildingIndex = param.buildingIndex
        this._isCreate = param.isCreate

        //当前节点为预设  没有绑定摄像机 要找找父节点的摄像机
        this._camera = cc.Camera.findCamera(this.node)

        if(MapItemConfig && MapItemConfig[this._buildingType])
        {
            //TODU  测试用
            Tool.loadSpriteFrame(cc.js.formatStr("texture/building/buildingIcon_%d_0", this._buildingType),this.buildingIcon)

            //虚化icon
            this.buildingIcon.node.opacity = 180

            //TODU 节点Node偏移量
            this._gameNode = this.node.getChildByName("Node")
            if(this._gameNode)
            {   
                let itemConfig = MapItemConfig[this._buildingType]
                this._gameNode.position = cc.v3(itemConfig.iconRect[0],itemConfig.iconRect[1])
                this._gameNode.width = itemConfig.iconRect[2]
                this._gameNode.height = itemConfig.iconRect[3]
            }

            //通知 创建绿色网格线
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_CREATE_BUILDING_GRID,{
                id: this._buildingType,
                position: param.originPos
            })

            

        }
    }
    start() {
        let curRowCol = MapDataManager.instance.getRowColByPosition(this.node.x, this.node.y)
        this._curArea.col = curRowCol.col
        this._curArea.row = curRowCol.row
    }
    /**
     * 建筑是否在障碍物上
     * @param isInObstacle 是否在障碍物上
     */
    onBuildingInObstacle(isInObstacle)
    {
        this.confirmNode.active = !isInObstacle
    }

    /**
     * 调整网格位置
     */
    adjustGridPos(dis)
    {
        if(this._buildingStartPos)
        {
            let curPosX = this._buildingStartPos.x + dis.disX
            let curPosY = this._buildingStartPos.y + dis.disY
            let curRowCol = MapDataManager.instance.getRowColByPosition(curPosX,curPosY)
            if(curRowCol.col != this._curArea.col || curRowCol.row != this._curArea.row)
            {
                this._curArea.col = curRowCol.col
                this._curArea.row = curRowCol.row
                this.node.position = cc.v3(MapDataManager.instance.getTiledMiddlePos(curRowCol.col,curRowCol.row))

                //通知绿色网格移动
                EventManager.instance.dispatchEvent(CustomEventEnum.MAP_UPDATE_BUILDING_GRID,this._curArea)
            }
        }
    }

    onTouchStart()
    {
        if(!this._clickBuilding)
        {
            // //开始移动建筑
            this._clickBuilding = true
            this._buildingStartPos = {
                x: this.node.position.x,
                y: this.node.position.y
            }
        }
    }

    /**
     * 鼠标点击位置
     */
    private _moveStartPos: cc.Vec3 = new cc.Vec3()
    onTouchStart2(event)
    {
        if(!this._clickCanvas)
        {
            this._clickCanvas = true
            this._moveStartPos = this._camera.getScreenToWorldPoint(event.getLocation())
        }
    }

    onTouchMove(event: cc.Event.EventTouch)
    {
        if(this._clickCanvas && cc.isValid(this._camera))
        {
            if(this._clickBuilding)
            {
                //将摄像机屏幕坐标转为世界坐标
                this._curWorldPosition = this._camera.getScreenToWorldPoint(event.getLocation())

                //鼠标在屏幕移动偏移量
                this._moveDis = {
                    disX: this._curWorldPosition.x - this._moveStartPos.x,
                    disY: this._curWorldPosition.y - this._moveStartPos.y
                }

                this.adjustGridPos(this._moveDis)
            }
        }
    }

    onTouchEnd(event)
    {
        this._clickCanvas = false
        this._clickBuilding = false
        
    }

    onTouchCancle(event)
    {
        this._clickCanvas = false
        this._clickBuilding = false
        
    }

    getIsClickBuilding()
    {
        return this._clickBuilding
    }

    onClickCancelBtn()
    {
        //如果不是建造建筑物 则移动预设销毁后  要显示之前隐藏起来的建筑物
        if(!this._isCreate)
        {
            //显示当前地图中正在编辑的建筑物
            EventManager.instance.dispatchEvent(CustomEventEnum.MAP_SHOW_BUILDING_PREFAB,{
                buildingType: this._buildingType,
                buildingIndex: this._buildingIndex
            })
        }

        this.destroyNode()
    }

    onClickConfirmBtn()
    {

        if(this._isCreate)
        {
            NetManager.instance.sendMsg("reqLandBuildingCreate",{
                landId: this._landId,
                buildingType: this._buildingType,
                areaId: this._curArea,
            })
    
            EventManager.instance.dispatchEvent("reqLandBuildingCreate",{
                landId: this._landId,
                buildingType: this._buildingType,
                areaId: this._curArea,
            })
        }else{
            //TODU 模拟请求服务器
            NetManager.instance.sendMsg("reqLandBuildingEditing",{
                landId: this._landId,
                buildingType: this._buildingType,
                buildingIndex: this._buildingIndex,
                areaId: this._curArea,
            })
            
            //TODU 模拟服务器返回
            EventManager.instance.dispatchEvent("reqLandBuildingEditing",{
                landId: this._landId,
                buildingType: this._buildingType,
                buildingIndex: this._buildingIndex,
                areaId: this._curArea,
            })
        }

        //销毁绿色网格
        EventManager.instance.dispatchEvent(CustomEventEnum.MAP_DESTROY_BUILDING_GRID)

        //销毁预制体
        this.destroyNode()

    }

    destroyNode()
    {
        //销毁绿色网格
        EventManager.instance.dispatchEvent(CustomEventEnum.MAP_DESTROY_BUILDING_GRID)

        this.removeListener()
        this.node.destroy()

    }

    removeListener()
    {   
        if(this.buildingIcon && this.buildingIcon.node)
        {
            this.buildingIcon.node.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this)
        }

        if(cc.isValid(this._canvas))
        {
            this._canvas.off(cc.Node.EventType.TOUCH_START,this.onTouchStart2,this)
            this._canvas.off(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this)
            this._canvas.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this)
            this._canvas.off(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancle,this)
        }

        EventManager.instance.removeTargetListener(this)
    }

    onDestroy()
    {

    }



  
}