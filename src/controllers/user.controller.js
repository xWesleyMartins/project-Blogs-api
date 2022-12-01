const userService = require('../services/user.service');
const schema = require('../validations/create.user');

const createUserController = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const userExist = await userService.validateUser({ email: req.body.email });
  if (userExist) return res.status(409).json({ message: 'User already registered' });

  const token = await userService.createUser(req.body);
  
  return res.status(201).json({ token });
};
const getAllUser = async (_req, res) => {
  const userResult = await userService.getAllUser();
  return res.status(200).json(userResult);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const userByIdResult = await userService.getUserById(id);
  if (!userByIdResult) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  return res.status(200).json(userByIdResult);
};

module.exports = { createUserController, getAllUser, getUserById };