import SmallGameBuffConfig from "../../config/SmallGameBuffConfig";
import { SmallGameState } from "../../Constant/GameEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { SoundEnum } from "../../Constant/SoundEnum";
import { BuildingData } from "../../data/DataInterface";
import UserDataManager from "../../data/UserDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";


const {ccclass, property} = cc._decorator

@ccclass
export default class SmallGameBaseWine extends BaseView {
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
    
    @property(cc.Node)
    fingerNode: cc.Node = null;
    @property(cc.SpriteAtlas)
    fingerAtlas: cc.SpriteAtlas = null;
    @property(cc.Node)
    clickNode: cc.Node = null;
    @property(cc.Node)
    pointNode: cc.Node = null;
    @property(cc.Node)
    animation1: cc.Node = null;
    @property(cc.Node)
    animation2: cc.Node = null;


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
        EventManager.instance.dispatchEvent(EventEnum.PLAY_MUSIC, SoundEnum.BGM_SMALLGAME_KAOJIU)
    }
    onDisable() {        
        EventManager.instance.dispatchEvent(EventEnum.PLAY_MUSIC, SoundEnum.BGM_HALL)
    }
    updateState() {
        this.startNode.active = (this.state ==  SmallGameState.Idle)
        this.gameNode.active = (this.state ==  SmallGameState.InGame)
        this.gameOverNode.active = (this.state ==  SmallGameState.Complete)
    }
    startGame() {
        this.btnStart.active = false
        this.fingerNode.active = false

        this.updateState()

        this.animation1.active = false
        this.animation2.active = false

        this.pointNode.stopAllActions()
        cc.tween(this.pointNode)
            .set({angle: 0})
            .to(0.3, {angle: 90})
            .to(0.3, {angle: 0})
            .to(0.3, {angle: -90})
            .to(0.3, {angle: 0})
            .union()
            .repeatForever()
            .start()
        
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
        this.state = SmallGameState.Complete
        this.updateState()
        this.curScoreLabel.string = "" + this.clickNum

        let historyScore = this.buildingData.smallGameScore || 0
        let maxScore = Math.max(historyScore, this.clickNum)
        this.historyScoreLabel.string = "" + historyScore
        this.historyBuffLabel.string = cc.js.formatStr("%s%", this.getGameBuff(maxScore))

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
    getGameBuff(score) {
        let buffer = 0
        for(let id in SmallGameBuffConfig) {
            let itemConfig = SmallGameBuffConfig[id]
            if(score >= itemConfig.intervalMin && score <= itemConfig.intervalMax) {
                buffer = score * itemConfig.buffRate
                break
            }
        }
        return buffer.toFixed(2)
    }
    onClickStart() {
        this.state = SmallGameState.InGame
        this.startGame()
        // EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.SMAALLGAME_START)
        
    }
    
    onCheckAddScore(event) {
        let angle = this.pointNode.angle
        if(angle >= -30 && angle <= 30) {
            this.clickNum += 1
            this.gameCurScoreLabel.string = "" + this.clickNum

            this.animation1.stopAllActions()
            this.animation1.active = true
            cc.tween(this.animation1)
                .delay(0.2)
                .set({active: false})
                .union()
                .start()
            EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.SMAALLGAME_CORRECT)
        } else {
            this.animation2.setPosition(this.animation2.parent.convertTouchToNodeSpaceAR(event))
            this.animation2.stopAllActions()
            this.animation2.active = true
            cc.tween(this.animation2)
                .delay(0.2)
                .set({active: false})
                .union()
                .start()
            EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_ERROR)
        }
    }
    onClickRule() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.SmallGameRule
        })
    }
}