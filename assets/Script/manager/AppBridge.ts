import { Config } from "../Constant/Config"
import { CustomEventEnum } from "../Constant/CustomEventEnum"
import { ChatMessageType } from "../Constant/GameEnum"
import { EventEnum } from "../framework/FrameWorkEnum"
import EventManager from "../framework/manager/EventManager"


let AppBridge = {

    callbackMap: {},

    //ios回调
    getMessage(key, value) {
        console.log(key, value, typeof(key), typeof(value))
        if(AppBridge.callbackMap[key]) {
            AppBridge.callbackMap[key](value)
        }
    },
    callFunc(funcName: string, callbackKey: string = '', params) {
        return new Promise((resolve, reject) => {
            if(cc.sys.os == cc.sys.OS_ANDROID) {
                if(window['androidJsObj'] && window['androidJsObj'][funcName]) {
                    if(params == null) {
                        resolve(window['androidJsObj'][funcName]())
                    } else {
                        resolve(window['androidJsObj'][funcName](params))
                    }
                }
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                if(window['webkit'] && window['webkit'].messageHandlers[funcName]) {
                    if(callbackKey != '') {
                        this.callbackMap[callbackKey] = resolve
                    }
                    window['webkit'].messageHandlers[funcName].postMessage(params)
                    if(callbackKey == '') {
                        resolve(null)
                    }
                }
            } else {
                resolve(null)
            }
        })
    },

    //获取社交用户信息
    getAppUserInfo() {
        return this.callFunc("getAppUserInfo", "userInfo")
    },
    getUid() {
        return this.callFunc("getUid", "uid")
    },
    getTicket() {
        return this.callFunc("getTicket", "ticket")
    },
    getGuildInfo() {
        return this.callFunc("getGuildInfo", "guildInfo")
    },
    //登录获取accountId、token、platid
    login() {
        return this.callFunc("getAuthInfo", "authInfo").then((resultJson)=> {
            console.log("getAuthInfo", resultJson)
            let authInfo = resultJson || ""
            if(typeof(authInfo) == "string"){
                authInfo = JSON.parse(resultJson) || {}
            } 
            let lastAccount = cc.sys.localStorage.getItem("LastAccount") || Config.Account
            return {
                userId: "" + (authInfo.account || lastAccount),
                ticket: "" + (authInfo.ticket || (lastAccount + "token")),
                platId: parseInt(authInfo.platid || "0"),
                password: authInfo.platid ? "h5version" : ""
            }
        })
    },
    //聊天发送消息
    sendChatMessage(messageData) {
        if(cc.sys.os == cc.sys.OS_ANDROID) {
            if(window['androidJsObj'] && window['androidJsObj'].sendChatMsg) {
                window['androidJsObj'].sendChatMsg(JSON.stringify(messageData))
            }
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            if(window['webkit'] && window['webkit'].messageHandlers.sendChatMsg) {
                window['webkit'].messageHandlers.sendChatMsg.postMessage(messageData)
            }
        }
    },
    //新手引导，2 -- 房间送礼引导流程
    guideForward(guideType) {
        if(cc.sys.os == cc.sys.OS_WINDOWS) {
            this.onFinishedGuideForward(guideType)
        } else {
            this.callFunc("guideForward", '', guideType)
        }
    },
    //跳转玩家信息
    jumpUserInfo( targetUid) {
        this.callFunc("jumpUserInfo", '', targetUid)
    },

    //跳转宴会
    jumpBanquet() {
        this.callFunc("jumpBanquet")
    },
    //侧滑栏
    showDrawer() {
        this.callFunc("showDrawer")
    },
    //跳转公会
    jumpGuild() {
        this.callFunc("jumpGuild")
    },
    //显示商品详情
    showProductDetails(produceId) {
        if(cc.sys.os == cc.sys.OS_ANDROID) {
            if(window['androidJsObj'] && window['androidJsObj'].showProductDetails) {
                window['androidJsObj'].showProductDetails(produceId)
            }
        }
    },
    //跳转官方主播
    jumpOfficialRoom() {
        this.callFunc("jumpOfficialRoom")
    },

    //收到消息
    onChatMessage(messageStr) {
        let messageObj = messageStr
        if(typeof(messageStr) == "string") {
            messageObj = JSON.parse(messageStr)
        }
        
        let messageType = ChatMessageType.Clan
        if(messageObj.sessionType == 0) {
            messageType = ChatMessageType.Private
        }
        let message = {
            messageType: messageType,   //0系统，1世界，2公会,3私聊
            content: messageObj.text,
            userName:messageObj.showName,
            fromId: messageObj.from,
            receiveId: messageObj.sessionId,
            avatarUrl: messageObj.avatarUrlString,
            title: messageObj.role,
            params: "",
        }
        EventManager.instance.dispatchEvent(CustomEventEnum.ADD_CHAT_MESSAGE, message)
            
    },
    //公会状态更新,0-未知、1-加入公会、2-公会成员变更、3-退出公会
    onGuildStatusUpdate(operate) {
    },
    //新手引导完成
    onFinishedGuideForward( guideType ) {
        console.warn("onFinishedGuideForward", guideType)
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "AppGuideFinish",
            param: guideType
        })
    }
}
window["getMessage"] = AppBridge.getMessage
window["onChatMessage"] = AppBridge.onChatMessage
window["onGuildStatusUpdate"] = AppBridge.onGuildStatusUpdate
window["onFinishedGuideForward"] = AppBridge.onFinishedGuideForward
window["AppBridge"] = AppBridge