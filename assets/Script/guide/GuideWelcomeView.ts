import BaseView from "../framework/viewbase/BaseView";



const {ccclass, property} = cc._decorator;

@ccclass
export default class GuideWelcomeView extends BaseView {
    @property(cc.Label)
    wordLabel: cc.Label = null;

    @property(cc.Node)
    btnNext: cc.Node = null;

    private wordsList: string[] = [
        "大家好！我是金沙古酒董事长李瑞杰，欢迎来到慎初烧坊！",
        "执一杯古酒，共话百年江湖。慎初烧坊历经岁月沉淀，携百年陈雅酱香秘方诚心而来，向世界发出最诚挚的邀请：一起进入慎初烧坊的奇幻国度，创造人生无限可能。",
        "奇幻之旅即将开启，如何在赤水河畔这片得天独厚的环境中，“炼”就慎初百年传奇，请听金沙古酒人娓娓道来——"
    ]
    private wordIndex = 0

    start() {
        super.start()
        this.startSpell()
    }
    startSpell() {
        this.btnNext.active = false
        this.wordLabel.string = ""
        this.schedule(this.onSpellWord, 0.04)
    }
    onSpellWord() {
        let fullWord = this.wordsList[this.wordIndex]
        let curWordIndex = this.wordLabel.string.length
        this.wordLabel.string = fullWord.substring(0, curWordIndex + 1)
        if(this.wordLabel.string.length >= fullWord.length) {
            this.unschedule(this.onSpellWord)
            this.btnNext.active = true
        }
    }
    onClickNext() {
        if(!this.btnNext.active) {
            this.unschedule(this.onSpellWord)
            this.wordLabel.string = this.wordsList[this.wordIndex]
            this.btnNext.active = true
            return
        }
        this.wordIndex += 1
        if(this.wordIndex >= this.wordsList.length) {
            this.onCloseView()
        } else {
            this.startSpell()
        }
    }
}