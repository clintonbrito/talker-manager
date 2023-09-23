const express = require('express');
const { readFile, writeFile } = require('../helpers/utils');
const validateTalkerById = require('../middlewares/validateTalker');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateRate = require('../middlewares/validateRate');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const registerNewTalker = require('../middlewares/registerNewTalker');
const filterTalkersByName = require('../middlewares/filterTalkersByName');
const filterTalkersByRate = require('../middlewares/filterTalkersByRate');
const validateRateSearch = require('../middlewares/validateRateSearch');
const validateRateAndQuery = require('../middlewares/validateRateAndQuery');
const filterTalkersByDate = require('../middlewares/filterTalkersByDate');
const filterByNameRateAndDate = require('../middlewares/filterByNameRateAndDate');
const validateDateSearch = require('../middlewares/validateDateSearch');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_DELETED_STATUS = 204;
const HTTP_NOT_FOUND_STATUS = 404;

const talkerRouter = express.Router();

// Req 5: create the endpoint POST /talker to register a new talker in talker.json.

talkerRouter.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  registerNewTalker,
  async (req, res) => {
    const talkers = await readFile();
    const { name, age, talk } = req.body;
    const newTalker = {
      id: talkers.length + 1,
      name,
      age,
      talk,
    };
    talkers.push(newTalker);
    await writeFile(talkers);
    return res.status(HTTP_CREATED_STATUS).json(newTalker);
  },
);

// Req 6: create the endpoint PUT /talker/:id to update a talker in talker.json.

talkerRouter.put(
  '/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  async (req, res) => {
    const { id } = req.params;
    const talkers = await readFile();
    const { name, age, talk } = req.body;
    const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
    const updatedTalker = {
      id: Number(id),
      name,
      age,
      talk,
    };
    // When the talker is not found by id, return an error:
    if (!talkerIndex || talkerIndex === -1) {
      return res.status(HTTP_NOT_FOUND_STATUS)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
    talkers[talkerIndex] = updatedTalker;
    await writeFile(talkers);
    return res.status(HTTP_OK_STATUS).json(updatedTalker);
  },
);

// Req 7: create the endpoint DELETE /talker/:id to delete a talker in talker.json.

talkerRouter.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  // When the talker is not found by id, return an error:
  if (!talkerIndex || talkerIndex === -1) {
    return res.status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  talkers.splice(talkerIndex, 1);
  await writeFile(talkers);
  return res.status(HTTP_DELETED_STATUS).end();
});

// Req 8, 9 and 10: create the endpoint GET /talker/search?q=searchTerm to search talkers by name, the endpoint GET /talker/search?rate=rateNumber to search talkers by rate at the same time and the endpoint GET /talker/search?date=DD/MM/YYYY to search talkers by watchedAt date at the same time.

talkerRouter.get(
  '/search',
  validateToken,
  validateRateSearch,
  validateRateAndQuery,
  filterByNameRateAndDate,
  // validateDate,
  validateDateSearch,
  async (req, res) => {
  const { rate, q, date } = req.query;
  const rateNumber = Number(rate);
  const talkers = await readFile();

  const filteredByName = filterTalkersByName(talkers, q);
  const filteredByRate = filterTalkersByRate(talkers, rate);
  const filteredByDate = filterTalkersByDate(talkers, date);

  if (q) {
    return res.status(HTTP_OK_STATUS).json(filteredByName);
  }
  if (rateNumber) {
    return res.status(HTTP_OK_STATUS).json(filteredByRate);
  }
  if (date) {
    return res.status(HTTP_OK_STATUS).json(filteredByDate);
  }
  return res.status(HTTP_OK_STATUS).json(talkers); 
},
);

// Req 1: create the endpoint GET /talker to return the list of talkers registered in talker.json.

talkerRouter.get('/', async (_req, res) => {
  const talkers = await readFile();
  if (!talkers) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
    return res.status(HTTP_OK_STATUS).json(talkers);
});

// Req 2: create the endpoint GET /talker/:id to return the talker with the given id.

talkerRouter.get('/:id', validateTalkerById, async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readFile();
    const talkerId = talkers.find((talker) => talker.id === Number(id));
    return res.status(HTTP_OK_STATUS).json(talkerId);
  } catch (err) {
    throw new Error(`Could not find talker: ${err.message}`);
  }
});

module.exports = talkerRouter;