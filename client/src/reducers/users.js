import User from '../models/User'
// import {emit} from '../socketio/socket'


console.log('this ran')

const initState = [];

const users = (state = initState, action) => {
    switch(action.type) {

        case 'LOAD_USERS':  // accepts array of username as action.users
            return action.users.map(({username, online}) => new User(username, online))

        case 'ADD_NEW_USER':
            return [
                ...state, new User(action.username, action.online)
            ]
        
        case 'USER_ONLINE':
            {
            const username = action.username
            return state.map(user => {
                if (user.username == username)
                    user.online = true;

                return user;
            })
        }
        case 'USER_OFFLINE':
            {
                const username = action.username
                return state.map(user => {
                    if (user.username == username)
                        user.online = false;
    
                    return user;
                })
            } 

        case 'USER_PROFILE_UPDATED':
            {
                return state.map(user => {
                    if (user.username === action.username)
                        user.username = action.newUsername
                    return user;
                })
            }
        // case 'MAKE_USER_OFFLINE':
        //     return state.map(user => {
        //         if (user.username === action.username)
        //             user.online = false;
        //         return user;
        //     })

        // case 'MAKE_USER_ONLINE':
        //     return state.map(user => {
        //         if (user.username === action.username)
        //             user.online = true;
        //         return user;
                
        //     })
        
        default:
            return state;
    }
} 

export default users;