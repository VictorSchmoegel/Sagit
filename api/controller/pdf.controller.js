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

const getPdfs = async (req, res, next) => {
  const { colabId } = req.params;

  try {
    // Buscar colaborador pelo ID
    const colab = await Colab.findById(colabId);
    if (!colab) return next(errorHandler(404, 'Colaborador não encontrado'));

    // Verificar se o colaborador tem arquivos PDF
    if (colab.pdfFiles.length === 0) {
      return res.status(404).json({ message: 'Nenhum PDF encontrado para este colaborador' });
    }

    // Retornar a lista de arquivos PDF e as datas de expiração
    const pdfs = colab.pdfFiles.map(file => {
      return {
        filename: file.filename,
        expirationDate: file.expirationDate,
        url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`  // Criar URL de acesso ao PDF
      };
    });

    return res.status(200).json({ pdfs });
  } catch (error) {
    next(errorHandler(500, 'Erro ao buscar PDFs do colaborador'));
  }
};

module.exports = {
  uploadPdf,
  getPdfs
};