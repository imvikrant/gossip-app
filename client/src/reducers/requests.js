const requests = (state=[], action) => {
    switch(action.type) {

        case 'ADD_REQUEST':
            return [...state, action.username ];
        case 'ACCEPT_REQUEST':
            return state.filter((username) => username !== action.username)
        case 'LOAD_REQUESTS':
            return [...action.requests]
        default: 
            return state;
    }
}

export default requests