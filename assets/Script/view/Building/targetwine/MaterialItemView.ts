import OldWineConfig from "../../../config/OldWineConfig";
import PropConfig from "../../../config/PropConfig";
import { ItemType } from "../../../Constant/GameEnum";
import { Tool } from "../../../framework/manager/Tool";
import BagItemView from "../../Bag/BagItemView";

/**
 * 背包物品 item脚本
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class MaterialItemView extends cc.Component {

    @property(BagItemView)
    itemView: BagItemView = null;

    @property(cc.ProgressBar)
    progress: cc.ProgressBar = null;

    @property(cc.Label)
    txtNum: cc.Label = null;

    @property(cc.Label)
    txtName: cc.Label = null;


    updateView(param) {

        this.itemView.updateView({
            propId: param.propId,
            showName: true,
            customNum: "",
            hideClick: true,
        })

        let itemConfig = PropConfig[param.propId]
        if (this.txtName) {

            if (itemConfig.type == ItemType.OLD_WINE) {
                let oldWineConfig = OldWineConfig[param.propId]
                this.txtName.string = cc.js.formatStr("%s次酒", Tool.getChinaEasyNumber(oldWineConfig.round))
            } else[
                this.txtName.string = itemConfig.name
            ]
        }

        if (this.txtNum) {
            let count = parseFloat(param.totalCount)
            if (itemConfig.type == ItemType.OLD_WINE) {
                let oldWineConfig = OldWineConfig[param.propId]
                this.txtNum.string = cc.js.formatStr("%s年·%s", Tool.getChinaNumber(oldWineConfig.year), Tool.unitConversion(count))
            } else {
                this.txtNum.string = Tool.unitConversion(count)
            }
        }

        if (this.progress) {
            this.progress.progress = param.curCount / param.totalCount
        }

    }
}
