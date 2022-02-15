import { Config } from "../../Constant/Config";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import EventManager from "../../framework/manager/EventManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import BuildingDataManager from "../../data/BuildingDataManager";
import { BuildingType, JumpType } from "../../Constant/GameEnum";
import TargetWineDataManager from "../../data/TargetWineDataManager";
import UserDataManager from "../../data/UserDataManager";
import { Tool } from "../../framework/manager/Tool";
import ParamConfig from "../../config/ParamConfig";
import WeatherConfig from "../../config/WeatherConfig";
import MailDataManager from "../../data/MailDataManager";
import RandomEventManager from "../../data/npc/RandomEventManager";
import JumpManager from "../../data/JumpManager";
import { NetManager } from "../../framework/network/NetManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class HallUILayer extends cc.Component {

    @property(cc.Node)
    debugBtn: cc.Node = null

    @property(cc.Node)
    targetProcessBtn: cc.Node = null

    @property(cc.Label)
    timeLabel: cc.Label = null
    @property(cc.Label)
    dayLabel: cc.Label = null
    @property(cc.Label)
    dateLabel: cc.Label = null
    @property(cc.Label)
    temperatureLabel: cc.Label = null
    @property(sp.Skeleton)
    weatherSpine: sp.Skeleton = null

    @property(cc.Node)
    mailRedDot: cc.Node = null;

    @property(cc.Node)
    btnRandomEvent: cc.Node = null;
    @property(cc.Node)
    btnList: cc.Node = null;

    @property(cc.Node)
    weatherEffectList: cc.Node[] = [];
    private curWeather = 0;

    //晴天sunny、阴天overcast、多云cloudy、雨天rain、下雪snow		
    private weatherAnimationNames: string[] = ["qingtian", "yintian", "duoyun", "yutian", "xuetian"]

    onLoad() {
        this.debugBtn.active = CC_DEBUG
    }

    onEnable() {
        EventManager.instance.addEventListener("WeatherBrewUserCmd_SC", this.updateWeather, this)
        this.schedule(this.reqWeather, 5 * 60)
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    start() {
        this.addListener()
        this.onUpdateGather()

        this.updateTime()
        this.updateWeather()

        this.onCheckMailRedDot()
    }

    updateTime() {
        let gameTime = UserDataManager.instance.getGameTime()
        gameTime = gameTime * 1000

        this.timeLabel.string = Tool.formatDate("HH:mm", gameTime)
        this.dayLabel.string = Tool.formatDate("d", gameTime)
        this.dateLabel.string = Tool.formatDate("yyyy.MM", gameTime)

    }
    reqWeather() {
        NetManager.instance.sendMsg("WeatherBrewUserCmd_CS")
    }
    updateWeather() {
        let curWeatherData = UserDataManager.instance.getWeatherData()
        this.temperatureLabel.string = cc.js.formatStr("%s℃", curWeatherData.temperature || 0)
        let weatherId = parseInt(curWeatherData.wid || 0)
        //晴天sunny、阴天overcast、多云cloudy、雨天rain、下雪snow
        //https://www.juhe.cn/docs/api/id/73 天气种类
        let weatherMap = [
            0, 2, 1, 3, 3, 3, 4, 3, 3, 3, //0-9
            3, 3, 3, 4, 4, 4, 4, 4, 1, 3, //10-19
            1, 3, 3, 3, 3, 3, 4, 4, 4, 1, //20-29
            1, 1
        ]
        let curWeather = 1
        if (weatherId < weatherMap.length) {
            curWeather = weatherMap[weatherId]
        }
        this.weatherSpine.setAnimation(0, this.weatherAnimationNames[curWeather], true)
        for (let i = 0; i < this.weatherEffectList.length; i++) {
            let itemEffect = this.weatherEffectList[i]
            if (itemEffect) {
                itemEffect.active = (i == curWeather)
            }
        }
    }
    addListener() {
        EventManager.instance.addEventListener("GatherBrewBuildingCmd_SC", this.onUpdateGather, this)
        EventManager.instance.addEventListener(CustomEventEnum.TARGET_SET_WINE, this.onUpdateGather, this)
        EventManager.instance.addEventListener(CustomEventEnum.MAIL_UPDTAE_VIEW, this.onCheckMailRedDot, this)
        EventManager.instance.addEventListener(CustomEventEnum.RANDOM_EVENT_UPDTAE, this.onCheckRandomEvent, this)
    }

    onCheckMailRedDot() {
        this.mailRedDot.active = MailDataManager.instance.checkRedDot()
    }

    onCheckRandomEvent() {
        let list = RandomEventManager.instance.getNpcEventList()
        this.btnRandomEvent.active = list.length > 0
    }

    onUpdateGather() {
        let targetWineId = TargetWineDataManager.instance.getTargetWineId()
        this.targetProcessBtn.active = targetWineId > 0
    }

    onClickRandomEvent() {
        let list = RandomEventManager.instance.getNpcEventList()
        if (list.length > 0) {

            JumpManager.instance.jumpViewByType(JumpType.NPC, {
                npcId: list[0].npcId
            })

            //展示npc对话界面
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.RandomEventView,
                exData: {
                    npcId: list[0].npcId,
                    callback: null
                }
            })

            // EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            //     viewName: PrefabPathEnum.NpcTabInfoView,
            //     exData: {
            //         npcId: list[0].npcId,
            //         openEvent: true
            //     }
            // })
        }
    }

    onClickSettingBtn() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.SettingView,
        })
    }
    onClickBagBtn() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.BagView,
        })
    }

    onClickFriendBtn() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.FriendView,
        })
    }

    onClickTargetSelect() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.BuildingTargetWineSelect
        })
    }

    onClickTargetProcess() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.BuildingTargetWineProcess
        })
    }

    onClickMail() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.MailView
        })
    }
    onClickRecruit(event) {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.StaffRecruitView
        })
    }

    onClickStaff(event) {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.StaffListView
        })
    }
    onClickMarket(event) {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.StoreView
        })
        // EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
        //     viewName: PrefabPathEnum.MarketView
        // })
    }
    //温泉
    onClickHotSpring(event) {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.HotSpringView
        })
    }
    //酒庄
    onClickWinery(event) {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "敬请期待"
        })
    }
    //婚姻登记处
    onClickMarry(event) {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.MarriageBuilding
        })
    }
    //售楼中心
    onClickSaleCenter(event) {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.BuildingTargetHouse
        })
    }
    //孩子
    onClickChild(event) {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.MarriageChildren
        })
    }
    //天气
    onClickWeather() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.WeatherView
        })
    }
    onClickWorldMap(event) {
        cc.director.loadScene("WorldMapScene")
    }

    onClickDebug() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.DebugView
        })
    }
    onOpenBtnPanel() {
        let children = this.btnList.children
        for (let i = 2, len = children.length - 1; i < len; i++) {
            children[i].active = true
        }
        children[children.length - 1].active = false //open btn
    }
    onCloseBtnPanel() {
        let children = this.btnList.children
        for (let i = 2, len = children.length - 1; i < len; i++) {
            children[i].active = false
        }
        children[children.length - 1].active = true //open btn
    }
    onDestroy() {
        EventManager.instance.removeTargetListener(this)
    }
}