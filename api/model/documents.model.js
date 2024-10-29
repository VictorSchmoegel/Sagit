const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  colabName: { type: String, required: true },
  pdfName: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Document', documentSchema);