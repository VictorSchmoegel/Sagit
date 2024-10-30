const express = require('express');
const router = express.Router();
const pdfController = require('../controller/pdf.controller');
const { upload } = require('../middleware/multer');

router.post('/colabs/:colabId/upload-pdf', upload.single('file'), pdfController.uploadPdf);
router.get('/colabs/:colabId/pdf-files', pdfController.getPdfs);
router.get('/colabs/:colabId/pdf-files/:pdfID', pdfController.getPdfById);
router.get('/pdfs', pdfController.getAllPdfs);
router.get('/pdfs/expired', pdfController.getExpiredPdfs);
router.delete('/colabs/:colabId/delete-pdf/:pdfID', pdfController.deletePdfById);
router.put('/colabs/:colabId/update/:pdfID', upload.single('pdfFile'), pdfController.updatePdf);

module.exports = router;