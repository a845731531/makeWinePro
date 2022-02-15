import { BridgeInterface } from "../BridgeInterface";

export default class IosBridge implements BridgeInterface {

    readonly OC_CLASS: string = "PlatformBridge";
    private static _instance: IosBridge = null;

    public static get instance(): IosBridge {
        if (this._instance == null) {
            this._instance = new IosBridge();
        }
        return this._instance;
    }

    private constructor() {
        
    }
    
    getMachineId(): string {
        let result: string = jsb.reflection.callStaticMethod(this.OC_CLASS, "getMachineId");
        return result;
    }

    thirdLogin(params: Object, callback: Function): void {
        params["callback"] = callback;
        jsb.reflection.callStaticMethod(this.OC_CLASS, "thirdLogin", params);
    }

}