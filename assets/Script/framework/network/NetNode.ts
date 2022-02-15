import { IMsgHelper, ISocket, NetData } from "./NetInterface";

/*
*   CocosCreator网络节点基类，以及网络相关接口定义
*   1. 网络连接、断开、请求发送、数据接收等基础功能
*   2. 心跳机制
*   3. 断线重连 + 请求重发
*   4. 调用网络屏蔽层
*
*   2018-5-7 by 宝爷
*/


export enum NetTipsType {
    Connecting,
    ReConnecting,
    Requesting,
}

export enum NetNodeState {
    Closed,                     // 已关闭
    Connecting,                 // 连接中
    Checking,                   // 验证中
    Working,                    // 可传输数据
}

export interface NetConnectOptions {
    host?: string,              // 地址
    port?: number,              // 端口
    url?: string,               // url，与地址+端口二选一
    protocol?: string,          //ws或者wss
    autoReconnect?: number,     // -1 永久重连，0不自动重连，其他正整数为自动重试次数
    heartTime?: number,         //心跳间隔，0不检查心跳
    heartTimeOut?: number,      //多少次未收到心跳就重连
}
// 请求对象
export interface SendCacheObject {
    buffer: NetData,      //请求的Buffer
    args: any[];          //请求的可变变量
}

export class NetNode {
    protected _connectOptions: NetConnectOptions = null;
    protected _autoReconnect: number = 0;
    protected _isSocketInit: boolean = false;                               // Socket是否初始化过
    protected _isSocketOpen: boolean = false;                               // Socket是否连接成功过
    protected _state: NetNodeState = NetNodeState.Closed;                   // 节点当前状态

    protected _socket: ISocket = null;                                      // Socket对象（可能是原生socket、websocket、wx.socket...)
    protected _msgHelper: IMsgHelper = null;                                // 封包解包和分发

    protected _keepAliveTimer: any = null;                                  // 心跳定时器
    protected _receiveTimeoutTimer: any = null;                             // 心跳超时定时器    
    protected _reconnectTimer: any = null;                                  // 重连定时器
    protected _heartTime: number = 10000;                                   // 心跳间隔
    protected _heartTimeOut: number = 3;                                    // 多少次未收到心跳就重连
    protected _reconnetTimeOut: number = 30000;                           // 重连间隔
    protected _cacheRequests: SendCacheObject[] = Array<SendCacheObject>(); // 请求列表

    /********************** 网络相关处理 *********************/
    public init(socket: ISocket, msgHelper: IMsgHelper) {
        console.log(`NetNode init socket`);
        this._socket = socket;
        this._msgHelper = msgHelper;
    }

    public connect(options: NetConnectOptions): boolean {
        if (this._socket && this._state == NetNodeState.Closed) {
            if (!this._isSocketInit) {
                this.initSocket();
            }
            this._state = NetNodeState.Connecting;
            if (!this._socket.connect(options)) {
                this._state = NetNodeState.Closed
                return false;
            }
            this._connectOptions = options;
            this._autoReconnect = this._connectOptions.autoReconnect || 0
            return true;
        }
        return false;
    }

    protected initSocket() {
        this._socket.onConnected = (event) => { this.onConnected(event) };
        this._socket.onMessage = (msg) => { this.onMessage(msg) };
        this._socket.onError = (event) => { this.onError(event) };
        this._socket.onClosed = (event) => { this.onClosed(event) };
        this._isSocketInit = true;
    }
    public unregisterListner() {
        this._isSocketInit = false;
    }

    // 网络连接成功
    protected onConnected(event) {
        if(!this._isSocketInit) {
            return
        }
        console.log("NetNode onConnected!")
        this._isSocketOpen = true;
        // 如果设置了鉴权回调，在连接完成后进入鉴权阶段，等待鉴权结束
        if (this._msgHelper !== null) {
            this._state = NetNodeState.Checking;
            this._msgHelper.checkConnect(() => { this.onChecked() });
        } else {
            this.onChecked();
        }
        console.log("NetNode onConnected! state =" + this._state);
    }

    // 连接验证成功，进入工作状态
    protected onChecked() {
        console.log("NetNode onChecked!")
        this._state = NetNodeState.Working;
        // 重发缓存队列信息
        console.log(`NetNode flush ${this._cacheRequests.length} request`)
        while (this._cacheRequests.length > 0) {
            let netData = this._cacheRequests.shift();
            if(netData.buffer) {
                this._socket.send(netData.buffer);
            } else if (netData.args) {
                this.sendMsg(...netData.args);
            }
        }
        this._msgHelper.onChecked();
    }

    public sendMsg(...args: any[]): boolean {
        if(this._msgHelper) {
            if (this._state == NetNodeState.Working) {
                let buf = this._msgHelper.packMsg(...args);
                if(buf != null) {
                    return this.send(buf);
                } else {
                    return false
                }
            } else if (this._state == NetNodeState.Checking ||
                this._state == NetNodeState.Connecting) {
                this._cacheRequests.push({
                    args: args,
                    buffer: null,
                });
                console.log("NetNode socket is busy, push to send msg, current state is " + this._state);
                return true;
            } else {
                console.error("NetNode send error! current state is " + this._state);
                return false;
            }
        }
        return false;
    }
    // 发送请求，如果当前处于重连中，进入缓存列表等待重连完成后发送
    private send(buf: NetData): boolean {
        if (this._state == NetNodeState.Working) {
            return this._socket.send(buf);
        } else if (this._state == NetNodeState.Checking ||
            this._state == NetNodeState.Connecting) {
            this._cacheRequests.push({
                args: null,
                buffer: buf,
            });
            console.log("NetNode socket is busy, push to send buffer, current state is " + this._state);
            return true;
        } else {
            console.error("NetNode send error! current state is " + this._state);
            return false;
        }
    }
    // 接收到一个完整的消息包
    protected onMessage(msg): void {   
        if(!this._isSocketInit) {
            return
        }     
        //分发数据
        if(this._msgHelper) {
            let isPong = this._msgHelper.dispatchMsg(msg);
            if(isPong) {
                if (this._keepAliveTimer == null) {
                    this.startHeartBeat()
                }
                this.resetReceiveTimer();
            }
        }
    }

    protected onError(event) {
        if(!this._isSocketInit) {
            return
        }
        console.error(event);
    }

    protected onClosed(event) {
        if(!this._isSocketInit) {
            return
        }
        this.clearTimer();
        console.log("onClosed", event)
        if (this._msgHelper) {
            let needReconnect = this._msgHelper.onDisconnect(event.code, event.reason);
            if(!needReconnect) {
                return;
            }
        }

        // 自动重连
        if (this.isAutoReconnect()) {
            this._reconnectTimer = setTimeout(() => {
                // this._socket.close();
                this._state = NetNodeState.Closed;
                this.connect(this._connectOptions);
                if (this._autoReconnect > 0) {
                    this._autoReconnect -= 1;
                }
            }, this._reconnetTimeOut);
        } else {
            this._state = NetNodeState.Closed;
        }
    }

    public close(code?: number, reason?: string) {
        this.clearTimer();
        this._cacheRequests.length = 0;

        if (this._socket) {
            this._socket.close(code, reason);
        } else {
            this._state = NetNodeState.Closed;
        }
    }

    // 只是关闭Socket套接字（仍然重用缓存与当前状态）
    public closeSocket(code?: number, reason?: string) {
        if (this._socket) {
            this._socket.close(code, reason);
        }
    }

    /********************** 心跳、超时相关处理 *********************/
    protected resetReceiveTimer() {
        let heartTime = this._heartTime;
        if(this._connectOptions && this._connectOptions.heartTime) {
            heartTime = this._connectOptions.heartTime;
        }
        let heartTimeOut = this._heartTimeOut;
        if(this._connectOptions && this._connectOptions.heartTimeOut) {
            heartTimeOut = this._connectOptions.heartTimeOut;
        }
        //heartTime < 0 don't check timeout
        if(heartTime <= 0 || heartTimeOut <= 0) {
            return;
        }
        if (this._receiveTimeoutTimer !== null) {
            clearTimeout(this._receiveTimeoutTimer);
        }

        this._receiveTimeoutTimer = setTimeout(() => {
            console.log("NetNode receive heartbeat timeout")
            this.closeSocket();
        }, heartTime * heartTimeOut);
    }
    public startHeartBeat() {
        let heartTime = this._heartTime;
        if(this._connectOptions && this._connectOptions.heartTime) {
            heartTime = this._connectOptions.heartTime;
        }
        //heartTime < 0 don't send heartbeat
        if(heartTime <= 0) {
            return;
        }
        //start timeout timer
        this.resetReceiveTimer();

        if (this._keepAliveTimer !== null) {
            clearTimeout(this._keepAliveTimer);
        }

        this._keepAliveTimer = setInterval(() => {
            console.log("NetNode send heartbeat")
            if(this._msgHelper) {
                this.send(this._msgHelper.getPingMsg());
            }
        }, heartTime);
    }
    protected clearTimer() {
        if (this._receiveTimeoutTimer !== null) {
            clearTimeout(this._receiveTimeoutTimer);
        }
        if (this._keepAliveTimer !== null) {
            clearTimeout(this._keepAliveTimer);
        }
        if (this._reconnectTimer !== null) {
            clearTimeout(this._reconnectTimer);
        }
    }

    public isAutoReconnect() {
        return this._autoReconnect != 0;
    }

    public rejectReconnect() {
        this._autoReconnect = 0;
        this.clearTimer();
    }
}