import React from 'react'
import Utils from './utils'
import {Helmet} from "react-helmet";

class DateTable extends React.Component {
    constructor(){
        super()
    }
    render (){
        var {sday, smonth, syear, dayOfWeek, dd, mm, yy, loaithang, tenthang, namam, 
        canchithang, canchingay, canchigio,
        tietkhi, dayinfo, hoangdao}= Utils.getDateInfo(this.props.date)
        var dinfo = dayinfo!==''?(dayinfo+'-'):''
        var homnay = this.props.date && `: ${dayOfWeek} ${sday}/${smonth}/${syear}` || `(hôm nay): ${dayOfWeek} ${sday}/${smonth}/${syear}`
        var des = `Âm lịch ${homnay}, nhằm ngày ${dd} tháng ${mm} ${loaithang} năm ${yy}, là ${canchingay} ${canchithang} ${namam} [${tietkhi}] ${dinfo} ${hoangdao}`
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`Âm lịch ${homnay} tức ngày ${dd} ${tenthang} ${namam} - Lunar Calendar - ReactJs`}</title>
                    <meta name="description" content={des} />
                </Helmet>
                <table className="thang" width="100%" border="0" cellPadding="1" cellSpacing="1">
                    <tbody>
                        <tr>
                            <td colSpan="2" id="thangduong" className="thangduong">Tháng {smonth} năm {syear}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" id="ngayduong" className="ngayduong">{sday}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" id="thuduong" className="thuduong">{dayOfWeek}</td>
                        </tr>

                        <tr>
                            <td> 
                                <div id="thangam" className="thangam">{tenthang}</div>
                                <div id="ngayam" className="ngayam">{dd}</div>
                                <div id="namam" className="thangam">{namam}</div>
                            </td>
                        <td className="canchi">
                            <div id="canchithang" className="gioam">{canchithang}</div>
                            <div id="canchingay" className="gioam">{canchingay}</div>
                            <div id="canchigio" className="gioam">{canchigio}</div>
                            <div id="tietkhi" className="gioam">{tietkhi}</div>
                        </td>
                        </tr>

                        <tr>
                            <td colSpan="2" id="dayinfo" className="info">{dayinfo}</td>
                        </tr>

                        <tr>
                            <td colSpan="2" id="hoangdao" className="hoangdao">{hoangdao}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DateTable