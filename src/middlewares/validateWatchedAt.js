const HTTP_BAD_REQUEST_STATUS = 400;

// Check if the date format is dd/mm/yyyy
const isValidDate = (dateString) => {
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  return datePattern.test(dateString);
};

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;

  if (!talk.watchedAt) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }

  if (!isValidDate(talk.watchedAt)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

module.exports = validateWatchedAt;