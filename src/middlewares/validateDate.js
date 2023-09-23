const { readFile } = require('../helpers/utils');

const HTTP_OK_STATUS = 200;

const watchedAtIsEmpty = (talk) => talk.watchedAt === '';

const validateDate = (req, res, next) => {
  const { talk } = req.query;

  const talkers = readFile();

  if (watchedAtIsEmpty(talk)) {
    return res.status(HTTP_OK_STATUS).json(talkers);
  }

  next();
};

module.exports = validateDate;