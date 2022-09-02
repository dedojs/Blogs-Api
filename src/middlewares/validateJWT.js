const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../database/models');

const secret = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const payload = jwt.verify(token, secret);
    
    const user = await User.findOne({ where: { email: payload.data.email } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;