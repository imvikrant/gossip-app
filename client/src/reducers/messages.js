import Message from '../models/Message'

const initState = {
};

const messages = (state = initState, action) => {
    switch(action.type) {

        case 'LOAD_MESSAGES': 
            {
                console.log(action.messages)
                const username = action.username;

                return {
                    ...state,
                    [username]: {
                        messages: action.messages
                    }
                }
            }

        case 'NEW_MESSAGE':
            {
                console.log(action.message)
                const username = action.message.username;
                let messages;
            if (state[username]) {
                messages = state[username].messages
            } else {
                messages = []
            }
           return {
               ...state,
               [username]: {
                   ...state[username],
                   messages: [...messages.slice(0, messages.length),
                    action.message
                ]
               }
           }}

        case 'NEW_OUTGOING_MESSAGE':
                {
                const username = action.username;
                let messages;
                if (state[username]) {
                    messages = state[username].messages
                } else {
                    messages = []
                }

            if (state.username) {}
            return {
                ...state,
                [username]: {
                    ...state[username],
                    messages: [...messages.slice(0, messages.length),
                     new Message(action.message, 'outgoing', username)
                 ]
                }
            }}
        default:
            return state;
    }
}

export default messages;