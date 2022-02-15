import { BridgeInterface } from "../BridgeInterface";

export default class AndroidBridge implements BridgeInterface {

    readonly JAVA_CLASS: string = "com/client/platform/PlatformBridge";
    private static _instance: AndroidBridge = null;

    public static get instance(): AndroidBridge {
        if (this._instance == null) {
            this._instance = new AndroidBridge();
        }
        return this._instance;
    }

    private constructor() {
        
    }
    
    getMachineId(): string {
        let result: string = jsb.reflection.callStaticMethod(this.JAVA_CLASS, "getMachineId", "()Ljava/lang/String;");
        return result;
    }

    thirdLogin(params: Object, callback: Function): void {
        let paramStr = JSON.stringify(params)
        jsb.reflection.callStaticMethod(this.JAVA_CLASS, "thirdLogin", "(Ljava/lang/String;I)V", paramStr, callback);
    }

}