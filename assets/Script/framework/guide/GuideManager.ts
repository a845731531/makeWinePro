import { EventEnum, GuideData } from "../FrameWorkEnum";
import EventManager from "../manager/EventManager";
import GuideLayer from "./GuideLayer";

export interface GuideConditionExecuter {
    isConditionMatch(needParam: string, curParam: string): boolean;
}

export default class GuideManager {

    private static _instance: GuideManager;

    private guideLayer: GuideLayer = null;
    private guideNodeList: {[nodeName: string]: cc.Node} = {}
    private conditionExecuterList: {[conditionType: string]: GuideConditionExecuter} = {}
    private allGuideDatas: GuideData[] = []
    private guideStartList: GuideData[] = []
    private finishedGuideIds: number[] = []
    private curGuideId = -1
    private curStep = -1
    private curGuideData: GuideData = null

    public static get instance(): GuideManager {
        if(this._instance == null) {
            this._instance = new GuideManager();
        }
        return this._instance;
    }
    constructor() {
        this.guideNodeList = {}
        EventManager.instance.addEventListener(EventEnum.CHECK_GUIDE, this.onCheckGuide, this)
        EventManager.instance.addEventListener(EventEnum.GUIDE_FINISHED, this.onFinishGuide, this)  
        EventManager.instance.addEventListener(EventEnum.STOP_GUIDE, this.onStopGuide, this)      
        EventManager.instance.addEventListener("JumpGuide", this.onJumpGuide, this)
    }

    setGuideLayer(guideLayer: GuideLayer) {
        this.guideLayer = guideLayer
    }
    setGuideDataList(allGuideDatas) {
        this.allGuideDatas = allGuideDatas
        this.guideStartList.length = 0
        for(let i = 0, len = this.allGuideDatas.length; i < len; i++) {
            let itemData = this.allGuideDatas[i]
            if(itemData.step == 0) {
                this.guideStartList.push(itemData)
            }
        }
    }
    setGuideFinishedIdList(idList) {
        this.finishedGuideIds = idList
    }
    registerConditionExecuter(conditionType: string, executer: GuideConditionExecuter) {
        this.conditionExecuterList[conditionType] = executer
    }

    private getGuideData(guideId, step): GuideData {
        for(let i = 0, len = this.allGuideDatas.length; i < len; i++) {
            let itemData = this.allGuideDatas[i]
            if(itemData.guideId == guideId && itemData.step == step) {
                return itemData
            }
        }
    }

    onCheckGuide(eventParam) {
        let conditionType = eventParam.type
        let conditionParam = eventParam.param
        let executer = this.conditionExecuterList[conditionType]
        if(executer == null) {
            return
        }
        if(this.curGuideId != -1) {
            if(conditionType != this.curGuideData.nextConditionType) {
                return
            }
            let isMatch = executer.isConditionMatch(this.curGuideData.nextConditionParam, conditionParam)
            if(isMatch) {
                this.nextStep()
            }
        } else {
            for(let i = 0, len = this.guideStartList.length; i < len; i++) {
                let itemData = this.guideStartList[i]
                if(conditionType != itemData.startConditionType) {
                    continue
                }
                if(this.finishedGuideIds.indexOf(itemData.guideId) != -1) {
                    continue
                }
                let isMatch = executer.isConditionMatch(itemData.startConditionParam, conditionParam)
                if(isMatch) {
                    this.curGuideId = itemData.guideId
                    this.curStep = -1
                    this.nextStep()
                    break
                }
            }
        }
    }
    nextStep() {
        if(this.curGuideId < 0) {
            return
        }
        this.curStep += 1
        let nextGuideData = this.getGuideData(this.curGuideId, this.curStep)
        if(nextGuideData == null) {
            this.closeGuide()
            return
        }
        this.curGuideData = nextGuideData
        this.guideLayer.showView(this.curGuideData)
    }
    isInGuide() {
        return (this.curGuideId != -1)
    }
    closeGuide() {
        EventManager.instance.dispatchEvent(EventEnum.GUIDE_FINISHED, this.curGuideId)
        this.guideLayer.hideView()
        this.curGuideData = null
        this.curGuideId = -1
        this.curStep = -1
    }
    onFinishGuide(guideId) {
        this.finishedGuideIds.push(parseInt(guideId))
    }
    onStopGuide() {
        this.guideLayer.hideView()
        this.curGuideData = null
        this.curGuideId = -1
        this.curStep = -1
    }
    onJumpGuide(guideStepStr) {
        let guideStepList = guideStepStr.split("|")
        this.curGuideId = parseInt(guideStepList[0])
        this.curStep = parseInt(guideStepList[1]) - 1
        this.nextStep()
    }
    getGuideNode(guideNodeName: string): cc.Node {
        let guideNode = this.guideNodeList[guideNodeName]
        if(cc.isValid(guideNode)) {
            return guideNode
        }
    }
    registerGuideNode(guideNodeName: string, guideNode: cc.Node) {
        this.guideNodeList[guideNodeName] = guideNode
        if(guideNode && this.curGuideData && guideNodeName == this.curGuideData.guideNodeName) {
            this.guideLayer.showView(this.curGuideData)
        }
    }
}