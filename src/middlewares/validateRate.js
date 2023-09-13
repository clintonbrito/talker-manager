const HTTP_BAD_REQUEST_STATUS = 400;

const rateNotExist = (talk) => talk.rate === undefined || talk.rate === null || talk.rate === '';

const validateRate = (req, res, next) => {
  const { talk } = req.body;

  if (rateNotExist(talk)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "rate" é obrigatório',
    });
  }

  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  next();
};

module.exports = validateRate;