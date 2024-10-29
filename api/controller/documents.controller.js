const nodemailer = require('nodemailer');
const Document = require('../model/documents.model');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const sendExpirationEmail = async (doc) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'victorschmoegel@gmail.com',
    subject: `Documento de ${doc.colabName} está prestes a vencer`,
    text: `Olá! A documentação "${doc.pdfName}" de ${doc.colabName} está prestes a vencer em ${new Date(doc.expirationDate).toLocaleDateString()}. Por favor, providencie a atualização.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
    } else {
      console.log('E-mail enviado:', info.response);
    }
  });
};

const checkDocuments = async () => {
  try {
    const documents = await Document.find();
    const today = new Date();

    documents.forEach((doc) => {
      const expirationDate = new Date(doc.expirationDate);
      const differenceInDays = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));

      if (differenceInDays <= 30) {
        sendExpirationEmail(doc);
      }
    });
  } catch (error) {
    console.error('Erro ao verificar documentos:', error);
  }
};

module.exports = { checkDocuments };
