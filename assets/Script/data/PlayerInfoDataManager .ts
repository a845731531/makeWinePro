import NpcConfig from "../config/NpcConfig";
import { CustomEventEnum } from "../Constant/CustomEventEnum";
import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
import BaseDataManager from "./BaseDataManager";
import { SelectUserInfo, UserInfo } from "./DataInterface";




export default class PlayerInfoDataManager extends BaseDataManager {
    private static _instance: PlayerInfoDataManager = null;
    public static get instance(): PlayerInfoDataManager {
        if (this._instance == null) {
            this._instance = new PlayerInfoDataManager();
        }
        return this._instance;
    }

   
    //private playerInfo:SelectUserInfo=null

    private playerInfo:any=null
     
    private sex:number=0;//性别 0男  1女
    
    constructor() {
        super();
        this.reset();
        //TODO
      
    }

    reset() {
        super.reset()
    }
    addNetListener() {
        EventManager.instance.addEventListener("stUserInfoSelectUserCmd", this.onPlayerInfoData, this,-1)
    }

    onPlayerInfoData(data:UserInfo){
      this.playerInfo=data.charInfo[0]
      this.sex=this.playerInfo.face
    }

    getPlayerInfo(){
        return this.playerInfo
    }

    getSex(){
        return this.sex
    }
  
   
}