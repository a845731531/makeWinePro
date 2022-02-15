// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { houseItemData } from "../../data/DataInterface";
import HouseDataManager from "../../data/HouseDataManager";
import EventManager from "../../framework/manager/EventManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FurnitureItem extends cc.Component {

    @property(cc.Label)
    buyLabel: cc.Label = null;
    
    @property
    public id = null

    
    private btnState = 0
 
    private data 

    onEnable()
    {    
      EventManager.instance.addEventListener(CustomEventEnum.SELLHOUSE_UPDATE_BTN,this.updateBtn,this)
      EventManager.instance.addEventListener(CustomEventEnum.SELLHOUSE_UPDATE_FURNITURE,this.updateFurniture,this)

     // EventManager.instance.dispatchEvent(CustomEventEnum.SELLHOUSE_UPDATE_FURNITURE,CustomEventData) 
    }

    onDisable() {
       
        EventManager.instance.removeTargetListener(this)
    }
  
   
    updateBtn(data:houseItemData){
        this.data=data
         let possess=data.possess
         let showState=data.showState
         for(var i=0;i<possess.length;i++){
             if(possess[i]==this.id){
               if(showState[i]==1){
                 this.buyLabel.string="卸下" 
               }else{
                 this.buyLabel.string="购买使用" 
               }
             }
         }
        

    }

    updateFurniture(CustomEventData){
       if(this.id==CustomEventData){
         this.onBuyBtn()
       }
    }

   onBuyBtn(){
       if(this.btnState==0){
           this.buyLabel.string="卸下" 
           this.btnState=1
       }else{
          this.buyLabel.string="购买使用" 
          this.btnState=0
       }

        let data={
            id:this.id,
            btnState:this.btnState
        }
        HouseDataManager.instance.chageHouseList(this.data,data)  
      // EventManager.instance.dispatchEvent(CustomEventEnum.SELLHOUSE_UPDATE_ITEM,data)
   }
}
