import UserDataManager from "../../data/UserDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseLandInfo extends cc.Component {

    @property(cc.Label)
    txtId: cc.Label = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Label)
    txtPos: cc.Label = null;

    private _param = null
    private _gridData = null

    updateView(param) {

        this._param = param
        this._gridData = param.gridData

        this.node.active = true

        this.txtId.string = cc.js.formatStr("编号：No.%s", this._gridData.landId)

        this.txtName.string = this._gridData.owner == "" ? "无" : this._gridData.owner

        this.txtPos.string = cc.js.formatStr("坐标：（%s,%s）", this._gridData.row, this._gridData.column)
    }

    onClickBuy() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: "是否花费120000zqb购买土地？",
            showCancel: true,
            confirmCallback: () => {
                this._gridData.owner = UserDataManager.instance.getUserName()
                this._gridData.userId = UserDataManager.instance.getUserId()
                EventManager.instance.dispatchEvent("RspBuyWorldMap", {
                    gridData: this._gridData
                })
                EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                    msg: "购买成功"
                })

                this._param && this._param.callback && this._param.callback() 
            }
        })
    }

}