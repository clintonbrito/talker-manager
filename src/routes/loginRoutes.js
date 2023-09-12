const express = require('express');
const crypto = require('crypto');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const HTTP_OK_STATUS = 200;

const loginRouter = express.Router();

// Req 3 and 4: create the endpoint POST /login to validate the email and password fields.
loginRouter.post('/', validateEmail, validatePassword, (req, res) => {
  const tokenKey = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token: tokenKey });
});

module.exports = loginRouter;