import TaskConfig from "../../config/TaskConfig";
import { TaskState } from "../../Constant/GameEnum";
import List from "../../framework/component/List";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskItem extends cc.Component {

    @property(cc.Label)
    titleLabel: cc.Label = null;
    @property(cc.Label)
    descLabel: cc.Label = null;
    @property(cc.Label)
    progressLabel: cc.Label = null;

    @property(cc.Node)
    btnGo: cc.Node = null;
    @property(cc.Node)
    btnGet: cc.Node = null;

    @property(cc.Node)
    rewardParent: cc.Node = null;
    @property(cc.Prefab)
    rewardPre: cc.Prefab = null;

    private curData = null;

    updateView(taskData)
    {
        this.curData = taskData
        let itemTask = TaskConfig[taskData.taskId]
        this.titleLabel.string = itemTask.name
        this.descLabel.string = itemTask.desc

        let totalProgress = itemTask.targetParam
        this.progressLabel.string = cc.js.formatStr("%s/%s", taskData.progress, totalProgress)

        this.rewardParent.removeAllChildren()
        let rewardList = Tool.convertStrToList(itemTask.rewards)
        for(let i = 0, len = rewardList.length; i < len; i++) {
            let itemReward = rewardList[i]
            let itemNode = cc.instantiate(this.rewardPre)
            itemNode.parent = this.rewardParent
            let itemScript = itemNode.getComponent("BagItemView")
            itemScript.updateView({
                propId: itemReward.propId,
                customNum: itemReward.num
            })
        }
        this.btnGo.active = false
        this.btnGet.active = false
        if(taskData.state == TaskState.Complete) {
            this.btnGet.active = true
        } else {
            this.btnGo.active = true
        }
    }

    onClickGo()
    {

    }
    onClickGet()
    {

    }
}
