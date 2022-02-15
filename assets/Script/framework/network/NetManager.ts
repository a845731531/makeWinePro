import { NetNode, NetConnectOptions } from "./NetNode";

/*
*   网络节点管理类
*
*   2019-10-8 by 宝爷
*/

export class NetManager {
    private static _instance: NetManager = null;
    protected _channels: { [key: number]: NetNode } = {};

    public static get instance(): NetManager {
        if (this._instance == null) {
            this._instance = new NetManager();
        }
        return this._instance;
    }

    // 添加Node，返回ChannelID
    public setNetNode(newNode: NetNode, channelId: number = 0) {
        if(this._channels[channelId]) {
            this._channels[channelId].unregisterListner()
            this._channels[channelId].close(1000, "replace netnode")
        }
        this._channels[channelId] = newNode;
    }

    // 移除Node
    public removeNetNode(channelId: number) {
        delete this._channels[channelId];
    }

    // 调用Node连接
    public connect(options: NetConnectOptions, channelId: number = 0): boolean {
        if (this._channels[channelId]) {
            return this._channels[channelId].connect(options);
        }
        return false;
    }
    
    // 调用Node发送
    public sendChannelMsg(channelId: number = 0, ...args: any[]): boolean {
        let node = this._channels[channelId];
        if(node) {
            return node.sendMsg(...args);
        }
        return false;
    }
    public sendMsg(...args: any[]): boolean {
        return this.sendChannelMsg(0, ...args);
    }

    //开启心跳
    public startHeartBeat(channelId: number = 0): void {
        let node = this._channels[channelId];
        if(node) {
            node.startHeartBeat();
        }
    }

    // 调用Node关闭
    public close(code?: number, reason?: string, channelId: number = 0) {
        if (this._channels[channelId]) {
            return this._channels[channelId].closeSocket(code, reason);
        }
    }
}