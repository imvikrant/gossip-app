const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 5,
        required: true,
        unique: true
    },

    status: {
        type: String,
        minlength: 1,
        maxlength: 20
    },

    socketId: {
        type: String,
        default: ""
    }, 

    connectedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],

    avatar: {
        type: Buffer
    },

    pendingRequests: {
        type: [String],
        default: []
    }
})

userSchema.methods.setSocketId = async function(socketId) {
    const user = this;

    try {
        user.socketId = socketId;
        user.save();
    } catch (error) {
        return false;
        console.log(error)
    }
    return true;
}   

// userSchema.methods.getConnectedUsers = async function() {
//     const user = this;
//     const users = [];
//     try {

//         for (let i = 0; i < user.connectedUsers.length; i++) {
           
//             const u = await this.model('users').findOne({username: user.connectedUsers[i]})
//             if (u)
//                 users.push({username: u.username, online: Boolean(u.socketId)})
//         }

//         return users;

//     } catch (e) {
//         console.log(e);
//     }
// }

const User = mongoose.model('users', userSchema);

module.exports = User