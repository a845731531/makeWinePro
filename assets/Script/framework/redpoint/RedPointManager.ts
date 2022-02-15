import { EventEnum, GuideData } from "../FrameWorkEnum";
import EventManager from "../manager/EventManager";

export interface RedPointConditionExecuter {
    shouldShowRedPoint(): boolean;
}

export default class RedPointManager {

    private static _instance: RedPointManager;
    private conditionExecuterList: {[redPointName: string]: RedPointConditionExecuter} = {}
    private redPointDepend: {[redPointName: string]: string[]} = {}
    private redPointParent: {[redPointName: string]: string[]} = {}
    private redPointNodeList: {[redPointName: string]: cc.Node[]} = {}

    public static get instance(): RedPointManager {
        if(this._instance == null) {
            this._instance = new RedPointManager();
        }
        return this._instance;
    }
    constructor() {
    }
    //设置红点之间的依赖关系，如邮件按钮的红点为MailBtn，其需要判断UnReadMail、FirstOpenMail等
    //格式为mainBtn = [UnReadMail,FirstOpenMail]
    setRedPointDepend(dependConfig) {
        this.redPointDepend = dependConfig
        for(let parentName in this.redPointDepend) {
            let childNameList = this.redPointDepend[parentName]
            for(let i = 0, len = childNameList.length; i < len; i++) {
                let childName = childNameList[i]
                let parentList = this.redPointParent[childName]
                if(!parentList) {
                    parentList = this.redPointParent[childName] = []
                }
                parentList.push(parentName)
            }
        }
    }
    //注册红点判断回调
    registerExecuter(redPointName: string, executer: RedPointConditionExecuter) {
        this.conditionExecuterList[redPointName] = executer
    }
    //添加红点监听节点
    addRedPointNode(redPointName: string, pointNode: cc.Node) {
        let nodeList = this.redPointNodeList[redPointName]
        if(!nodeList) {
            nodeList = this.redPointNodeList[redPointName] = []
        }
        nodeList.push(pointNode)
        pointNode.active = this.shouldShowRedPoint(redPointName)

        //清除无效节点
        for(let i = nodeList.length - 1; i >= 0; i--) {
            let itemNode = nodeList[i]
            if(!cc.isValid(itemNode)) {
                nodeList.splice(i, 1)
            }
        }
    }
    //判断redPointName是否应该显示，递归判断其依赖
    shouldShowRedPoint(redPointName: string) {
        let isShow = false
        let executer = this.conditionExecuterList[redPointName]
        if(executer) {
            isShow = executer.shouldShowRedPoint()
        }
        //递归判断依赖
        let dependList = this.redPointDepend[redPointName]
        if(!isShow) {
            for(let i = 0, len = dependList.length; i < len; i++) {
                let dependName = dependList[i]
                isShow = isShow || this.shouldShowRedPoint(dependName)
                if(isShow) {
                    break
                }
            }
        }
        return isShow
    }
    //检查更新红点
    updateRedPoint(redPointName: string, childMatch: boolean = false) {
        let isShow = childMatch || this.shouldShowRedPoint(redPointName)
        let nodeList = this.redPointNodeList[redPointName] || []
        for(let i = 0, len = nodeList.length; i < len; i++) {
            let itemNode = nodeList[i]
            if(cc.isValid(itemNode)) {
                itemNode.active = isShow
            }
        }
        //递归更新依赖它的父节点
        let parentNameList = this.redPointParent[redPointName]
        for(let i = 0, len = parentNameList.length; i < len; i++) {
            let parentName = parentNameList[i]
            this.updateRedPoint(parentName, isShow)
        }
    }
}