

import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { houseItemData } from "../../data/DataInterface";
import HouseDataManager from "../../data/HouseDataManager";
import EventManager from "../../framework/manager/EventManager";
import BaseView from "../../framework/viewbase/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class decoratePanel extends BaseView {

    @property(cc.ScrollView)
    tagList: cc.ScrollView = null;

    @property([cc.Node])
    showFurniture: cc.Node[] = [];
    private serial:number=0


    onEnable()
    {    
    
      EventManager.instance.addEventListener(CustomEventEnum.SELLHOUSE_UPDATE_BTN,this.updateShow,this)
     
    }
 
    onDisable() {
       
        EventManager.instance.removeTargetListener(this)
    }
   // possess：这是家具的ID   showState：0表示不展示  1：表示展示
    updateShow(data:houseItemData){
        let possess=data.possess
        let showState=data.showState
        for(var i=0;i<possess.length;i++){
            if(showState[i]==1){
                this.showFurniture[possess[i]].active=true
            }else{
                this.showFurniture[possess[i]].active=false
            }
        }

    }

  
    initByExData(exData:houseItemData) {
        this.serial=exData.serial
        let data= HouseDataManager.instance.getSerialHouseList(this.serial)
        EventManager.instance.dispatchEvent(CustomEventEnum.SELLHOUSE_UPDATE_BTN,data) 
    }

    onClickLeft()
    {
        this.tagList.scrollToPercentHorizontal(0,0.5)
    }

    onClickRight()
    {
        this.tagList.scrollToPercentHorizontal(1,0.5)
    }

    onBtnClick(event ,CustomEventData){
     EventManager.instance.dispatchEvent(CustomEventEnum.SELLHOUSE_UPDATE_FURNITURE,CustomEventData) 
    }
   
}
