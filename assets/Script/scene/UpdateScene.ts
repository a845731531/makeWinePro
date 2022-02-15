import { Config } from "../Constant/Config";

const { ccclass, property } = cc._decorator;

enum UpdateState {
    Init,
    Checking,
    Updating,
}

@ccclass
export default class UpdateScene extends cc.Component {

    @property(cc.Label)
    progressLabel: cc.Label = null;

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    @property(cc.Label)
    statusLabel: cc.Label = null;
    @property(cc.Label)
    versionLabel: cc.Label = null;

    @property(cc.Asset)
    manifestUrl: cc.Asset = null;
    
    @property(cc.Node)
    retryNode: cc.Node = null;

    private _am: jsb.AssetsManager = null;
    private _updateState: UpdateState = UpdateState.Init;

    onLoad() {
        this.retryNode.active = false;
        if(!cc.sys.isNative) {
            this.onUpdateFinish()
        } else {   
            this.initAssetManager()
            this.checkUpdate()
        }
    }
    onDestroy () {
        if(this._am) {
            this._am.setEventCallback(null);
        }
    }

    initAssetManager() {
        let storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'Update');
        this._am = new jsb.AssetsManager("", storagePath, this.versionCompareHandle.bind(this));
        this._am.setVerifyCallback(this.checkMD5Handle.bind(this));
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this._am.setMaxConcurrentTask(2);
        }
        this._updateState = UpdateState.Init
    }
    checkUpdate() {
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            var url = this.manifestUrl.nativeUrl; //文件列表对应Url
            if (cc.loader.md5Pipe) {
                url = cc.loader.md5Pipe.transformURL(url);
            }
            this._am.loadLocalManifest(url);
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            this.showErrorState("本地版本文件加载失败", true)
            return;
        }
        let localVersion = this._am.getLocalManifest().getVersion()
        Config.version = localVersion //存储版本号
        this.versionLabel.string = localVersion

        this._updateState = UpdateState.Checking;
        this._am.setEventCallback(this.checkCb.bind(this));
        this._am.checkUpdate();
        this.statusLabel.string = '正在检测版本更新...';
    }
    startUpdate() {
        this.statusLabel.string = "正在更新版本...";
        this._updateState = UpdateState.Updating;
        this._am.setEventCallback(this.updateCb.bind(this));
        this._am.update();
    }

    checkCb(event: jsb.EventAssetsManager) {
        cc.log("onCheckCB:", event.getEventCode())
        switch(event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.showErrorState("检测版本更新失败", true)
                this._am.setEventCallback(null);
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.statusLabel.string = "已是最新版本";
                this._am.setEventCallback(null);
                this.onUpdateFinish()
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this._am.setEventCallback(null);
                this.startUpdate()
                break;
            default:
                return;
        }
    }
    formatByteStr(bytes: number) {
        if(bytes > 1024 * 1024) {
            return cc.js.formatStr("%sMB", Math.floor(bytes / 1024 / 1024))
        } else if (bytes > 1024) {
            return cc.js.formatStr("%sKB", Math.floor(bytes / 1024))
        } else {
            return bytes
        }
    }
    updateCb(event: jsb.EventAssetsManager) {
        switch (event.getEventCode())
        {
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
            case jsb.EventAssetsManager.UPDATE_FAILED:
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this.showErrorState("更新失败", true)
                this._am.setEventCallback(null);
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this.progressBar.progress = event.getPercent();
                this.progressLabel.string = cc.js.formatStr("%s/%s", this.formatByteStr(event.getDownloadedBytes()), this.formatByteStr(event.getTotalBytes()));
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.statusLabel.string = "已是最新版本";
                this._am.setEventCallback(null);
                this.onUpdateFinish()
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.statusLabel.string = '更新完成';
                this._am.setEventCallback(null);

                // Prepend the manifest's search path
                var searchPaths = jsb.fileUtils.getSearchPaths();
                var newPaths = this._am.getLocalManifest().getSearchPaths();
                console.log(JSON.stringify(newPaths));
                Array.prototype.unshift.apply(searchPaths, newPaths);
                cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
                jsb.fileUtils.setSearchPaths(searchPaths);

                cc.audioEngine.stopAll();
                cc.game.restart();
                break;
            default:
                break;
        }
    }
    //返回值大于0要更新
    versionCompareHandle(versionA: string, versionB: string) : number {
        cc.log("versionCompareHandle:", versionA, versionB)
        let vAList = versionA.split('.');
        let vBList = versionB.split('.');
        for (let i = 0; i < vAList.length; ++i) {
            let subvA = parseInt(vAList[i]);
            let subvB = parseInt(vBList[i] || "0");
            if (subvA === subvB) {
                continue;
            }
            else {
                return subvA - subvB;
            }
        }
        if (vBList.length > vAList.length) {
            return -1;
        }
        else {
            return 0;
        }
    }
    checkMD5Handle(path: string, asset: jsb.ManifestAsset) : boolean {
        cc.log("checkMD5", path)
        return true;
    }

    showErrorState(msg: string, canRetry: boolean) {
        this.statusLabel.string = msg;
        this.retryNode.active = canRetry
    }
    onClickRetry() {
        this.retryNode.active = false
        if(this._updateState == UpdateState.Checking) {
            this.checkUpdate()
        } else if(this._updateState == UpdateState.Updating) {
            this._am.downloadFailedAssets();
        }
    }
    onUpdateFinish() {
        cc.director.loadScene("LoadingScene")
    }
}
