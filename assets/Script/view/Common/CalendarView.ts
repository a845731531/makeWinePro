import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { CalendarHelper } from "../../framework/manager/CalendarHelper";
import EventManager from "../../framework/manager/EventManager";
import { NetManager } from "../../framework/network/NetManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CalendarView extends cc.Component {
    @property(cc.Node)
    itemParent: cc.Node = null
    @property(cc.Node)
    itemPre: cc.Node = null

    @property(cc.Label)
    monthLabel: cc.Label = null

    @property(cc.Node)
    selectNode: cc.Node = null
    @property(cc.Node)
    btnPre: cc.Node = null

    private curSelectTime: number = 0
    private shouldShowLunar = false  //是否显示农历
    private canSelectBefore = false //能否选择今天之前的时间
    private curYear = 2022;
    private curMonth = 1;
    private curDay = 1;
    private selectYear = 2022;
    private selectMonth = 1;
    private selectCallback: Function = null;
    private itemPool: cc.NodePool = new cc.NodePool()


  
    private selectZeroTime

    onEnable() {
        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_UPDATE_DATEITEM, this.updateDateItem, this)
       
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }

    initByExData(exData: any): void {
        this.curSelectTime = exData.curSelectTime || new Date().getTime()
        this.shouldShowLunar = exData.shouldShowLunar
        let curDate = new Date(this.curSelectTime)
        this.curYear = curDate.getFullYear()
        this.curMonth = curDate.getMonth() + 1
        this.curDay = curDate.getDate()
        this.selectYear = this.curYear
        this.selectMonth = this.curMonth
        this.updateView()
    }
    updateView() {
        this.monthLabel.string = cc.js.formatStr("%s年%s月", this.selectYear, this.selectMonth)
        let dayList = CalendarHelper.getMonthDayList(this.selectYear, this.selectMonth)
        let children = this.itemParent.children
        for(let i = children.length - 1; i >= 0; i--) {
            this.itemPool.put(children[i])
        }
        this.selectNode.active = false
        let selectDayNode = null
        let curRealDate = new Date()

        //0-6: 周日到周六
        for(let i = 0; i < dayList.length; i++) {
            let itemData = dayList[i]
            let itemNode: any = this.itemPool.get()
            if(!itemNode) {
                itemNode = cc.instantiate(this.itemPre)
                itemNode.active = true
            }
            itemNode.parent = this.itemParent
            itemNode.attr({
                itemData: itemData
            })
            let dayLabel = itemNode.dayLabel
            if(!dayLabel) {
                continue
            }
            dayLabel.string = itemData.day.toString()
            
            if(!itemData.isCurMonth) {
                dayLabel.node.color = cc.color(137,133,128)
            } else if (itemData.weekDay == 0 || itemData.weekDay == 6) {
                dayLabel.node.color = cc.color(173,82,75)
            } else {
                dayLabel.node.color = cc.color(78,75,71)
            }
            if(itemData.year == curRealDate.getFullYear() && itemData.month == (curRealDate.getMonth() + 1) && itemData.day == curRealDate.getDate()) {
                dayLabel.node.color = cc.Color.BLUE
            }
            if(this.shouldShowLunar && itemNode.lunarLabel) {
                let lunarInfo = CalendarHelper.getLunarInfo(itemData.year, itemData.month, itemData.day)
                itemNode.lunarLabel.string = lunarInfo.IDayCn
                itemNode.lunarLabel.node.color = dayLabel.node.color
            }
            
            if(this.curYear == itemData.year && this.curMonth == itemData.month && this.curDay == itemData.day) {
                selectDayNode = itemNode
            }
        }

        if(selectDayNode) {
            this.itemParent.getComponent(cc.Layout).updateLayout()
            this.selectNode.active = true
            let worldPos = selectDayNode.parent.convertToWorldSpaceAR(selectDayNode.position)
            this.selectNode.setPosition(this.selectNode.parent.convertToNodeSpaceAR(worldPos))
        }
        let realTime = curRealDate.getTime()
        let selectDate = new Date(this.selectYear, this.selectMonth - 1, 0).getTime()
        this.btnPre.active = (realTime < selectDate)
    }

    onClickPreMonth() {
        this.selectMonth -= 1
        if(this.selectMonth < 1) {
            this.selectYear -= 1
            this.selectMonth = 12
        }
        this.updateView()
    }
    onClickNextMonth() {
        this.selectMonth += 1
        if(this.selectMonth > 12) {
            this.selectYear += 1
            this.selectMonth = 1
        }
        this.updateView()
    }
    onClickItemDay(event) {
        let targetNode = event.target
        let itemData = targetNode.itemData
        // this.targetNode=targetNode
        // this.itemData=itemData
        let realTime = new Date().getTime()
        let selectTime = new Date(itemData.year, itemData.month - 1, itemData.day, 24).getTime()
        if(selectTime < realTime) {
            return
        }
        let selectZeroTime= new Date(itemData.year, itemData.month - 1, itemData.day, 0).getTime()
        this.selectZeroTime=selectZeroTime
        NetManager.instance.sendMsg("stLookDayWeddingCmd_CS", {
            lookTime: selectZeroTime/1000,
        })
        this.curDay = itemData.day
        this.curYear = itemData.year
        this.curMonth = itemData.month
        if(itemData.isCurMonth) {
            this.selectNode.active = true
            let worldPos = targetNode.parent.convertToWorldSpaceAR(targetNode.position)
            this.selectNode.setPosition(this.selectNode.parent.convertToNodeSpaceAR(worldPos))
        } else {
            this.selectYear = this.curYear
            this.selectMonth = this.curMonth
            this.updateView()
        }
       
       
    }

    updateDateItem(){
       EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_UPDATE_TIME,this.selectZeroTime)
       
    }
    getSelectDay() {
        return new Date(this.curYear, this.curMonth - 1, this.curDay).getTime()
    }
}