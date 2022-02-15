import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { TaskType } from "../../Constant/GameEnum";
import { TaskData } from "../../data/DataInterface";
import TaskDataManager from "../../data/task/TaskDataManager";
import List from "../../framework/component/List";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";
import TaskNormalITem from "./TaskNormalItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskView extends BaseView {
    @property(cc.Node)
    dailyTaskNode: cc.Node = null;

    @property(List)
    taskListView: List = null;


    private curType: TaskType = TaskType.Main
    private taskList: TaskData[] = []
    

    start () {
        this.updateView()
    }


    updateView()
    {
        this.taskList = TaskDataManager.instance.getTaskList(this.curType)
        this.taskListView.numItems = this.taskList.length 

        this.dailyTaskNode.active = (this.curType == TaskType.Daily)
        if(this.dailyTaskNode.active) {
            this.taskListView.node.height = (this.taskListView.node.parent.height - this.dailyTaskNode.height)
            this.taskListView.node.active = false
            this.taskListView.node.active = true
        } else {
            this.taskListView.node.height = this.taskListView.node.parent.height
            this.taskListView.node.active = false
            this.taskListView.node.active = true
        }
    }

    onRenderEvent(item: cc.Node, index: number) {
        item.getComponent("TaskItem").updateView(this.taskList[index])
    }

    onSelectToggle(toggle, customData)
    {
        this.curType = parseInt(customData)
        this.updateView()
    }
}
