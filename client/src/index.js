import React from 'react'
import ReactDOM from 'react-dom'
import socket from './socketio/socket'
import {Provider} from 'react-redux'
import LoginForm from './components/LoginForm/LoginForm'
import App from './components/App/App'
import './index.scss'
// import RequestMenu from './components/RequestMenu/RequestMenu'

// import startSocket from './socketio/socket'

class Router extends React.Component {
    state = {
        login: true,
        username: ''
    }

    handleLoginForm = (username) => {
        localStorage.setItem('username', username)
        this.setState({login: false, username})
    }

    render() {
        if (this.state.login)
            return <LoginForm onLogin={this.handleLoginForm}/>
        else { 
            
            socket.startSocket('/', this.state.username)
        
            return (<Provider store={require('./store')}>
                    <App />
                </Provider>)
        }
        
    }
}

ReactDOM.render(<Router/>, document.getElementById('app'))