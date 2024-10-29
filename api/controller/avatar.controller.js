const User = require('../model/user.model');
const errorHandler = require('../utils/error');

const uploadAvatar = async (req, res, next) => {
  const { id } = req.params;

  if (!req.file) return next(errorHandler(400, 'Nenhum arquivo enviado'));

  try {
    const user = await User.findById(id);
    if (!user) return next(errorHandler(404, 'Usuário não encontrado'));

    user.avatar = req.file.filename;
    await user.save();
    return res.status(200).json({ message: 'Avatar enviado com sucesso' });
  } catch (error) {
    next(errorHandler(500, 'Erro ao salvar avatar do usuário'));
  }
};

module.exports = {
  uploadAvatar,
};