// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { houseItemData } from "../../data/DataInterface";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HouseItem extends cc.Component {

    @property(cc.Label)
    house: cc.Label = null;

   
    @property(cc.Label)
    serialNum: cc.Label = null;

    @property(cc.Label)
    areaNum: cc.Label = null;

    @property(cc.Label)
    floorNum: cc.Label = null;
  
    @property(cc.Label)
    orient: cc.Label = null;

    @property(cc.Label)
    index: cc.Label = null;

    private data

    start () {

    }

    updateView(data:houseItemData,index){
        this.data=data
        this.index.string=index+1
        this.house.string=data.house
        this.orient.string=data.orientation
        this.serialNum.string=data.serial.toString()
        this.floorNum.string=data.floor.toString()
        this.areaNum.string=data.area.toString()
    }

    decorationBtn(){
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.decoratePanel,
            exData:this.data
        })  
        EventManager.instance.dispatchEvent(CustomEventEnum.SELLHOUSE_CLOSE_PANEL)
    }

}
