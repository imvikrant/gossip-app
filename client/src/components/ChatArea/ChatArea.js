import React from 'react'
import './ChatArea.scss'
import {connect} from 'react-redux'
import Message from '../Message/Message'
import currentUser from '../../reducers/currentUser';
import socket from '../../socketio/socket'

const ChatArea = ({messages}) => {

    return (
    <div className="chat-area" >
        <div className="chat-box">
        {messages.map(msg => (
            <Message message={msg} type={msg.type} key={Math.random()}/>
        ))}
        </div>
    </div>
)}

const mapStateToProps = (state) => {
    if (!state.currentUser)
        return {messages: []}

    if (!state.messages[state.currentUser]) {
        socket.emitLoadMessages(state.currentUser);
        return {messages: []};
    }
    return {
        messages: state.messages[state.currentUser].messages
    }// currentUser: state.currentUser
}
export default connect(mapStateToProps)(ChatArea);