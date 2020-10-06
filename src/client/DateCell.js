import React, {Component} from 'react'
import Utils from './utils/utils'

class DateCell extends Component{
    constructor(){
        super()
        //this.alertDayInfo = this.alertDayInfo.bind(this)
    }
     
    render (){
        var today = new Date();
        var {lunarDate, solarDate, solarMonth, solarYear, selDate, haveMemo} = this.props.data
        var cellClass, solarClass, lunarClass, solarColor;
        cellClass = "ngaythang";
        solarClass = "t2t6";
        lunarClass = "am";
        solarColor = "black";
        var dow = (lunarDate.jd + 1) % 7;
        if (dow == 0) {
            solarClass = "cn";
            solarColor = "red";
        } else if (dow == 6) {
            solarClass = "t7";
            solarColor = "green";
        }
        var checkDate = selDate || {sday:today.getDate(), smonth:today.getMonth()+1, syear:today.getFullYear()}

        if (solarDate == checkDate.sday && solarMonth == checkDate.smonth && solarYear == checkDate.syear) {
            cellClass = "homnay";
            // console.log("homnay", cellClass,selDate)
        }
        if (lunarDate.day == 1 && lunarDate.month == 1) {
            cellClass = "tet";
        }
        if (lunarDate.leap == 1) {
            lunarClass = "am2";
        }
        var lunar = lunarDate.day;
        if (solarDate == 1 || lunar == 1) {
            lunar = lunarDate.day + "/" + lunarDate.month;
        }
        
        var id = this.props.mId;
        var title =  (lunarDate != null)? Utils.getDayName(lunarDate):""
        //lunarDate.day + "," + lunarDate.month + "," + lunarDate.year + "," + lunarDate.leap +  "," + lunarDate.llen +
         ("," + lunarDate.jd + "," + solarDate + "," + solarMonth + "," + solarYear);
        //(lunarDate != null)? Utils.getDayName(lunarDate):""
        

        if (haveMemo){
            lunar = '⭐' + lunar
            haveMemo.map(item => {
                title += `\r\n⭐${item.title}`
            })
             
        }
        // this.alertDayInfo = function(e){
        //     var that = this
        //     // e.preventDefault()
        //     return (lunarDate !=null) && this.props.click(solarDate, solarMonth, solarYear) && false
        //     //Utils.showDayInfo(e.currentTarget, lunarDate.day, lunarDate.month, lunarDate.year, lunarDate.leap,
        //     //    lunarDate.llen, lunarDate.jd, solarDate, solarMonth, solarYear   )
        // }
        // this.alertDayInfo = this.alertDayInfo.bind(this)
        return (
            
        <td className={cellClass} id={'cell'+ id} title={title} onClick={this.props.click(solarDate, solarMonth, solarYear)} >
            <div style={{color:solarColor}} className={solarClass}><a onClick={()=>false} href={`/${solarYear}/${solarMonth}/${solarDate}`}>{solarDate}</a></div> 
            <div className={lunarClass}>{lunar}</div>
        </td>
        
        )
    }
}

export default DateCell