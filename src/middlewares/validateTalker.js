const { readFile } = require('../helpers/utils');

// 
const validateTalkerById = async (req, res, next) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talkerId = talkers.find((talker) => talker.id === Number(id));
  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  next();
};

// const validateTalkerByEmail = async (req, res, next) => {
//   const { email } = req.body;
//   const talkers = await readFile();
//   const talkerEmail = talkers.find((talker) => talker.email === email);
//   if (talkerEmail) {
//     return res.status(409).json({ message: 'O e-mail deve ser único' });
//   }
//   next();
// };

module.exports = {
  validateTalkerById,
};