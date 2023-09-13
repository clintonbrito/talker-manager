const { readFile } = require('../helpers/utils');

const HTTP_NOT_FOUND_STATUS = 404;

const validateTalker = async (req, res, next) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talkerId = talkers.find((talker) => talker.id === Number(id));
  if (!talkerId) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  next();
};

module.exports = validateTalker;