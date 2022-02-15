
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HotSpringView extends BaseView {
    @property(cc.Sprite)
    projectIcon: cc.Sprite = null
    @property(cc.Label)
    projectName: cc.Label = null
    @property(cc.Label)
    priceLabel: cc.Label = null

    @property(cc.Label)
    dateLabel: cc.Label = null
    @property(cc.Node)
    projectParent: cc.Node = null
    @property(cc.Node)
    projectItemPre: cc.Node = null;

    @property(cc.EditBox)
    numEdit: cc.EditBox = null;
    @property(cc.Label)
    costLabel: cc.Label = null

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
    private curSelectTime: number;
    start() {
        this.updateProject()
        this.updateDate(new Date().getTime())
    }
    updateDate(curSelectTime) {
        this.curSelectTime = curSelectTime
        this.dateLabel.string = Tool.formatDate("yyyy-MM-dd", this.curSelectTime)
    }
    updateProject() {
        let itemData = this.TestProjectList[this.projectIndex]
        this.projectName.string = itemData.name
        this.priceLabel.string = "" + itemData.price
        this.updateProjectItems(itemData.projects)
        this.updateCost()
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
    updateCost() {
        let itemData = this.TestProjectList[this.projectIndex]
        let price = itemData.price
        let inputNum = parseInt(this.numEdit.string)
        inputNum = Math.max(1, inputNum)

        this.costLabel.string = cc.js.formatStr("%s", price * inputNum)
    }

    onClickProjectPre() {
        this.projectIndex -= 1
        if(this.projectIndex < 0) {
            this.projectIndex = this.TestProjectList.length - 1
        }
        this.updateProject()
    }
    onClickProjectNext() {
        this.projectIndex += 1
        if(this.projectIndex >= this.TestProjectList.length) {
            this.projectIndex = 0
        }
        this.updateProject()
    }

    onClickCalendar() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.HotSpringCalendar,
            exData: {
                curSelectTime: this.curSelectTime,
                selectCallback: this.updateDate.bind(this)
            }
        })
        
    }
    onClickNumSub() {
        let inputNum = parseInt(this.numEdit.string)
        inputNum -= 1
        inputNum = Math.max(1, inputNum)
        this.numEdit.string = "" + inputNum
        this.updateCost()
    }
    onClickNumAdd() {
        let inputNum = parseInt(this.numEdit.string)
        inputNum += 1
        inputNum = Math.max(1, inputNum)
        this.numEdit.string = "" + inputNum
        this.updateCost()
    }
    onEditNumEnd() {
        let inputNum = parseInt(this.numEdit.string)
        inputNum = Math.max(1, inputNum)
        this.numEdit.string = "" + inputNum
        this.updateCost()
    }
    onClickBuy() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.HotSpringResult,
            exData: {
                time: this.curSelectTime,
                project: this.projectIndex,
                num: parseInt(this.numEdit.string),
                code: Math.random().toString(36).slice(2),                
            }
        })
    }
}