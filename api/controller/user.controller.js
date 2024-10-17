const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const errorHandler = require('../utils/error');

const createUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Nome de usuário já está em uso' });
    }
    const hashaedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashaedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Usuário criado com sucesso', userId: savedUser._id });
  } catch (error) {
    next(errorHandler(500, 'Erro ao criar usuário'));
  }
};

module.exports = {
  createUser
};