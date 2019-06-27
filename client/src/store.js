import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import messages from './reducers/messages'
import users from './reducers/users'
import currentUser from './reducers/currentUser'
import ui from './reducers/ui'
import profile from './reducers/profile';
import requests from './reducers/requests'
import ReduxThunk from 'redux-thunk'

console.log('store ran')

const store = createStore(combineReducers({
    users,
    messages,
    currentUser,
    profile,
    ui,
    requests
}), compose (applyMiddleware(ReduxThunk), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))



module.exports = store;