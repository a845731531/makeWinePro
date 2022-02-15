import SmallGameBuffConfig from "../../config/SmallGameBuffConfig";
import { SmallGameState } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../Constant/SoundEnum";
import BuildingDataManager from "../../data/BuildingDataManager";
import { BuildingData } from "../../data/DataInterface";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";


const {ccclass, property} = cc._decorator

@ccclass
export default class SmallGameZhiqu extends BaseView {
    @property(cc.Node)
    startNode: cc.Node = null;
    @property(cc.Node)
    btnStart: cc.Node = null;

    @property(cc.Node)
    gameNode: cc.Node = null;
    @property(cc.Label)
    gameCurScoreLabel: cc.Label = null;
    @property(cc.Label)
    gameHistoryScoreLabel: cc.Label = null;
    @property(cc.Label)
    timeLabel: cc.Label = null;
    @property(cc.Button)
    btnGameArea: cc.Button = null;
    @property(cc.Node)
    efffectNode: cc.Node = null;
    @property(cc.Node)
    fingerNode: cc.Node = null;
    @property(cc.SpriteAtlas)
    fingerAtlas: cc.SpriteAtlas = null;
    @property(sp.Skeleton)
    animation: sp.Skeleton = null;


    @property(cc.Node)
    gameOverNode: cc.Node = null;
    @property(cc.Label)
    curScoreLabel: cc.Label = null;
    @property(cc.Label)
    historyScoreLabel: cc.Label = null;
    @property(cc.Label)
    historyBuffLabel: cc.Label = null;

    private state: SmallGameState = SmallGameState.Idle;
    private buildingData: BuildingData = null;
    private gameTime: number = 10;
    private remainTime: number = 0;
    private clickNum: number = 0;
    private isOnAction: boolean = false;
    private lastClickTime: number = 0;

    initByExData(exData: any): void {
        this.buildingData = exData.buildingData
        let historyScore = this.buildingData.smallGameScore || 0
        this.gameHistoryScoreLabel.string = "" + historyScore
    }
    start() {        
        let fingerFrames = this.fingerAtlas.getSpriteFrames()
        let animation = this.fingerNode.getComponent(cc.Animation)
        let clip = cc.AnimationClip.createWithSpriteFrames(fingerFrames, 30)
        clip.wrapMode = cc.WrapMode.Loop
        animation.addClip(clip, "finger")
        animation.play("finger")

        this.updateState()

        EventManager.instance.dispatchEvent(EventEnum.PLAY_MUSIC, SoundEnum.BGM_SMALLGAME_ZHIQU)
    }
    onDisable() {        
        EventManager.instance.dispatchEvent(EventEnum.PLAY_MUSIC, SoundEnum.BGM_HALL)
    }
    updateState() {
        this.btnStart.active = (this.state == SmallGameState.Idle)
        this.startNode.active = (this.state == SmallGameState.Idle)
        this.gameNode.active = (this.state ==  SmallGameState.InGame)
        this.gameOverNode.active = (this.state ==  SmallGameState.Complete)
        this.btnGameArea.interactable = (this.state ==  SmallGameState.InGame)
    }
    startGame() {
        this.updateState()
        this.btnStart.active = false

        this.efffectNode.opacity = 0
        this.remainTime = this.gameTime
        this.clickNum = 0
        this.gameCurScoreLabel.string = "" + this.clickNum

        this.updateTime()
        this.schedule(this.updateTime, 1)
    }

    updateTime() {
        this.timeLabel.string = Tool.formatTime(this.remainTime)
        this.remainTime -= 1
        if(this.remainTime < 0) {
            this.unschedule(this.updateTime)
            this.gameOver()
        }
    }

    gameOver() {
        this.animation.clearTracks()
        this.state = SmallGameState.Complete
        this.updateState()
        this.curScoreLabel.string = "" + this.clickNum

        let historyScore = this.buildingData.smallGameScore || 0
        let maxScore = Math.max(historyScore, this.clickNum)
        this.historyScoreLabel.string = "" + historyScore
        let buffer = BuildingDataManager.instance.getGameBuff(maxScore)
        this.historyBuffLabel.string = cc.js.formatStr("%s%", buffer)

        this.gameHistoryScoreLabel.string = "" + maxScore
        this.buildingData.smallGameScore = maxScore

        //TODO
        EventManager.instance.dispatchEvent("UpdateBrewBuildingCmd_SC", {
            building_data: {
                building_id:  this.buildingData.buildingType,
                building_index: this.buildingData.buildingIndex,
                score: maxScore
            }
        })
    }
    onClickStart() {
        this.state = SmallGameState.InGame
        this.startGame()
        // EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.SMAALLGAME_START)
    }
    onClickGame() {
        // if(this.isOnAction) {
        //     return
        // }

        this.fingerNode.active = false
        cc.tween(this.efffectNode)
            .to(0.1, {opacity: 255})
            .to(0.1, {opacity: 0})
            .union()
            .start()

        this.animation.clearTracks()
        this.animation.setAnimation(0, "animation2", false)
        let curTime = new Date().getTime()
        let timeScale = 200 / (curTime - this.lastClickTime)
        timeScale = Math.max(1, timeScale)
        timeScale = Math.min(1.5, timeScale)
        
        this.animation.timeScale = timeScale
        this.lastClickTime = curTime     

        this.clickNum += 1
        this.gameCurScoreLabel.string = "" + this.clickNum

        // this.isOnAction = true
            
        // this.animation.setCompleteListener(() => {
        //     this.isOnAction = false
        // })
    }
    onClickRule() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.SmallGameRule
        })
    }
}