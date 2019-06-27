const User = require('./db_models/users')
const Messages = require('./db_models/messages')

module.exports = function (io) {
    io.on('connection', async function (socket) {

        const username = socket.handshake.query.username;
        
        let me;
        me = await User.findOne({username})
    
        if (!me) {
            me = new User({username, socketId: socket.id})
            await me.save()
        }
        else
            me.setSocketId(socket.id)
        
        // sending users connected list to user
        socket.emit('profileDetails', {username: me.username, status: me.status || 'Hi!'})
        socket.emit('loadRequests', me.pendingRequests)

        
        

        const usersToSend = await me.populate('connectedUsers', 'username socketId -_id').execPopulate();
    
        // for (let i = 0; i < me.connectedUsers.length; i++) {
            
        //     const u = await User.findOne({username: me.connectedUsers[i]})
        //     if (u) {
        //         if (u.socketId) {
        //             usersToSend.push({username: u.username, online: true})
        //             io.to(u.socketId).emit('userOnline', me.username)
        //         } else {
        //             usersToSend.push({username: u.username, online: false})
        //         }
        //     }
                
        // }
        

        socket.emit('loadUsers', usersToSend.connectedUsers.map(({username, socketId}) => {
            if (socketId) {
                io.to(socketId).emit('userOnline', me.username)
                return ({username, online: true})
            } else {
                return ({username, online: false})
            }
        }))

        // adding new User to the connected list
        socket.on('addNewUser', async (username) => {

            const userToBeAdded = await User.findOne({username})
            const updatedMe = await User.findOne({username: me.username})

            const userToAdd = await updatedMe.populate({
                path: 'connectedUsers', select: 'username socketId -_id', match: {username: userToBeAdded.username}
            }).execPopulate();

            
            console.log('connectedUsers', userToAdd.connectedUsers)
            if (userToAdd.connectedUsers.length === 0) {
                console.log('i am in')
                userToBeAdded.pendingRequests.push(me.username)
                await userToBeAdded.save();
                if (userToBeAdded.socketId) {
                    io.to(userToBeAdded.socketId).emit('newRequest', me.username)
                }
            }
        })

        // if a user accepts the request
        socket.on('requestAccepted', async (username) => {

            const user = await User.findOne({username});
            const me = await User.findOne({socketId: socket.id})
            me.connectedUsers.push(user._id);
            me.pendingRequests = me.pendingRequests.filter(u => username !== u)
            await me.save();
            user.connectedUsers.push(me._id)
            await user.save()
            io.to(user.socketId).emit('newUser', {username: me.username, online: Boolean(me.socketId)})
            io.to(me.socketId).emit('newUser', {username: user.username, online: Boolean(user.socketId)})
        })




        socket.on('loadMessages', async (username, callback) => {
            const messages = await Messages.getMessages(me.username, username)
            if (!messages) return
            const messagesToSend = messages.map(message => ({
                message: message.message,
                type: message.fromUsername === username ? 'incoming' : 'outgoing'
            })) 

            callback(messagesToSend)

        })

        socket.on('updateProfile', async ({name, value}, callback) => {
            const oldUsername = me.username;
            me[name] = value;
            

            try {
                me = await me.save();
                callback();
                const u = await User.findOne({username: me.username});

            const user = await u.populate({
                path: 'connectedUsers', select: 'username socketId -_id'
            }).execPopulate();

            for (let i = 0; i < user.connectedUsers.length; i++) {
                    io.to(user.connectedUsers[i].socketId).emit('userProfileUpdated', {
                        username: oldUsername, newUsername: me.username 
                    })
            }
            } catch (e) {
                console.log(e)
            }
        }) 
    
        // handle new Messages 
        socket.on('newMessage', async ({message, username, type}, callback) => {
            const userToSend = await User.findOne({username})
            const userWhoSent = await User.findOne({socketId: socket.id})

            
            await Messages.addMessage(userToSend.username, userWhoSent.username, message, type)        
            callback();
            if (userToSend.socketId)
                io.to(userToSend.socketId).emit('newMessage', message, 'incoming', userWhoSent.username)  
        })
        

        // delete socket Id (make offline) for user
        socket.on('disconnect', async () => {
            console.log('disconnected')
            me.setSocketId('')
            
            const u = await User.findOne({username: me.username});

            const user = await u.populate({
                path: 'connectedUsers', select: 'username socketId -_id'
            }).execPopulate();

            for (let i = 0; i < user.connectedUsers.length; i++) {
                    io.to(user.connectedUsers[i].socketId).emit('userOffline', me.username)
            }

        })
    }
    )
}