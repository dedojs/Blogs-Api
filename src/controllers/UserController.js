const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '6d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.login(email, password, res);
    if (user === null || !user) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro', error: err.message });
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await UserService.createUser(req.body);
    if (user === null || !user) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    if (user.message) {
      return res.status(user.code).json({ message: user.message });
    }
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

const getUser = async (_req, res, next) => {
  try {
    const users = await UserService.getUser();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    if (user.message) {
      return res.status(user.code).json({ message: user.message });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = req.user.dataValues.id;
    const userDelete = await UserService.deleteUser(user);
    if (userDelete.message) {
      return res.status(userDelete.code).json({ message: userDelete.message });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  createUser,
  getUser,
  getUserById,
  deleteUser,
};
