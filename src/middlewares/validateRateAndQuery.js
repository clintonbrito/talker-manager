const { readFile } = require('../helpers/utils');

const HTTP_OK_STATUS = 200;

const validateRateAndQuery = async (req, res, next) => {
  const { rate, q, date } = req.query;
  const talkers = await readFile();

  if (!rate && !q && !date) {
    console.log('entrou aqui');
    return res.status(HTTP_OK_STATUS).json(talkers); // está caindo aqui a requisição com a query date preenchida
  }

  next();
};

module.exports = validateRateAndQuery;