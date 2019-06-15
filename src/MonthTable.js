import React, {Component} from 'react'
import HeadRow from './HeadRow'
import DateCell from './DateCell';
import Utils from './utils'

class MonthTable extends Component{
    render (){
    // function printTable(mm, yy) {
        // var i, j, k, solar, lunar, cellClass, solarClass, lunarClass;
        var {mm, yy} = this.props.month;
        var currentMonth = Utils.getMonth(mm, yy);
        if (currentMonth.length == 0) return <div>Blank</div>;

        // console.log(1111111111,currentMonth.length)
        var ld1 = currentMonth[0];
        var emptyCells = (ld1.jd + 1) % 7;
        // var MonthHead = mm + "/" + yy;
        // var LunarHead = Utils.getYearCanChi(ld1.year);
        return (
        // var res = "";
            <table className="thang" border="2" cellPadding="1" cellSpacing="1" >
                <HeadRow mm={mm} yy={yy} click={this.props.actions.onNaviClick}/>
                <tbody>
                {Array(6).fill().map( (v, i) => {
                    return (
                    <tr key={i}>
                        {Array(7).fill().map( (v, j) => {
                            var k = 7 * i + j;
                            var solar = k - emptyCells + 1;
                            var ld1 = currentMonth[k - emptyCells];
                            var cellData = {lunarDate:ld1, solarDate:solar, solarMonth:mm, solarYear:yy, selDate:this.props.date}
                            return (k < emptyCells || k >= emptyCells + currentMonth.length)?
                                <td className='ngaythang' key={k} id={'cell'+k}><div className='cn'>&nbsp;</div> <div className='am'>&nbsp;</div></td>:
                                <DateCell data={cellData} key={k} mId={k} click={this.props.actions.onSelectedDateChange}/>                                
                        }) }
                    
                    </tr>
                    )
                }) }
                </tbody>
            </table>
        )
    }
}

export default MonthTable