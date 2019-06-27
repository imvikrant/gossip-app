import React from 'react';
import MessageBar from '../MessageBar/MessageBar'
import ChatArea from '../ChatArea/ChatArea'
import './ChatPanel.scss';

const ChatPanel = () => (
    <div className="chat-panel">
        <ChatArea />
        <MessageBar />
    </div>
)

export default ChatPanel;