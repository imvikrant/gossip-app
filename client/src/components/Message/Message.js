import React from 'react';
import './Message.scss'
import moment from 'moment';

const Message = ({message, type}) => (
    <div className={`message-outer-container ${type}`}>
        <div className={`message-inner-container mdc-elevation--z1`}>
            <span className="message">{message.message}</span>
            <span className="message-time">{moment(message.date).format('HH MM SS')}</span>
        </div>
    </div>
    
)

export default Message;