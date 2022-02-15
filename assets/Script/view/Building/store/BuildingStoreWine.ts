import { BuildingData } from "../../../data/DataInterface";
import EventManager from "../../../framework/manager/EventManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import { NetManager } from "../../../framework/network/NetManager";
import BaseView from "../../../framework/viewbase/BaseView";
import { Tool } from "../../../framework/manager/Tool";
import { BuildingType, ProduceState } from "../../../Constant/GameEnum";
import DropConfig from "../../../config/DropConfig";
import ProductConfig from "../../../config/ProductConfig";
import BuildingStoreYearChoose from "./BuildingStoreYearChoose";
import OldWineConfig from "../../../config/OldWineConfig";
import TargetWineDataManager from "../../../data/TargetWineDataManager";
import { SoundEnum } from "../../../Constant/SoundEnum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingStoreWine extends BaseView {

    @property(cc.Node)
    itemParent: cc.Node = null;
    @property(cc.Node)
    recommendNode: cc.Node = null;

    
    private buildingData: BuildingData;
    private storeYearList: number[] = [3, 3, 3, 3, 3, 3, 3]
    private recommendStoreYearList: number[] = []
    private storePropList: any = []

    private iconList = ["icon_32001","icon_32007","icon_32013","icon_32019","icon_32025","icon_32031","icon_32037"]
    
    initByExData(exData) {
        this.buildingData = exData.buildingData
        
        let produceNum = this.buildingData.produceNum || 10
        let children = this.itemParent.children
        for(let i = 0; i < 7; i++) {
            let itemNode: any = children[i]
            itemNode.numLabel.string = Tool.unitConversion(produceNum)
            itemNode.roundLabel.string = Tool.getChinaEasyNumber(i + 1) + "次酒"

            let iconName = cc.js.formatStr("texture/bag/%s", this.iconList[i])
            let sprite = itemNode.wineIcon.getComponent(cc.Sprite)
            Tool.loadSpriteFrame(iconName, sprite)
            
            let itemScript = itemNode.getComponentInChildren(BuildingStoreYearChoose)
            itemScript.addYearChangedListener(this.onYearChanged.bind(this, i))
        }
        
        let itemProduct = ProductConfig[this.buildingData.produceType]
        let itemDrop = DropConfig[itemProduct.dropId]
        this.storePropList = Tool.getDropList(itemDrop)
        this.storePropList.sort((first, second) => {
            return first.propId - second.propId
        })

        this.calculateRecommend()
        this.updateRecommendView()
    }
    onEnable() {
        EventManager.instance.addEventListener("StoreWineBrewBuildingCmd_SC", this.onRspStore, this)
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    calculateRecommend() {
        let targetWineId = TargetWineDataManager.instance.getTargetWineId() || 34000
        let progressList = TargetWineDataManager.instance.getOldWineProgressById(targetWineId)
        for(let i = 0, len = progressList.length; i < len; i++) {
            let itemProgress = progressList[i]
            let oldWineId = itemProgress.propId
            let itemOldWineConfig = OldWineConfig[oldWineId]
            if(itemOldWineConfig) {
                this.recommendStoreYearList[itemOldWineConfig.round - 1] = itemOldWineConfig.year
                this.storeYearList[itemOldWineConfig.round - 1] = itemOldWineConfig.year
            }
        }
    }
    updateRecommendView() {
        let children = this.itemParent.children
        for(let i = 0; i < 7; i++) {
            let itemNode: any = children[i]
            let curStoreYear = this.storeYearList[i] || Constant.StoreYearList[0]
            let itemScript = itemNode.getComponentInChildren(BuildingStoreYearChoose)
            itemScript.setStoreYear(curStoreYear, false)
        }
    }
    onYearChanged(index, year) {
        this.storeYearList[index] = year

        let isRecommend = true
        for(let i = 0; i < 7; i++) {
            let storeYear = this.storeYearList[i]
            let recommendYear = this.recommendStoreYearList[i] || storeYear
            if(recommendYear != storeYear) {
                isRecommend = false
                break
            }
        }
        this.recommendNode.active = isRecommend
    }
    onClickRecommend() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        for(let i = 0; i < 7; i++) {
            let storeYear = this.recommendStoreYearList[i] || Constant.StoreYearList[0]
            this.storeYearList[i] = storeYear
        }
        this.updateRecommendView()
        this.recommendNode.active = true
    }
    onClickStore() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        let produce_ids = this.convertToProduceIds()
        NetManager.instance.sendMsg("StoreWineBrewBuildingCmd_CS", {
            building_id: this.buildingData.buildingType,
            building_index: this.buildingData.buildingIndex,
            produce_ids: produce_ids,
        })
        
    }
    convertToProduceIds() {
        let produceList = []
        for(let i = 0, len = this.storePropList.length; i < len; i++) {
            let originProp = this.storePropList[i]
            let storeYear = this.storeYearList[i]
            for(let produceId in OldWineConfig) {
                let itemOldWine = OldWineConfig[produceId]
                if(itemOldWine.year == storeYear && itemOldWine.baseWineId == originProp.propId) {
                    produceList.push(itemOldWine.oldWineId)
                }
            }
        }
        return produceList
    }

    onRspStore(eventData) {
        if(eventData.error_code) {
            if(eventData.error_code == 1) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: cc.js.formatStr("藏酒容量不足，还需%s个格子", eventData.lack_cellar_num)
                })                
            }
            return
        }
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "StoreSuccess"
        })
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "藏酒成功，请前往酒库查看"
        })
        NetManager.instance.sendMsg("BuildingInfoBrewBuildingCmd_CS", {
            building_id: this.buildingData.buildingType,
            building_index: this.buildingData.buildingIndex
        })
        NetManager.instance.sendMsg("CellarBrewBuildingCmd_CS")
        this.onCloseView()
    }
}