import MapItemConfig from "../../config/MapItemConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { astar } from "../../framework/library/AStar";
import EventManager from "../../framework/manager/EventManager";
import { BuildingData } from "../DataInterface";
import LandDataManager from "../land/LandDataManager";
import LandBuildingManager from "./LandBuildingManager";

export default class MapDataManager {

    private static _instance: MapDataManager = null;

    public static get instance(): MapDataManager {
        if (this._instance == null) {
            this._instance = new MapDataManager();
        }
        return this._instance;
    }

    /**
     * A星管理
     */
    private _aStarManager = null
    private _aStarGrid: astar.Grid = null


    /**
     * 菱形地图大小 几行几列
     */
    private _mapSize = {
        width: 10,
        height: 10
    }

    /**
     * 每个格子大小
     */
    private _tileSize = {
        width: 30,
        height: 60
    }

    /**
     * 障碍物信息 二维数组 x为列 y为行
     */
    private _obstacleList = {}

    /**
     * 地图行向量
     */
    private _rowVector: cc.Vec2 = null
    /**
     * 地图列向量
     */
    private _colVector: cc.Vec2 = null
    /**
     * 地图原点
     */
    private _originPos: cc.Vec2 = null

    /**
     * 白色格子组成的网格对象
     */
    private _gridItemMap = {}

    private _gridPool = new cc.NodePool()

    constructor() {
        this.reset();
        this.addNetListener();
    }

    /**
     * 初始化
     * @param tiledMap 地图TiledMap组件
     */
    init(tiledMap: cc.TiledMap, whileGridParent: cc.Node, gridItem: cc.Prefab) {

        //清楚上一次的数据
        this._gridItemMap = {}

        if(this._aStarManager)
        {
            this._aStarManager.clear()
        }
        this._aStarGrid = null
        this._aStarManager = new astar.AStar()

        if (tiledMap && !this._aStarGrid) {
            this._mapSize = tiledMap.getMapSize()   //几行几列
            this._tileSize = {
                width: tiledMap.getTileSize().width,  //斜45°地图  菱形横对角线的长度
                height: tiledMap.getTileSize().height //斜45°地图  菱形竖对角线的长度
            }

            //行向量
            this._rowVector = cc.v2(- this._tileSize.width * 0.5, - this._tileSize.height * 0.5);
            //列向量
            this._colVector = cc.v2(this._tileSize.width * 0.5, - this._tileSize.height * 0.5);
            //原点向量
            this._originPos = cc.v2(0, this._mapSize.height * this._tileSize.height * 0.5);

            //初始化格子数据
            this._aStarGrid = this._aStarManager.getGrid();
            this._aStarGrid.setGridSize(this._mapSize.width, this._mapSize.height)

            let layerObstacle: cc.TiledLayer = tiledMap.getLayer("obstacle").getComponent(cc.TiledLayer)
            // let layerBuilding: cc.TiledLayer = tiledMap.getLayer("building").getComponent(cc.TiledLayer)
            for (let x = 0; x < this._mapSize.width; x++) {
                for (let y = 0; y < this._mapSize.height; y++) {
                    let obstacleTiled = layerObstacle.getTiledTileAt(x, y, true);
                    let obstaclePropObj = tiledMap.getPropertiesForGID(obstacleTiled.gid)
                    if (obstaclePropObj) {
                        this.initObstacle(this.getBaseObstacleId(obstaclePropObj.id), x, y)
                    } else {
                        if (!this._gridItemMap[x + "_" + y]) {

                            let item1 = this._gridPool.get() 
                            if(item1)
                            {
                                console.log("白色网格预设  缓存池里有数据，复用了！！")
                                item1.position = cc.v3(this.getTiledMiddlePos(x, y))
                                item1.parent = whileGridParent
                                this._gridItemMap[x + "_" + y] = item1
                            }else{
                                //TODO 尝试异步初始化网格
                                new Promise((resolve, reject) => {
                                    let item = cc.instantiate(gridItem)
                                    item.position = cc.v3(this.getTiledMiddlePos(x, y))
                                    item.parent = whileGridParent
                                    this._gridItemMap[x + "_" + y] = item
                                    resolve(1)
                                }).then((value) => {})
                            }

                        }
                    }
                }
            }

            //是否允许斜着走 四方向还是八方向
            // this._aStarManager.allowDiag(true)
        }
    }

    getBaseObstacleId(id) {
        for (let i in MapItemConfig) {
            if (MapItemConfig[i].buildingId == id) {
                return MapItemConfig[i].id
            }
        }
        return 10086
    }

    /**
     * 初始化障碍物
     * @param id 障碍物id
     * @param col 障碍物的列
     * @param row 障碍物的行
     * @param canWalk 能否行走
     */
    initObstacle(id, col, row, canWalk = false, isBuilding = false) {
        if (MapItemConfig && MapItemConfig[id]) {
            //障碍物几列
            let colNum = MapItemConfig[id].areaSize[0]
            //障碍物占几行
            let rowNum = MapItemConfig[id].areaSize[1]

            //障碍物其他的地块的列
            let curCol = 0
            //障碍物其他的地块的行
            let curRow = 0
            //把 col,row为起点  大小为m x n的地块  设置为障碍物
            for (let w = 0; w < colNum; w++) {
                for (let h = 0; h < rowNum; h++) {
                    curCol = col + w
                    curRow = row - h
                    this._obstacleList[curCol + "-" + curRow] = {
                        id: id,
                        origin: { col: col, row: row },
                        rowNum: rowNum,
                        colNum: colNum
                    }
                    this._aStarGrid.setWalkable(curCol, curRow, canWalk)

                    if (this._gridItemMap[curCol + "_" + curRow]) {
                        this._gridItemMap[curCol + "_" + curRow].active = canWalk
                    }
                }
            }

        }
    }

    /**
     * 获取地图 单元格大小
     * @returns 
     */
    getTileSize() {
        return this._tileSize
    }

    /**
     * 根据地图坐标 判断该位置的格子是否为障碍物
     * @param x 地图x坐标
     * @param y 地图y坐标
     * @returns 
     */
    isObstacleByPosition(x, y) {
        try {
            let tilePos = this.getRowColByPosition(x, y)
            return !this._aStarGrid.getWalkable(tilePos.col, tilePos.row)
        } catch (e) {

        }

        return true
    }

    /**
     * 根据地图行列 判断该位置的格子是否为障碍物
     * @param col 列
     * @param row 行
     * @returns 
     */
    isObstacleByRowCol(col, row) {
        try {
            return !this._aStarGrid.getWalkable(col, row)
        } catch (e) {

        }

        return true
    }

    /**
     * 将地图坐标 转为 格子行列坐标
     * @param x 地图x坐标
     * @param y 地图y坐标
     * @returns 
     */
    getRowColByPosition(x, y) {
        //手指点击的坐标(x,y)现在转换为以（0,600)为原点的坐标targetVector
        let targetVector = cc.v2(x, y).sub(this._originPos);

        //公式：targetVector = row * rowVector + col * colVector;

        let row = (targetVector.y - targetVector.x * this._colVector.y / this._colVector.x) / (this._rowVector.y - this._rowVector.x * this._colVector.y / this._colVector.x);
        let col = (targetVector.x - row * this._rowVector.x) / this._colVector.x;
        return {
            row: Math.floor(row),  //哪一行
            col: Math.floor(col),    //哪一列
        };
    }

    /**
     * 根据行列  获取格子中心的地图坐标
     * @param col 列
     * @param row 行
     * @returns 
     */
    getTiledMiddlePos(col, row) {
        //以（0,600）为坐标原点的地图坐标
        let posX = this._colVector.x * col + this._rowVector.x * row
        let posY = this._colVector.y * col + this._rowVector.y * row

        //转换为以地图中心为原点的坐标
        return cc.v2(posX + this._originPos.x, posY + this._originPos.y - this._tileSize.height / 2)
    }

    /**
     * 刷新建筑的障碍物信息
     */
    onCreateBuildingData(param) {
        let buildingId = param.buildingType
        let landBuildData = LandDataManager.instance.getLandBuildItemData(param.landId,param.buildingType,param.buildingIndex)
        let areaId = landBuildData? landBuildData.areaId : null
        let lastAreaId = landBuildData.lastAreaId

        //清空上一个位置的障碍物信息
        if (lastAreaId) {
            this.initObstacle(buildingId, lastAreaId.col, lastAreaId.row, true)
        }

        //生成新位置的障碍物信息
        if (areaId) {
            // console.log("建筑物障碍信息",buildingId)
            this.initObstacle(buildingId, areaId.col, areaId.row, false, true)
        }
    }

    /**
     * 清空建筑的障碍物信息
     * @param param 
     */
    onDestroyBuildingData(param) {
        let buildingId = param.buildingType

        let landBuildData = LandDataManager.instance.getLandBuildItemData(param.landId,param.buildingType,param.buildingIndex)
        let areaId = landBuildData? landBuildData.areaId : null

        //清空上一个位置的障碍物信息
        if (areaId) {
            this.initObstacle(buildingId, areaId.col, areaId.row, true)
        }
    }

    saveWhiteGridPool()
    {
        for(let i in this._gridItemMap)
        {
            // TODO  尝试缓存500个白色网格预设
            if(cc.isValid(this._gridItemMap[i]) && this._gridPool.size() < 500)
            {
                this._gridPool.put(this._gridItemMap[i])
            }
        }
        this._gridItemMap = {}
    }

    reset() {
        EventManager.instance.removeTargetListener(this);
    }

    addNetListener() {
        EventManager.instance.addEventListener(CustomEventEnum.MAP_CREATE_BUILDING_DATA, this.onCreateBuildingData, this, -1)
        EventManager.instance.addEventListener(CustomEventEnum.MAP_MOVE_BUILDING_DATA, this.onCreateBuildingData, this)
        EventManager.instance.addEventListener(CustomEventEnum.MAP_DESTROY_BUILDING_DATA, this.onDestroyBuildingData, this, -2)
    }
}