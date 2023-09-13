const HTTP_BAD_REQUEST_STATUS = 400;

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (age === '' || !age) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18 || !Number.isInteger(age)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  next();
};

module.exports = validateAge;