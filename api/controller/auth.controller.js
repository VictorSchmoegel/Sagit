const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const errorHandler = require('../utils/error');
require('dotenv').config();

const signIn = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return next(errorHandler(404, 'Usuário não encontrado'));
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) return next(errorHandler(401, 'Credenciais inválidas'));
    const token = jwt.sign({ userId: user._id, usename: user.username }, process.env.JWT_SECRET);
    const { password: userPassword, ...rest } = user._doc;
    res
      .cookie('token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  }
  catch (error) {
    next(error);
  }
};

module.exports = {
  signIn
};