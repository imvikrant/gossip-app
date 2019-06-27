import React from 'react'
import './MessageBar.scss'
import TextField, { Input } from '@material/react-text-field'
import MaterialIcon from '@material/react-material-icon'
import Button from '@material/react-button'
import IconButton from '@material/react-icon-button'
import socket from '../../socketio/socket'


export default class MessageBar extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        text: ''
    }

    handlerSend = () => {
        socket.emitNewMessage(this.state.text)
        this.setState({text: ''})
    }

    render() {
        return (
            <div className="message-bar">
                <TextField
                    className="message-field"
                    label="Type a message"
                        
                >
                    <Input 
                        className="message-input"
                        value = {this.state.text}
                        onChange = {(e) => this.setState({text: e.target.value})}
                    />
                </TextField>
                <IconButton
                    className="send-button"
                    onClick={this.handlerSend}
                >
                    <MaterialIcon icon="send"/>
                </IconButton>

            </div>
        )
    }
}

