import PropConfig from "../../config/PropConfig";
import EventManager from "../../framework/manager/EventManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import BaseView from "../../framework/viewbase/BaseView";
import { NetManager } from "../../framework/network/NetManager";
import UserDataManager from "../../data/UserDataManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class DebugView extends BaseView {

    @property(cc.EditBox)
    edDiamond: cc.EditBox = null;

    @property(cc.EditBox)
    edPropId: cc.EditBox = null;

    @property(cc.EditBox)
    edPropNum: cc.EditBox = null;

    onClickAddCoin() {
        let num = parseInt(this.edDiamond.string)
        NetManager.instance.sendMsg("TestAddMoneyBrewUserCmd_CS", {
            money: num
        })
    }

    onClickAddProp(event) {
        let target = event.target
        let propId = parseInt(this.edPropId.string)
        let num = parseInt(this.edPropNum.string)
        let itemConfig = PropConfig[propId]
        if(itemConfig)
        {
            NetManager.instance.sendMsg("BuyBrewUserCmd_CS", {
                items: [
                    {
                        prop_id: propId,
                        num: num,
                    }
                ]
            })
        }else{
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "不存在此道具ID"
            })
        }

    }

    onClickResetGuide(event) {
        UserDataManager.instance.clearGuideData()        
        NetManager.instance.sendMsg("NewcomerFinishBrewUserCmd_CS")
        EventManager.instance.dispatchEvent(EventEnum.CLOSE_ALL_POPUP)
        NetManager.instance.close()
        cc.director.loadScene("LoadingScene")
    }
    onClickFinishAllGuide(event) {
        for(let i = 0; i < 40; i++) {
            EventManager.instance.dispatchEvent(EventEnum.GUIDE_FINISHED, i)
        }
        EventManager.instance.dispatchEvent(EventEnum.STOP_GUIDE)
    }
}
