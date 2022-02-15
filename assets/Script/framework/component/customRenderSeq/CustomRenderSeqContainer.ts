import CustomRenderSeqAssemble from "./CustomRenderSeqAssemble";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CustomRenderSeqContainer extends cc.RenderComponent {

    private nodeSeqList = []
    private _renderData = null
    private isFirstEnable = true

    constructor () {
        super();
        // 顶点数据装配器
        this._assembler = null;
    }
    _resetAssembler () {

        if (!(this._assembler instanceof CustomRenderSeqAssemble)) {
            this._assembler = new CustomRenderSeqAssemble();
            this._renderData = null;
        }

        if (!this._renderData) {
            this._renderData = this._assembler.getRenderData();
        }
    }
    _calculateUV () {
    }

    onEnable(){
        super.onEnable()
        this.disableRender()
        this.node._renderFlag |= cc.RenderFlow.FLAG_POST_RENDER
    }
    onDisable() {
        super.onDisable()
        this.node._renderFlag &= ~cc.RenderFlow.FLAG_POST_RENDER
    }
    addCustomRender(node, seq) {
        if(this.nodeSeqList.length <= seq) {
            this.nodeSeqList.length = seq + 1
            this.nodeSeqList[seq] = []
        }
        let itemList = this.nodeSeqList[seq]
        itemList.push(node)
    }
    _checkBacth (batcher, cullingMask) {
        let opacity = (batcher.parentOpacity *= (this.node.opacity / 255));

        let worldTransformFlag = batcher.worldMatDirty ? cc.RenderFlow.FLAG_WORLD_TRANSFORM : 0;
        let worldOpacityFlag = batcher.parentOpacityDirty ? cc.RenderFlow.FLAG_OPACITY_COLOR : 0;
        let worldDirtyFlag = worldTransformFlag | worldOpacityFlag;
        for(let i = 0, len = this.nodeSeqList.length; i < len; i++) {
            let children = this.nodeSeqList[i] || []
            for(let j = 0, count = children.length; j < count; j++) {
                let itemNode = children[j]
                if(!itemNode._renderComponent) continue
                itemNode._renderComponent.markForRender(true)
                itemNode._renderFlag |= worldDirtyFlag;
                if (!itemNode._activeInHierarchy || itemNode._opacity === 0) continue;

                itemNode._cullingMask = itemNode.groupIndex === 0 ? cullingMask : 1 << itemNode.groupIndex;

                // TODO: Maybe has better way to implement cascade opacity
                let colorVal = itemNode._color._val;
                itemNode._color._fastSetA(itemNode._opacity * opacity);
                cc.RenderFlow.flows[itemNode._renderFlag]._func(itemNode);
                itemNode._color._val = colorVal;
                itemNode._renderComponent.disableRender()
            }
        }
        
    }
}