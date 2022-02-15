
import { CustomEventEnum } from "../Constant/CustomEventEnum";
import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
import BaseDataManager from "./BaseDataManager";


//  export enum MarriageState {
//     discoverture = 0,//未婚,
//     married = 1, //已婚
// }

export default class ChildrenDataManager extends BaseDataManager {
    private static _instance: ChildrenDataManager = null;
    public static get instance(): ChildrenDataManager {
        if (this._instance == null) {
            this._instance = new ChildrenDataManager();
        }
        return this._instance;
    }
 
 

    
    private childrenList = []

    constructor() {
        super();
        this.reset();
    
    }

    reset() {
        super.reset()
    }
    addNetListener() {
        EventManager.instance.addEventListener("stChildLsChildCmd_NT", this.onStChildLsChildCmd_NT, this, -1)
        EventManager.instance.addEventListener("stPregnantChildCmd_NT", this.onStPregnantChildCmd_NT, this)
        EventManager.instance.addEventListener("stNewPetnameChildCmd_SC", this.onStNewPetnameChildCmd_SC, this, -1)
        
        EventManager.instance.addEventListener("stSpeedupChildCmd_SC", this.onStSpeedupChildCmd_SC, this, -1)

        EventManager.instance.addEventListener("stRefreshChildCmd_NT", this.onStRefreshChildCmd_NT, this)
        
        //EventManager.instance.addEventListener(CustomEventEnum.FRIEND_UPDATE_VIEW, this.updateApplyList, this)
    }

  
   
    onStChildLsChildCmd_NT(eventData) {
        for(let i=0;i<eventData.childData-1;i++){
            for(let j=0;j<eventData.childData-i-1;j++){
                let temp=eventData.childData[j]
                if(eventData.childData[j].pregnantTime>eventData.childData[j+1].pregnantTime){
                    eventData.childData[j]=eventData.childData[j+1]
                    eventData.childData[j+1]=temp
                }

            }
        }
        this.childrenList=eventData.childData
        EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_CHILD_UPDATELIST)
    }
 
    onStPregnantChildCmd_NT(data){

        cc.log("好了吗",data,this.childrenList)
        for(let i=0;i<this.childrenList.length;i++){
           if(this.childrenList[i].childId==data.childData.childId){
               return
           }
        }
        this.childrenList.splice(0,0,data.childData)
        cc.log("好了吗",data,this.childrenList)
    }
    getChildrenList(){
        return this.childrenList
    }

    onStNewPetnameChildCmd_SC(eventData) {

    //     for(let i = 0; i < this.childrenList.length; i++) {
    //         let itemData = this.childrenList[i]
    //         if(itemData.childId == eventData.childId) {
    //             itemData.name = eventData.name
    //             itemData.petname=eventData.petname
    //             break
    //         }
    //     }
        
    //  EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_CHILD_RENAME)
    //  EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_CHILD_UPDATELIST)

    EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_CHILD_RENAMESUCEFF,eventData)
    }

    onStSpeedupChildCmd_SC(eventData) {
        if(eventData.errCode==0){
          cc.log("加速成功")
        }else if(eventData.errCode==1){
            cc.log("加速")
        }
    }

    onStRefreshChildCmd_NT(eventData) {

     
        EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_CHILD_SPEDD,eventData.childData)
        // for(let i = 0; i < this.childrenList.length; i++) {
        //     let itemData = this.childrenList[i]
        //     if(itemData.id == eventData.childId) {
        //         itemData.bornTime = (eventData.bornTime- eventData.pregnantTime)
        //         EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_CHILD_UPDATELIST)
        //         break
        //     }
        // }
    } 
    
}