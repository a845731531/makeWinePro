
/*
*   网络相关接口定义
*   
*   2019-10-8 by 宝爷
*/

export type NetData = (string | ArrayBufferLike | Blob | ArrayBufferView);
type VoidFunc = () => void;
type CheckFunc = (checkedFunc : VoidFunc ) => void;

// 封包解包接口
export interface IMsgHelper {
    getPingMsg: () => NetData;             //获取ping数据
    
    packMsg: (...args: any[]) => NetData;
    dispatchMsg: (msg: NetData) => boolean;  //分发数据

    onChecked: () => void;
    checkConnect: CheckFunc;        // 连接回调
    onDisconnect: (code: number, reason: string) => boolean;  // 断开连接回调，返回是否需要重连
}
// Socket接口
export interface ISocket {
    onConnected: (event) => void;           // 连接回调
    onMessage: (msg: NetData) => void;      // 消息回调
    onError: (event) => void;               // 错误回调
    onClosed: (event) => void;              // 关闭回调
    
    connect(options: any);                  // 连接接口
    send(buffer: any);                  // 数据发送接口
    close(code?: number, reason?: string);  // 关闭接口
    unregisterListner();               //解除监听
}
export enum SocketState {
    CONNECTING,
    OPEN,
    CLOSING,
    CLOSED,
}
