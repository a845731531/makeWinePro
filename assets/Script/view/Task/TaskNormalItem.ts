import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { ItemType, TaskState } from "../../Constant/GameEnum";
import SignManager from "../../data/sign/SignManager";
import TaskData from "../../data/task/TaskData";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";

/**
 * 任务 item脚本
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class TaskNormalITem extends cc.Component {

    @property(cc.Sprite)
    itemIcon: cc.Sprite = null;

    @property(cc.Sprite)
    qualityIcon: cc.Sprite = null;

    @property(cc.Sprite)
    framIcon: cc.Sprite = null;

    @property(cc.Label)
    txtNum: cc.Label = null;

    @property(cc.Label)
    txtDesc: cc.Label = null;

    @property(cc.Label)
    txtProgress: cc.Label = null;

    @property(cc.Node)
    progressNode: cc.Node = null;

    @property(cc.Button)
    btnGet: cc.Button = null;

    @property(cc.Label)
    txtGet: cc.Label = null;

    private data: TaskData = null

    onLoad() {
        this.addListener()
    }

    updateView(data: TaskData) {

        this.data = data

        //奖励
        this.qualityIcon.node.active = false
        if (data.itemType == ItemType.COIN || data.itemType == ItemType.DIAMOND) {
            this.txtNum.string = "x" + data.itemCount
            Tool.loadSpriteFrame(cc.js.formatStr("texture/common/quality_word_%d", data.itemQuality), this.qualityIcon)
        } else {
            this.qualityIcon.node.active = true
            this.txtNum.string = data.itemName
        }
        Tool.loadSpriteFrame(cc.js.formatStr("texture/bag/icon_border_%d", data.itemQuality), this.framIcon)
        Tool.loadSpriteFrame(data.itemIcon, this.itemIcon)

        //任务
        this.txtDesc.string = data.desc
        this.txtProgress.string = data.curProgress + "/" + data.totalProgress
        this.progressNode.width = 316 * data.curProgress / data.totalProgress

        this.btnGet.interactable = data.state != TaskState.UnReceive 
        this.txtGet.string = data.state != TaskState.Doing? "领取" : "前往"
    }

    onClickGet()
    {
        if(this.data.state == TaskState.Doing)
        {
            EventManager.instance.dispatchEvent(CustomEventEnum.TASK_ADD_POR,{
                taskSubType: this.data.subType,
                count: 100
            })
        }else if(this.data.state == TaskState.Complete){
            EventManager.instance.dispatchEvent(CustomEventEnum.TASK_GET_REWARD,{
                taskId: this.data.id,
            })
        }
    }

    addListener() {

    }

    removeListener() {

    }

    onDestroy() {
        this.removeListener()
    }


}
