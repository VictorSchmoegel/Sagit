const User = require('../model/user.model');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
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
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
};

module.exports = {
  createUser
};