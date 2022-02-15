import CustomRenderSeqContainer from "./CustomRenderSeqContainer";



const { ccclass, property } = cc._decorator;

@ccclass
export default class CustomRenderSeqItem extends cc.Component {
    private hasAdd = false
    start() {
        let parentComp = this.node.parent.getComponent(CustomRenderSeqContainer)
        let labelList = this.node.getComponentsInChildren(cc.Label)
        for(let i = 0, len = labelList.length; i < len; i++) {
            labelList[i].disableRender();
            // labelList[i].cacheMode = cc.Label.CacheMode.BITMAP
            if(!this.hasAdd) {
                parentComp.addCustomRender(labelList[i].node, 1)
            }
        }
        this.hasAdd = true
    }
    onEnable(): void {
        let labelList = this.node.getComponentsInChildren(cc.Label)
        for(let i = 0, len = labelList.length; i < len; i++) {            
            labelList[i].disableRender();
        }  
    }
    onDisable(): void {
        let labelList = this.node.getComponentsInChildren(cc.Label)
        for(let i = 0, len = labelList.length; i < len; i++) {            
            labelList[i].markForRender(true);
        }  
    }
}