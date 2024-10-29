const express = require('express');
const { checkDocuments } = require('../controller/documents.controller');

const router = express.Router();

router.get('/check-documents', async (req, res) => {
  try {
    await checkDocuments();
    res.status(200).json({ message: 'Verificação de documentos realizada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar documentos', error });
  }
});

module.exports = router;