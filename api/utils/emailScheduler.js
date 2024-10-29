const cron = require('node-cron');
const { checkDocuments } = require('../controller/documents.controller');

cron.schedule('0 0 * * *', () => {
  console.log('Iniciando verificação de documentos para vencimento...');
  checkDocuments();
});