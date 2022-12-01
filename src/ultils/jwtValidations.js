require('dotenv/config');
const jwt = require('jsonwebtoken');

const generateToken = (data) => {
  const genToken = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256', 
  });

  return genToken;
};

const validationToken = (token) => {
  try {
    const dataToken = jwt.verify(token, process.env.JWT_SECRET);
    return dataToken; 
  } catch (error) {
    const err = new Error('Invalid Token');
    return err;
  }
};

module.exports = { generateToken, validationToken };