import NpcConfig from "../../config/NpcConfig";
import NpcPathConfig from "../../config/NpcPathConfig";
import { BuildingType, NpcTabType, NpcType, SceneType } from "../../Constant/GameEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import NpcRole from "../../view/Map/NpcRole";
import TransportRole from "../../view/Map/TransportRole";
import BaseDataManager from "../BaseDataManager";
import BuildingDataManager from "../BuildingDataManager";
import UserDataManager from "../UserDataManager";

export default class NpcManager extends BaseDataManager{

    private static _instance: NpcManager = null;

    public static get instance(): NpcManager {
        if (this._instance == null) {
            this._instance = new NpcManager();
        }
        return this._instance;
    }

    /**
     * npc父节点
     */
    private _npcParent: cc.Node = null

    /**
     * 标签置顶的父节点
     */
    private _topTagParent: cc.Node = null

    /**
     * npc预设
     */
    private _npcPrefab: cc.Prefab = null

    /**
     * 交通工具预设
     */
    private _transportPrefab: cc.Prefab = null

    /**
     * npc节点
     */
    private _npcCount = 0

    /**
     * 交通工具
     */
    private _transportNode: cc.Node = null

    /**
     * npc缓存池
     */
    private _npcNodePool: cc.NodePool = new cc.NodePool()

    /**
     * 温泉npc配置列表
     */
    private _hotSpringNpcList = []
    /**
     * 酒庄npc配置列表
     */
    private _wineryNpcList = []
    /**
     * 玩家npc配置列表
     */
    private _playerNpcList = []
    /**
     * 大厅npc配置列表
     */
    private _hallNpcList = []
    /**
     * 温泉npc节点列表
     */
    private _curHotSpringNpcList = []
    /**
     * 酒庄npc节点列表
     */
    private _curWineryNpcList = []
    /**
     * 玩家npc节点列表
     */
    private _curPlayerNpcList = []
    /**
     * 大厅npc节点列表
     */
    private _curHallNpcList = []

    /**
     * 大厅npc数据
     */
     private _npcDataList = []

    /**
     * 玩家信息列表
     */
    private _playerDataList = []
    private _playerIndex = 0

    private _stopMoveNpcMap = {}

    private _sceneName = SceneType.Hall
    
    constructor() {
        super()
        
        for (let i in NpcConfig) {
            if (NpcConfig[i].type == NpcType.HOT_SPRING) {
                this._hotSpringNpcList.push(NpcConfig[i])
            } else if (NpcConfig[i].type == NpcType.WINERY) {
                this._wineryNpcList.push(NpcConfig[i])
            } else if (NpcConfig[i].type == NpcType.PLAYER) {
                this._playerNpcList.push(NpcConfig[i])
            } else {
                this._hallNpcList.push(NpcConfig[i])
            }
        }
    }

    addNetListener() {
        EventManager.instance.addEventListener("BuildingListBrewBuildingCmd_SC", this.onInitShowTransport, this)
        EventManager.instance.addEventListener("StartProduceBrewBuildingCmd_SC", this.onStartProduce, this)

        EventManager.instance.addEventListener("GatherBrewBuildingCmd_SC", this.onRspGather, this)
        EventManager.instance.addEventListener("AccelerateProduceBrewBuildingCmd_SC", this.onRspSpeedup, this)

        EventManager.instance.addEventListener("reqPlayerList", this.rspPlayerList, this)

        EventManager.instance.addEventListener("stNpcDataBrewNpcCmd_NT", this.onStNpcDataBrewNpcCmd_NT, this,-1)
    }

    clearPreData() {
        this._npcCount = 0
        this._curHotSpringNpcList = []
        this._curWineryNpcList = []
        this._curPlayerNpcList = []
        this._curHallNpcList = []

        this._npcNodePool.clear()
    }

    setNpcCanMove(npcId, canMove) {
        this._stopMoveNpcMap[npcId] = canMove
    }

    checkNpcCanMove(npcId) {
        if (this._stopMoveNpcMap[npcId]) {
            return true
        }
        return false
    }

    /**
     * 生成大厅中的npc
     */
    initHallNpc(npcPrefab: cc.Prefab, transportPrefab: cc.Prefab, npcParent: cc.Node, topTagParent) {
        this._npcPrefab = npcPrefab
        this._transportPrefab = transportPrefab
        this._npcParent = npcParent
        this._topTagParent = topTagParent

        this.onInitShowTransport()

        this._sceneName = SceneType.Hall
        this.clearPreData()

        //全部大厅Npc列表
        let npcList = Tool.deepCopy(this._hallNpcList)
        //生成大厅npc
        let initCount = Tool.getNumberParamConfig("npcInitCount")
        // let initCount = 1
        for (let i = 0; i < initCount && i < this._hallNpcList.length; i++) {
            let index = Math.floor(Math.random() * npcList.length)
            this.createNpc(npcList[index].id)
            // this.createNpc(7)
            npcList.splice(index, 1)
        }

        //TODO  请求玩家列表
        this.reqPlayerList()
    }

    /**
     * 生成温泉中的npc
     */
    initHotSpringNpc(npcPrefab: cc.Prefab, transportPrefab: cc.Prefab, npcParent: cc.Node, topTagParent) {
        this._npcPrefab = npcPrefab
        this._transportPrefab = transportPrefab
        this._npcParent = npcParent
        this._topTagParent = topTagParent
        this._sceneName = SceneType.HotSpring
        this.clearPreData()
        //全部温泉Npc列表
        for (let i = 0; i < this._hotSpringNpcList.length; i++) {
            this.createNpc(this._hotSpringNpcList[i].id)
        }
    }

    /**
     * 生成酒庄中的npc
     */
    initWineryNpc(npcPrefab: cc.Prefab, transportPrefab: cc.Prefab, npcParent: cc.Node, topTagParent) {
        this._npcPrefab = npcPrefab
        this._transportPrefab = transportPrefab
        this._npcParent = npcParent
        this._topTagParent = topTagParent
        this._sceneName = SceneType.Winery
        this.clearPreData()
        //全部酒庄Npc列表
        for (let i = 0; i < this._wineryNpcList.length; i++) {
            this.createNpc(this._wineryNpcList[i].id)
        }
    }

    private _iconUrlList = [
        "https://img2.baidu.com/it/u=3874373550,986142227&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img1.baidu.com/it/u=3755403999,2261296902&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img0.baidu.com/it/u=3736108231,3787632989&fm=26&fmt=auto",
        "https://img1.baidu.com/it/u=1994859516,3472573535&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
        "https://img2.baidu.com/it/u=4134461600,792106990&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img2.baidu.com/it/u=4072576812,863684918&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800",
        "https://img2.baidu.com/it/u=4020623225,1323048147&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
        "https://img1.baidu.com/it/u=2313559711,761464621&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
        "https://img2.baidu.com/it/u=2767874938,1688375782&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img2.baidu.com/it/u=3704469312,63608765&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
        "https://img0.baidu.com/it/u=158571748,3318645753&fm=253&fmt=auto&app=138&f=JPEG?w=544&h=500",
        "https://img1.baidu.com/it/u=3094293628,524097762&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
    ]

    reqPlayerList() {
        let data = []
        for (let i = 0; i < 100; i++) {
            data.push({
                id: 10000 + i,
                name: Tool.getRandonName(),
                face: Math.floor(Math.random() * 2) + 1,
                iconurl: this._iconUrlList[i % this._iconUrlList.length],
                homeland: "无",
                ismarriage: Math.floor(Math.random() * 2),
                inviteState: 0,
                clanname: "无",
                isNpc: true,
            })
        }
        NetManager.instance.sendMsg("reqPlayerList", { data: data })
        EventManager.instance.dispatchEvent("reqPlayerList", { data: data })
    }

    /**
     * 返回玩家列表
     * @param param 
     */
    rspPlayerList(param) {
        this._playerDataList = this._playerDataList.concat(param.data)

        let index = 0
        while (index < this._playerNpcList.length && this._playerDataList.length > 0) {
            this.createNpc(this._playerNpcList[index].id)
            index++
        }

    }

    /**
     * 创建npc
     * @param id npc id
     */
    createNpc(id) {
        if (!cc.isValid(this._npcParent)) {
            return
        }

        // let maxCount = Tool.getNumberParamConfig("npcMaxCount")
        // if (this._npcCount < maxCount) {
        let item: cc.Node = null
        if (this._npcNodePool.size() == 0) {
            item = cc.instantiate(this._npcPrefab)
        } else {
            item = this._npcNodePool.get()
        }

        if (NpcConfig[id].type == NpcType.HOT_SPRING) {
            this._curHotSpringNpcList.push({
                id: id,
                item: item
            })
        } else if (NpcConfig[id].type == NpcType.WINERY) {
            this._curWineryNpcList.push({
                id: id,
                item: item
            })
        } else if (NpcConfig[id].type == NpcType.PLAYER) {
            //玩家npc
            if (this._playerDataList.length > 0) {
                this._curPlayerNpcList.push({
                    id: id,
                    item: item
                })
                let playerData = this._playerDataList[this._playerIndex]
                this._playerIndex = (this._playerIndex + 1) % this._playerDataList.length
                item.parent = this._npcParent
                playerData && item.getComponent(NpcRole).updatePlayerView(playerData, id, 0)
            }else{
                this._npcNodePool.put(item)
            }
            return
        } else {
            this._curHallNpcList.push({
                id: id,
                item: item
            })
        }

        item.parent = this._npcParent
        //大厅、温泉等普通npc
        item.getComponent(NpcRole).updateNpcView(id, 0)
        this._npcCount++
        // console.log("npc数量++   ",this._npcCount)
        // }
    }

    /**
     * 随机创建一个当前游戏没有的npc
     * @param id 忽略的npc id
     */
    randomCreateNpc(ignoreId) {
        //可以随机的id
        let npcList = []
        if (NpcConfig[ignoreId].type != NpcType.PLAYER) {
            if (this._sceneName == SceneType.Hall) {
                npcList = this.getRandomList(this._hallNpcList, this._curHallNpcList)
            } else if (this._sceneName == SceneType.HotSpring) {
                npcList = this.getRandomList(this._hotSpringNpcList, this._curHotSpringNpcList)
            } else if (this._sceneName == SceneType.Winery) {
                npcList = this.getRandomList(this._wineryNpcList, this._curWineryNpcList)
            }
        }

        if (npcList.length > 2) {
            let index = Math.floor(Math.random() * npcList.length)
            this.createNpc(npcList[index].id)
        } else {
            this.createNpc(ignoreId)
        }
    }

    /**
     * 回收npc
     * @param npcConfig npcConfig
     * @param npcNode npc预设
     */
    removeNpc(npcConfig, npcNode: cc.Node) {
        if (npcNode && npcNode.parent) {
            //移出父节点  预设如缓存池
            this._npcNodePool.put(npcNode)

            this.removeDataFromArray(this._curHallNpcList, npcConfig)
            this.removeDataFromArray(this._curHotSpringNpcList, npcConfig)
            this.removeDataFromArray(this._curWineryNpcList, npcConfig)
            this.removeDataFromArray(this._curPlayerNpcList, npcConfig)
        }
    }

    /**
     * 获取某个npc位置
     */
    getNpcPosition(id) {
        let item = null
        if (NpcConfig[id].type != NpcType.PLAYER) {
            if (this._sceneName == SceneType.Hall) {
                item = this.getNpcItemById(id, this._curHallNpcList)
            } else if (this._sceneName == SceneType.HotSpring) {
                item = this.getNpcItemById(id, this._curHotSpringNpcList)
            } else if (this._sceneName == SceneType.Winery) {
                item = this.getNpcItemById(id, this._curWineryNpcList)
            }
        } else {
            item = this.getNpcItemById(id, this._curPlayerNpcList)
        }

        if (item && cc.isValid(item)) {
            return item.position
        }
        return null
    }

    /**
     * 进入游戏判断是有正在运输
     */
    onInitShowTransport() {
        let buildingData = BuildingDataManager.instance.getBuildingData(BuildingType.Water, 1)
        if (buildingData && buildingData.produceType > 0) {
            this.createTransport(buildingData)
        }
    }

    /**
     * 显示交通工具
     */
    onStartProduce(eventData) {
        let buildingData = eventData.building_data
        if (buildingData == null) {
            return
        }
        buildingData = BuildingDataManager.instance.getBuildingData(buildingData.building_id, buildingData.building_index)
        if (buildingData.buildingType == BuildingType.Water && buildingData.produceType > 0) {
            this.createTransport(buildingData)
        }
    }

    createTransport(buildingData = undefined)
    {
        if(!cc.isValid(this._npcParent) || !cc.isValid(this._transportPrefab))
        {
            return
        }

        if(!buildingData)
        {
            buildingData = BuildingDataManager.instance.getBuildingData(BuildingType.Water, 1)
        }

        if (!cc.isValid(this._transportNode)) {
            let produceFinishTime = buildingData.produceStartTime + buildingData.produceTime
            let curTime = UserDataManager.instance.getCurTime()
            let remainTime = produceFinishTime - curTime
            let remainPro = remainTime / buildingData.produceTime

            //交通工具速度
            let pathId = Tool.getNumberParamConfig("carPathId")
            let config = this.getPathConfigById(pathId)
            let speed = config.distance * remainPro / remainTime
            this._transportNode = cc.instantiate(this._transportPrefab)
            this._transportNode.parent = this._npcParent
            this._transportNode.getComponent(TransportRole).initNpc(speed, (1 - remainPro))
        }
    }

    onRspSpeedup(eventData) {
        if(eventData.error_code) {
            return
        }
        let buildingData = BuildingDataManager.instance.getBuildingData(eventData.building_data.building_id, eventData.building_data.building_index)
        if (cc.isValid(this._transportNode) && buildingData.buildingType == BuildingType.Water && buildingData.produceType > 0) {
            this._transportNode.destroy()

        }
    }

    onRspGather(eventData)
    {
        if(eventData.error_code) {
            return
        }
        let buildingData = BuildingDataManager.instance.getBuildingData(eventData.building_data.building_id, eventData.building_data.building_index)
        if (cc.isValid(this._transportNode) && buildingData.buildingType == BuildingType.Water && buildingData.produceType > 0) {
            this._transportNode.destroy()
        }
    }

    getPathConfigById(pathId) {
        for (let i = 0; i < NpcPathConfig.length; i++) {
            if (NpcPathConfig[i].id == pathId) {
                return NpcPathConfig[i]
            }
        }
    }

    getTopTagParent() {
        if (cc.isValid(this._topTagParent)) {
            return this._topTagParent
        }
        return null
    }

    getTabListByNpcType(npcType) {
        switch (npcType) {
            case NpcType.TASK:
                return Tool.getArrayParamConfig("npcTaskTabList")
            case NpcType.EVENT:
                return Tool.getArrayParamConfig("npcEventTabList")
            case NpcType.HOT_SPRING:
                return Tool.getArrayParamConfig("npcHotSpringTabList")
            case NpcType.NORMAL:
                return Tool.getArrayParamConfig("npcNormalTabList")
            case NpcType.PLAYER:
                return Tool.getArrayParamConfig("npcPlayerTabList")
            case NpcType.WINERY:
                return Tool.getArrayParamConfig("npcWineryTabList")
            case NpcType.ANIMAL:
                return Tool.getArrayParamConfig("npcAnimalTabList")
            case NpcType.STATUE:
                return Tool.getArrayParamConfig("npcStatueTabList")
            default:
                return []
        }
    }

    //判断npc能否触发 随机事件
    checkNpcTriggerEvent(npcType) {
        let tabList = this.getTabListByNpcType(npcType)
        return tabList.indexOf(NpcTabType.EVENT + "") != -1
    }

    //判断npc能否触发 任务
    checkNpcTriggerTask(npcType) {
        let tabList = this.getTabListByNpcType(npcType)
        return tabList.indexOf(NpcTabType.TASK + "") != -1
    }

    //判断npc能否触发 结婚
    checkNpcTriggerMarry(npcType) {
        let tabList = this.getTabListByNpcType(npcType)
        return tabList.indexOf(NpcTabType.MARRY + "") != -1
    }

    getNpcItemById(npcId, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == npcId) {
                return list[i].item
            }
        }
    }

    getRandomList(bigArray, smallArray) {
        let result = []
        for (let i = 0; i < bigArray.length; i++) {
            let isOwn = false
            for (let j = 0; j < smallArray.length; j++) {
                if (bigArray[i].id == smallArray[j].id) {
                    isOwn = true
                }
            }

            !isOwn && result.push(bigArray[i])
        }
        return result
    }

    removeDataFromArray(array, config) {
        for (let i = 0; i < array.length; i++) {
            if (config.id == array[i].id) {
                array.splice(i, 1)
                this._npcCount--
                // console.log("npc数量--  ",this._npcCount)
                return
            }
        }
    }

    reset() {
        EventManager.instance.removeTargetListener(this);
    }

    onStNpcDataBrewNpcCmd_NT(data){
        cc.log("NPC的数据",data)
        this._npcDataList=data
    }
    
    getNpcData(){
        return this._npcDataList
    }
}