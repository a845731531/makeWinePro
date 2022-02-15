import { CustomEventEnum } from "../Constant/CustomEventEnum";
import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
import BaseDataManager from "./BaseDataManager";
import { houseItemData } from "./DataInterface";

export default class HouseDataManager extends BaseDataManager {
    private static _instance: HouseDataManager = null;
    private houseList: houseItemData[] = []
    public static get instance(): HouseDataManager {
        if (this._instance == null) {
            this._instance = new HouseDataManager();
        }
        return this._instance;
    }

    constructor() {
        super();
        //this.initDatas()
        this.reset();
        
    }
    reset() {
        //this.houseList = []
        super.reset()
    }
    addNetListener() {
       // EventManager.instance.addEventListener(CustomEventEnum.ADD_CHAT_MESSAGE, this.addHouseList, this, -1)
      
    }
    
  
    getHouseList(){
        return this.houseList
    }
   

    getSerialHouseList(serial){
        for(let key in this.houseList){
            if(this.houseList[key].serial==serial){
               return this.houseList[key]
             }
         }
    }
    
    addHouseList(data:houseItemData){
        this.houseList.push(data)
    }

    chageHouseList(data:houseItemData,exData){
        let add=false
        let index=0
        for(let key in this.houseList){
            if(this.houseList[key].serial==data.serial){
                for(var i=0;i<this.houseList[key].possess.length;i++){
                       if(this.houseList[key].possess[i]==exData.id){
                         add=true
                         index=i
                         break
                       }
                }
                if(add){
                    this.houseList[key].showState[index]=exData.btnState
                }else{
                    this.houseList[key].possess.push(exData.id)
                    
                    this.houseList[key].showState.push(exData.btnState)
                }
               
                 add=false
                break
             }
         }
    
         let dataSerial=this.getSerialHouseList(data.serial)

         EventManager.instance.dispatchEvent(CustomEventEnum.SELLHOUSE_UPDATE_BTN,dataSerial)
    }
  
}
