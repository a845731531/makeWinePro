

export default class CustomRenderSeqAssemble extends cc.Assembler {

    private indicesCount = 0
    private _renderData = null
    private floatsPerVert = 0
    private verticesCount = 0
    private _local = []

    constructor () {
        super();
​
        this._renderData = new cc.RenderData();
        this._renderData.init(this);
        
        this.initData();
        this.initLocal();
    }
    // 计算总共所需的空间大小
    get verticesFloats () {
        return this.verticesCount * this.floatsPerVert;
    }
    initData () {
        let data = this._renderData;
        data.createQuadData(0, this.verticesFloats, this.indicesCount);
    }
    getRenderData() {
        return this._renderData
    }
    updateRenderData() {
    }
    initLocal () {
        this._local = [];
        this._local.length = 4;
    }
    // 更新顶点颜色信息
    updateColor (comp, color) {}
    // 更新顶点坐标信息
    updateWorldVerts (comp) {}
    // 将renderdata中的数据填充到buffer中, 也计算填充了三角形顶点索引
    fillBuffers (comp, renderer) {}
    postFillBuffers (comp, renderer) {}
    
}