
import BaseView from "../../framework/viewbase/BaseView";
import CalendarView from "../../view/Common/CalendarView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HotSpringCalendar extends BaseView {
    @property(CalendarView)
    canlendarView: CalendarView = null

    private selectCallback: Function = null
    initByExData(exData: any): void {
        this.canlendarView.initByExData({
            curSelectTime: exData.curSelectTime
        })
        this.selectCallback = exData.selectCallback
    }

    onClickSure() {
        if(this.selectCallback) {
            let selectTime = this.canlendarView.getSelectDay()
            this.selectCallback(selectTime)
        }
        this.onCloseView()
    }
}