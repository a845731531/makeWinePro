import { ItemType } from "../../Constant/GameEnum";
import BagItemView from "./BagItemView";
import EXCodeItemView from "./EXCodeItemView";

/**
 * 背包物品 item脚本
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class BagPropItemView extends cc.Component {

    @property(BagItemView)
    itemNode: BagItemView = null;

    @property(EXCodeItemView)
    EXCodeNode: EXCodeItemView = null;

    updateView(data,needClick = true) {

        if(!data)
        {
            this.itemNode.node.active = false
            this.EXCodeNode.node.active = true
            this.EXCodeNode.updateView(null,false)
            return
        }

        if(data.type == ItemType.EXCode)
        {
            this.itemNode.node.active = false
            this.EXCodeNode.node.active = true

            this.EXCodeNode.updateView(data,needClick)
        }else{
            this.itemNode.node.active = true
            this.EXCodeNode.node.active = false

            this.itemNode.updateView({
                propId: data.propId,
                customNum: data.customNum,
                showName: false,
                hideClick: !needClick,
                nameColor: cc.Color.WHITE,
                showNew: true
            })
        }
    }
}
