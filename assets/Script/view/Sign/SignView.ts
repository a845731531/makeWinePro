import { NetMsgDef } from "../../../resources/pb/NetMsgDef";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import SignManager from "../../data/sign/SignManager";
import List from "../../framework/component/List";
import EventManager from "../../framework/manager/EventManager";
import BaseView from "../../framework/viewbase/BaseView";
import SignItemView from "./SignItemView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SignView extends BaseView {

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    @property(cc.Node)
    preViewLayout: cc.Node = null;

    @property(cc.Button)
    signBtn: cc.Button = null;

    @property(List)
    list: List = null;

    private signConfigList = []
    private itemList: cc.Node[] = []

    onLoad () {
        this.addListener()
        this.updateView()
    }

    addListener()
    {
        EventManager.instance.addEventListener(CustomEventEnum.SIGN_UPDATE_VIEW,this.updateView,this)
    }

    updateView()
    {
        this.signConfigList = SignManager.instance.getSignConfigList()

        let index = 0
        for(let i = 0; i < this.signConfigList.length; i++)
        {
            if(this.signConfigList[i].preview)
            {
                if(!this.itemList[index])
                {
                    let item = cc.instantiate(this.itemPrefab)
                    item.getComponent(SignItemView).updateView(this.signConfigList[i],true)
                    this.preViewLayout.addChild(item)
                    this.itemList.push(item)
                }else{
                    this.itemList[index].getComponent(SignItemView).updateView(this.signConfigList[i],true)
                }
                index++
            }
        }

        this.signBtn.interactable = SignManager.instance.checkCanGetSign()


        this.list.numItems = this.signConfigList.length
    }

    onRenderEvent(item: cc.Node, index: number) {
        item.getComponent(SignItemView).updateView(this.signConfigList[index],false)
    }

    onSelectEvent(item: cc.Node, selectIndex: number, lastIndex: number) {
        // console.log("点击了Item--->", this.bagDataList[selectIndex])
        // EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
        //     viewName: PrefabPathEnum.BagItemInfoView,
        //     exData:this.bagDataList[selectIndex]
        // })
    }

    onClickSign()
    {
        EventManager.instance.dispatchEvent(CustomEventEnum.SIGN_CLICK_SIGN)
    }


    onClickClose()
    {
        this.onCloseView()
    }

    removeListener()
    {
        EventManager.instance.removeTargetListener(this)
    }

    onDestroy(){
        this.removeListener()
    }
}
