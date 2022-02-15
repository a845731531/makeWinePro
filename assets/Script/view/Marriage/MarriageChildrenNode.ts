import MarriageDataManager from "../../data/MarriageDataManager";
import List from "../../framework/component/List";
import MarriageChildItem from "./MarriageChildItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MarriageChildrenNode extends cc.Component {
    @property(cc.Label)
    numLabel: cc.Label = null
    @property(List)
    childrenView: List = null

    private childrenData = []

     onEnable() {
        this.childrenData = MarriageDataManager.instance.getChildrenList()
        this.numLabel.string = this.childrenData.length.toString()
        this.childrenView.numItems = this.childrenData.length
    }

    onRenderItem(itemNode, index) {
        let itemData = this.childrenData[index]
        itemNode.active = true
        let itemScript = itemNode.getComponent(MarriageChildItem)
        itemScript.updateView(itemData)
    }
}