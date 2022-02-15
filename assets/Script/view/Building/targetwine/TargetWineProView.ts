
const { ccclass, property } = cc._decorator;

@ccclass
export default class TargetWineProView extends cc.Component {

    @property(cc.Node)
    curBg: cc.Node = null;

    @property(cc.Node)
    proBg: cc.Node = null;

    @property
    totalLen: number = 100;

    private _minLen = 17

    updateView(materialList) {

        let curPro = 0
        let totalPro = 0
        for(let i = 0; i < materialList.length; i++)
        {
            curPro += Math.min(1,materialList[i].curCount / materialList[i].totalCount)
            totalPro++
        }

        if(curPro == totalPro)
        {
            this.curBg.active = false
            this.proBg.active = true
        }else{
            this.curBg.active = true
            this.proBg.active = false

            this.curBg.height = Math.max(this.totalLen * (curPro / totalPro),this._minLen)
        }
    }
}
