import { BridgeInterface } from "../BridgeInterface";

export default class WebBridge implements BridgeInterface {

    private fingerprint: string = null;
    private static _instance: WebBridge = null;
    public static get instance(): WebBridge {
        if (this._instance == null) {
            this._instance = new WebBridge();
        }
        return this._instance;
    }

    private constructor() {
        this.fingerprint = cc.sys.localStorage.getItem("LAST_MACHINE_ID");
        if(!this.fingerprint && cc.sys.isBrowser) {
            Fingerprint2.getPromise().then((components) => {
                if(!this.fingerprint) {
                    var values = components.map(function (component) { return component.value })
                    this.fingerprint = Fingerprint2.x64hash128(values.join(''), 31)
                    cc.sys.localStorage.setItem("LAST_MACHINE_ID", this.fingerprint)
                }
            })
        }
    }
    
    getMachineId(): string {
        if(!this.fingerprint) {
            this.fingerprint = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
            cc.sys.localStorage.setItem("LAST_MACHINE_ID", this.fingerprint)
        }
        return this.fingerprint;
    }

    thirdLogin(params: Object, callback: Function): void {
        let uuid = this.getMachineId()
        let paramStr = JSON.stringify({
            result: 1,
            plat: 0,
            data: uuid,
        })
        callback.call(null, paramStr)
    }
}