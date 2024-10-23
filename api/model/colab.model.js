const mongoose = require('mongoose');

const ColabSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  cpf: {
    type: String,
    required: true,
    trim: true,
    minlength: 11
  },
  rg: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  location: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  pdfFiles: [{
    filename: String,
    pdfName: String,
    expirationDate: Date,
  }]
}, { timestamps: true });

const Colab = mongoose.model('Colab', ColabSchema);

module.exports = Colab;