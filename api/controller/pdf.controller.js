const Colab = require('../model/colab.model');
const errorHandler = require('../utils/error');
const fs = require('fs');

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const uploadPdf = async (req, res, next) => {
  const { colabId } = req.params;
  const { expirationDate } = req.body;

  if (!req.file) return next(errorHandler(400, 'Nenhum arquivo enviado'));

  console.log('Arquivo recebido:', req.file);

  try {
    const colab = await Colab.findById(colabId);
    if (!colab) return next(errorHandler(404, 'Colaborador não encontrado'));

    colab.pdfFiles.push({
      filename: req.file.filename,
      expirationDate: new Date(expirationDate)
    });

    await colab.save();
    return res.status(200).json({ message: 'Arquivo enviado com sucesso' });
  } catch (error) {
    console.error("Erro ao salvar PDF:", error); // Exibir o erro no console
    next(errorHandler(500, 'Erro ao salvar PDF no colaborador'));
  }
};

module.exports = {
  uploadPdf
};