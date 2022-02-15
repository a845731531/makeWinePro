// import { CustomEventEnum } from "../Constant/CustomEventEnum";
// import EventManager from "../framework/manager/EventManager";
// import BagDataManager from "./BagDataManager";
// import BuildingDataManager from "./BuildingDataManager";
// import PersonalManager from "./personal/PersonalManager";
// import ShopDataManager from "./ShopDataManager";
// import StaffDataManager from "./StaffDataManager";
// import TaskDataManager from "./task/TaskDataManager";
// import UserDataManager from "./UserDataManager";
// import WareHouseDataManager from "./WareHouseDataManager";

// //存档管理
// export default class ArchiveManager {
//     private static RECORD_KEY = "BrewMasterRecord";

//     private static _instance: ArchiveManager = null;
    
//     public static get instance(): ArchiveManager {
//         if (this._instance == null) {
//             this._instance = new ArchiveManager();
//         }
//         return this._instance;
//     }
//     constructor() {
//         EventManager.instance.addEventListener(CustomEventEnum.ARCHIVE_SAVE_DATA, this.saveData, this)
//     }

//     public loadData() {
//         let recordStr = cc.sys.localStorage.getItem(ArchiveManager.RECORD_KEY)
//         let recordData = JSON.parse(recordStr) || {}
//         BuildingDataManager.instance.deserialize(recordData.buildingData || {})
//         BagDataManager.instance.deserialize(recordData.bagData || {})
//         UserDataManager.instance.deserialize(recordData.userData || {})
//         StaffDataManager.instance.deserialize(recordData.staffData || {})
//         ShopDataManager.instance.deserialize(recordData.shopData || {})        
//         PersonalManager.instance.deserialize(recordData.personalData || {})    
//         TaskDataManager.instance.deserialize(recordData.taskData || {})  
//         WareHouseDataManager.instance.deserialize(recordData.wareHouse || {})  
//     }
//     public saveData() {
//         let recordData = {}
//         recordData["buildingData"] = BuildingDataManager.instance.serialize()
//         recordData["bagData"] = BagDataManager.instance.serialize()
//         recordData["userData"] = UserDataManager.instance.serialize()
//         recordData["staffData"] = StaffDataManager.instance.serialize()
//         recordData["shopData"] = ShopDataManager.instance.serialize()
//         recordData["personalData"] = PersonalManager.instance.serialize()
//         recordData["taskData"] = TaskDataManager.instance.serialize()
//         recordData["wareHouse"] = WareHouseDataManager.instance.serialize()
//         cc.sys.localStorage.setItem(ArchiveManager.RECORD_KEY, JSON.stringify(recordData))
//     }
// }