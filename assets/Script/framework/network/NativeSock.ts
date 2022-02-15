import { ISocket, NetData, SocketState } from "./NetInterface";

export class NativeSock implements ISocket {
    _sock: jsb.ClientSocket = null;

    onConnected: (event: any) => void;
    onMessage: (msg: NetData) => void;
    onError: (event: any) => void;
    onClosed: (event: any) => void;

    connect(options: any) {
        if (this._sock) {
            if (this._sock.getSocketState() === SocketState.CONNECTING) {
                console.log("websocket connecting, wait for a moment...")
                return false;
            }
        }

        let ip = options.host;
        let port = options.port;
        if(!ip || !port) {
            return false;
        }        

        this._sock = new jsb.ClientSocket();
        if(this.onConnected) {
            this._sock.onopen(this.onConnected)
        }
        if(this.onMessage) {
            this._sock.onmessage((dataMsg: string) => {
                console.log("onmessage:", dataMsg.length, dataMsg)
                var typedArray = new Uint8Array(dataMsg.match(/[\da-f]{2}/gi).map(function (h) {
                    return parseInt(h, 16)
                }))
                this.onMessage(typedArray.buffer);
            })
        }
        if(this.onError) {
            this._sock.onerror(this.onError)
        }
        if(this.onClosed) {
            this._sock.onclose(this.onClosed)
        }
        this._sock.connect(ip, port)
        return true;
    }
    send(buffer: any) {
        if (this._sock.getSocketState() === SocketState.OPEN)
        {
            let logStr = buffer.toBinary();
            console.log("sendMsg: ", logStr.length)
            for(let i = 0; i < logStr.length; i++) {
                console.log(logStr.charCodeAt(i))
            }
            this._sock.send(buffer.toHex());
            return true;
        }
        return false;
    }
    close(code?: number, reason?: string) {
        this._sock.close()
    }
}