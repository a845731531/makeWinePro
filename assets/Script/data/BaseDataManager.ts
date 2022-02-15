import EventManager from "../framework/manager/EventManager";

export default class BaseDataManager {
    init() {
        this.addNetListener()
    }
    reset() {
        EventManager.instance.removeTargetListener(this);
    }
    
    addNetListener() {
        
    }
}