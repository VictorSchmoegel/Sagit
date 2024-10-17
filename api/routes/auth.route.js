const express = require('express');

const router = express.Router();

const authController = require('../controller/auth.controller');

router.get('/signin', authController.signIn);

module.exports = router;