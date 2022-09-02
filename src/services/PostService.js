const { Op } = require('sequelize');
const { BlogPost } = require('../database/models');
const { Category } = require('../database/models');
const { PostCategory } = require('../database/models');
const { User } = require('../database/models');
const { validatePost, validateEditPost } = require('../utils');

const createPost = async ({ id, title, content, categoryIds }) => {
  const verify = validatePost({ title, content, categoryIds });
  if (verify.message) return verify;

  const findCategory = await Promise.all(categoryIds.map((idCat) => Category.findByPk(idCat)));

  const find = findCategory.find((element) => element === null);
  
  if (find === null) return { code: 400, message: '"categoryIds" not found' };
  
  const published = new Date();
  const updated = new Date();
  
  const postcreate = await BlogPost.create({ title, content, userId: id, published, updated });
  
  const postId = postcreate.id;
  
  await Promise.all(categoryIds.map((categoryId) => PostCategory.create({ postId, categoryId })));
  const post = postcreate.dataValues;
  return post;
};

const getPost = async () => {
  const post = await BlogPost
    .findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories' }],
    });
  return post;
};

const getPostId = async (id) => {
  const post = await BlogPost
    .findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories' }],
    });
  if (!post || post === null) {
    return { code: 404, message: 'Post does not exist' };
  }
  return post;
};

const editPost = async (id, user, { title, content }) => {
  const verify = validateEditPost(title, content);
  if (verify.message) return verify;

  const post = await getPostId(id);
  
  if (user !== post.userId) {
    return { code: 401, message: 'Unauthorized user' };
  }

  const newPost = await BlogPost.update({ title, content }, { where: { id } });

  return newPost;
  };

  const deletePost = async (id, user) => {
    const post = await getPostId(id);
    if (post.message) {
      return { code: 404, message: 'Post does not exist' };
    }

    if (user !== post.userId) {
      return { code: 401, message: 'Unauthorized user' };
    }

    const postDelete = await BlogPost.destroy({ where: { id } });

    return postDelete;
  };

  const searchPost = async (string) => {
    console.log('ss', string);
    const search = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories' }],
      where: {
        [Op.or]: [
        { title: { [Op.substring]: `%${string}%` } },
        { content: { [Op.substring]: `%${string}%` } },
        ],
      },
    });
    return search;
  };

module.exports = {
  createPost,
  getPost,
  getPostId,
  editPost,
  deletePost,
  searchPost,
};