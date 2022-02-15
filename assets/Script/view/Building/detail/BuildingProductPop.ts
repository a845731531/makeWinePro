import { EventEnum } from "../../../framework/FrameWorkEnum";
import GuideManager from "../../../framework/guide/GuideManager";
import EventManager from "../../../framework/manager/EventManager";
import BaseView from "../../../framework/viewbase/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BuildingProductPop extends BaseView {
    @property(cc.Node)
    content: cc.Node = null
    @property(cc.Node)
    itemPre: cc.Node = null

    private curData = null
    initByExData(exData) {
        this.curData = exData
    }
    start() {
        let productList = this.curData.productList
        for(let i = 0, len = productList.length; i < len; i++) {
            let itemData = productList[i]
            let itemNode = cc.instantiate(this.itemPre)
            itemNode.active = true
            itemNode.parent = this.content

            this.updateItemNode(itemNode, itemData)
        }
        super.start()
    }

    updateItemNode(itemNode, itemData) {
        let bagItemNode = itemNode.bagItemNode
        let bagItemScript = bagItemNode.getComponent("BagItemView")
        bagItemScript && bagItemScript.updateView({
            propId: itemData.productId,
            customNum: "",
            showName: true,
        })

        let selectBtn = itemNode.selectBtn
        selectBtn.node.attr({
            productData: itemData
        })
        this.scheduleOnce(() => {
            GuideManager.instance.registerGuideNode(cc.js.formatStr("ProductPopSelect_%s", itemData.productId), selectBtn.node)
        })
    }
    onClickItem(event) {
        let productData = event.target.productData
        if(this.curData && this.curData.onSelect) {
            this.curData.onSelect(productData)
            this.onCloseView()
        }
    }
}