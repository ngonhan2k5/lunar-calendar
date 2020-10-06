import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import GoogleComponent from './oauth'

class PageOauth extends React.Component {
    constructor(){
        super()
    }

    render(){
        return (
            <div>
                AAAA
                {/* <GoogleComponent/> */}
            </div>
        )
    }
}


export default withRouter(PageOauth)