const HTTP_BAD_REQUEST_STATUS = 400;

const rateNotExist = (rate) => rate === undefined || rate === null || rate === '';

const validateRateForPatch = (req, res, next) => {
  const { rate } = req.body;

  if (rateNotExist(rate)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "rate" é obrigatório',
    });
  }

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  next();
};

module.exports = validateRateForPatch;