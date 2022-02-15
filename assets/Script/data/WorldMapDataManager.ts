import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
import BaseDataManager from "./BaseDataManager";
import UserDataManager from "./UserDataManager";

export default class WorldMapDataManager extends BaseDataManager {
    private static _instance: WorldMapDataManager = null;
    public static get instance(): WorldMapDataManager {
        if (this._instance == null) {
            this._instance = new WorldMapDataManager();
        }
        return this._instance;
    }
    private mapGridData = {}
    private centerStartGrid = cc.v2(50, 50)
    private GridSize: cc.Size = cc.size(100, 100) 

    constructor() {
        super();
        this.reset();

        //TODO
        this.centerStartGrid = cc.v2(Tool.getRandomLimit(1, 99), Tool.getRandomLimit(1, 99))
    }

    reset() {
        super.reset()
    }

    addNetListener() {
        //TODO
        EventManager.instance.addEventListener("RspWorldMapList", this.onRspWorldMapList, this, -1)
        EventManager.instance.addEventListener("RspBuyWorldMap", this.onRspBuyWorldMap, this, -1)
        
    }

    //合计行列  服务器的行列  只要正数 0 - 100
    getRealGridData(row, column) {
        column += this.centerStartGrid.x
        if(column < 0) { column += this.GridSize.width }
        if(column > this.GridSize.width) { column -= this.GridSize.width }
        row += this.centerStartGrid.y
        if(row < 0) { row += this.GridSize.height }
        if(row > this.GridSize.height) { row -= this.GridSize.height }     
        let keyIndex = row * 1000 + column
        return this.mapGridData[keyIndex]
    }

    //客户端行列  有负数和正数
    getGridData(row, column) {
        let keyIndex = row * 1000 + column
        return this.mapGridData[keyIndex]
    }
    onRspWorldMapList(eventData) {
        let mapListData = eventData.mapList
        for(let i = 0, len = mapListData.length; i < len;i++) {
            let itemData = mapListData[i]
            let keyIndex = itemData.row * 1000 + itemData.column
            let oldData = this.mapGridData[keyIndex]
            if(!oldData) {
                this.mapGridData[keyIndex] = itemData
            }
        }
    }
    onRspBuyWorldMap(eventData) {
        let gridData = eventData.gridData
        let keyIndex = gridData.row * 1000 + gridData.column
        this.mapGridData[keyIndex] = gridData        
    }
    TestAddMapData(gridList) {        
        let gridData = []
        for(let i = 0, len = gridList.length; i < len; i++) {
            let keyList = gridList[i].split("_")
            let column = parseInt(keyList[1])
            column += this.centerStartGrid.x
            if(column < 0) { column += this.GridSize.width }
            if(column > this.GridSize.width) { column -= this.GridSize.width }

            let row = parseInt(keyList[0])
            row += this.centerStartGrid.y
            if(row < 0) { row += this.GridSize.height }
            if(row > this.GridSize.height) { row -= this.GridSize.height }            

            let name = ""
            let userId = 0
            let randomIndex = Tool.getRandomLimit(0, 100)
            if(randomIndex < 50) {
                userId = UserDataManager.instance.getUserId()
                name = UserDataManager.instance.getUserName()
            } else if(randomIndex < 20) {
                userId = 1000000 + Math.ceil(Math.random() * 100000)
                name = Tool.getRandonName()
            }
            let itemData = {
                landId: row * 1000 + column,
                row: row,
                column: column,
                owner: name,
                userId: userId,
            }
            gridData.push(itemData)
        }
        EventManager.instance.dispatchEvent("RspWorldMapList", {
            mapList: gridData
        })
    }
}