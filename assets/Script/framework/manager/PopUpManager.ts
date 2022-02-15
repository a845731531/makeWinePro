
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { EventEnum } from "../FrameWorkEnum";
import EventManager from "./EventManager";
import { Tool } from "./Tool";

/**
 * 弹窗管理系统
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class PopUpManager extends cc.Component {

    @property(cc.Node)
    viewParent: cc.Node = null;
    @property(cc.Node)
    toastPrefab: cc.Node = null;
    @property(cc.Node)
    modalPrefab: cc.Node = null;
    @property(cc.Node)
    maskNode: cc.Node = null;

    private loadingPrefabs: string[] = [];

    onLoad() {
        //绑定常驻节点
        cc.game.addPersistRootNode(this.node);
    }

    start() {
        EventManager.instance.addEventListener(EventEnum.SHOW_TOAST, this.showToast, this)
        EventManager.instance.addEventListener(EventEnum.SHOW_MODAL, this.showModal, this)
        EventManager.instance.addEventListener(EventEnum.HIDE_MODAL, this.hideModal, this)
        EventManager.instance.addEventListener(EventEnum.SHOW_POPUP, this.onShowPopUp, this)
        EventManager.instance.addEventListener(EventEnum.CLOSE_ALL_POPUP, this.closeAllPopUp, this)
        EventManager.instance.addEventListener(EventEnum.CLOSE_POPUP_BYNAME, this.closePopUpByName, this)
        EventManager.instance.addEventListener(EventEnum.CLOSE_POPUP_BYVIEW, this.closePopUpByView, this)
    }

    onDestroy() {
        EventManager.instance.removeTargetListener(this)
    }

    /**
     * 显示提示tips
     * @param msg 
     * @param time 
     */
    public showToast(param: { msg: string, time: number }) {
        let toastNode = cc.instantiate(this.toastPrefab);
        toastNode.parent = this.viewParent;
        toastNode.zIndex = 10;  //比模态弹窗更高
        toastNode.active = true

        let toastScript = toastNode.getComponent('ToastNode')
        toastScript && toastScript.initMsg(param.msg, param.time);
    }

    /**
     * 显示模态对话框
     */
    public showModal(configData: any) {
        let modalNode = cc.instantiate(this.modalPrefab);
        modalNode.parent = this.viewParent;
        modalNode.zIndex = 5;  //比提示低,比界面高
        modalNode.active = true

        let modalScript = modalNode.getComponent('ModalNode')
        modalScript && modalScript.initModal(configData)
    }
    /**
     * 关闭模态对话框
     */
    public hideModal() {
        let modalScript = this.viewParent.getComponentInChildren("ModalNode")
        if(modalScript) {
            modalScript.node.destroy()
        }
    }

    
    /**
     * 创建带遮罩的节点
     * @param prefabPath 
     * @param callback 
     */
    public createNodeWithMask(prefabPath: string, callback: any) {
        this.loadingPrefabs.push(prefabPath)
        Tool.loadPrefab(prefabPath, (itemNode) => {
            let index = this.loadingPrefabs.indexOf(prefabPath)
            if(index == -1) {
                return
            }
            this.loadingPrefabs.splice(index, 1)

            let maskLayer = cc.instantiate(this.maskNode)  //统一添加遮罩
            let nodeName = prefabPath.slice(prefabPath.lastIndexOf("/") + 1)
            itemNode.name = nodeName
            itemNode.parent = maskLayer

            maskLayer.name = nodeName
            maskLayer.active = true
            callback(maskLayer, itemNode)
        })
    }

    /**
     * 显示出弹出框
     * multiPopup允许同时多个弹窗
     * @param popupPrefabName 
     * @param exData 
     * @param callback 
     */
    public showPopUp(viewData: any) {
        let popupPrefabName = viewData.viewName
        let exData = viewData.exData || {}
        let callback = viewData.callback

        console.log("showPopUp:", popupPrefabName)

        let resourcePath = popupPrefabName
        this.createNodeWithMask(resourcePath, (maskLayer, itemNode) => {
            //存在相同页面时，不再次弹出
            let nodeName = resourcePath.slice(resourcePath.lastIndexOf("/") + 1)
            let oldNode = this.viewParent.getChildByName(nodeName)
            if (oldNode && !exData.multiPopup) {
                return
            }
            if(viewData.maskOpacity != null) {
                maskLayer.getChildByName("MaskSpr").opacity = viewData.maskOpacity
            }
            maskLayer.parent = this.viewParent

            let itemScript = itemNode.getComponent("BaseView")  //基类统一继承方法
            itemScript && itemScript.initByExData(exData)

            if (callback)
                callback()
        })
    }

    /**
     * 关闭所有弹窗
     */
    public closeAllPopUp() {
        let children = this.viewParent.children
        for(let i = children.length - 1; i >= 0; i--) {
            children[i].destroy()
        }
        this.loadingPrefabs.length = 0
    }

    /**
     * 根据名称关闭制定弹窗
     * @param viewName 
     */
    public closePopUpByName(prefabPath: string) {
        let nodeName = prefabPath.slice(prefabPath.lastIndexOf("/") + 1)
        let child = this.viewParent.getChildByName(nodeName)
        if (child) {
            child.destroy()
        }
    }

    /**
     * 根据节点关闭指定弹窗
     * @param viewNode 
     */
    public closePopUpByView(viewNode: cc.Node) {
        if (viewNode.parent) {
            viewNode.parent.parent = null
            viewNode.parent.destroy()
        }
    }

    public onShowPopUp(viewData) {
        this.showPopUp(viewData);
    }
}
