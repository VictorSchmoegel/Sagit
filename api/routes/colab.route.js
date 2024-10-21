const express = require('express');

const router = express.Router();

const colabController = require('../controller/colab.controller');

router.post('/projects/:projectId/createColab', colabController.createColab);
router.get('/projects/:projectId/colabs', colabController.getColabsByProject);
router.delete('/projects/:projectId/deleteColab/:colabId', colabController.deleteColab);
router.get('/colabs', colabController.getAllColabs);

module.exports = router;