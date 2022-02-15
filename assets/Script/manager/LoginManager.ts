import { Config } from "../Constant/Config";
import { CustomEventEnum } from "../Constant/CustomEventEnum";
import { LoginState, ServerType } from "../Constant/GameEnum";
import UserDataManager from "../data/UserDataManager";
import { EventEnum } from "../framework/FrameWorkEnum";
import EventManager from "../framework/manager/EventManager";
import { NativeSock } from "../framework/network/NativeSock";
import { NetManager } from "../framework/network/NetManager";
import { NetNode } from "../framework/network/NetNode";
import { WebSock } from "../framework/network/WebSock";
import { GameMsgHelper } from "./GameMsgHelper";
let CryptoJS = require("CryptoJS")

export default class LoginManager {

    private static _instance: LoginManager;

    private loginCallback: Function = null;
    private isGateWay: boolean = false;
    private userLoginData: any = {}
    private userInfoData: any = {}

    constructor() {
        EventManager.instance.addEventListener(CustomEventEnum.NETWORK_CONNECTED, this.onNetWorkConnected, this)
        EventManager.instance.addEventListener("ZoneInfoListLoginUserPmd_S", this.onRspZoneList, this)
        EventManager.instance.addEventListener("UserLoginReturnOkLoginUserPmd_S", this.onRspGateWay, this)
        EventManager.instance.addEventListener("stUserInfoSelectUserCmd", this.onRspUserList, this)
        EventManager.instance.addEventListener("stLoginStepSelectUserCmd", this.onRspLoginStep, this)
        EventManager.instance.addEventListener("UserLoginReturnFailLoginUserPmd_S", this.onRspLoginFailed, this)
        EventManager.instance.addEventListener("TickRequestNullUserPmd_CS", this.onPingMsg, this)
        EventManager.instance.addEventListener("stCheckNameSelectUserCmd", this.onRspCheckName, this)
        EventManager.instance.addEventListener(CustomEventEnum.NETWORK_CLOSE, this.onNetWorkClose, this)
        
    }

    public static get instance(): LoginManager {
        if(this._instance == null) {
            this._instance = new LoginManager();
        }
        return this._instance;
    }
    
    public registerLoginCallback(callback: Function) {
        this.loginCallback = callback
    }

    public startLogin() {
        let netNode = new NetNode();
        let msgHelper = new GameMsgHelper(ServerType.Login)
        let sock = null;
        if(cc.sys.isNative) {
            sock = new NativeSock()
        } else {
            sock = new WebSock()
        }
        netNode.init(sock, msgHelper);
        NetManager.instance.setNetNode(netNode, 1);
        
        this.isGateWay = false
        if(cc.sys.isNative) {
            NetManager.instance.connect({
                host: "192.168.130.88",
                port: 7000,
            });
        } else {
            let serverUrl = Config.ServerUrl
            if(window.location.protocol == "https:") {
                serverUrl = Config.WssServerUrl
            }
            NetManager.instance.connect({url: serverUrl}, 1);
        }
    }

    onNetWorkConnected() {
        if(!this.isGateWay) {
            NetManager.instance.sendChannelMsg(1, "RequestZoneInfoListLoginUserPmd_C", {
                gameid: Config.GameId,
            })
        } else {
            EventManager.instance.dispatchEvent(EventEnum.HIDE_LOADING_EFFECT)
            
            let timeStamp = new Date().getTime()
            timeStamp = Math.floor(timeStamp / 1000)
            let data: any = {
                gameid: this.userLoginData.GameID,
                zoneid: this.userLoginData.ZoneId,
                accountid: this.userLoginData.AccountID,
                timestamp: timeStamp,
                version: Config.versionCode,
                logintempid: this.userLoginData.LoginTempID,
            }
            let md5Str = cc.js.formatStr("%s%s%s", this.userLoginData.AccountID, this.userLoginData.LoginTempID, data.timestamp);
            data.tokenmd5 = CryptoJS.MD5(md5Str).toString()
            NetManager.instance.sendMsg("UserLoginTokenLoginUserPmd_C", data)
        }
    }
    onRspZoneList(eventData: any) {
        if(!this.isGateWay) {
            let itemZone = eventData.zonelist[eventData.zonelist.length - 1] || {}
            this.userLoginData.ZoneId = Config.ZoneId || itemZone.zoneid || 1
            window["AppBridge"].login().then((loginInfo) => {
                NetManager.instance.sendChannelMsg(1, "AccountTokenVerifyLoginUserPmd_CS", {
                    account: loginInfo.userId,	// 平台账号
                    token: loginInfo.ticket,	// token 可以是第三方认证
                    version: Config.versionCode,// 当前客户端login版本号Version_Login
                    gameid: Config.GameId,
                    zoneid: this.userLoginData.ZoneId,
                    platid: loginInfo.platId ? loginInfo.platId : null,
                    password: loginInfo.password ? loginInfo.password : null
                })
                cc.sys.localStorage.setItem("LastAccount", loginInfo.userId)
            })
        }
    }
    onRspGateWay(eventData: any) {
        this.userLoginData.GameID = eventData.gameid;
        this.userLoginData.AccountID = eventData.accountid;
        this.userLoginData.LoginTempID = eventData.logintempid;
        this.userLoginData.Zoneuid = eventData.zoneuid;

        let ipPorts = eventData.gatewayurl.split(":");
        NetManager.instance.close(1000, "switch to gateway", 1)
        
        this.isGateWay = true

        let netNode = new NetNode();
        let msgHelper = new GameMsgHelper(ServerType.Gateway)
        let sock = null;
        if(cc.sys.isNative) {
            sock = new NativeSock()
        } else {
            sock = new WebSock()
        }
        netNode.init(sock, msgHelper);
        NetManager.instance.setNetNode(netNode, 0);

        if(cc.sys.isNative) {
            NetManager.instance.connect({
                host: ipPorts[0],
                port: parseInt(ipPorts[1]),
                heartTimeOut: 5,
                autoReconnect: -1,
            });
        } else {
            if(Config.UseNetWork == 2) {                
                let forwardServerUrl = Config.ForwardServerUrl
                if(window.location.protocol == "https:") {
                    forwardServerUrl = Config.WssForwardServerUrl
                }
                NetManager.instance.connect({
                    url: forwardServerUrl,
                    heartTimeOut: 5,
                    autoReconnect: 2,
                });
            } else {    
                let gatewayUrl = cc.js.formatStr("ws://%s:%s", ipPorts[0], ipPorts[1])  
                if(window.location.protocol == "https:") {
                    gatewayUrl = cc.js.formatStr("wss://%s:%s", ipPorts[0], ipPorts[1])
                }      
                NetManager.instance.connect({
                    url: gatewayUrl,
                    heartTimeOut: 5,
                    autoReconnect: 2,
                });
            }
        }
    }
    onRspUserList(eventData: any) {
        let userList = eventData.charInfo
        if(userList.length > 0) {
            let selectChar = userList[0]
            NetManager.instance.sendMsg("stLoginSelectUserCmd", {
                mapid: 1,
                charid: selectChar.id
            })
            UserDataManager.instance.initRole(selectChar)
        } else {
            // if(this.loginCallback) {
            //     this.loginCallback(LoginState.Create)
            //     this.loginCallback = null
            // }
            window["AppBridge"].getAppUserInfo().then((infoStr) => {
                this.userInfoData = JSON.parse(infoStr) || {}
                UserDataManager.instance.setAvatarUrl(this.userInfoData.avatar)
                NetManager.instance.sendMsg("stCheckNameSelectUserCmd", {
                    name: this.userInfoData.nick || this.userLoginData.AccountID.toString(),
                })
            })
        }
    }
    onRspCheckName(eventData: any) {
        if(!eventData.err_code) {
            UserDataManager.instance.clearGuideData()
            NetManager.instance.sendMsg("stCreateSelectUserCmd", {
                strUserName: this.userInfoData.nick || this.userLoginData.AccountID.toString(),
                type: this.userInfoData.gameRole?.roleId || 0,
                country: 3,
                wdFace: 1,
                dwMarket: ""
            }) 
        }
    }
    onRspLoginStep(eventData: any) {
        if(eventData.step == 6) {
            NetManager.instance.sendMsg("stClientFinishLoadingRequestUserCmd", {})
            this.onLoginFinished()

            if(this.loginCallback) {
                this.loginCallback(LoginState.Success)
                this.loginCallback = null
            }
        }
    }
    onLoginFinished() {
        //登录成功获取信息
        NetManager.instance.sendMsg("BuildingListBrewBuildingCmd_CS")
        NetManager.instance.sendMsg("stRequetListMailUserCmd")
        NetManager.instance.sendMsg("WeatherBrewUserCmd_CS")
        NetManager.instance.sendMsg("CellarBrewBuildingCmd_CS")
    }
    onRspLoginFailed(eventData: any) {
        if(this.loginCallback) {
            this.loginCallback(LoginState.Failed)
            this.loginCallback = null
        }
    }
    onNetWorkClose() {
        if(this.loginCallback) {
            this.loginCallback(LoginState.Failed)
            this.loginCallback = null
        }
    }
    onPingMsg(eventData: any) {
        NetManager.instance.sendMsg("TickReturnNullUserPmd_CS", {
            requesttime: eventData.requesttime,
            mytime: Math.floor(new Date().getTime() / 1000)
        })
    }
}