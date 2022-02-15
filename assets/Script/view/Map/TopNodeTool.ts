import NpcManager from "../../data/npc/NpcManager";
import { Tool } from "../../framework/manager/Tool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TopNodeTool extends cc.Component {

    //起始父节点
    @property(cc.Node)
    originalParent: cc.Node = null;

    @property
    zIndex: number = 1

    //目标父节点
    private _tagParent: cc.Node = null

    private _originalWidth = 0
    private _originalPos: cc.Vec2 = null
    private _worldPos: cc.Vec2 = null

    onLoad()
    {
        //设置位置变化监听
        this.originalParent.on(cc.Node.EventType.POSITION_CHANGED,this.updatePosition,this)

        //设置显示隐藏变化监听
        this.originalParent.on("active-in-hierarchy-changed",this.updateVisible,this)

        this._originalWidth = this.node.width
    }

    //这里要延迟一下在执行
    start()
    {
        this.scheduleOnce(()=>{
            this._tagParent = NpcManager.instance.getTopTagParent()
            if(this._tagParent && this.originalParent)
            {
                //在起始父节点的坐标
                let worldPos = this.node.parent.convertToWorldSpaceAR(cc.v2(this.node.x, this.node.y))
                this._originalPos = this.originalParent.convertToNodeSpaceAR(worldPos)
            }
            this.updatePosition()
        },0.1)
    }

    updateVisible()
    {
        if(this.originalParent.active && cc.isValid(this.originalParent.parent))
        {
            this.node.width = this._originalWidth
            this.node.opacity = 255
        }else{
            this.node.width = 0
            this.node.opacity = 0
        }
    }

    updatePosition()
    {
        if(!cc.isValid(this.originalParent) || !cc.isValid(this._tagParent))
        {
            return
        }

        //世界坐标
        this._worldPos = this.originalParent.convertToWorldSpaceAR(this._originalPos)

        this.node.parent = this._tagParent
        //新父节点局部坐标
        let newPos= this._tagParent.convertToNodeSpaceAR(this._worldPos)
        this.node.setPosition(newPos)
        this.node.zIndex = this.zIndex
    }

    checkDestroy()
    {
        //父节点不存在 则销毁当前节点
        if(!cc.isValid(this.originalParent) || !cc.isValid(this._tagParent))
        {
            this.node.destroy()
        }
    }

    onDestroy()
    {

        if(this._tagParent && this.originalParent)
        {
            //设置位置变化监听
            this.originalParent.off(cc.Node.EventType.POSITION_CHANGED,this.updatePosition,this)

            //设置显示隐藏变化监听
            this.originalParent.off("active-in-hierarchy-changed",this.updatePosition,this)

        }

    }
}