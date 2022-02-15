import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import HouseDataManager from "../../data/HouseDataManager";
import EventManager from "../../framework/manager/EventManager";
import BaseView from "../../framework/viewbase/BaseView";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingTargetHouse extends BaseView {

    
   
    
    @property(cc.Node)
    buttonParent: cc.Node = null
     
    @property(cc.Node)
    buyHouse: cc.Node = null

    @property(cc.Node)
    houseManager: cc.Node = null

    start() {
        super.start()        
        let hourseDataList = HouseDataManager.instance.getHouseList()
        if(hourseDataList.length > 0) {
            this.onClickTag(null, 1)
        } else {
            this.onClickTag(null, 0)
        }
    }

    onEnable() {
        EventManager.instance.addEventListener(CustomEventEnum.SELLHOUSE_CLOSE_PANEL, this.onCloseView, this)
        EventManager.instance.addEventListener(CustomEventEnum.SELLHOUSE_CHANGETAB, this.onChangeTab, this)
      
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    onCloseView() {
        super.onCloseView()
    }
    onChangeTab(tabIndex) {
        this.onClickTag(null, tabIndex)
    }
    onClickTag(event,index)
    {
        //先暂时这么写
        let toggleList = this.buttonParent.getComponentsInChildren(cc.Toggle)
        toggleList[index].isChecked = true
        if(index==0){
            toggleList[1].isChecked = false
            toggleList[1]&&  (toggleList[1].isChecked = false)
            this.buyHouse.active=true
            this.houseManager.active=false
           
          
        }else{
            toggleList[0]&&  (toggleList[0].isChecked = false)  
            this.buyHouse.active=false
            this.houseManager.active=true
           
        }
    }

    
}