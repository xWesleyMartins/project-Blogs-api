const Joi = require('joi');

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    displayName: Joi.string().min(8),
    image: Joi.string(),
  });

module.exports = schema;