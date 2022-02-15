import GuideManager from "./GuideManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GuideNodeMark extends cc.Component {
    @property
    guideNodeName: string = "";
    @property
    delayTime: number = 0;

    start () {
        this.scheduleOnce(() => {
            GuideManager.instance.registerGuideNode(this.guideNodeName, this.node)
        }, this.delayTime)
    }
    onDestroy () {
        GuideManager.instance.registerGuideNode(this.guideNodeName, null)
    }
}
