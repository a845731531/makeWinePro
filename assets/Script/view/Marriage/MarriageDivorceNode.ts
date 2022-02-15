import MarriageDataManager from "../../data/MarriageDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MarriageDivorceNode extends cc.Component {
    @property(cc.Label)
    divorceCostLabel: cc.Label = null

    private divorceCost: number = 1000
    
    start() {
        this.divorceCostLabel.string = cc.js.formatStr("%szqb", this.divorceCost)
    }

    onClickAgreeOn() {
        if( MarriageDataManager.instance.getPartnerData().name==null){
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "您现在未婚状态,去找一位伴侣吧~"
            })
            return
        }
        let partnerData = MarriageDataManager.instance.getPartnerData()
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: cc.js.formatStr("是否与%s协议离婚？", partnerData.name),
            showCancel: true,
            confirmCallback: () => {   
                EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                    content: "离婚申请已发送至对方，请耐心等待对方回复",
                }) 
            }
        })
    }
    onClickForce() {
        if( MarriageDataManager.instance.getPartnerData().name==null){
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "您现在未婚状态,去找一位伴侣吧~"
            })
            return
        }
        let partnerData = MarriageDataManager.instance.getPartnerData()
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: cc.js.formatStr("是否花费%szqb强制与%s离婚？", this.divorceCost, partnerData.name),
            showCancel: true,
            confirmCallback: () => {         
                // EventManager.instance.dispatchEvent("NtfMarriageData", {
                //     partnerData: null
                // })  
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "离婚成功"
                })
                MarriageDataManager.instance.getPartnerData().name=null
            }
        })
    }
}