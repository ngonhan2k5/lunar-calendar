import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import MonthTable from './MonthTable.js'
import DateTable from './DateTable'
import MemoList from './memo'

//import memos from '../db'

import './App.css'
import Utils from './utils/utils'

import {apis} from './utils/api'


class Page extends Component{
    constructor(props){
        super()
        
        // this.monthData = Utils.getSelectedMonth()
        console.log(222,props.match.params)
        var d = props.match.params,
        selectDate = d.syear?{sday:parseInt(d.sday), smonth:parseInt(d.smonth), syear:parseInt(d.syear)}:Utils.getToday(),
        selectMonth = d.syear?{mm:parseInt(d.smonth),yy:parseInt(d.syear)}: Utils.getSelectedMonth()
        
        // this.memoz = []

        // console.log(222,selectDate)
        this.state = {
            selectedMonth: selectMonth,
            selectedDate: selectDate,//Utils.getDateInfo()
            // memos: Utils.populate(memos, selectMonth.yy, selectMonth.mm)
            memos:[],
            loginInfo:{sub:0}
        }
        this.actions={
            onNaviClick: this.onNaviClick.bind(this), 
            onSelectedDateChange : this.onSelectedDateChange.bind(this),
            onLogin : this.onLogin.bind(this),
            onLogout: this.onLogout,
            onAddNewMemo: this.onAddNewMemo,
            onRemoveMemo: this.onRemoveMemo,
            getUid : this.getUid
        };
        //this.actions.addNewMemo =this.onAddNewMeno

        // this.memos = Utils.populate(memos, selectMonth.yy, selectMonth.mm)
        
    }
    componentDidMount(){
        this.loadMemos(1);
    }
    loadMemos = (uid) => {
        apis.getMemos(uid).then(
            (res)=>{
                const memos = Utils.populate(res, this.state.selectedMonth.yy, this.state.selectedMonth.mm)
                this.setState(Object.assign({}, this.state, {memos: memos}))
            }
        )
        
    }
    getUid = () => {
        return this.state.loginInfo && this.state.loginInfo.sub || 0
    }
    onAddNewMemo = (m) => {
        if (!this.state.loginInfo.sub){
            alert('Login to add event')
            return
        }
        let uid = this.state.loginInfo.sub
        apis.addMemo(uid, m).then(//this.state.memos
            (res) => {
                var memos = res
                
                //this.memoz = memos
                memos = Utils.populate(memos, this.state.selectedMonth.yy, this.state.selectedMonth.mm)
                this.setState(Object.assign({}, this.state, {memos: memos}))
            })
    }
    onRemoveMemo = (id) => {
        let uid = this.state.loginInfo.sub
        apis.removeMemo(uid, id).then(//this.state.memos
            (res) => {
                var memos = res
                
                //this.memoz = memos
                memos = Utils.populate(memos, this.state.selectedMonth.yy, this.state.selectedMonth.mm)
                this.setState(Object.assign({}, this.state, {memos: memos}))
            })
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
            const obj = {selectedMonth:{mm:sm.mm+MM,yy:sm.yy+YY}} // clear memos
            that.setState(obj)
            // console.log(that.memoz)
            apis.getMemos(that.state.loginInfo.sub||0).then((memos) => {
                    let pmemos = Utils.populate(memos, obj.selectedMonth.yy, obj.selectedMonth.mm)
                    console.log(6666, pmemos)
                    that.setState( {memos: pmemos}) 
                }
            )
        }
    }
    onSelectedDateChange(solarDate, solarMonth, solarYear){
        var that = this
        return function (e){ 
            e.preventDefault()
            var selectedDate = {sday:solarDate, smonth:solarMonth, syear:solarYear}
            that.setState(Object.assign({}, that.state, {selectedDate: selectedDate }) )
            
            that.props.history.push('/'+solarYear+'/'+solarMonth+'/'+solarDate)
        }
    }
    onLogin(res){
        if (res){            
            this.setState({loginInfo: res.loginInfo})
            this.loadMemos(res.loginInfo.sub)
        }
        
    }
    onLogout = ()=>{
        this.setState({loginInfo:{sub:0}})
        this.loadMemos(0)
    }
    
    render (){
        // Utils.setOutputSize("small");
        // console.log(Utils.printSelectedMonth());
        // Utils.showVietCal()
        // console.log(1111, this.props.match.params)
        return (
            <div className="application">

                <h1>Lunar Calendar - ReactJs</h1>
                
                <table >
                    <thead>
                        <tr><td>
                            <DateTable month={this.state.selectedMonth} date={this.state.selectedDate} />
                        </td></tr>
                    </thead>
                    <tbody>
                        <tr><td>
                            <MonthTable month={this.state.selectedMonth} date={this.state.selectedDate} actions={this.actions} memos={this.state.memos}/>
                        </td></tr>
                    </tbody>
                                          
                    
                </table>
                <MemoList month={this.state.selectedMonth} date={this.state.selectedDate} actions={this.actions} memos={this.state.memos}/>
                
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