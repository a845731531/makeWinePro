import NpcConfig from "../../config/NpcConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { DirectionEnum, NpcPathType, RoleStateEnum } from "../../Constant/GameEnum";
import NpcManager from "../../data/npc/NpcManager";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import ActorBase from "./ActorBase";
import OffScreenHideListener from "./OffScreenHideListener";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NpcMove extends ActorBase {

    private _npcConfig = null

    private _pointLength = 0

    private sectionRecord = {}

    private _modelData = {
        1: "spine/npc/nan-canguan",
        2: "spine/npc/nan-guanli",
        3: "spine/npc/nan-kuanggong",
        4: "spine/npc/nan-nongmin",
        5: "spine/npc/nan-xizhuang",
        6: "spine/npc/nv",
        7: "spine/npc/nv-meinv",
        8: "spine/npc/nv-qun",
        9: "spine/npc/nv-wanghong_",
    }

    onLoad() {
        super.onLoad()
    }

    /**初始化角色
     * @param npcId npcId
     * @param modelId modelId
     * @param progress 当前路线完成的进度 百分比
     * @param callback 路线完成回调
     * @returns 
     */
    initNpc(npcId, modelId, progress = 0, callback?) {
        let self = this
        this._npcConfig = NpcConfig[npcId]
        //加载骨骼
        this.skeleton.node.active = true
        cc.resources.load(this._modelData[modelId], sp.SkeletonData, (err, asset: sp.SkeletonData) => {
            if(cc.isValid(self.skeleton))
            {
                self.skeleton.skeletonData = asset
                //开始移动
                self.moveNpc(progress, callback)
            }
        })

        NpcManager.instance.setNpcCanMove(npcId,true)
    }

    /**
     * 启动角色行动路线
     * @param progress 当前路线完成的进度 百分比
     * @param callback 路线完成回调
     * @returns 
     */
    public moveNpc(progress = 0, callback?) {
        this._direction = DirectionEnum.Down
        this._lastDirection = 0
        this.initPathData(progress)

        //原地不动的npc
        if (this._pathPoint.length == 1 || this._pathDistance == 0) {
            this.setPosition(this._pathPoint[0])
            this.skeleton && this.skeleton.setAnimation(0, RoleStateEnum.dowmIdle, true)
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
        this._pathPoint = this.getConfigPathList(progress)
        this.adjustPathData()
    }

    getConfigPathList(progress = 0)
    {
        let pathPoint = []
        let pathConfig = NpcManager.instance.getPathConfigById(this._npcConfig.pathId)
        this._pathDistance = pathConfig.distance
        let curDis = this._pathDistance * progress

        let list = pathConfig.list
        let disList = pathConfig.distanceList
        let dis = 0
        let deltaDis = 0
        for (let k = 0; k < list.length; k++) {
            let curPos = cc.v2(list[k][0], list[k][1])
            if (progress == 0 || k == list.length - 1 || pathPoint.length > 0) {
                pathPoint.push(cc.v2(list[k][0], list[k][1]))
            } else if (k < list.length - 1) {
                dis += disList[k]
                if (dis > curDis) {
                    deltaDis = dis - curDis
                    let deltaRate = deltaDis / disList[k];

                    let nextPos = cc.v2(list[k + 1][0], list[k + 1][1])
                    let targetPos = nextPos.lerp(curPos, deltaRate);

                    pathPoint.push(targetPos)
                }
            }
        }
        return pathPoint
    }

    /**
     * 根据路线类型 调整当前路线
     */
    adjustPathData() {
        if (this._pathPoint.length > 0) {
            switch (this._npcConfig.pathType) {
                case NpcPathType.RETURN_STAY:
                case NpcPathType.RETURN:
                    let returnPath = this.getConfigPathList(0)
                    this._pathPoint = this._pathPoint.concat(returnPath.reverse())
                    break
                case NpcPathType.ONCE:
                case NpcPathType.SECTION:
                case NpcPathType.END_NO_MOVE:
                    break
                case NpcPathType.STATIC:
                    this._pathPoint = [this._pathPoint[0]]
                    break
            }

            this._pointLength = this._pathPoint.length
        }
        // console.log("路线数据",this._pathPoint)
    }

    updateRoleSpine() {
        if (!this.skeleton || !cc.isValid(this.skeleton.node)) {
            return
        }

        if (this._isMoving) {
            //正在移动
            if (this._lastDirection != this._direction) {
                this._lastDirection = this._direction
                this.skeleton.node.scaleX = 1
                switch (this._direction) {
                    case DirectionEnum.Down:
                        this.skeleton.setAnimation(0, RoleStateEnum.dowmRun, true)
                        break
                    case DirectionEnum.Up:
                        this.skeleton.setAnimation(0, RoleStateEnum.upRun, true)
                        break
                    case DirectionEnum.Left:
                    case DirectionEnum.LeftDown:
                        this.skeleton.node.scaleX = -1  //左方向需要反转
                        this.skeleton.setAnimation(0, RoleStateEnum.rightDownRun, true)
                        break
                    case DirectionEnum.LeftUp:
                        this.skeleton.node.scaleX = -1  //左方向需要反转
                        this.skeleton.setAnimation(0, RoleStateEnum.rightUpRun, true)
                        break
                    case DirectionEnum.Right:
                    case DirectionEnum.RightDown:
                        this.skeleton.setAnimation(0, RoleStateEnum.rightDownRun, true)
                        break
                    case DirectionEnum.RightUp:
                        this.skeleton.setAnimation(0, RoleStateEnum.rightUpRun, true)
                        break
                }
            }
        } else {
            //停止移动
            switch (this._direction) {
                case DirectionEnum.Down:
                    this.skeleton.setAnimation(0, RoleStateEnum.dowmIdle, true)
                    break
                case DirectionEnum.Up:
                    this.skeleton.setAnimation(0, RoleStateEnum.upIdle, true)
                    break
                case DirectionEnum.Left:
                case DirectionEnum.LeftDown:
                    this.skeleton.node.scaleX = -1  //左方向需要反转
                    this.skeleton.setAnimation(0, RoleStateEnum.rightDownIdle, true)
                    break
                case DirectionEnum.LeftUp:
                    this.skeleton.node.scaleX = -1  //左方向需要反转
                    this.skeleton.setAnimation(0, RoleStateEnum.rightUpIdle, true)
                    break
                case DirectionEnum.Right:
                case DirectionEnum.RightDown:
                    this.skeleton.setAnimation(0, RoleStateEnum.rightDownIdle, true)
                    break
                case DirectionEnum.RightUp:
                    this.skeleton.setAnimation(0, RoleStateEnum.rightUpIdle, true)
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

    /**
     * 检查是否需要分段停留
     * @returns 
     */
    checkNpcPathSectionModel() {
        if (this._npcConfig.pathType == NpcPathType.SECTION && this._pointLength >= 3) {
            //第一个点停留3s
            if (this._pointLength - this._pathPoint.length == 2 && !this.sectionRecord[0]) {
                this.pauseMove()
                this.sectionRecord[0] = true
                // console.log(this._npcConfig.name + "第一个点开始停留3s")
                this.scheduleOnce(() => {
                    // console.log(this._npcConfig.name + "第一个点回复移动")
                    this.resumeMove()
                }, 3)
                return true
            }

            //第二个点停留3s
            if (this._pointLength - this._pathPoint.length == 3 && !this.sectionRecord[1]) {
                this.pauseMove()
                this.sectionRecord[1] = true
                // console.log(this._npcConfig.name + "第二个点开始停留3s")
                this.scheduleOnce(() => {
                    // console.log(this._npcConfig.name + "第二个点回复移动")
                    this.resumeMove()
                }, 3)
                return true
            }
        }
        return false
    }

    changeDirection(curPos, nextPos) {
        //角色左右转向
        let disX = nextPos.x - curPos.x
        let disY = nextPos.y - curPos.y

        if (disX == 0 && disY > 0) {
            this._direction = DirectionEnum.Up
        } else if (disX == 0 && disY <= 0) {
            this._direction = DirectionEnum.Down
        } else if (disX > 0 && disY == 0) {
            this._direction = DirectionEnum.Right
        } else if (disX < 0 && disY == 0) {
            this._direction = DirectionEnum.Left
        } else if (disX > 0 && disY > 0) {
            this._direction = DirectionEnum.RightUp
        } else if (disX > 0 && disY < 0) {
            this._direction = DirectionEnum.RightDown
        } else if (disX < 0 && disY > 0) {
            this._direction = DirectionEnum.LeftUp
        } else if (disX < 0 && disY < 0) {
            this._direction = DirectionEnum.LeftDown
        }

        this.updateRoleSpine()
    }


    update(dt: number) {
        if (!this._isMoving) {
            return;
        }

        if(this._npcConfig.pathType == NpcPathType.STATIC)
        {
            return
        }

        if(!NpcManager.instance.checkNpcCanMove(this._npcConfig.id))
        {
            return
        }
        
        this.skeleton.enabled = (this.node.opacity > 0)

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
            //转向
            this.changeDirection(curPos, nextPos)

            //移动
            let distance = cc.Vec2.distance(nextPos, curPos);
            let deltaDistance = moveLength + distance;
            let deltaRate = deltaDistance / distance;
            let targetPos = curPos.lerp(nextPos, deltaRate);
            this.setPosition(targetPos)

            this.checkNpcPathSectionModel()

            if (this._pathPoint.length == 0) {
                this._isMoving = false;
                this.onStopMoving()
            }
        }
    }

    setPosition(targetPos) {
        this.node.setPosition(targetPos)
        this.node.zIndex = Tool.getBuildingZIndex(targetPos.y)

        let com = this.node.getComponent(OffScreenHideListener)
        com && com.onNodeMove()
    }

    onStartMoving() {

    }

    onStopMoving() {
        this._pathPoint = []
        this._isMoving = false
        this.updateRoleSpine()

        switch (this._npcConfig.pathType) {
            case NpcPathType.RETURN_STAY:
                //角色延迟3s再回收并生成下一个角色
                this.scheduleOnce(() => {
                    NpcManager.instance.removeNpc(this._npcConfig, this.node)
                    NpcManager.instance.randomCreateNpc(this._npcConfig.id)
                }, 3)
                break
            case NpcPathType.RETURN:
            case NpcPathType.ONCE:
            case NpcPathType.SECTION:
                //直接生成下一个角色
                NpcManager.instance.removeNpc(this._npcConfig, this.node)
                NpcManager.instance.randomCreateNpc(this._npcConfig.id)
                break
            case NpcPathType.STATIC:
            case NpcPathType.END_NO_MOVE:
                //常驻  不销毁也不生成
                break
        }
    }

    removeListener() {
        EventManager.instance.removeTargetListener(this)
    }

    onDestroy() {
        this.removeListener()
    }
}