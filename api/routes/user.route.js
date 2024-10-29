const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/multer');

const { createUser, getUserById } = require('../controller/user.controller');

router.post('/createuser', createUser)
router.get('/getuser/:id', getUserById)

module.exports = router;