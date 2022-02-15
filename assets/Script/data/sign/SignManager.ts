import { NetMsgDef } from "../../../resources/pb/NetMsgDef";
import PropConfig from "../../config/PropConfig";
import SignConfig from "../../config/SignConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { NetManager } from "../../framework/network/NetManager";
import BagDataManager from "../BagDataManager";

export default class SignManager {
    private static _instance: SignManager = null;

    public static get instance(): SignManager {
        if (this._instance == null) {
            this._instance = new SignManager();
        }
        return this._instance;
    }

    private save_data = {}
    private signConfigList = []

    constructor() {
        this.reset();
        this.addNetListener();
        this.save_data = {
            signDay: 1,//签到天数
            hasSign: false,//今天是否已签到
        }
    }

    init() {

    }

    addNetListener() {
        //----------监听服务器返回-------------//
        EventManager.instance.addEventListener(NetMsgDef.Sign_RSP_SIGN, this.onRspSign, this, -1)
        //----------监听服务器返回-------------//

        //----------请求服务器数据-------------//

        //----------请求服务器数据-------------//


        //----------界面逻辑-------------//
        EventManager.instance.addEventListener(CustomEventEnum.SIGN_CLICK_SIGN, this.onReqSign, this)
        //----------界面逻辑-------------//
    }

    checkCanGetSign(day?) {
        day = day ? day : this.getSignConfigList().length
        if (this.save_data["signDay"] > day || this.save_data["hasSign"] == true) {
            return false
        }
        return true
    }

    getSignData() {
        return this.save_data
    }

    getSignConfigList() {
        this.signConfigList = []
        for (let i in SignConfig) {
            let itemId = SignConfig[i].itemId
            let data = {
                id: itemId,
                day: SignConfig[i].id,
                type: PropConfig[itemId].type,
                name: PropConfig[itemId].name,
                icon: BagDataManager.instance.getItemIconById(itemId),
                count: SignConfig[i].count,
                preview: SignConfig[i].preview == 1,
                quality: PropConfig[itemId].quality
            }
            this.signConfigList.push(data)
        }
        return this.signConfigList
    }

    onReqSign() {

        NetManager.instance.sendMsg(NetMsgDef.Sign_REQ_SIGN)

        //xiejinhui test 测试用
        this.save_data["signDay"] += 1
        if (this.save_data["signDay"] > this.signConfigList.length) {
            this.save_data["hasSign"] = true
        }

        EventManager.instance.dispatchEvent(NetMsgDef.Sign_RSP_SIGN, this.save_data["signDay"] - 1)
    }

    onRspSign(day) {
        let index = day - 1
        if (this.signConfigList[index]) {
            BagDataManager.instance.addItem({
                propId: this.signConfigList[index].id,
                customNum: this.signConfigList[index].count 
            })
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "恭喜获得 " + this.signConfigList[index].name + "x" + this.signConfigList[index].count
            })
        }

        EventManager.instance.dispatchEvent(CustomEventEnum.SIGN_UPDATE_VIEW)
    }

    reset() {

    }

}