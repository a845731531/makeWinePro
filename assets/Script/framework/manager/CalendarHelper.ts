
import {calendar} from "../library/calendar"

export class CalendarHelper {
    //month 1-12
    static getMonthDayList(year: number, month: number) {
        let monthStartDate = new Date(year, month - 1, 1)   //month0-11
        let monthEndDate = new Date(year, month, 0)         //下个月第0天等于上个月最后一天
        let startWeekDay = monthStartDate.getDay()  //0-6,0是周日
        let endDay = monthEndDate.getDate()
        let dayList = []
        for(let day = 1; day <= endDay; day++) {
            let weekDay = (startWeekDay + day - 1) % 7
            let itemData = {
                year: year,
                month: month,
                weekDay: weekDay,
                day: day,
                isCurMonth: true,
            }
            dayList.push(itemData)
        }
        //补充下个月数值
        let lastDayObj = dayList[dayList.length - 1]
        let lastWeekDay = lastDayObj.weekDay
        if(lastWeekDay < 6) {
            let nextMonthStartDate = new Date(year, month, 1)
            let nextMonthYear = nextMonthStartDate.getFullYear()
            let nextMonth = nextMonthStartDate.getMonth() + 1
            let nextMonthDay = nextMonthStartDate.getDate()

            for(let weekDay = lastWeekDay + 1; weekDay <= 6; weekDay++, nextMonthDay++) {
                let itemData = {
                    year: nextMonthYear,
                    month: nextMonth,
                    weekDay: weekDay,
                    day: nextMonthDay,
                    isCurMonth: false,
                }
                dayList.push(itemData)
            }
        }

        //需要补充上个月的数值
        if(startWeekDay > 0) {
            let lastMonthEndDate = new Date(year, month - 1, 0)
            let lastMonthYear = lastMonthEndDate.getFullYear()
            let lastMonth = lastMonthEndDate.getMonth() + 1
            let lastMonthDay = lastMonthEndDate.getDate()
            for(let weekDay = startWeekDay - 1; weekDay >= 0; weekDay--, lastMonthDay--) {
                let itemData = {
                    year: lastMonthYear,
                    month: lastMonth,
                    weekDay: weekDay,
                    day: lastMonthDay,
                    isCurMonth: false,
                }
                dayList.unshift(itemData)
            }
        }

        return dayList
    }
    //gzYear,IMonthCn,IDayCn
    static getLunarInfo(year, month, day): {gzYear: string, IMonthCn: string, IDayCn: string} {
        return calendar.solar2lunar(year, month, day)
    }
}