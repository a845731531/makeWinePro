import ProduceStepConfig from "../../../config/ProduceStepConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FramlandStepItemView extends cc.Component {

    @property(cc.Sprite)
    indexWaitBg: cc.Sprite = null;
    @property(cc.Sprite)
    indexDoingBg: cc.Sprite = null;
    @property(cc.Sprite)
    indexSuccessBg: cc.Sprite = null;

    @property(cc.Node)
    doingBg: cc.Node = null;

    @property(cc.Label)
    indexLabel: cc.Label = null;

    @property(cc.Label)
    stepName: cc.Label = null;

    @property(cc.Node)
    arrowSucc: cc.Node = null;

    @property(cc.Node)
    arrowWait: cc.Node = null;

    private _chineseNumList = ["壹","贰","叁","肆","伍","陆","柒","捌","玖","拾"]

    updateView(index,curIndex) {

        this.indexLabel.string = this._chineseNumList[index]

        this.stepName.string = ProduceStepConfig[index+1].subStepName
        this.stepName.node.color = curIndex >= index? new cc.Color(202,141,131) : new cc.Color(144,126,110)
        this.stepName.getComponent(cc.LabelOutline).color = curIndex >= index? new cc.Color(202,141,131) : new cc.Color(144,126,110)

        this.indexWaitBg.node.active = index > curIndex
        this.indexDoingBg.node.active = index == curIndex
        this.indexSuccessBg.node.active = index < curIndex

        this.doingBg.active = index == curIndex

        if(this.arrowSucc || this.arrowWait)
        {
            this.arrowSucc.active = curIndex >= index
            this.arrowWait.active = curIndex < index
        }
    }
}
