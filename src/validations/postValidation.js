const Joi = require('joi');

const msgErr = 'Some required fields are missing';

  const postSchema = Joi.object({
    title: Joi.string().required().messages({ 'any.required': msgErr, 'string.empty': msgErr }),
    content: Joi.string().required().messages({ 'any.required': msgErr, 'string.empty': msgErr }),
    categoryIds: Joi.array().items(Joi.number()).min(1).required()
    .messages({ 
      'any.required': msgErr, 'string.empty': msgErr,
    }),
  });

module.exports = postSchema;