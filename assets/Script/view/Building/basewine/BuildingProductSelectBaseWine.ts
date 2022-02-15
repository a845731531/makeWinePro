import ProductConfig from "../../../config/ProductConfig";
import { SoundEnum } from "../../../Constant/SoundEnum";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import BuildingProductSelectBase from "../base/BuildingProductSelectBase";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingProductSelectBaseWine extends BuildingProductSelectBase {

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
            let productList = [30003,30004,30005]  //TODO 产物表还有未删除的错误轮次酒ID
            for(let i = 0, len = productList.length; i < len; i++) {
                let productId = productList[i]
                let itemConfig = ProductConfig[productId]
                this.productList.push(itemConfig)
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
