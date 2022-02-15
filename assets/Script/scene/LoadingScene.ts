import DataManagerInit from "../data/init";
import { NativeSock } from "../framework/network/NativeSock";
import { NetManager } from "../framework/network/NetManager";
import { NetNode } from "../framework/network/NetNode";
import { WebSock } from "../framework/network/WebSock";
import { GameMsgHelper } from "../manager/GameMsgHelper";
import { Config } from "../Constant/Config";
import EventManager from "../framework/manager/EventManager";
import { CustomEventEnum } from "../Constant/CustomEventEnum";
import { EventEnum } from "../framework/FrameWorkEnum";
import LoginManager from "../manager/LoginManager";
import { LoginState } from "../Constant/GameEnum";
import { PrefabPathEnum } from "../Constant/PrefabPathEnum";
import GuideConditionExecuterManager from "../guide/GuideConditionExecuterManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingScene extends cc.Component {

    @property(cc.Label)
    tipLabel: cc.Label = null;

    @property(cc.Node)
    startNode: cc.Node = null;

    @property(cc.Node)
    progressNode: cc.Node = null;
   
    @property(cc.Label)
    progressLabel: cc.Label = null;

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    private stuckTime = 0;  //卡住时间
    private stuckMaxTime = 30; //最长卡住时间
    private curStep: number = 0;
    private totalStep: number = 10;
    private subLoadStartProgress: number = 0;
    private subLoadTotalProgress: number = 0;

    private loadSpeed: number = 0.3;
    private hasLoadFinished: boolean = false;
    private isShowRetry: boolean = false;
    private loginState: LoginState = LoginState.Success

    onLoad() {
        EventManager.instance.dispatchEvent(CustomEventEnum.UPDATE_TOP_VIEW_VISIBLE, false)

        this.startNode.active = true
        this.progressNode.active = false
        this.progressLabel.string = "0%";
        this.progressBar.progress = 0;
        this.tipLabel.string = "粮食已经成熟，可以开始酿酒了"
        
        EventManager.instance.dispatchEvent(EventEnum.STOP_MUSIC)
    }
    start() {
        DataManagerInit.reset()
        DataManagerInit.init()

        GuideConditionExecuterManager.initExecuter()

        
        if(CC_DEV) {
            this.onClickStart()
        } else {
            this.schedule(() => {
                EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
                    type: "FirstLoading"
                })
            })
        }
    }
    onClickStart() {
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "LoadingStart"
        })
        this.nextStep();
        this.startNode.active = false
        this.progressNode.active = true
        this.tipLabel.string = "正在进入酿酒大厅"
    }
    
    nextStep() {
        this.curStep += 1;
        if (this.curStep > this.totalStep) return;

        this.subLoadStartProgress = -1
        this.subLoadTotalProgress = -1

        switch (this.curStep) {
            case 1:                
                this.subLoadStartProgress = this.curStep / this.totalStep;
                this.subLoadTotalProgress = 8 / this.totalStep;
                cc.director.preloadScene("HallScene", this.onSubLoadProgress.bind(this), this.nextStep.bind(this));
                break
            case 9:
                if(Config.UseNetWork == 0) {
                    this.onLoginResult(LoginState.Success)
                } else {
                    LoginManager.instance.registerLoginCallback(this.onLoginResult.bind(this))
                    LoginManager.instance.startLogin()
                }
                break
            default:
                this.nextStep();
                break;
        }
    }
    onLoginResult(state: LoginState) {
        this.loginState = state
        if(LoginState.Failed == state) {
            EventManager.instance.dispatchEvent(EventEnum.HIDE_MODAL)
            if(CC_DEBUG) {
                let zoneId = Config.ZoneId + 1
                if(zoneId > 5) {
                    zoneId = 2
                }
                EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                    content: cc.js.formatStr("登录失败,是否切换到%s服", zoneId),
                    confirmText: "切换",
                    cancelText: "重试",
                    showCancel: true,
                    cancelCallback: this.retryStep.bind(this),
                    confirmCallback: () => {
                        Config.ZoneId = zoneId
                        this.retryStep()
                    },
                })

            } else {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                    content: "登录失败,请检查网络后重试？",
                    confirmCallback: this.retryStep.bind(this),
                })
            }
            
        } else {
            EventManager.instance.dispatchEvent(EventEnum.HIDE_MODAL)
            
            this.nextStep()
        }
    }

    onLoadingFinish() {
        EventManager.instance.dispatchEvent(EventEnum.HIDE_MODAL)
        if(LoginState.Create == this.loginState) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.CreateRole,
            })
        } else {
            cc.director.loadScene("HallScene")
        }
    }
    retryStep() {
        this.isShowRetry = false
        this.stuckTime = 0
        this.curStep -= 1;
        this.progressBar.progress = Math.min(1, this.curStep / this.totalStep);
        this.nextStep()
    }
    onSubLoadProgress(finished: number, total: number){
        let subProgress = finished / total
        subProgress = subProgress * (this.subLoadTotalProgress - this.subLoadStartProgress)
        let curProgress = this.subLoadStartProgress + subProgress;
        curProgress = Math.max(curProgress, this.progressBar.progress)
        this.progressBar.progress = curProgress;
        curProgress = Math.floor(curProgress * 100);
        this.progressLabel.string = cc.js.formatStr("%d%", curProgress);
    }
    update(dt: number) {
        if(this.subLoadStartProgress >= 0) {
            return
        }
        if(this.hasLoadFinished) {
            return
        }
        let curMaxProgress = Math.min(1, this.curStep / this.totalStep);
        let curProgress = this.progressBar.progress;
        curProgress = Math.min(curProgress + this.loadSpeed * dt, curMaxProgress);
        this.progressBar.progress = curProgress;
        curProgress = Math.floor(curProgress * 100);
        this.progressLabel.string = cc.js.formatStr("%d%", curProgress);
        if(curProgress == Math.floor(curMaxProgress * 100)) {
            this.stuckTime += dt;
            if(this.stuckTime >= this.stuckMaxTime && !this.isShowRetry) {
                this.isShowRetry = true
                EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
                    content: "加载异常,是否重试？",
                    showCancel: true,
                    confirmCallback: this.retryStep.bind(this),
                    cancelCallback: () => {
                        this.isShowRetry = false
                        this.stuckTime = 0
                    }
                })
            }
        } else {            
            this.stuckTime = 0
            if(this.isShowRetry) {
                EventManager.instance.dispatchEvent(EventEnum.HIDE_MODAL)
                this.isShowRetry = false
            }
        }

        if (curProgress >= 99) {
            this.onLoadingFinish()
            this.hasLoadFinished = true
        }
    }
    onDebugSelectServer(toggle, index) {
        Config.ZoneId = parseInt(index)
        this.retryStep()
    }
    onDebugEditAccount(editBox) {
        cc.sys.localStorage.setItem("LastAccount", editBox.string)
        this.retryStep()
    }
}
