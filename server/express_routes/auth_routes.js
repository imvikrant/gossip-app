const express = require('express');
const router = express.Router()
const multer = require('multer');
const sharp = require('sharp')
const path = require('path')

const User = require('../db_models/users')

const upload  = multer({
    limits: {
        fileSize: 2000000 //2MB
    }, 
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/i))
            return cb(new Error('Please upload a valid jpeg or png file'))

        cb(undefined, true)
    }
})


router.post('/register', async (req, res) => {
    const {username} = req.body

    const user = new User({username})

    try {
        const savedUser = await user.save();
        res.json(savedUser)
    } catch (e) {
        res.status(401).send(e.message)
    } 
})


router.post('/avatar', upload.single('avatar'), async (req, res) => {
    console.log('upload', 'hello')

    const buffer = await sharp(req.file.buffer).resize(250).png().toBuffer();
    const username = req.body.username;

    console.log('upload', username)

    const user = await User.findOne({username})

    user.avatar = buffer;

    await user.save();

    res.send();
}, (error, req, res, next) => {
    res.status(404).json({error: error.message})
})

router.get('/avatar/:username', async(req, res) => {

    const username = req.params.username;
    
    const user = await User.findOne({username})


    res.contentType('images/png');

    if (user && user.avatar)
        res.send(user.avatar)
    else 
        res.sendFile(path.join(__dirname, '../assets', 'image_preview.png'))
})




router.get('/users/search/:name', async (req, res) => {
    // const name = req.params.name;
    var regexp = new RegExp("^"+ req.params.name);
    const users = await User.find({username: regexp}).limit(10).select({username: 1})

    usersToSend = users.map(user => ({username: user.username, reqSent: false}))
    res.json({users:usersToSend})
}) 

module.exports = router;