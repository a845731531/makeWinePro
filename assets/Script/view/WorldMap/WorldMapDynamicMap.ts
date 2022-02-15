import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import EventManager from "../../framework/manager/EventManager";
import BaseMapInfo from "./BaseMapInfo";
import BaseMapItem from "./BaseMapItem";


const {ccclass, property} = cc._decorator;

@ccclass
export default class WorldMapDynamicMap extends cc.Component {

    @property(cc.Node)
    mapNode: cc.Node = null;
    
    @property(cc.Node)
    mapItemPreList: cc.Node[] = []

    @property(BaseMapInfo)
    baseMapInfo: BaseMapInfo = null;

    private mapNodePoolList: {[prefixName: string]: cc.NodePool} = {}

    onLoad() {

        EventManager.instance.addEventListener(CustomEventEnum.WORLD_MAP_SELECT_ITEM,this.showBaseMapInfo,this)

        for(let i = 0, len = this.mapItemPreList.length; i < len; i++) {
            let itemPre = this.mapItemPreList[i]
            let itemScript = itemPre.getComponent(BaseMapItem)
            this.mapNodePoolList[itemScript.prefixName] = new cc.NodePool()
        }
    }

    onDestroy()
    {
        EventManager.instance.removeTargetListener(this)
    }

    start() {
        this.updateMapView()
    }

    showBaseMapInfo(param)
    {
        this.baseMapInfo.updateView(param)

        let itemNode = param.item
        if(cc.isValid)
        {
            let camera = cc.Camera.findCamera(itemNode)
            let worldPos = itemNode.parent.convertToWorldSpaceAR(itemNode.position)
            let itemScreenPos = camera.getWorldToScreenPoint(worldPos)

            let infoScreenPos = itemScreenPos
            if(itemScreenPos.x > cc.winSize.width * 0.5)
            {
                //信息栏显示靠左
                infoScreenPos.x -= 220
            }else{
                //信息栏显示靠右
                infoScreenPos.x += 220
            }

            let infoWorldPos = cc.Camera.findCamera(this.baseMapInfo.node).getScreenToWorldPoint(infoScreenPos)
            infoWorldPos.x = Math.max(this.baseMapInfo.node.width, infoWorldPos.x)
            infoWorldPos.x = Math.min(cc.winSize.width - this.baseMapInfo.node.width, infoWorldPos.x)

            infoWorldPos.y = Math.max(this.baseMapInfo.node.height, infoWorldPos.y)
            infoWorldPos.y = Math.min(cc.winSize.height - this.baseMapInfo.node.height - 80, infoWorldPos.y)
            this.baseMapInfo.node.position = this.baseMapInfo.node.parent.convertToNodeSpaceAR(infoWorldPos)
        }
    }
    
    getMapScreenRect() {
        let camera = cc.Camera.findCamera(this.mapNode)
        let screenLB = cc.Vec2.ZERO
        let worldLB = camera.getScreenToWorldPoint(screenLB)
        let nodeLB = this.mapNode.convertToNodeSpaceAR(worldLB)
        let screenRT = cc.v2(cc.winSize.width, cc.winSize.height)
        let worldRT = camera.getScreenToWorldPoint(screenRT)
        let nodeRT = this.mapNode.convertToNodeSpaceAR(worldRT)
        let screenNodeRect = cc.rect(nodeLB.x, nodeLB.y, nodeRT.x - nodeLB.x, nodeRT.y - nodeLB.y)
        return screenNodeRect
    }
    updateMapView() {
        //显示区域对应mapNode的rect
        let screenNodeRect = this.getMapScreenRect()
        //移除在屏幕外的
        let children = this.mapNode.children
        for(let i = children.length - 1; i >= 0;i--) {
            let child = children[i]
            let itemScript = child.getComponent(BaseMapItem)
            if(itemScript && itemScript.isInScreen(screenNodeRect)) {
                continue
            } else {
                let nodePool = this.mapNodePoolList[itemScript.prefixName]
                nodePool.put(child)
            }
        }
        //添加屏幕内需要的
        for(let i = 0, len = this.mapItemPreList.length; i < len; i++) {
            let itemPre = this.mapItemPreList[i]
            let itemScript = itemPre.getComponent(BaseMapItem)
            let nodePool = this.mapNodePoolList[itemScript.prefixName]

            let screenGrid: any = itemScript.getScreenGrid(screenNodeRect)
            let columnStart = screenGrid.columnStart
            let columnEnd = screenGrid.columnEnd
            let rowStart = screenGrid.rowStart
            let rowEnd = screenGrid.rowEnd
            for(let column = columnStart; column <= columnEnd; column++) {
                for(let row = rowStart; row < rowEnd; row++) {
                    if(itemScript.shouldShowInPosition(row, column)) {
                        let nodeName = itemScript.getItemName(row, column)
                        let itemNode = this.mapNode.getChildByName(nodeName)
                        if(itemNode) {
                            continue
                        }
                        itemNode = nodePool.get()
                        if(!itemNode) { 
                            itemNode = cc.instantiate(itemPre)
                            itemNode.active = true
                        }
                        itemNode.parent = this.mapNode
                        itemNode.name = nodeName
                        itemNode.getComponent(BaseMapItem).setGridPosition(row, column)
                    }
                }
            }   
            itemScript.checkMapData(screenNodeRect)         
        }
    }
    
}