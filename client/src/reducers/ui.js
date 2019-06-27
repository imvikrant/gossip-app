const ui = (state = {
    modalOpen : false,
    menuOpen: false,
    drawerOpen: false,
    profileDialogOpen: false
}, action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            return {...state, modalOpen: true}
        case 'CLOSE_MODAL':
            return {...state, modalOpen:false}
        case 'OPEN_MENU':
            return {...state, menuOpen: true}
        case 'CLOSE_MENU':
            return {...state, menuOpen:false}
        case 'OPEN_DRAWER':
            return {...state, drawerOpen: true}
        case 'CLOSE_DRAWER':
            return {...state, drawerOpen:false}
        case 'OPEN_PROFILE_DIALOG':
            return {...state, profileDialogOpen: true}
        case 'CLOSE_PROFILE_DIALOG':
            return {...state, profileDialogOpen: false}
        default:
            return state;
    }
} 

export default ui;