import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import UserDataManager from "../../data/UserDataManager";
import WorldMapDataManager from "../../data/WorldMapDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import BaseMapItem from "./BaseMapItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WorldNodeItem extends BaseMapItem {

    @property(cc.Label)
    statusLabel: cc.Label = null;

    @property(cc.Sprite)
    iconSpr: cc.Sprite = null;

    @property(cc.Node)
    iconSelect: cc.Node = null;

    private lastReqTime = 0
    private needDataGridMap = {}
    private gridData = null

    onEnable()
    {
        EventManager.instance.addEventListener("RspBuyWorldMap",this.onRspWorldDataUpdate,this)
    }

    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    
    onRspWorldDataUpdate(eventData)
    {
        let gridData = eventData.gridData
        if(this.gridData.row == gridData.row && this.gridData.column == gridData.column)
        {
            this.gridData =  gridData
            this.updateView()
        }
    }
    
    //某行某列是否应该显示
    shouldShowInPosition(row, column) {
        return WorldMapDataManager.instance.getRealGridData(row, column)
    }
    //检查是否需要新数据
    checkMapData(screenRect: cc.Rect) {
        let screenGrid: any = this.getScreenGrid(screenRect)
        
        let columnStart = screenGrid.columnStart
        let columnEnd = screenGrid.columnEnd
        let rowStart = screenGrid.rowStart
        let rowEnd = screenGrid.rowEnd
        for(let column = columnStart; column <= columnEnd; column++) {
            for(let row = rowStart; row < rowEnd; row++) {
                if(this.shouldShowInPosition(row, column)) {
                    continue
                } else {
                    let keyName = cc.js.formatStr("%s_%s", row, column)
                    this.needDataGridMap[keyName] = true
                }
            }
        }

        let curTime = UserDataManager.instance.getCurTime()
        if( (curTime - this.lastReqTime < 5) && Tool.getLength(this.needDataGridMap) < 10) {
            return
        }
        this.lastReqTime = curTime

        let tmpData = Object.keys(this.needDataGridMap)
        //TODO 获取格子数据，检查缓存数据是否都有
        setTimeout(() => {
            WorldMapDataManager.instance.TestAddMapData(tmpData)
        }, 200)
        this.needDataGridMap = {}
    }

    setGridPosition(row: number, column: number) {
        super.setGridPosition(row, column)
        this.node.zIndex = 1
        this.gridData = WorldMapDataManager.instance.getRealGridData(row, column)
        this.updateView()
    }
    updateView() {
        if(this.gridData) {
            let myUserId = UserDataManager.instance.getUserId()
            if(this.gridData.userId) {
                this.iconSpr.node.active = true
                if(this.gridData.userId == myUserId) {
                    this.statusLabel.string = "我的土地"
                    this.statusLabel.node.color = cc.Color.ORANGE
                } else {
                    this.statusLabel.string = cc.js.formatStr("%s的土地",this.gridData.owner)
                    this.statusLabel.node.color = cc.Color.RED
                }
            } else {
                this.iconSpr.node.active = false
                this.statusLabel.string = ""
                // this.statusLabel.node.color = cc.Color.GREEN
            }
        }
    }

    hideSelectIcon()
    {
        this.iconSelect.active = false
    }

    onClickItem(event) {
        let endPos = event.getLocation()
        let startPos = event.getStartLocation()
        if (cc.Vec2.distance(endPos, startPos) > 20) {
            return
        }

        this.iconSelect.active = true
        EventManager.instance.dispatchEvent(CustomEventEnum.WORLD_MAP_SELECT_ITEM,{
            item: this.node,
            gridData: this.gridData,
        })

        // if(this.gridData) {
        //     let myUserId = UserDataManager.instance.getUserId()
        //     if(this.gridData.userId) {
        //         if(this.gridData.userId == myUserId) {                    
        //             EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
        //                 viewName: PrefabPathEnum.LandView,
        //                 exData: {landId: this.gridData.row * 1000 + this.gridData.column}
        //             })
        //         } else {
        //             EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
        //                 msg: "已售出"
        //             })
        //         }
        //     } else {
        //         EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
        //             content: "是否花费10000zqb购买土地？",
        //             showCancel: true,
        //             confirmCallback: () => {                        
        //                 this.gridData.owner = UserDataManager.instance.getUserName()
        //                 EventManager.instance.dispatchEvent("RspBuyWorldMap", {
        //                     grid: this.gridData
        //                 })
        //                 EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
        //                     msg: "购买成功"
        //                 })
        //                 this.updateView()
        //             }
        //         })
        //     }
        // }
    }
}