import BagItemView from "../../Bag/BagItemView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingProductSelectBase extends cc.Component {

    @property(BagItemView)
    productItemInfo: BagItemView = null;

    protected curData = null;
    protected curProductId = null;

    /**
     * buildingData: 建筑数据
     * onSelect: 选择回调
     */
    initView(exData) {
        this.curData = exData
    }
        
    updateProduce(productConfig) {
        let propId = productConfig.productId
        this.curProductId = propId

        this.productItemInfo.updateView({
            propId: propId,
            showName: true,
            customNum: "",
            hideClick: true,
        })
        
        if(this.curData.onSelect) {
            this.curData.onSelect(propId)
        }
    }
}