const { readFile, writeFile } = require('../helpers/utils');

const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;

const registerNewTalker = async (req, res) => {
  const talkers = await readFile();
  const { name, age, talk } = req.body;

  if (!talk) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "talk" é obrigatório',
    });
  }

  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };
  talkers.push(newTalker);
  await writeFile(talkers);
  return res.status(HTTP_CREATED_STATUS).json(newTalker);
};

module.exports = registerNewTalker;