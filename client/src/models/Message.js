import moment from 'moment';

class Message {
    constructor(message, type, username) {
        this.message = message
        this.type = type
        this.date = moment.now()
        this.username = username
    }
}

export default Message