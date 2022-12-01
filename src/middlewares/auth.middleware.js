require('dotenv/config');
const jwt = require('jsonwebtoken');

const validToken = async (req, res, next) => {
  try {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  const validUserToken = jwt.verify(authorization, process.env.JWT_SECRET);
  req.user = validUserToken;
  next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validToken;