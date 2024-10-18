const express = require('express');

const router = express.Router();

const colabController = require('../controller/colab.controller');

router.post('/projects/:projectId/createColab', colabController.createColab);
router.get('/projects/:projectId/colabs', colabController.getColabsByProject);

module.exports = router;