// const Joi = require('joi');
const jwtValidation = require('../ultils/jwtValidations');

const { User } = require('../models');

// const validateBody = (params) => {
//   const schema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//   });

//   const { error, value } = schema.validate(params);

//   if (error) throw error;

// return value;
// };
const validateUser = async ({ email }) => {
  const user = await User.findOne({ where: { email } });
  return user;
};
const createUser = async (body) => {
  const newUser = await User.create(body);
  const { password: _, ...userWithoutPassword } = newUser.dataValues;

  const token = jwtValidation.generateToken(userWithoutPassword);
  return token;
};

const getAllUser = async () => {
  const userResult = await User.findAll({ attributes: { exclude: 'password' } });
  return userResult;
};

const getUserById = async (id) => {
  const userResult = await User.findByPk(id, { attributes: { exclude: 'password' } });
  return userResult;
};
module.exports = { validateUser, createUser, getAllUser, getUserById };