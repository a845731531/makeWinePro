

import { NetMsgDef } from "../../resources/pb/NetMsgDef";
import { CustomEventEnum } from "../Constant/CustomEventEnum";
import { ServerType } from "../Constant/GameEnum";
import { EventEnum } from "../framework/FrameWorkEnum";
import EventManager from "../framework/manager/EventManager";
import { Tool } from "../framework/manager/Tool";
import { NetData, IMsgHelper } from "../framework/network/NetInterface";
let pbkiller = require("pbkiller");
let ByteBuffer = require("bytebuffer");
let ProtoBuf = require('protobufjs');

export class GameMsgHelper implements IMsgHelper {
    static TestServerPB: any = null;

    protected pb: any = null;
    protected message2Id:{ [msgName: string]: number } = {};
    protected id2Cmd:{ [cmdId: number]: {packageName: string, cmdName: string} } = {};
    protected hasInit: boolean = false;
    private receiveMsg = null;
    private _preloadCallback: () => void
    private serverType: ServerType = ServerType.Login;

    public constructor(serverType: ServerType) {
        this.serverType = serverType
        if(GameMsgHelper.TestServerPB) {
            this.pb = GameMsgHelper.TestServerPB
            this.parseMsgDef()
            this.hasInit = true;
            return
        }
        let self = this;
        pbkiller.preload(() => { 
            self.pb = pbkiller.loadAll();
            self.parseMsgDef()
            self.hasInit = true;
            if (self._preloadCallback) {
                self._preloadCallback()
            }
        });
    }
    public static refreshUploadProto(files) {   
        if(!window.FileReader) {
            return
        }
        let promiseList = []
        let fileNameList = []
        let fileContentMap = {}
        for(let i = 0; i < files.length; i++) {
            let file = files[i]
            promiseList.push(new Promise((resolve, reject) => {
                var reader = new FileReader();  
                reader.onload = function(event) {  
                    fileContentMap[file.name] = event.target.result
                    resolve(null)
                }  
                reader.readAsText(file); 
            }))
            fileNameList.push(file.name)
        }
        Promise.all(promiseList).then(() => {
            let oldFetch = ProtoBuf.Util.fetch
            ProtoBuf.Util.fetch = (filename, callback) => {
                let content = fileContentMap[filename]
                if(!content) {
                    filename = filename.split("/")[1] + ".proto"
                    content = fileContentMap[filename]
                }
                return content
            }
            GameMsgHelper.TestServerPB = pbkiller.loadFromFile(fileNameList, "")
            ProtoBuf.Util.fetch = oldFetch
            console.log("加载proto文件成功")
        })
    }
    public parseMsgDef() {
        let cmdEnum = this.pb.PmdProtobuf.PlatCommand
        for(let name in cmdEnum)
        {
            let cmdName = name.split("_")[1]
            let cmdId = cmdEnum[name]
            this.id2Cmd[cmdId] = 
            {
                packageName: "PmdProtobuf",
                cmdName: cmdName,
            }
        }
        cmdEnum = this.pb.GameCmd.ClientCommand
        for(let name in cmdEnum)
        {
            let cmdName = name.split("_")[1]
            let cmdId = cmdEnum[name]
            this.id2Cmd[cmdId] = 
            {
                packageName: "GameCmd",
                cmdName: cmdName,
            }
        }
        for(let cmdId in this.id2Cmd) {
            let itemCmd = this.id2Cmd[cmdId]
            try {
                let messageEnum = this.pb[itemCmd.packageName][itemCmd.cmdName]["Param"]
                for(let messageName in messageEnum)
                {
                    this.message2Id[messageName] = parseInt(cmdId) * 10000 + messageEnum[messageName]
                }
            } catch (error) {
                
            }
        }
    }

    //检查是否可以发送数据了
    public checkConnect(checkedFunc: () => void ): void {
        if(this.hasInit) {
            checkedFunc();
        } else {
            this._preloadCallback = checkedFunc
        }
    }
    public onChecked() {
        EventManager.instance.dispatchEvent(CustomEventEnum.NETWORK_CONNECTED)
    }
    //获取心跳协议包
    public getPingMsg(): NetData {
        if(!this.pb) {
            return ''
        }
        return this.packMsg("TickRequestNullUserPmd_CS", {
            requesttime: Math.floor(new Date().getTime() / 1000)
        });
    }
    //分发消息
    public dispatchMsg(msg: ArrayBuffer): boolean {
        if(this.receiveMsg == null || this.receiveMsg.view == null) {
            this.receiveMsg = ByteBuffer.wrap(msg, "binary")
        } else {
            this.receiveMsg.append(msg, "binary", this.receiveMsg.limit);
            this.receiveMsg.clear()
        }
        let hasPongMsg = false
        while(true) {
            // 进行头部的校验
            let msgBody : {msgId: number,msgFullName?: string, msgName?: string, data?: any} = this.unpackBody(msg)
            if(!msgBody) {
                this.receiveMsg.view && console.log("数据未接收完全", this.receiveMsg.view.byteLength, msg.byteLength)
                break
            }
            if(msgBody.msgFullName == null) {
                continue
            }
            
            let msgData = this.decodePackage(msgBody.msgFullName, msgBody.data);
            let isPong  = (msgBody.msgName === "TickRequestNullUserPmd_CS" || msgBody.msgName === "TickReturnNullUserPmd_CS");
            if(!isPong) {
                cc.warn("onMessage: ", msgBody.msgFullName, msgData);
            }
            EventManager.instance.dispatchEvent(msgBody.msgName, msgData);
            hasPongMsg = hasPongMsg || isPong
        }
        return hasPongMsg
    }
    //断开连接回调，返回是否重连
    public onDisconnect(code, reason): boolean {
        console.log("onDisconnect", this.serverType, code, reason)
        if(code && code != 1000) { //TODO
            if(this.serverType == ServerType.Gateway) {
                EventManager.instance.dispatchEvent(EventEnum.STOP_GUIDE)
                EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                    content: "网络已断开，请重新连接",
                    confirmCallback: () => {
                        EventManager.instance.dispatchEvent(EventEnum.CLOSE_ALL_POPUP)
                        cc.director.loadScene("LoadingScene")
                    }
                })
                // setTimeout(() => {
                //     EventManager.instance.dispatchEvent(EventEnum.SHOW_LOADING_EFFECT, {
                //         time: 2,
                //         msg: "正在重连..."
                //     } )
                // }, 30000)
                return false
            } else if(code != 1006) {
                EventManager.instance.dispatchEvent(CustomEventEnum.NETWORK_CLOSE)
            }
        }

        return false;
    }
    //封装数据
    public packMsg(msgName: string, msg: Object, ...args: any[]): ArrayBuffer {
        try {
            let msgId = this.message2Id[msgName]
            let cmdId = Math.floor(msgId / 10000)
            msgId = Math.floor(msgId % 10000)
            let itemCmd = this.id2Cmd[cmdId]
    
            let fullMsgName = cc.js.formatStr("%s.%s", itemCmd.packageName, msgName);
            let msgBuffer = this.encodePackage(fullMsgName, msg)
            let isPong  = (msgName === "TickRequestNullUserPmd_CS" || msgName === "TickReturnNullUserPmd_CS");
            if(!isPong && msgName != "SetPingTimeNullUserPmd_CS") {
                cc.warn("sendMessage: ", fullMsgName, msg);
            }
    
            let protoBody = {
                byCmd: cmdId,
                byParam: msgId,
                time: 0,
                data: msgBuffer.toBuffer(),
            }
            let packageData = this.encodePackage("PmdProtobuf.ForwardNullUserPmd_CS", protoBody)
            let byteWithLen = packageData.encodeDelimited()
            return byteWithLen;
        } catch(e) {
            return null
        }
    }

    // 进行头部的校验
    private unpackBody(msg: any) {
        try
        {
            let msgCls = this.pb["PmdProtobuf"]["ForwardNullUserPmd_CS"]
            let msgBody = msgCls.decodeDelimited(this.receiveMsg)
            if(msgBody) {
                let msgId = msgBody.byCmd * 10000 + msgBody.byParam
                let itemCmd = this.id2Cmd[msgBody.byCmd]
                let msgName = Tool.keyOf(this.message2Id, msgId)
                this.receiveMsg.compact()
                if(msgName && itemCmd){
                    return {
                        msgId: msgId,
                        msgName: msgName,
                        msgFullName: cc.js.formatStr("%s.%s", itemCmd.packageName,msgName),
                        data: msgBody.data
                    }
                } else if(msgId) {
                    // console.warn("unUsed msgId: ", msgBody.byCmd, msgBody.byParam)
                    return {
                        msgId: msgId,
                    }
                } else {
                    console.error("undefined msgId: ", this.receiveMsg)
                    this.receiveMsg.compact(this.receiveMsg.limit)
                }
            }
        } catch(err) {
            console.error("decode error", err)
            this.receiveMsg.compact(this.receiveMsg.limit)
        }
        return null
    }

    private encodePackage(msgName: string, msg: Object) {
        let msgPaths = msgName.split(".");
        let msgCls = this.pb;
        for(let msgPath of msgPaths) {
            msgCls = msgCls[msgPath];
            if (!msgCls) {
                return null;
            }
        }
        let msgObj = new msgCls();
        for(let key in msg) {
            msgObj[key] = msg[key];
        }
        return msgObj;
    }
    private decodePackage(msgName: string, msgData: ArrayBuffer): any {
        let msgPaths = msgName.split(".");
        let msgCls = this.pb;
        for(let msgPath of msgPaths) {
            msgCls = msgCls[msgPath];
            if (!msgCls) {
                return {};
            }
        }
        return msgCls.decode(msgData || "");
    }
}