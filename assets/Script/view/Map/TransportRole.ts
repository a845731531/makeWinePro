import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { BuildingType, DirectionEnum, CarStateEnum } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import BuildingDataManager from "../../data/BuildingDataManager";
import NpcManager from "../../data/npc/NpcManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import ActorBase from "./ActorBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TransportRole extends ActorBase {

    @property(cc.Label)
    npcName: cc.Label = null;

    /**
     * 当前骨骼状态
     */
    private _curSpineState = ""

    onLoad() {
        super.onLoad()
    }

    start() {
        this.updateRoleSpine()
    }

    /**初始化角色
     * @param progress 当前路线完成的进度 百分比
     * @param callback 路线完成回调
     * @returns 
     */
    initNpc(speed, progress = 0, callback?) {
        let self = this
        this.npcName.string = "运水马车"
        this.moveSpeed = speed

        //加载骨骼
        // cc.resources.load("spine/car/mache", sp.SkeletonData, (err, asset: sp.SkeletonData) => {
        //     self.skeleton.skeletonData = asset
        //     //开始移动
        //     self.moveNpc(progress, callback)
        // })
        self.moveNpc(progress, callback)

    }

    /**
     * 启动角色行动路线
     * @param progress 当前路线完成的进度 百分比
     * @param callback 路线完成回调
     * @returns 
     */
    public moveNpc(progress = 0, callback?) {
        this.initPathData(progress)

        //原地不动的npc
        if (this._pathPoint.length == 1) {
            this.setPosition(this._pathPoint[0])
            return
        }

        //开始行走移动
        if (this._pathDistance > 0) {
            this._lastTimeStamp = new Date().getTime()

            this.setPosition(this._pathPoint[0])

            this._callback = callback || null

            if (this._pathPoint.length == 0) {
                return
            }
            this._isMoving = true;

            this.onStartMoving()
        }
    }

    /**
     * 初始化路线数据
     * @param progress 当前路线完成的进度 百分比
     * @returns 
     */
    initPathData(progress = 0) {
        //获得单程数据
        this._pathPoint = []
        let pathId = Tool.getNumberParamConfig("carPathId")
        let pathConfig = NpcManager.instance.getPathConfigById(pathId)
        this._pathDistance = pathConfig.distance
        let curDis = this._pathDistance * progress

        let list = pathConfig.list
        let disList = pathConfig.distanceList
        let dis = 0
        let deltaDis = 0
        for (let k = 0; k < list.length; k++) {
            let curPos = cc.v2(list[k][0], list[k][1])
            if (progress == 0 || k == list.length - 1 || this._pathPoint.length > 0) {
                this._pathPoint.push(cc.v2(list[k][0], list[k][1]))
            } else if (k < list.length - 1) {
                dis += disList[k]
                if (dis > curDis) {
                    deltaDis = dis - curDis
                    let deltaRate = deltaDis / disList[k];

                    let nextPos = cc.v2(list[k][0], list[k][1])
                    let targetPos = nextPos.lerp(curPos, deltaRate);

                    this._pathPoint.push(targetPos)
                }
            }
        }
    }

    updateRoleSpine() {
        if (!this.skeleton || !cc.isValid(this.skeleton.node)) {
            return
        }

        //正在移动
        if(this._lastDirection != this._direction)
        {
            this._lastDirection = this._direction
            this.skeleton.node.scaleX = 1
            switch(this._direction)
            {
                case DirectionEnum.Left:
                    this.skeleton.node.scaleX = -1
                    this.skeleton.setAnimation(0, CarStateEnum.right, true)
                    break
                case DirectionEnum.Right:
                    this.skeleton.setAnimation(0, CarStateEnum.right, true)
                    break
            }
        }
    }

    stopMove() {
        if (this._isMoving) {
            this._isMoving = false;
            this._pathPoint.length = 0;
        }
    }

    changeDirection(curPos, nextPos) {
        //角色左右转向
        let disX = nextPos.x - curPos.x
        let disY = nextPos.y - curPos.y

        if(disX > 0)
        {
            this._direction = DirectionEnum.Right
        }else{
            this._direction = DirectionEnum.Left
        }

        this.updateRoleSpine()
    }

    update(dt: number) {
        if (!this._isMoving) {
            return;
        }

        let curTime = new Date().getTime()
        dt = (curTime - this._lastTimeStamp) / 1000
        this._lastTimeStamp = curTime

        let moveLength = this.moveSpeed * dt;
        let nextPos = this.node.getPosition();
        let curPos: cc.Vec2 = null;
        while (moveLength > 0 && this._pathPoint.length > 0) {
            curPos = nextPos;
            nextPos = this._pathPoint.shift()
            moveLength -= cc.Vec2.distance(nextPos, curPos)
        }
        if (moveLength < 0) {
            this._pathPoint.unshift(nextPos)
        }

        if (curPos && nextPos) {

            this.changeDirection(curPos, nextPos)

            //移动
            let distance = cc.Vec2.distance(nextPos, curPos);
            let deltaDistance = moveLength + distance;
            let deltaRate = deltaDistance / distance;
            let targetPos = curPos.lerp(nextPos, deltaRate);
            this.setPosition(targetPos)

            if (this._pathPoint.length == 0) {
                this._isMoving = false;
                this.onStopMoving()
            }
        }
    }

    setPosition(targetPos) {
        this.node.setPosition(targetPos)
        this.node.zIndex = Tool.getBuildingZIndex(targetPos.y)
    }

    onStartMoving() {
        this.updateRoleSpine()
    }

    onStopMoving() {
        this._pathPoint = []
        this._isMoving = false
        this.updateRoleSpine()

        //到达终点 销毁交通工具节点
        this.node.destroy()
    }

    onClickTrandsport()
    {
        let buildingData = BuildingDataManager.instance.getBuildingData(BuildingType.Water,1)

        if(buildingData)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.BuildingDetailWaterwheel,
                exData: {
                    buildingData: buildingData
                }
            })
        }
    }

    removeListener() {
        EventManager.instance.removeTargetListener(this)
    }

    onDestroy() {
        this.removeListener()
    }
}