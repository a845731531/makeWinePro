
import PropConfig from "../config/PropConfig";
import { Config } from "../Constant/Config";
import { CustomEventEnum } from "../Constant/CustomEventEnum";
import { BuildingType, ItemType } from "../Constant/GameEnum";
import { PrefabPathEnum } from "../Constant/PrefabPathEnum";
import BagDataManager from "../data/BagDataManager";
import BuildingDataManager from "../data/BuildingDataManager";
import { EventEnum } from "../framework/FrameWorkEnum";
import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
import TaskDataManager from "../data/task/TaskDataManager";

/**
 * 弹窗管理系统
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class ScheduleManager extends cc.Component {


    start() {
        // this.schedule(this.checkDayRefresh, 5)
        // this.schedule(this.saveUserData, 5)
    }

    saveUserData() {
        EventManager.instance.dispatchEvent(CustomEventEnum.ARCHIVE_SAVE_DATA, null)
    }

    checkDayRefresh() {
        TaskDataManager.instance.checkRefresh()
    }
}
