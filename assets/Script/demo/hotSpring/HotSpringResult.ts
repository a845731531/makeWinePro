import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HotSpringResult extends BaseView {
    
    @property(cc.Sprite)
    projectIcon: cc.Sprite = null
    @property(cc.Label)
    projectName: cc.Label = null

    @property(cc.Label)
    dateLabel: cc.Label = null
    @property(cc.Label)
    numLabel: cc.Label = null

    @property(cc.Label)
    codeLabel: cc.Label = null

    @property(cc.Node)
    projectParent: cc.Node = null
    @property(cc.Node)
    projectItemPre: cc.Node = null;

    private TestProjectList = [
        {
            name: "精华1日游",
            price: 99,
            projects: [1,1,1,0,0],
        },
        {
            name: "豪华3日游",
            price: 199,
            projects: [1,3,3,4,0],
        },
        {
            name: "5日畅游",
            price: 299,
            projects: [1,5,5,12,1],
        },
    ]
    private projectIndex: number = 0
    private curSelectTime: number = 0;
    private ticketNum: number = 0
    private codeStr: string = "";

    initByExData(exData: any): void {
        this.curSelectTime = exData.time
        this.projectIndex = exData.project
        this.codeStr = exData.code
        this.ticketNum = exData.num

        this.updateView()
    }
    updateView() {
        this.dateLabel.string = Tool.formatDate("yyyy-MM-dd", this.curSelectTime)
        this.numLabel.string = "" + this.ticketNum
        this.codeLabel.string =  this.codeStr
        
        let itemData = this.TestProjectList[this.projectIndex]
        this.projectName.string = itemData.name
        this.updateProjectItems(itemData.projects)
    }
    updateProjectItems(projectList) {
        this.projectParent.removeAllChildren()
        for(let i = 0; i < projectList.length; i++) {
            let value = projectList[i]
            if(value > 0) {
                let itemNode: any = cc.instantiate(this.projectItemPre)
                itemNode.parent = this.projectParent
                itemNode.active = true
                let descLabel = itemNode.projectLabel
                let numLabel = itemNode.numLabel
                switch(i) {
                    case 0:
                        descLabel.string = "豪华温泉",
                        numLabel.string = "无限制入场"
                        break
                    case 1:
                        descLabel.string = "豪华自助餐饮",
                        numLabel.string = cc.js.formatStr("x%s天", value)
                        break
                    case 2:
                        descLabel.string = "2小时鱼疗",
                        numLabel.string = cc.js.formatStr("x%s次", value)
                        break
                    case 3:
                        descLabel.string = "KTV豪华包间",
                        numLabel.string = cc.js.formatStr("x%s小时", value)
                        break
                    case 4:
                        descLabel.string = "特技表演门票",
                        numLabel.string = "免费赠送"
                        break
                }
            }
        }
    }
    onClickCopy() {        
        if(Tool.webCopyString(this.codeStr))
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "复制成功"
            })
        }
    }
}