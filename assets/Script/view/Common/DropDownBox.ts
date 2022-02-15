import List from "../../framework/component/List";

//下拉框
const {ccclass, property} = cc._decorator;

@ccclass
export default class DropdownBox extends cc.Component {

    @property(cc.Label)
    curSelectLabel: cc.Label = null

    @property(cc.Node)
    openArrow: cc.Node = null

    @property(List)
    optionListView: List = null

    private isOpen = false

    private curSelectIndex = 0
    private curSelectValue = 0
    private optionList = []

    private callback = null

    private optionConfig = null

    initDropDownBox(optionConfig?, callback?)
    {
        this.optionConfig = optionConfig
        this.callback = callback

        this.optionList = []
        for(let i in this.optionConfig)
        {
            this.optionList.push(this.optionConfig[i])
        }

        if(this.optionConfig)
        {
            //默认选中第一个选项
            this.curSelectIndex = 0
            this.curSelectValue = this.optionList[0].value
            this.updateView()
            // this.onClickOption()
        }
    }

    updateView()
    {
        //全部
        if(this.optionList[this.curSelectIndex])
        {
            this.curSelectLabel.string = this.optionList[this.curSelectIndex].name
        }

        this.isOpen? (this.openArrow.angle = 0) : (this.openArrow.angle = 180)

        this.optionListView.node.active = this.isOpen
        this.optionListView.numItems = this.optionList.length

        let minCount = Math.min(this.optionList.length, 6)
        this.optionListView.node.height = minCount * 30

    }

    onRenderItem(itemNode: cc.Node, index) {
        itemNode.active = true

        //选项名字
        let optionLabel = itemNode.getComponentInChildren(cc.Label)
        optionLabel && (optionLabel.string = this.optionList[index].name)

        //展开、收缩的箭头
        let arrow = itemNode.getChildByName("arrow") as cc.Node
        arrow.active = this.optionList[index].children.length > 0

        if(this.optionList[index+1] && this.optionList[index].children[0] && this.optionList[index+1].index == this.optionList[index].children[0].index)
        {
            //箭头向上   当前选项在展开状态
            arrow.angle = 0
        }else{
            //箭头向下  当前选项在收缩状态
            arrow.angle = 180
        }

    }

    onSelectItem(itemNode, index) {
        if(!itemNode) {
            return
        }

        
        if(this.optionList[index].children.length == 0)
        {
            //返回选中的选项
            this.curSelectIndex = index
            this.curSelectValue = this.optionList[index].value
            this.onClickOption()
        }else{
            //展开选项
            this.changeOptionList(this.optionList[index])
        }

    }

    /**
     * 打开或者关闭 子选项
     */
    changeOptionList(optionData)
    {
        for(let i = 0; i < this.optionList.length; i++)
        {
            if(this.optionList[i].index == optionData.index)
            {
                if(this.optionList[i+1] && this.optionList[i+1].index == optionData.children[0].index)
                {
                    //收起这个选项的子选项
                    this.optionList.splice(i + 1,optionData.children.length)
                }else{
                    //展开这个选项的子选项
                    let index = i
                    for(let k = 0; k < optionData.children.length; k++)
                    {
                        this.optionList.splice(++index,0,optionData.children[k])
                    }
                }
                break
            }
        }

        this.updateView()
    }

    /**
     * 选中下拉框
     */
    onClickOption()
    {
        this.isOpen = false
        this.updateView()
        this.callback && this.callback(this.curSelectValue)
    }

    /**
     * 展开或者收起下拉框
     */
    onClickOpenList()
    {
        this.isOpen = !this.isOpen
        
        this.updateView()
    }

    getSelectValue()
    {
        return this.curSelectValue
    }
}