const Colab = require('../model/colab.model');
const errorHandler = require('../utils/error');

const createColab = async (req, res, next) => {
  const { name, cpf, rg } = req.body;
  const { projectId } = req.params;
  try {
    const existingColab = await Colab.findOne({ cpf, rg });
    const validCpf = await Colab.findOne({ cpf });
    const validRg = await Colab.findOne({ rg });
    if (existingColab) return next(errorHandler(400, 'Colaborador já cadastrado'));
    if (validCpf) return next(errorHandler(400, 'CPF já cadastrado'));
    if (validRg) return next(errorHandler(400, 'RG já cadastrado'));
    if (cpf.length < 11) return next(errorHandler(400, 'CPF inválido'));
    if (rg.length < 5) return next(errorHandler(400, 'RG inválido'));
    const colab = new Colab({ name, cpf, rg, location: projectId });
    await colab.save();
    return res.status(201).json({ message: 'Colaborador cadastrado com sucesso', colabId: colab._id });
  } catch (error) {
    next(errorHandler(500, 'Erro ao cadastrar colaborador'));
  }
};

const getColabsByProject = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const colabs = await Colab.find({ location: projectId });
    return res.status(200).json(colabs);
  } catch (error) {
    next(errorHandler(500, 'Erro ao buscar colaboradores do projeto'));
  }
}

module.exports = {
  createColab,
  getColabsByProject,
};