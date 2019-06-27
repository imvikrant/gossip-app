const profile = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_PROFILE':
            return ({
                username: action.username || state.username,
                status: action.status || state.username,
                imageUrl: `http://localhost:3000/avatar/${action.username || state.username}?${Date.now()}`
            })

        case 'UPDATE_IMAGE':
            return {...state, imageUrl: `/avatar/${state.username}?${Date.now()}`}

        default: 
            return state;
    }
}

export default profile;