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

const getAllColabs = async (req, res, next) => {
  try {
    const colabs = await Colab.find();
    return res.status(200).json(colabs);
  } catch (error) {
    next(errorHandler(500, 'Erro ao buscar colaboradores'));
  }
};

const deleteColab = async (req, res, next) => {
  const { colabId } = req.params;
  console.log("Deleting collaborator with ID:", colabId);

  try {
    const colab = await Colab.findById(colabId);
    if (!colab) {
      console.log("Collaborator not found");
      return next(errorHandler(404, 'Colaborador não encontrado'));
    }

    await colab.deleteOne();
    console.log("Colaborador deletado com sucesso");
    return res.status(200).json({ message: 'Colaborador deletado com sucesso' });
  } catch (error) {
    console.error("Error deleting collaborator:", error);
    next(errorHandler(500, 'Erro ao deletar colaborador'));
  }
}

const getColabById = async (req, res, next) => {
  const { colabId } = req.params;
  try {
    const colab = await Colab.findById(colabId);
    if (!colab) return next(errorHandler(404, 'Colaborador não encontrado'));
    return res.status(200).json(colab);
  } catch (error) {
    next(errorHandler(500, 'Erro ao buscar colaborador'));
  }
};

const updateColab = async (req, res, next) => {
  const { colabId } = req.params;
  const { name, cpf, rg } = req.body;
  try {
    const colab = await Colab.findById(colabId);
    if (!colab) return next(errorHandler(404, 'Colaborador não encontrado'));
    if (cpf.length < 11) return next(errorHandler(400, 'CPF inválido'));
    if (rg.length < 5) return next(errorHandler(400, 'RG inválido'));
    colab.name = name;
    colab.cpf = cpf;
    colab.rg = rg;
    await colab.save();
    return res.status(200).json({ message: 'Colaborador atualizado com sucesso' });
  } catch (error) {
    next(errorHandler(500, 'Erro ao atualizar colaborador'));
  }
};

module.exports = {
  createColab,
  getColabsByProject,
  deleteColab,
  getAllColabs,
  getColabById,
  updateColab,
};