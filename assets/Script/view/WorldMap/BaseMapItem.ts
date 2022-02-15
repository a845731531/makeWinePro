
const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseMapItem extends cc.Component {
    @property
    prefixName: string = "BG"

    getItemSize() {
        return this.node.getContentSize()
    }
    getItemName(row, column) {
        return cc.js.formatStr("%s_%s_%s", this.prefixName, row, column)
    }
    getScreenGrid(screenRect: cc.Rect) {
        let itemSize = this.getItemSize()
        let nodeLB = cc.v2(screenRect.xMin - itemSize.width, screenRect.yMin - itemSize.height)
        let nodeRT = cc.v2(screenRect.xMax + itemSize.width, screenRect.yMax + itemSize.height)
        let columnStart = Math.sign(nodeLB.x) * Math.ceil(Math.abs(nodeLB.x) / itemSize.width - 0.5)
        let columnEnd = Math.sign(nodeRT.x) * Math.ceil(Math.abs(nodeRT.x) / itemSize.width - 0.5)
        let rowStart = Math.sign(nodeLB.y) * Math.ceil(Math.abs(nodeLB.y) / itemSize.height - 0.5)
        let rowEnd = Math.sign(nodeRT.y) * Math.ceil(Math.abs(nodeRT.y) / itemSize.height - 0.5)
        return {
            columnStart: columnStart,
            columnEnd: columnEnd,
            rowStart: rowStart,
            rowEnd: rowEnd,
        }
    }
    //某行某列是否应该显示
    shouldShowInPosition(row, column) {
        return true
    }
    //是否在屏幕内，可能有偏移，可能需要添加屏幕外区域
    isInScreen(screenRect: cc.Rect): boolean {
        let extralRect = screenRect.clone()
        let itemSize = this.getItemSize()
        extralRect.xMin -= itemSize.width
        extralRect.yMin -= itemSize.height
        extralRect.xMax += itemSize.width
        extralRect.yMax += itemSize.height
        
        let boundingBox = this.node.getBoundingBox()
        return extralRect.intersects(boundingBox)
    }
    //检查是否需要新数据
    checkMapData(screenRect: cc.Rect) {

    }

    setGridPosition(row: number, column: number) {
        let itemSize = this.getItemSize()
        this.node.x = column * itemSize.width
        this.node.y = row * itemSize.height
    }
}