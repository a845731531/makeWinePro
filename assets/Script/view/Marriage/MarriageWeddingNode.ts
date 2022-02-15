import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { SoundEnum } from "../../Constant/SoundEnum";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import CalendarView from "../Common/CalendarView";
import DropdownView from "../Common/DropdownView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MarriageWeddingNode extends cc.Component {
    @property(CalendarView)
    calendarView: CalendarView = null
    @property(DropdownView)
    timeDropDown: DropdownView = null
    @property(DropdownView)
    styleDropDown: DropdownView = null

    private styleTextList: string[] = ["中式", "西式"]
    private timeTextList: string[] = []
    start() {
        this.calendarView.initByExData({
            shouldShowLunar: true,
        })
        this.styleDropDown.setOptionList(this.styleTextList)
    }
    onEnable() {
        this.updateNumItems(null)
        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_UPDATE_TIME, this.updateNumItems, this)
    }


    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    updateNumItems(time){
        this.timeTextList.length = 0
        let curDate = new Date()
        let curTime=curDate.getTime()
        let startMinute 
        let endMinute
        let  laterTime=new Date(time)
        if (time>curTime) {
            startMinute = Math.ceil( (laterTime.getHours() * 60 + laterTime.getMinutes()) / 15) * 15
        }else{
            startMinute = Math.ceil( (curDate.getHours() * 60 + curDate.getMinutes()) / 15) * 15
        }
         endMinute = 24 * 60
        for(let minute = startMinute; minute < endMinute; minute += 15) {
            this.timeTextList.push(Tool.formatTime(minute * 60, "HH:mm"))
        }
        this.timeDropDown.setOptionList(this.timeTextList)
        this.timeDropDown.setCurSelectIndex(0)
        EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_UPDATE_TIMEOPEN)
        
    }
    onClickOrder() {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        let selectDay = this.calendarView.getSelectDay()
        let selectTimeIndex = this.timeDropDown.getSelectIndex()
        let selectTime =  this.timeTextList[selectTimeIndex].split(":")
        let selectHour = parseInt(selectTime[0])
        let selectMinute = parseInt(selectTime[1])
        let selectDate = new Date(selectDay)
        selectDate.setHours(selectHour)
        selectDate.setMinutes(selectMinute)
        selectDate.setSeconds(0)
        let selectStyle = this.styleDropDown.getSelectIndex()
        NetManager.instance.sendMsg("stApplyWeddingCmd_CS", {
            startTime: selectDate.getTime()/1000,
            type: selectStyle+1,  //1是中式  2是西式
        })
        //EventManager.instance.dispatchEvent(CustomEventEnum.MARRIAGED_UPDATE_WISHTIME)
     
    }
}