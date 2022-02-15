import ParamConfig from "../config/ParamConfig";
import PlayerLevelConfig from "../config/PlayerLevelConfig";
import { CustomEventEnum } from "../Constant/CustomEventEnum";
import { MoneyPropId, SexType } from "../Constant/GameEnum";
import { EventEnum } from "../framework/FrameWorkEnum";
import GuideManager from "../framework/guide/GuideManager";
import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
import { NetManager } from "../framework/network/NetManager";
import BaseDataManager from "./BaseDataManager";
import { UserData } from "./DataInterface";

export default class UserDataManager extends BaseDataManager {
    static getWeatherData(arg0: string, getWeatherData: any) {
        throw new Error("Method not implemented.");
    }
    private static _instance: UserDataManager = null;
    private data: UserData;
    private identifyId = 1;
    private startServerTime = null;
    private clanData: any = {}
    private weatherData: any = {}

    private finishedGuideIds: number[] = []
    private timeOffset: number = 0;  //本地时间和服务器时间的差值

    public static get instance(): UserDataManager {
        if (this._instance == null) {
            this._instance = new UserDataManager();
        }
        return this._instance;
    }

    constructor() {
        super();
        //TODO

        let finishedGuideIds = JSON.parse(cc.sys.localStorage.getItem("FinishedGuideIds") || "[]")
        for(let i = 0, len = finishedGuideIds.length; i < len; i++) {
            this.finishedGuideIds.push(parseInt(finishedGuideIds[i]))
        }
        GuideManager.instance.setGuideFinishedIdList(this.finishedGuideIds)
        
        this.data = {
            userId: 1,
            name: "慎初烧坊",
            sex: SexType.Man,
            talent: 1,
            exp: 0,
            level: 1,
            coin: 0,
            diamond: 0,
            avatarUrl: "",
        }
        this.clanData = {
            clanId: 100,
            clanName: "慎初天地会",
            clanTitle: 1,
        }
        this.reset();
    }

    init() {
        super.init()
    }

    reset() {
        super.reset()
    }
    addNetListener() {
        EventManager.instance.addEventListener("stRefreshMoneyPropertyUserCmd", this.onNtfMoneyChanged, this, -1)
        EventManager.instance.addEventListener("TickReturnNullUserPmd_CS", this.onHeartTime, this, -1)
        EventManager.instance.addEventListener("WeatherBrewUserCmd_SC", this.onRspWeather, this, -1)
        EventManager.instance.addEventListener("JumpAppGuide", this.onJumpAppGuide, this, -1)
        EventManager.instance.addEventListener("ClearGuideData", this.onClearGuideData, this, -1)
        EventManager.instance.addEventListener("NewcomerFinishBrewUserCmd_SC", this.onClearDataFinished, this, -1)
        EventManager.instance.addEventListener(EventEnum.GUIDE_FINISHED, this.onFinishGuide, this, -1)

    }
    initRole(roleData) {
        this.data.userId = roleData.id
        this.data.name = roleData.name
        this.data.sex = roleData.face
        this.data.talent = roleData.type
    }
    onFinishGuide(guideId) {
        this.finishedGuideIds.push(guideId)
        cc.sys.localStorage.setItem("FinishedGuideIds", JSON.stringify(this.finishedGuideIds))
    }
    clearGuideData() {
        this.finishedGuideIds = []
        cc.sys.localStorage.setItem("FinishedGuideIds", JSON.stringify(this.finishedGuideIds))
        GuideManager.instance.setGuideFinishedIdList(this.finishedGuideIds)
    }
    onHeartTime(eventData) {
        this.timeOffset = eventData.mytime - eventData.requesttime 
    }

    getTotalMaxExp() {
        let exp = 0
        for (let i in PlayerLevelConfig) {
            exp += PlayerLevelConfig[i].exp
        }
        return exp
    }

    getCurMaxExp() {
        let curExp = 999999999
        try {
            curExp = PlayerLevelConfig[this.getUserLevel()].exp
        } catch {

        }
        return curExp
    }

    getMaxUserLevel() {
        let level = 0
        for (let i in PlayerLevelConfig) {
            level++
        }
        return level
    }

    getUserLevel() {
        return this.data.level || 1
    }

    getUserExp() {
        return this.data.exp || 0
    }

    getUserName() {
        return this.data.name || "玩家";
    }
    getUserId() {
        return this.data.userId || 0;
    }
    getSex() {
        return this.data.sex || SexType.Man
    }
    setAvatarUrl(avatarUrl) {
        this.data.avatarUrl = avatarUrl
    }
    getAvatarUrl() {
        return this.data.avatarUrl || cc.js.formatStr("texture/staff/roleicon_%s", this.data.sex)
    }
    //获取当前服务器时间，秒
    getCurTime() {
        return Math.floor(new Date().getTime() / 1000) + this.timeOffset
    }
    getGameTime() {        
        let curTime = UserDataManager.instance.getCurTime()
        if(this.startServerTime == null) {
            this.startServerTime = curTime - Tool.getRandomLimit(10000, 30000)
        }
        let gamePassedTime = (curTime - this.startServerTime) * Tool.getNumberParamConfig("virtualTime")
        let gameStartTime = -1546329600
        let gameTime = gameStartTime + gamePassedTime
        return gameTime
    }

    getCoinNum() {
        return this.data.coin
    }
    getDiamondNum() {
        return this.data.diamond
    }
    setCoinNum(value) {
        this.data.coin = value
        EventManager.instance.dispatchEvent(CustomEventEnum.COIN_NUM_CHANGED, null)
    }
    setDiamondNum(value) {
        this.data.diamond = value
        EventManager.instance.dispatchEvent(CustomEventEnum.DIAMOND_NUM_CHANGED, null)
    }
    getClanId() {
        return this.clanData.clanId
    }
    getClanName() {
        return this.clanData.clanName
    }
    getClanTitle() {
        return this.clanData.clanTitle
    }
    getWeatherData() {
        return this.weatherData
    }

    getIdentifyId() {
        let identifyId = this.identifyId
        this.identifyId += 1
        return identifyId
    }
    onNtfMoneyChanged(eventData) {
        if (eventData.type == 2) {
            this.setDiamondNum(eventData.dwNum)     
        }
    }
    onRspWeather(serverData) {

        cc.log("看下",serverData)
        cc.log("看下",serverData.weather_json)
        this.weatherData = JSON.parse(serverData.weather_json) || {}
    }

    onJumpAppGuide(guideId) {
        window["AppBridge"].guideForward(parseInt(guideId))
    }
    onClearGuideData() {
        NetManager.instance.sendMsg("NewcomerFinishBrewUserCmd_CS")
        //TODO 清空数据
        // this.setDiamondNum(0)
        // EventManager.instance.dispatchEvent("stAddItemListPropertyUserCmd", {
        //     itemList: []
        // })
        
    }
    onClearDataFinished() {
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "ClearGuideDataSuccess"
        })
    }
}