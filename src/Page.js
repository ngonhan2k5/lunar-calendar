import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'

import MonthTable from './MonthTable.js'
import DateTable from './DateTable'

import './App.css'
import Utils from './utils'


class Page extends Component{
    constructor(props){
        super()
        
        // this.monthData = Utils.getSelectedMonth()
        console.log(222,props.match.params)
        var d = props.match.params,
        selectDate = d.syear?{sday:parseInt(d.sday), smonth:parseInt(d.smonth), syear:parseInt(d.syear)}:null,
        selectMonth = d.syear?{mm:parseInt(d.smonth),yy:parseInt(d.syear)}: Utils.getSelectedMonth()

        // console.log(222,selectDate)
        this.state = {
            selectedMonth: selectMonth,
            selectedDate: selectDate//Utils.getDateInfo()
        }
        this.actions={onNaviClick: this.onNaviClick.bind(this), onSelectedDateChange : this.onSelectedDateChange.bind(this)};
    }
    onNaviClick(MM, YY){
        var that = this
        return function(e){
            //console.log(6767,this, that, e, e.target)
            var sm = that.state.selectedMonth
            if (MM == -1 && sm.mm == 1){
                sm.mm=13, YY = -1
            }else if (MM == 1 && sm.mm == 12){
                sm.mm = 0, YY = 1
            }
            that.setState(Object.assign({}, that.state, {selectedMonth:{mm:sm.mm+MM,yy:sm.yy+YY}}) )
        }
    }
    onSelectedDateChange(solarDate, solarMonth, solarYear){
        var selectedDate = {sday:solarDate, smonth:solarMonth, syear:solarYear}
        this.setState(Object.assign({}, this.state, {selectedDate: selectedDate }) )
        this.props.history.push('/'+solarYear+'/'+solarMonth+'/'+solarDate)
    }
    
    render (){
        // Utils.setOutputSize("small");
        // console.log(Utils.printSelectedMonth());
        // Utils.showVietCal()
        // console.log(1111, this.props.match.params)
        return (
            <div className="application">

                <h1><Link to="/">Lunar Calendar - ReactJs</Link></h1>
                
                <table >
                    <thead>
                        <tr><td>
                            <DateTable month={this.state.selectedMonth} date={this.state.selectedDate} />
                        </td></tr>
                    </thead>
                    <tbody>
                        <tr><td>
                            <MonthTable month={this.state.selectedMonth} date={this.state.selectedDate} actions={this.actions}/>
                        </td></tr>
                    </tbody>
                </table>
            </div>
        )
    }
    getMonthData(){
        let _mdata = []
        for (var i=1; i<31; i++){
            _mdata.push({solarDate:i})
        }
        return _mdata
    }
}

export default withRouter(Page)