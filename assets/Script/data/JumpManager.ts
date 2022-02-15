import { CustomEventEnum } from "../Constant/CustomEventEnum";
import { CameraType, JumpType } from "../Constant/GameEnum";
import { PrefabPathEnum } from "../Constant/PrefabPathEnum";
import { EventEnum } from "../framework/FrameWorkEnum";
import EventManager from "../framework/manager/EventManager";
import CameraManager from "./CameraManager";
import NpcManager from "./npc/NpcManager";

export default class JumpManager {

    private static _instance: JumpManager = null;

    public static get instance(): JumpManager {
        if (this._instance == null) {
            this._instance = new JumpManager();
        }
        return this._instance;
    }

    constructor() {
        this.addNetListener()
    }

    addNetListener() {

    }

    jumpViewByType(jumpType,param?) {
        switch (jumpType) {
            case JumpType.Farm:
            case JumpType.Water:
            case JumpType.ZhiQu:
            case JumpType.KaoJiu:
            case JumpType.JiuCang:
            case JumpType.Wine:
            case JumpType.JiaoChi:
                //地图移动到指定建筑  并打开界面
                EventManager.instance.dispatchEvent(CustomEventEnum.JumpBuildingView, { buildingType: jumpType })
                break
            case JumpType.Laborary:
                //打开配方研究界面
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                    viewName: PrefabPathEnum.FormulaView
                })
                break
            case JumpType.Personal:
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                    viewName: PrefabPathEnum.PersonalView
                })
                break
            case JumpType.Shop:
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                    viewName: PrefabPathEnum.StaffRecruitView
                })
                break
            case JumpType.Friend:
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                    viewName: PrefabPathEnum.FriendView
                })
                break
            case JumpType.Mail:
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                    viewName: PrefabPathEnum.MailView
                })
                break
            case JumpType.Staff:
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                    viewName: PrefabPathEnum.StaffListView
                })
                break
            case JumpType.Market:
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                    viewName: PrefabPathEnum.HotSpringView
                })
                break
            case JumpType.CaiQuGame:
                //地图移动到指定建筑  并打开界面
                EventManager.instance.dispatchEvent(CustomEventEnum.JumpBuildingView, { buildingType: JumpType.ZhiQu })
                break
            case JumpType.DaGaoLiang:
                //地图移动到指定建筑  并打开界面
                EventManager.instance.dispatchEvent(CustomEventEnum.JumpBuildingView, { buildingType: JumpType.Farm })
                break
            case JumpType.Winery:
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                    viewName: PrefabPathEnum.StoreView
                })
                break
            case JumpType.HotSpring:
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                    viewName: PrefabPathEnum.HotSpringView
                })
                break
            case JumpType.Party: //社交-宴会
                window["AppBridge"].jumpBanquet()
                break
            case JumpType.News:
                // EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                //     msg: "暂不支持跳转到消息~"
                // })
                //社交-消息
                break
            case JumpType.NPC:

                if(param && param.npcId)
                {
                    let position = NpcManager.instance.getNpcPosition(param.npcId)
                    position && CameraManager.instance.getCameraInstance(CameraType.Map).moveCanmeraTo(position)
                }

                break
            default:
                console.error("JumpManager jumpViewByType jumpType", jumpType, "is no support!")
        }
    }

    reset() {
        EventManager.instance.removeTargetListener(this);
    }
}