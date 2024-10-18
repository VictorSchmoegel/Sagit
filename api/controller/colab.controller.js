const Colab = require('../model/colab.model');

const createColab = async (req, res, next) => {
  const { name, cpf, rg, location } = req.body;
  try {
    const existingColab = await Colab.findOne({ cpf, rg });
    if (existingColab) {
      return res.status(400).json('colaborador já cadastrado');
    }
    const colab = new Colab({ name, cpf, rg, location });
    await colab.save();
    return res.status(201).json({ message: 'Colaborador cadastrado com sucesso', colabId: colab._id });
  } catch (error) {
    next(errorHandler(500, 'Erro ao cadastrar colaborador'));
  }
};

module.exports = {
  createColab
};