import React from "react"
import Utils from './utils/utils'

class HeadRow extends React.Component {
    render(){ 
        var monthName = this.props.mm+"/"+this.props.yy
        //var {mm, yy} = this.props
	
        return (
            <thead>
                <tr>
                    <td colSpan="2" className="navi-l"><a href="#" title="Năm ngoái" onClick={this.props.click(0,-1)}>&nbsp;&lt;&lt;&nbsp;</a> &nbsp; <a href="#" title="Tháng trước" onClick={this.props.click(-1,0)}>&nbsp;&nbsp;&lt;&nbsp;</a></td>
                    <td colSpan="3" className="tenthang" onClick={Utils.showMonthSelect}>{monthName}</td>
                    <td colSpan="2" className="navi-r"><a href="#" title="Tháng sau" onClick={this.props.click(1,0)}>&nbsp;&gt;&nbsp;&nbsp;</a> &nbsp;<a href="#" title="Năm sau" onClick={this.props.click(0,1)}>&nbsp;&gt;&gt;&nbsp;</a></td>
                </tr>
                <tr onClick={Utils.alertAbout}>
                {
                    Array(7).fill().map((v,i)=>{
                        return <td className="ngaytuan" key={i}>{Utils.DAYNAMES[i]}</td>
                    })
                }
                </tr>
            </thead>
            )
        }
}

export default HeadRow