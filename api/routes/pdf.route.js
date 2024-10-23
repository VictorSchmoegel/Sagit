const express = require('express');
const router = express.Router();
const pdfController = require('../controller/pdf.controller');
const { upload } = require('../middleware/multer');

router.post('/colabs/:colabId/upload-pdf', upload.single('file'), pdfController.uploadPdf);
router.get('/colabs/:colabId/pdf-files', pdfController.getPdfs);
router.get('/colabs/:colabId/pdf-files/:pdfID', pdfController.getPdfById);
router.get('/pdfs', pdfController.getAllPdfs);
router.delete('/colabs/:colabId/delete-pdf/:pdfID', pdfController.deletePdfById);

module.exports = router;