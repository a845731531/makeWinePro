import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { DirectionEnum } from "../../Constant/GameEnum";
import { Direction } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ActorBase extends cc.Component {

    @property({type: cc.Float, tooltip: "每秒移动像素"})
    moveSpeed: number = 20;

    @property(sp.Skeleton)
    skeleton: sp.Skeleton = null;

    private _isShowing = true

    /**
     * 角色移动完毕的回调
     */
    protected _callback: Function = null;

    /**
     * 是否正在移动
     */
    protected _isMoving: boolean = false;

    /**
     * 移动路径
     */
    protected _pathPoint = []

    /**
     * 路径距离长度
     */
    protected _pathDistance = 0

    /**
     * 移动方向
     */
    protected _direction = DirectionEnum.Down

    /**
     * 上一次移动方向
     */
    protected _lastDirection = 0

    /**
     * update上一帧的时间戳
     */
    protected _lastTimeStamp = 0

    onLoad()
    {

    }

    protected updateRoleSpine()
    {

    }

    protected stopMove() {
        
    }

    protected pauseMove() {
        this._isMoving = false
    }

    protected resumeMove() {
        if (this._pathPoint.length > 0 && !this._isMoving) {
            this._isMoving = true
        }
    }

    protected onStartMoving() {

    }

    protected onStopMoving() {

    }
}