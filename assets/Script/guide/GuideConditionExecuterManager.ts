import GuideConfig from "../config/GuideConfig";
import { GuideAlwaysMatchExecuter } from "../framework/guide/GuideAlwaysMatchExecuter";
import { GuideEqualMatchExecuter } from "../framework/guide/GuideEqualMatchExecuter";
import { GuideContainStrExecuter } from "../framework/guide/GuideContainStrExecuter";
import GuideManager from "../framework/guide/GuideManager";
import { GuideNumberEqualMatchExecuter } from "../framework/guide/GuideNumberEqualMatchExecuter";
import EventManager from "../framework/manager/EventManager";
import { EventEnum } from "../framework/FrameWorkEnum";
import { PrefabPathEnum } from "../Constant/PrefabPathEnum";
import { GuideNumberGreaterExecuter } from "../framework/guide/GuideNumberGreaterExecuter";


let GuideConditionExecuterManager = {
    initExecuter() {
        GuideManager.instance.setGuideDataList(Object.values(GuideConfig))
        let alwaysMatch = new GuideAlwaysMatchExecuter()
        let strContainMatch = new GuideContainStrExecuter()
        let numberEqualMatch = new GuideNumberEqualMatchExecuter()
        let numberGreaterMatch = new GuideNumberGreaterExecuter()
        
        GuideManager.instance.registerConditionExecuter("FirstLoading", alwaysMatch);
        GuideManager.instance.registerConditionExecuter("LoadingStart", alwaysMatch);
        
        GuideManager.instance.registerConditionExecuter("EnterHall", alwaysMatch);
        GuideManager.instance.registerConditionExecuter("OpenView", strContainMatch);
        GuideManager.instance.registerConditionExecuter("CloseView", strContainMatch);   
        GuideManager.instance.registerConditionExecuter("CameraZoomFinished", numberEqualMatch);      
        GuideManager.instance.registerConditionExecuter("CameraMoveFinished", alwaysMatch);      
        GuideManager.instance.registerConditionExecuter("AppGuideFinish", numberEqualMatch);
        GuideManager.instance.registerConditionExecuter("ChargeSuccess", alwaysMatch);      
        GuideManager.instance.registerConditionExecuter("OwnedMoneyNum", numberGreaterMatch);    
        GuideManager.instance.registerConditionExecuter("FarmlandSelectTarget", numberEqualMatch);
        GuideManager.instance.registerConditionExecuter("BuildingSelectNum", numberEqualMatch);
        GuideManager.instance.registerConditionExecuter("BuildingStartProduce", strContainMatch);  
        GuideManager.instance.registerConditionExecuter("ShowModalView", alwaysMatch);      
        GuideManager.instance.registerConditionExecuter("BuildingSpeedSuccess", strContainMatch);  
        GuideManager.instance.registerConditionExecuter("BuildingGatherSuccess", strContainMatch);  
        GuideManager.instance.registerConditionExecuter("ProduceState", strContainMatch);  
        GuideManager.instance.registerConditionExecuter("StaffNum", numberEqualMatch);    
        GuideManager.instance.registerConditionExecuter("QuNum", numberGreaterMatch);    
        GuideManager.instance.registerConditionExecuter("RecruitSuccess", alwaysMatch);    
        GuideManager.instance.registerConditionExecuter("RecruitEffectFinish", alwaysMatch);    
        GuideManager.instance.registerConditionExecuter("BuildingAddStaff", strContainMatch);  
        GuideManager.instance.registerConditionExecuter("StoreSuccess", alwaysMatch);  
        GuideManager.instance.registerConditionExecuter("StoreNum", numberGreaterMatch);   
        GuideManager.instance.registerConditionExecuter("StoreSpeedSucess", alwaysMatch);  
        GuideManager.instance.registerConditionExecuter("StoreGatherSuccess", alwaysMatch); 
        GuideManager.instance.registerConditionExecuter("OldWineNum", numberEqualMatch);     
        GuideManager.instance.registerConditionExecuter("FormulaNum", numberEqualMatch);    
        GuideManager.instance.registerConditionExecuter("FormulaSelectId", numberEqualMatch);  
        GuideManager.instance.registerConditionExecuter("FormulaMixSuccess", alwaysMatch);    
        GuideManager.instance.registerConditionExecuter("AddWineSelectItem", numberEqualMatch);  
        GuideManager.instance.registerConditionExecuter("WineNum", numberGreaterMatch);  
        GuideManager.instance.registerConditionExecuter("CustomWineSuccess", alwaysMatch);    
        GuideManager.instance.registerConditionExecuter("CodeNum", numberEqualMatch);  
        GuideManager.instance.registerConditionExecuter("TargetWine", numberEqualMatch);  
        GuideManager.instance.registerConditionExecuter("JumpMaterialFinish", alwaysMatch);    
        GuideManager.instance.registerConditionExecuter("ClearGuideDataSuccess", alwaysMatch);    
        
        EventManager.instance.addEventListener("GuideOpenView", this.onOpenGuideView, this)
    },

    onOpenGuideView(eventData) {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum[eventData],
        })
    }
}

export default GuideConditionExecuterManager