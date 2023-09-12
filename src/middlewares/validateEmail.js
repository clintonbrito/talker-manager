const { check, validationResult } = require('express-validator');

const HTTP_BAD_REQUEST_STATUS = 400;

const validateEmail = [
  check('email')
    .notEmpty()
    .withMessage('O campo "email" é obrigatório')
    .isEmail()
    .withMessage('O "email" deve ter o formato "email@email.com"'),
  (req, res, next) => {
    const errors = validationResult(req);
    // Testar no Insomnia com o campo email vazio:
    if (!errors.isEmpty()) {
      const { msg } = errors.array()[0];
      return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: msg });
    }
    next();
  },
];

// const validateEmail = async (req, res, next) => {
//   const { email } = req.body;
//   const emailOk = email.check('email').isEmail();
//   if (email === '' || !email) {
//     return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
//   }
//   if (!emailOk) {
//     return res.status(HTTP_BAD_REQUEST_STATUS).json({
//       message: 'O "email" deve ter o formato "email@email.com"',
//     });
//   }
//   next();
// };

module.exports = validateEmail;