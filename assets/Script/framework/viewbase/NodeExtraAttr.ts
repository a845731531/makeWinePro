
const { ccclass, property } = cc._decorator;

@ccclass("NodeAttrData")
class NodeAttrData {
    @property(cc.String)
    public keyName: string = "";
    @property(cc.Node)
    public node: cc.Node = null;
}
@ccclass
export default class NodeExtraAttr extends cc.Component {
    @property({
        type: NodeAttrData,
        tooltip: "Btn、Spr、Label结尾的会自动获取对应组件"
    })
    attrList: NodeAttrData[] = [];

    onLoad() {
        let extraAttr = {}
        for (let i = 0; i < this.attrList.length; i++) {
            let itemAttr = this.attrList[i];
            let keyName = itemAttr.keyName;
            if (keyName.indexOf("Btn") != -1) {
                extraAttr[keyName] = itemAttr.node.getComponent(cc.Button)
            } else if (keyName.indexOf("Spr") != -1) {
                extraAttr[keyName] = itemAttr.node.getComponent(cc.Sprite)
            } else if (keyName.indexOf("Label") != -1) {
                extraAttr[keyName] = itemAttr.node.getComponent(cc.Label)
            } else {
                extraAttr[keyName] = itemAttr.node
            }
        }
        this.node.attr(extraAttr)
    }
}