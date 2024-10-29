const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/multer');

const { createUser, uploadAvatar, getUserById } = require('../controller/user.controller');

router.post('/createuser', createUser)
router.post('/uploadavatar/:id', upload.single('avatar'), uploadAvatar)
router.get('/getuser/:id', getUserById)

module.exports = router;