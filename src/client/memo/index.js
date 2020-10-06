import React from 'react'
import Popup from 'react-popup'
import '../prompt'

// import axios from 'axios'
import { setup } from 'axios-cache-adapter'
import Utils from '../utils/utils'
import GoogleComponent from '../oauth'

import './Memo.css'

const api = setup({
    // `axios` options
    //baseURL: '/',

    // `axios-cache-adapter` options
    cache: {
        maxAge: 15 * 60 * 1000
    }
})

class MemoList extends React.Component {
    constructor(props){
        super()
        this.newMemo = null
        console.log(11)
        // this.state = {
        //     memos:[]
        // }

        
        
    }
    onAddClick = (e) => {

        if (this.props.actions.getUid()==0){
            Popup.create({
                title: 'Immediate popup',
                content: 'Must login to create memo',
                className: 'alert',
                buttons: {
                    right: ['ok']
                }
            }, false);
            return
        }
        var sdate = this.props.date
        var ldate = Utils.getLunarDate(sdate.sday, sdate.smonth, sdate.syear)
        var that = this
        Popup.plugins().prompt(ldate, e?{value:'', repeat: 'no'}:this.newMemo, 'Input memo\'s title', 
            function (value) {
                Popup.alert('You typed: ' + value.value + ':' + value.repeat);
                console.log(ldate)
                that.newMemo = value;
                let l_when = {day:ldate.day, month:ldate.month, year:ldate.year, _id: new Date().getTime()}
                if (value.repeat=='monthly'){
                    l_when.year = l_when.month = 0
                }else if(value.repeat=='yearly'){
                    l_when.year = 0
                }
                that.props.actions.onAddNewMemo({title:value.value, l_when:l_when, jd:ldate.jd})
            },
            function (value){
                that.newMemo = value;
                Popup.create({
                    title: 'Immediate popup',
                    content: 'Please input memo\'s title',
                    className: 'alert',
                    buttons: {
                        right: ['ok']
                    }
                }, false);
                // reprompt with old value
                that.onAddClick()
            }
        );
    }
    onRemoveClick(id){
        let that = this
        return (e) => {
            console.log('remove', id)
            that.props.actions.onRemoveMemo(id)
        }
    }
    // shouldComponentUpdate(nextProps, nextState){
        
    // }
    render(){
        // const {mm, yy} = this.props.month
        
        // console.log(9999,currentMonth)
        var currentMonthMemo = this.props.memos
        console.log(9999, currentMonthMemo)
        var selDate = this.props.date 
        const {mm, yy} = this.props.month
        return (
            <div className="memos">
                <div className="memo-action">
                    {/* <span onClick={this.onAddClick}>Them</span> */}
                    <span className="head">Memos:</span>
                    <button className="icon-btn add-btn" onClick={this.onAddClick}>
                        <div className="add-icon"></div>
                        <div className="btn-txt">Add</div>
                    </button>
                    <GoogleComponent onLogin={this.props.actions.onLogin} onLogout={this.props.actions.onLogout}/>
                </div>
                <div className="memo-list">
                    <ul>
                        { currentMonthMemo.map(
                            (item, k) => (
                                <li title={item.jd} className={selDate && selDate.sday==item.sday?'selected':'none'} key={k} onClick={this.props.actions.onSelectedDateChange(item.sday, mm, yy)}>
                                    <a href="#" onClick={()=>false}>
                                        <span>{item.col1}</span>&nbsp;
                                        <span>({item.col2})</span>&nbsp;
                                        {/* <span>{item.title}</span> */}
                                        {item.titleAndIds.map(
                                            (mItem, j) => (
                                                <span key={j}>{mItem.title}
                                                    <button className="icon-btn add-btn" onClick={this.onRemoveClick(mItem._id)}>
                                                        <div className="btn-txt">Removem{mItem._id}</div>
                                                    </button>&nbsp;
                                                </span>
                                            )
                                        )}
                                        {/* <button className="icon-btn add-btn" onClick={this.onRemoveClick}>
                                            <div className="btn-txt">Remove</div>
                                        </button> */}
                                    </a>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default MemoList