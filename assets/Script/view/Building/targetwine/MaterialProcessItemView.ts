import OldWineConfig from "../../../config/OldWineConfig";
import PropConfig from "../../../config/PropConfig";
import { ItemType } from "../../../Constant/GameEnum";
import { SoundEnum } from "../../../Constant/SoundEnum";
import BagDataManager from "../../../data/BagDataManager";
import { EventEnum } from "../../../framework/FrameWorkEnum";
import EventManager from "../../../framework/manager/EventManager";
import { Tool } from "../../../framework/manager/Tool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MaterialProcessItemView extends cc.Component {

    @property(cc.Sprite)
    itemIcon: cc.Sprite = null;

    @property(cc.ProgressBar)
    progress: cc.ProgressBar = null;

    @property(cc.Sprite)
    progressMaxBg: cc.Sprite = null;

    @property(cc.Label)
    txtNum: cc.Label = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Label)
    txtYear: cc.Label = null;

    private _curData = null
    private _callback = null

    updateView(param,callback?) {
        
        this._curData = param
        this._callback = callback

        let itemConfig = PropConfig[param.propId]
        if (this.txtName) {
            if (itemConfig.type == ItemType.OLD_WINE) {
                let oldWineConfig = OldWineConfig[param.propId]
                this.txtName.string = cc.js.formatStr("%s次酒", Tool.getChinaEasyNumber(oldWineConfig.round))
                this.txtYear.string = cc.js.formatStr("·%s年", Tool.getChinaNumber(oldWineConfig.year))
            } else {
                this.txtName.string = itemConfig.name
                this.txtYear.string = ""
            }
        }

        if (this.txtNum) {
            let curCount = Math.min(param.curCount, param.totalCount)
            let curCountStr = curCount
            let totalCountStr = param.totalCount
            this.txtNum.string = cc.js.formatStr("%s/%s", Tool.unitConversion(curCountStr,false), Tool.unitConversion(totalCountStr))
        }

        if (this.progress && this.progressMaxBg) {
            this.progress.progress = param.curCount / param.totalCount
            this.progressMaxBg.node.active = param.curCount >= param.totalCount

            this.txtNum.node.color = param.curCount >= param.totalCount? cc.color(211,149,68) : cc.color(255,0,0)
        }

        let icon = BagDataManager.instance.getItemIconById(param.propId)
        Tool.loadSpriteFrame(icon, this.itemIcon)

    }

    onClickJump()
    {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        if(this._curData && this._curData.curCount < this._curData.totalCount)
        {
            this._callback && this._callback(this._curData.propId,true)
        }
    }
}
