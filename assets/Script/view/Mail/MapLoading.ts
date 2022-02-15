import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import OffScreenHideListener from "../Map/OffScreenHideListener";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MapLoading extends cc.Component {

    @property(cc.Node)
    bgNode: cc.Node = null

    @property(cc.Node)
    buildingNode: cc.Node = null

    @property(cc.Node)
    treeNode: cc.Node = null

    @property(cc.Node)
    waterNode: cc.Node = null

    @property(cc.Node)
    waterEffectNode: cc.Node = null

    @property(cc.Node)
    effectNode: cc.Node = null

    private _loadList = []

    private _frame = 4
    private _loadFrame = 2
    private _loadCompeleteCount = 0

    onLoad() {
        this._loadList = []

        this.initList(this.bgNode)
        this.initList(this.buildingNode)
        this.initList(this.treeNode)

        this.addOffScreenCom(this.waterNode)
        this.addOffScreenCom(this.waterEffectNode)
        this.addOffScreenCom(this.effectNode)

        let fram = this._frame * 0.0166666
        this.schedule(this.loadTexture,fram,cc.macro.REPEAT_FOREVER, 0.3)
    }

    private _index = 1
    initList(parentNode)
    {
        if(cc.isValid(parentNode) && parentNode.children)
        {
            for(let i = 0; i < parentNode.children.length; i++)
            {
                let node: cc.Node = parentNode.children[i]
                node.zIndex = Tool.getBuildingZIndex(node.y)
                let spriteCom = node.getComponent(cc.Sprite)
                if(node.active && spriteCom && spriteCom.spriteFrame == null)
                {
                    if(!node.getComponent(OffScreenHideListener))
                    {
                        node.addComponent(OffScreenHideListener)
                    }
                    this._loadList.push({
                        index: this._index++,
                        name: node.name,
                        spriteCom: spriteCom
                    })
                }
            }
        }
    }

    addOffScreenCom(parentNode)
    {
        if(cc.isValid(parentNode) && parentNode.children)
        {
            for(let i = 0; i < parentNode.children.length; i++)
            {
                let node: cc.Node = parentNode.children[i]
                let spriteCom = node.getComponent(cc.Sprite)
                if(node.active && spriteCom && spriteCom.spriteFrame == null)
                {
                    if(!node.getComponent(OffScreenHideListener))
                    {
                        node.addComponent(OffScreenHideListener)
                    }
                }
            }
        }
    }

    loadTexture()
    {

        if(this._loadList.length == 0)
        {
            this.unschedule(this.loadTexture)
            return
        }

        for(let i = 0; i < this._loadFrame; i++)
        {
            if(this._loadList.length > 0)
            {
                let data = this._loadList.shift()
                Tool.setSpriteFrame(data.spriteCom, data.name, "map")
            }
        }
    }

}