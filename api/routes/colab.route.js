const express = require('express');

const router = express.Router();

const colabController = require('../controller/colab.controller');

router.post('/createColab', colabController.createColab);

module.exports = router;