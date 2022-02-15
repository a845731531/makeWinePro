import MapItemConfig from "../../config/MapItemConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import MapDataManager from "../../data/map/MapDataManager";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import MoveGridItem from "./MoveGridItem";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GridCreator extends cc.Component {

    @property(cc.Prefab)
    gridItem: cc.Prefab = null;

    @property(cc.Node)
    gridParent: cc.Node = null;

    /**
     *  建筑物id 
     */
    private _buildingType: number = 0

    private _gridCount: number = 0

    
    /**
     * 建筑占地大小  【列，行】
     */
    private _areaSize = []

    /**
     * 绿色网格列表
     */
    private _gridItemList: cc.Node[] = []

    private _arrowList: cc.Sprite[] = []

    private _origin = {
        col: 0,
        row: 0
    }

    onLoad()
    {
        this.addListener()
    }

    addListener()
    {
        EventManager.instance.addEventListener(CustomEventEnum.MAP_CREATE_BUILDING_GRID,this.onCreateGrid,this)
        EventManager.instance.addEventListener(CustomEventEnum.MAP_UPDATE_BUILDING_GRID,this.onAdjustGrid,this)

        EventManager.instance.addEventListener(CustomEventEnum.MAP_DESTROY_BUILDING_GRID,this.onDestroyGrid,this)
    }
 
    onCreateGrid(param)
    {
        this._buildingType = param.id

        //初始化 网格初始行列
        this._origin = MapDataManager.instance.getRowColByPosition(param.position.x,param.position.y)

        let tileSize = MapDataManager.instance.getTileSize()
        //行向量
        let _rowVector = cc.v2(tileSize.width / 2, tileSize.height / 2);
        //列向量
        let _colVector = cc.v2(tileSize.width / 2, -tileSize.height / 2);

        let position = cc.v2(0,0)

        this._areaSize = MapItemConfig[this._buildingType].areaSize
        let areaCol = this._areaSize[0]
        let areaRow = this._areaSize[1]


        this._gridCount = areaCol * areaRow

        //检查网格是否碰到障碍物
        let isRedColor = this.checkGridIsObstacle()

        this.gridParent.removeAllChildren()
        for(let i = 0; i < this._gridCount; i++)
        {   
            let item = null
            if(!this._gridItemList[i])
            {
                item = cc.instantiate(this.gridItem)
                this._gridItemList.push(item)
            }else{
                item = this._gridItemList[i]
            }
            let col = Math.floor(i / areaRow)
            let row = Math.floor(i % areaRow)
            item.getComponent(MoveGridItem).updateView(isRedColor)
            item.parent = this.gridParent
            let x = position.x + _rowVector.x * row + _colVector.x * col
            let y = position.y + _rowVector.y * row + _colVector.y * col
            item.position = cc.v3(x,y)
        }


        //左下箭头
        let x1 = position.x - _rowVector.x + _colVector.x * (areaCol-1) / 2 
        let y1 = position.y - _rowVector.y + _colVector.y * (areaCol-1) / 2

        //左上箭头
        let x2 = position.x + _rowVector.x * (areaRow-1) / 2  - _colVector.x
        let y2 = position.y + _rowVector.y * (areaRow-1) / 2  - _colVector.y

        //右上箭头
        let x3 = position.x + _rowVector.x * areaRow + _colVector.x * (areaCol-1) / 2 
        let y3 = position.y + _rowVector.y * areaRow + _colVector.y * (areaCol-1) / 2 

        //右下箭头
        let x4 = position.x + _rowVector.x * (areaRow-1) / 2  + _colVector.x * areaCol
        let y4 = position.y + _rowVector.y * (areaRow-1) / 2  + _colVector.y * areaCol

        for(let i = 0; i < 4; i++)
        {
            let arrow: cc.Sprite
            if(!this._arrowList[i])
            {
                let arrowNode = new cc.Node()
                arrow = arrowNode.addComponent(cc.Sprite)
                this._arrowList.push(arrow)
            }else{
                arrow = this._arrowList[i]
            }

            arrow.node.parent = this.gridParent
            switch(i)
            {
                case 0:
                    arrow.node.position = cc.v3(x1,y1)
                    arrow.node.scaleX = -2
                    arrow.node.scaleY = 2
                    break
                case 1:
                    arrow.node.position = cc.v3(x2,y2)
                    arrow.node.scaleX = -2
                    arrow.node.scaleY = -2
                    break
                case 2:
                    arrow.node.position = cc.v3(x3,y3)
                    arrow.node.scaleX = 2
                    arrow.node.scaleY = -2
                    break
                case 3:
                    arrow.node.position = cc.v3(x4,y4)
                    arrow.node.scaleX = 2
                    arrow.node.scaleY = 2
                    break
            }

            Tool.loadSpriteFrame("texture/map/arrow",arrow)
        }
        
        //网格位置与建筑物预制体位置一致
        this.node.position = param.position
        this.node.active = true
    }

    /**
     * 检查网格是否碰到了障碍物
     * @returns 
     */
    checkGridIsObstacle()
    {   
        let result = false
        let areaCol = this._areaSize[0]
        let areaRow = this._areaSize[1]
        for(let i = 0; i < areaCol * areaRow; i++)
        {   
            let col = this._origin.col + Math.floor(i / areaRow)
            let row = this._origin.row - Math.floor(i % areaRow)
            if(MapDataManager.instance.isObstacleByRowCol(col,row))
            {
                result = true
                break
            }
        }
        EventManager.instance.dispatchEvent(CustomEventEnum.MAP_BUILDING_IN_OBSTACLE,result)
        return result
    }
 
    /**
     * 调整网格位置
     */
    onAdjustGrid(curRowCol)
    {
        if(curRowCol)
        {
            if(curRowCol.col != this._origin.col || curRowCol.row != this._origin.row)
            {
                this._origin.col = curRowCol.col
                this._origin.row = curRowCol.row
                this.node.position = cc.v3(MapDataManager.instance.getTiledMiddlePos(curRowCol.col,curRowCol.row))

                //改变网格颜色
                let isRed = this.checkGridIsObstacle()
                for(let i = 0; i < this._gridCount; i++)
                {   
                    if(this._gridItemList[i])
                    {
                        this._gridItemList[i].getComponent(MoveGridItem).updateView(isRed)
                    }
                }
            }
        }
    }

    onDestroyGrid()
    {
        this.node.active = false
    }

    removeListener()
    {
        EventManager.instance.removeTargetListener(this)
    }

    onDestroy() {
        this.removeListener()
    }
}
