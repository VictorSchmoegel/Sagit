const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      message: 'Autenticação bem-sucedida',
      token,
      user: {
        id: user._id,
        username: user.username,
      }
    });
  }
  catch (error) {
    res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
  }
};

module.exports = {
  signIn
};