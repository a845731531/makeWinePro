import ProductConfig from "../../../config/ProductConfig";
import { SoundEnum } from "../../../Constant/SoundEnum";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import BuildingProductSelectBase from "../base/BuildingProductSelectBase";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingProductSelectZhiqu extends BuildingProductSelectBase {

    private productList = [];
    private curIndex = 0;

    /**
     * buildingData: 建筑数据
     * onSelect: 选择回调
     */
    initView(exData) {
        super.initView(exData)
        this.productList.length = 0
        this.curIndex = 0
        if(this.curData) {
            let buildingData = this.curData.buildingData
            for(let productId in ProductConfig) {
                let itemConfig = ProductConfig[productId]
                if(itemConfig.buildingType == buildingData.buildingType) {
                    this.productList.push(itemConfig)
                }
            }
            this.productList.sort((first, second) => {
                return second.productId - first.productId 
            })

            let itemData = this.productList[this.curIndex]
            this.updateProduce(itemData)
        }
    }
    
    onClickNext() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        this.curIndex += 1
        if(this.curIndex >= this.productList.length) {
            this.curIndex -= this.productList.length
        }
        let itemData = this.productList[this.curIndex]
        this.updateProduce(itemData)
    }
    onClickLast() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        this.curIndex -= 1
        if(this.curIndex < 0) {
            this.curIndex += this.productList.length
        }
        let itemData = this.productList[this.curIndex]
        this.updateProduce(itemData)
    }
}
