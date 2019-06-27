const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        fromUsername: {
            type: String
        },
        toUsername: {
            type:String
        },
        messageType: {
            type:String
        },
        message: {
            type: String
        }
    }
)

const messagesSchema = new mongoose.Schema({
    messageId: {
        type: String,
        required: true,
        unique: true
    },
    messages: {type: [messageSchema], default: []}
})

messagesSchema.statics.addMessage = async function(toUsername, fromUsername, msg, type) {
    const str = toUsername < fromUsername ? `${toUsername}-${fromUsername}`: `${fromUsername}-${toUsername}`

    const Message = this;

    let message = await Message.findOne({messageId: str})

    if (!message)
        message = new Message({messageId: str})
    
    message.messages.push({fromUsername, toUsername, messageType: type, message:msg})

    try {
        await message.save();
        return true;
    } catch(e) {
        return false;
    }    
}

messagesSchema.statics.getMessages = async function (username1, username2) {
    const str = username1 < username2 ? `${username1}-${username2}`: `${username2}-${username1}`

    const Message = this;
    
    let message = await Message.findOne({messageId: str})

    if (!message)
        return null;
    else
        return message.messages;

} 

const Messages = mongoose.model('messages', messagesSchema)

module.exports =  Messages;