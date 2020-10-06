import React, { Component } from 'react';
import { Google } from 'react-oauth2';

class GoogleComponent extends Component {
    constructor() {
        super()
        this.state = {
            "data": {
                "sub": "", "name": "", "email": "", "gender": "", "location": { "id": "", "name": "" }
            }
        }
    }

    google(err, res) {
        var ret = null
        if (!err) {
            ret = { loginInfo: res.profile }
            this.setState({ data: res.profile })
        }
        this.props.onLogin(ret)
    }
    logout=()=>{
        this.setState({data:{name:null}})
        this.props.onLogout()
    }

    render() {
        return !this.state.data.name ? (
                <Google
                    url={'http://localhost:5100'}
                    clientId={'574585942253-f4nm4ausjt9i7m19fms7nihlphugtuu0.apps.googleusercontent.com'}
                    clientSecret={'qpvD1Pi4QOiIzG4Yic5Q8cLC'}
                    redirectUri={'http://localhost:5100/oauth'}
                    scope={['https://www.googleapis.com/auth/userinfo.profile']}
                    width={300}
                    height={300}
                    callback={this.google.bind(this)}
                    style={{ color: 'green', float:'right'}}
                >
                    Login with Google
            </Google>
            ) : (
                    <button style={{ color: 'green', float:'right'}} onClick={this.logout}> Logout ({this.state.data.name})</button>
                )
    }
}

export default GoogleComponent;