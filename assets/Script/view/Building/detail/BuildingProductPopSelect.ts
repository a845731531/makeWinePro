import ProductConfig from "../../../config/ProductConfig";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import BuildingProductSelectBase from "../base/BuildingProductSelectBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingProductPopSelect extends BuildingProductSelectBase {

    private allProductList = null;
    /**
     * buildingData: 建筑数据
     * onSelect: 选择回调
     */
     initView(exData) {
        super.initView(exData)
        this.allProductList = []
        for(let productId in ProductConfig) {
            let itemConfig = ProductConfig[productId]
            if(itemConfig.buildingType == exData.buildingData.buildingType) {
                this.allProductList.push(itemConfig)
            }
        }
        this.allProductList.sort((first, second) => {
            if(first.minBuildingLevel == second.minBuildingLevel) {
                return first.productId - second.productId
            } else {
                return first.minBuildingLevel - second.minBuildingLevel
            }
        })
        if(this.allProductList.length > 0) {
            this.updateProduce(this.allProductList[0])
        }
    }

    onClickItem() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.BuildingProductPop,
            exData: {
                productList: this.allProductList,
                curSelectId: this.curProductId,
                onSelect: this.updateProduce.bind(this)
            }
        })
    }
}