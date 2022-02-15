const {ccclass, property} = cc._decorator;
import { NetMsgDef } from "../../resources/pb/NetMsgDef";
import { GameMsgHelper } from "../manager/GameMsgHelper";
import { NativeSock } from "../framework/network/NativeSock";
import { NetManager } from "../framework/network/NetManager";
import { NetNode } from "../framework/network/NetNode";
import { WebSock } from "../framework/network/WebSock";
import { Config } from "../Constant/Config";
import { Tool } from "../framework/manager/Tool";
import LoginManager from "../manager/LoginManager";
import ViewConfig from "../config/ViewConfig";
import { LoginState } from "../Constant/GameEnum";
import EventManager from "../framework/manager/EventManager";
let CryptoJS = require("CryptoJS")

@ccclass
export default class NetTestScene extends cc.Component {
    @property(cc.EditBox)
    serverUrl: cc.EditBox = null

    @property(cc.EditBox)
    gatewayUrl: cc.EditBox = null

    @property(cc.EditBox)
    accountEdit: cc.EditBox = null
    
    @property(cc.Node)
    serverParent: cc.Node = null

    start() {        
        this.accountEdit.string = cc.sys.localStorage.getItem("LastAccount") || ""
        this.serverUrl.string = cc.sys.localStorage.getItem("LastServerUrl") || Config.ServerUrl
        let lastZoneId = cc.sys.localStorage.getItem("LastZoneId") || Config.ZoneId
        lastZoneId = parseInt(lastZoneId)
        this.serverParent.getComponentsInChildren(cc.Toggle)[lastZoneId - 1].isChecked =  true

        if(cc.sys.isBrowser && window.FileReader) {
            let inputEle = document.createElement('input')
            inputEle.type = "file"
            inputEle.onchange = this.onUploadProto.bind(this)
            inputEle.multiple = true
            inputEle.accept = ".proto"
            inputEle.style.position = "absolute"
            inputEle.style.left = "100px"
            inputEle.style.top = "150px"
            cc.game.canvas.parentNode.append(inputEle)
        }
    }
    onUploadProto(event) {
        let files = event.target.files
        GameMsgHelper.refreshUploadProto(files)
    }
    login() {
        if(this.accountEdit.string != "") {
            cc.sys.localStorage.setItem("LastAccount", this.accountEdit.string)
        }
        if(this.serverUrl.string != "") {
            Config.ServerUrl = this.serverUrl.string
            cc.sys.localStorage.setItem("LastServerUrl", Config.ServerUrl)
        }
        LoginManager.instance.registerLoginCallback(this.onLoginResult.bind(this))
        LoginManager.instance.startLogin()
    }
    onSelectServer(event, index) {
        Config.ZoneId = parseInt(index)
        cc.sys.localStorage.setItem("LastZoneId", Config.ZoneId)
    }
    onLoginResult(state) {
        if(state == LoginState.Create) {
            NetManager.instance.sendMsg("stCheckNameSelectUserCmd", {
                name: this.accountEdit.string,
            })
        } else {
            window["NetManager"] = NetManager.instance;
        }
    }
}