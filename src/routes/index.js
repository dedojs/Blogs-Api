const { login, createUser, getUser,
  getUserById, deleteUser } = require('../controllers/UserController');

const { createCategory, getCategory } = require('../controllers/CategorieController');

const { searchPost, createPost, getPost, getPostId,
  editPost, deletePost } = require('../controllers/PostControllers');

module.exports = {
  login,
  createUser,
  getUser,
  getUserById,
  createCategory,
  getCategory,
  searchPost,
  createPost,
  getPost,
  getPostId,
  editPost,
  deletePost,
  deleteUser,
};