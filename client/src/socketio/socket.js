import io from 'socket.io-client';
import registerSocketHandlers from './socketHandlers';
import store from '../store';
import Message from '../models/Message'

const socket = {
    socket: null,
    startSocket: function (url, username) {
        this.socket = io(url, {
            query :{
                username
            }
        })
        registerSocketHandlers(this.socket)
    },

    // Emits new Message from the user to the server.
    emitNewMessage(message) {
        const username = store.getState().currentUser;
        const newMessage = new Message(message, 'outgoing', username)
        this.socket.emit('newMessage', newMessage, () => {
            store.dispatch({type: 'NEW_MESSAGE', message: newMessage})
        })
    },

    // Emit a new user to add
    emitAddNewUser(username) {
        this.socket.emit('addNewUser', username)
    },

    emitLoadMessages(username) {
        this.socket.emit('loadMessages', username, (messages) => {
            const loadedMessages = messages.map(({message, type}) => new Message(
                message, type, username 
            ))

            store.dispatch({type: 'LOAD_MESSAGES', messages: loadedMessages, username})
        })
    },

    emitRequestAccepted(username) {
        this.socket.emit('requestAccepted', username)
        store.dispatch({type: 'ACCEPT_REQUEST', username})
    },

    emitUpdateProfile(name, value) {
        this.socket.emit('updateProfile', {name, value}, () => {
            store.dispatch({type: 'UPDATE_PROFILE', [name]: value})
        })
    }

}

export default socket;