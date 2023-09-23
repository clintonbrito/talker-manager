const HTTP_BAD_REQUEST_STATUS = 400;

const validateDateSearch = (req, res, next) => {
  const { date } = req.query;
  if (!date) return next();

  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(date)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
    });
  }

  if (date.toString() === 'Invalid Date') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "date" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

module.exports = validateDateSearch;