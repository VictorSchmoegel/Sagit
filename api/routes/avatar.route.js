const express = require('express')
const router = express.Router()
const { upload } = require('../middleware/multer')

const avatarController = require('../controller/avatar.controller')

router.post('/uploadavatar/:id', upload.single('avatar'), avatarController.uploadAvatar)

module.exports = router