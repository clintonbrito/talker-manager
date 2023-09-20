const HTTP_BAD_REQUEST_STATUS = 400;

const validateRateSearch = (req, res, next) => {
  const { rate } = req.query;

  if (!rate) return next();

  const rateNumber = Number(rate);

  if (rateNumber < 1 || rateNumber > 5 || !Number.isInteger(rateNumber)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

module.exports = validateRateSearch;