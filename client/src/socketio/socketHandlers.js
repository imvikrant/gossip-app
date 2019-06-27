import store from '../store';
import Message from '../models/Message'

const registerSocketHandlers = (socket) => {
    socket.on('newMessage', (message, type, username) => {
        store.dispatch({type: 'NEW_MESSAGE', message: new Message(message, type, username)})
    })

    socket.on('loadMessages', (username, messages) => {
        console.log('loadMessages', messages)
    })

    socket.on('profileDetails', ({username, status}) => {
        store.dispatch({type: 'UPDATE_PROFILE', username, status })
    })

    socket.on('loadUsers', (usersArr) => {
        console.log('loadUsers', usersArr)
        store.dispatch({type: 'LOAD_USERS', users: usersArr})
    })

    socket.on('newRequest', (username) => {
        store.dispatch({type: 'ADD_REQUEST', username})
    })

    socket.on('newUser', ({username, online}) => {
        store.dispatch({type:'ADD_NEW_USER', username, online})
    })

    socket.on('loadRequests', (requests) => {
        store.dispatch({type:'LOAD_REQUESTS', requests})
    })

    socket.on('userOnline', (username) => {
        store.dispatch({type:'USER_ONLINE', username})
    })

    socket.on('userOffline', (username) => {
        store.dispatch({type:'USER_OFFLINE', username})
    })

    socket.on('userProfileUpdated', ({username, newUsername}) => {
        store.dispatch({type: 'USER_PROFILE_UPDATED', username, newUsername});
    })

}

export default registerSocketHandlers;