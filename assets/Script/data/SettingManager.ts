export default class SettingManager {
    private static _instance: SettingManager = null;

    public static get instance(): SettingManager {
        if (this._instance == null) {
            this._instance = new SettingManager();
        }
        return this._instance;
    }

    private save_data = {}

    constructor() {
        this.reset();
        this.addNetListener();
    }

    getMusicEnable()
    {
        let enable = cc.sys.localStorage.getItem("BrewMasterMusicEnable")
        if(enable != "" && enable != undefined && enable != null)
        {
            return JSON.parse(enable)
        }
        return true
    }

    getAudioEnable()
    {   
        let enable = cc.sys.localStorage.getItem("BrewMasterAudioEnabled")
        if(enable != "" && enable != undefined && enable != null)
        {
            return JSON.parse(enable)
        }
        return true
    }

    reset() {

    }

    addNetListener() {
    }
}