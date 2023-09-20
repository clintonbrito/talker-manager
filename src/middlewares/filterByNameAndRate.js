const { readFile } = require('../helpers/utils');
const filterTalkersByName = require('./filterTalkersByName');

const HTTP_OK_STATUS = 200;

const filterByNameAndRate = async (req, res, next) => {
  const { rate, q } = req.query;
  const rateNumber = Number(rate);
  const talkers = await readFile();

  const filteredByName = filterTalkersByName(talkers, q);

  if (q && rateNumber) {
    const filteredTalkers = filteredByName.filter((talker) => talker.talk.rate === +rate);

    if (!filteredTalkers.length) {
      return res.status(HTTP_OK_STATUS).json([]);
    }
    return res.status(HTTP_OK_STATUS).json(filteredTalkers);
  }
  next();
};

module.exports = filterByNameAndRate;