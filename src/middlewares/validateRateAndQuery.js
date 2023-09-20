const { readFile } = require('../helpers/utils');

const HTTP_OK_STATUS = 200;

const validateRateAndQuery = async (req, res, next) => {
  const { rate, q } = req.query;
  const talkers = await readFile();

  if (!rate && !q) {
    return res.status(HTTP_OK_STATUS).json(talkers);
  }

  if (rate === '' && q === '') {
    return res.status(HTTP_OK_STATUS).json(talkers);
  }
  next();
};

module.exports = validateRateAndQuery;