const PostService = require('../services/PostService');

const createPost = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { title, content, categoryIds } = req.body;
    const payload = { id, title, content, categoryIds };
    const post = await PostService.createPost(payload);
   
    if (post.message) {
      return res.status(post.code).json({ message: post.message });
    }
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await PostService.getPost();
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

const getPostId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await PostService.getPostId(id);
    if (post.message) {
      return res.status(post.code).json({ message: post.message });
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

const editPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user.dataValues.id;
    const { title, content } = req.body;
    
    const newPost = await PostService.editPost(id, user, { title, content }); 
    if (newPost.message) {
      return res.status(newPost.code).json({ message: newPost.message });
    }
    const result = await PostService.getPostId(id);

    if (newPost[0] === 1 || newPost[0] === 0) {
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user.dataValues.id;
    const post = await PostService.deletePost(id, user);
    if (post.message) {
      return res.status(post.code).json({ message: post.message });
    } 
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const searchPost = async (req, res, next) => {
  try {
    const { q } = req.query;
    const search = await PostService.searchPost(q);
    res.status(200).json(search); 
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPost,
  getPost,
  getPostId,
  editPost,
  deletePost,
  searchPost,
};