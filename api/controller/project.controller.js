const Project = require('../model/project.model');
const errorHandler = require('../utils/error');

const createProject = async (req, res, next) => {
  const { name } = req.body;
  try {
    const existingProject = await Project.findOne({ name });
    if (existingProject) return res.status(400).json({ message: 'Projeto já existe' });
    const newProject = new Project({ name });
    const savedProject = await newProject.save();
    res.status(201).json({ message: 'Projeto criado com sucesso', projectId: savedProject._id });
  } catch (error) {
    next(errorHandler(500, 'Erro ao criar projeto'));
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    next(errorHandler(500, 'Erro ao buscar projetos'));
  }
};

module.exports = {
  createProject,
  getAllProjects,
};