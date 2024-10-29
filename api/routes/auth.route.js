const express = require('express');

const router = express.Router();

const authController = require('../controller/auth.controller');

router.post('/signin', authController.signIn);
router.get('/signout/:id', authController.signOut);

module.exports = router;