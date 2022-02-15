import { EventEnum } from "../FrameWorkEnum";
import EventManager from "../manager/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ModalNode extends cc.Component{

    @property(cc.Node)
    dialogBg: cc.Node = null

    @property(cc.RichText)
    contentLabel: cc.RichText = null

    @property(cc.Node)
    confirmBtn: cc.Node = null

    @property(cc.Node)
    cancelBtn: cc.Node = null

    @property(cc.Node)
    closeBtn: cc.Node = null

    @property(cc.Label)
    confirmLabel: cc.Label = null

    @property(cc.Label)
    cancelLabel: cc.Label = null

    private originSureX = null
    private _isOnEffect = true
    private confirmCallback = null
    private cancelCallback = null

    onLoad () {
        this.originSureX = this.confirmBtn.x
    }

    start() {
        this._isOnEffect = true  //动画过程中屏蔽点击
        this.dialogBg.scale = 0.1
        let action = cc.sequence(
            cc.scaleTo(0.15, 1.1),
            cc.scaleTo(0.05, 1.0),
            cc.callFunc(() => {
                this._isOnEffect = false
                EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                    type: "ShowModalView"
                })
            })
        )
        this.dialogBg.runAction(action)

        // EventMng.emit(CustomEventList.PLAY_AUDIO,GameConstants.SoundList.snd_Click);
    }
    /**
     * @param {*} content 
     * @param {*} confirmCallback 
     * @param {*} confirmText 
     * @param {*} showCancel 
     * @param {*} cancelCallback 
     * @param {*} cancelText 
     * @param {*} hideClose   //只显示确认，不能关闭
     */
    initModal(configData) {
        this.confirmCallback = configData.confirmCallback
        this.cancelCallback = configData.cancelCallback
        
        this.contentLabel.string = configData.content

        if(configData.showCancel && !configData.hideClose) {
            this.cancelBtn.active = true
            this.confirmBtn.x = this.originSureX
        } else {
            this.cancelBtn.active = false
            this.confirmBtn.x = 0
        }
        this.closeBtn.active = !configData.hideClose

        configData.confirmText && (this.confirmLabel.string = configData.confirmText)
        configData.cancelText && (this.cancelLabel.string = configData.cancelText)
    }

    _closeModal() {
        this._isOnEffect = true
        let action = cc.sequence(
            cc.scaleTo(0.05, 1.1),
            cc.scaleTo(0.15, 0.1),
            cc.callFunc(() => {
                this._isOnEffect = false
                this.node.parent = null
            })
        )
        this.dialogBg.runAction(action)
    }

    onConfirmBtnClick() {
        if(this._isOnEffect) {
            return
        }
        typeof this.confirmCallback === "function" && this.confirmCallback()
        this._closeModal()
    }

    onCancelBtnClick() {
        if(this._isOnEffect) {
            return
        }
        typeof this.cancelCallback === "function" && this.cancelCallback()
        this._closeModal()
    }

    onCloseButton() {
        if(this._isOnEffect) {
            return
        }
        typeof this.cancelCallback === "function" && this.cancelCallback()
        this._closeModal()
    }

}
