const authService = require('../services/auth.service');

const authLoginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || !email.length) {
    return res.status(400).json({ message: 'Some required fields are missing' });
}
  const token = await authService.validateLogin({ email, password });
  if (!token) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  res.status(200).json({ token });
};

module.exports = { authLoginController };