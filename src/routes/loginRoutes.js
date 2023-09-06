const express = require('express');
const SHA256 = require('crypto-js/sha256');
const { readFile } = require('../helpers/utils');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

const loginRouter = express.Router();

// Req 3: create the endpoint POST /login to validate the email and password fields.
loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const talkers = await readFile();
  const talkerCredential = talkers
    .find((talker) => talker.email === email && talker.password === password);
  if (!talkerCredential) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Incorrect username or password' });
  }
  const tokenKey = SHA256.toString();
  return res.status(HTTP_OK_STATUS).json({ token: tokenKey });
});

module.exports = loginRouter;