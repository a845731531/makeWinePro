/**
 * 事件广播系统
 */
interface EventHandlerData {
    callBack: Function,
    target: any,
    priority: number,
}
// cc.macro.ENABLE_TILEDMAP_CULLING = false
export default class EventManager {

    private static _instance: EventManager;

    private _eventList: { [eventName: (number | string)]: EventHandlerData[] } = {};

    constructor() {
    }

    public static get instance(): EventManager {
        if(this._instance == null) {
            this._instance = new EventManager();
        }
        return this._instance;
    }
    
    /**
     * 添加事件监听
     *
     * @param {number} eventName 事件名
     * @param {Function} callback 回调
     * @param {*} eventTarget  监听target
     * @param {number} [priority] 优先级，默认为0，越小越先派发
     * @memberof EventManager
     */
    public addEventListener(eventName: (number | string), callback: Function, eventTarget: any, priority?: number): void {
        if(!priority) {
            priority = 0;
        }
        let itemEvent: EventHandlerData = {callBack: callback, target: eventTarget, priority: priority};
        let itemList: EventHandlerData[] = this._eventList[eventName];
        if (!itemList) {
            itemList = []
            this._eventList[eventName] = itemList;
        }
        itemList.push(itemEvent);
        itemList.sort(function (first, second) {
            return first.priority - second.priority;
        })
    }
    /**
     * 移除target上的某事件监听
     *
     * @param {number} eventName 事件名
     * @param {*} eventTarget 绑定的target
     * @returns {void}
     * @memberof EventManager
     */
    public removeEventListener(eventName: (number | string), eventTarget: any): void {
        let itemList: EventHandlerData[] = this._eventList[eventName];
        if (!itemList) {
            return;
        }
        for(let i = itemList.length - 1; i >= 0 ; i--) {
            let itemEvent: EventHandlerData = itemList[i];
            if(itemEvent.target === eventTarget) {
                itemList.splice(i, 1);
            }
        }
    }
    
    /**
     * 移除eventTarget上所有监听
     *
     * @param {*} eventTarget
     * @memberof EventManager
     */
    public removeTargetListener(eventTarget: any): void {
        for(let eventName in this._eventList) {
            //eventName 从字符串类型转为number
            this.removeEventListener(eventName, eventTarget);
        }
    }

    /**
     * 派发事件
     *
     * @param { (number | string)} eventName 事件名
     * @param {*} [eventData] 要传递的数据
     * @returns {void}
     * @memberof EventManager
     */
    public dispatchEvent(eventName: (number | string), eventData?: any): void {
        let itemList: EventHandlerData[] = this._eventList[eventName];
        if (!itemList) {
            return;
        }
        for (let i = 0; i < itemList.length; i++) {
            let itemEvent: EventHandlerData = itemList[i];
            itemEvent.callBack.apply(itemEvent.target, [eventData]);
        }
    }
}