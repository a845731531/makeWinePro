import BuildingPosConfig from "../../../config/BuildingPosConfig";
import { BuildingType } from "../../../Constant/GameEnum";
import { PrefabPathEnum } from "../../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";
import BuildingDataManager from "../../../data/BuildingDataManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingFramlandBuy extends cc.Component {

    onLoad()
    {
        this.updateView()
    }

    updateView()
    {
        this.node.active = false

        let framlist = BuildingDataManager.instance.getBuildingListByType(BuildingType.Farm)
        if(framlist.length > 0)
        {
            //几个世界农田
            let worldFramCount = 0
            let hasWorld = false
            for(let i = 0; i < framlist.length; i++)
            {
                if(framlist[i].worldId > 0)
                {
                    worldFramCount++
                    hasWorld = true
                }
            }

            if(worldFramCount == 10)
            {
                return
            }

            //设置添加按钮位置
            for(let id in BuildingPosConfig) {
                let itemData = BuildingPosConfig[id]
                if(itemData.buildingType == 1)
                {
                    if((hasWorld && worldFramCount == 0) || itemData.buildingIndex == 3)
                    {
                        this.node.setPosition(cc.v2(itemData.posX,itemData.posY))
                        this.node.active = true
                        break
                    }else if(itemData.buildingIndex > 2){
                        worldFramCount--
                    }
                }
                
            }
        }


    }

    onClickNode()
    {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.BuildingFramlandAdd
        })
    }


}