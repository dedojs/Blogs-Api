const validateUser = ({ displayName, email, password }) => {
  // const { displayName, email, password } = req.body;
  if (!displayName || displayName.length < 8) {
    return { code: 400, message: '"displayName" length must be at least 8 characters long' };
  }
  
  if (password.length < 6) {
    return { code: 400, message: '"password" length must be at least 6 characters long' };
  }
  
  const testEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  if (!testEmail.test(email)) return { code: 400, message: '"email" must be a valid email' };
  
  return true;
};

const validateCategory = (name) => {
  if (!name) {
    return { code: 400, message: '"name" is required' };
  }
  return true;
};

const validatePost = ({ title, content, categoryIds }) => {
  if (!title || !content || !categoryIds) {
    return { code: 400, message: 'Some required fields are missing' };
  }
  return true;
};

const validateEditPost = (title, content) => {
  if (!title || !content) {
    return { code: 400, message: 'Some required fields are missing' };
  }
  return true;
};

module.exports = {
  validateUser,
  validateCategory,
  validatePost,
  validateEditPost,
};