const makeUserOnline = (username) => {
    return ({
        username,
        type: 'MAKE_USER_ONLINE'
    })
}

const makeUserOffline = (username) => {
    return ({
        username,
        type: 'MAKE_USER_OFFLINE'
    })
}

const removeUser = (username) => {
    return ({
        username,
        type: 'REMOVE_USER'
    })
}

const addUser = (username) => {
    return ({
        username,
        type: 'ADD_USER'
    })
}

export {makeUserOnline, makeUserOffline, removeUser, addUser}