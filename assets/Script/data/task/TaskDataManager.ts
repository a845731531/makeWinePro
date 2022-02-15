import { NetMsgDef } from "../../../resources/pb/NetMsgDef";
import TaskConfig from "../../config/TaskConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { TaskState, TaskType } from "../../Constant/GameEnum";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BagDataManager from "../BagDataManager";
import BaseDataManager from "../BaseDataManager";
import { TaskData } from "../DataInterface";
import UserDataManager from "../UserDataManager";

export default class TaskDataManager extends BaseDataManager {
    private static _instance: TaskDataManager = null;

    public static get instance(): TaskDataManager {
        if (this._instance == null) {
            this._instance = new TaskDataManager();
        }
        return this._instance;
    }

    private taskList: {[taskId: number]: TaskData} = {}
    private lastRefreshTime = 0

    constructor() {
        super()
        this.reset();
        this.addNetListener();
    }
    
    reset() {
        EventManager.instance.removeTargetListener(this);
    }
    addNetListener() {
        //----------监听服务器返回-------------//
        EventManager.instance.addEventListener(NetMsgDef.Task_RSP_TASK_LIST, this.onRspTaskList, this, -1)
        EventManager.instance.addEventListener(NetMsgDef.Task_NTF_TASK_REFRESH, this.onNtfTaskRefresh, this, -1)
        EventManager.instance.addEventListener(NetMsgDef.Task_RSP_GET_REWARD, this.onRspTaskGetReward, this, -1)
        //----------监听服务器返回-------------//
    }
    checkRefresh() {
        let curTime = UserDataManager.instance.getCurTime()
        if(this.lastRefreshTime == 0 || !Tool.checkIsSameDay(curTime, this.lastRefreshTime)) {            
            this.reqTaskList()
        }
    }

    private reqTaskList() {
        NetManager.instance.sendMsg(NetMsgDef.Task_REQ_TASK_LIST, {})

        this.onTestRefreshTask() //TODO
    }

    private isActive(activateConditon) { //TODO激活条件
        let conditions = activateConditon.split("_")
        return parseInt(conditions[0]) == 0
    }
    onTestRefreshTask() {
        let taskList : TaskData[] = []
        //重置日常任务
        for(let taskId in TaskConfig) {
            let itemConfig = TaskConfig[taskId]
            let activateConditon = itemConfig.activateConditon
            if (!this.isActive(activateConditon)) { 
                continue
            }
            if(itemConfig.taskType == TaskType.Daily) {
                taskList[taskId] = {
                    taskId: parseInt(taskId),
                    state: itemConfig.isAutoReceive ? TaskState.UnReceive : TaskState.Doing,
                    progress: 0,
                }
            } else {
                let oldData = this.taskList[taskId]
                if(oldData) {
                    taskList[taskId] = oldData
                } else {
                    taskList[taskId] = {
                        taskId: parseInt(taskId),
                        state: itemConfig.isAutoReceive ? TaskState.UnReceive : TaskState.Doing,
                        progress: 0,
                    }
                }
            }
        }
        EventManager.instance.dispatchEvent(NetMsgDef.Task_RSP_TASK_LIST, {
            taskList: taskList
        })
    }

    /**
     * 返回 任务数据
     */
     onRspTaskList(serverData) {
        this.taskList = {}
        for(let taskId in serverData.taskList) {
            let itemData = serverData.taskList[taskId]
            this.taskList[taskId] = itemData
        }
        let curTime = UserDataManager.instance.getCurTime()
        this.lastRefreshTime = curTime
    }

    /**
     * 根据任务类型获取任务列表
     * @param type 任务类型
     * @returns 
     */
    getTaskList(type: TaskType) {     
        let taskList = []   
        for(let taskId in this.taskList) {
            let itemData = this.taskList[taskId]
            let itemConfig = TaskConfig[itemData.taskId]
            if(itemConfig.taskType == type) {
                taskList.push(itemData)
            }
        }
        return taskList
    }


    /**
     * 返回 领取任务奖励
     * @param param 
     */
    onRspTaskGetReward(param) {
        
    }

    onNtfTaskRefresh(serverData) {
        for(let i = 0, len = serverData.taskList.length; i < len; i++) {
            let itemData = serverData.taskList[i]
            let isExist = false
            let oldData = this.taskList[itemData.taskId]
            if(oldData) {
                if(itemData.progress != null) {
                    oldData.progress = itemData.progress
                }
                if(itemData.state != null) {
                    oldData.state = itemData.state
                }
            } else {
                this.taskList[itemData.taskId] = itemData
            }
        }
    }
}