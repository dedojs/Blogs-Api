const { User } = require('../database/models');
const { validateUser } = require('../utils');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  
  if (!user || user.password !== password) {
    return null;
  }

  return user;
};

const createUser = async ({ displayName, email, password, image }) => {
  const verify = validateUser({ displayName, email, password });
  if (verify.message) return verify;
  
  const verifyEmail = await User.findOne({ where: { email } });
  if (verifyEmail) return { code: 409, message: 'User already registered' };

  const user = await User.create({ displayName, email, password, image });
 
  return user;
};

const getUser = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: 'password' } });
  if (!user || user === null) {
    return { code: 404, message: 'User does not exist' };
  }
  return user;
};

const deleteUser = async (id) => {
  const userDelete = await User.destroy({ where: { id } });
  return userDelete;
};

module.exports = {
  login,
  createUser,
  getUser,
  getUserById,
  deleteUser,
};