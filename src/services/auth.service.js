const Joi = require('joi');
const jwtValidation = require('../ultils/jwtValidations');

const { User } = require('../models');

const validateBody = (params) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(params);

  if (error) throw error;

return value;
};
const validateLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    return false;
  }
  const { password: _, ...userWithoutPassword } = user.dataValues;
  
  const token = jwtValidation.generateToken(userWithoutPassword);

  return token;
};
module.exports = { validateLogin, validateBody };