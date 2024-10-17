const express = require('express');

const router = express.Router();

const projectController = require('../controller/project.controller');

router.post('/createproject', projectController.createProject);

module.exports = router;