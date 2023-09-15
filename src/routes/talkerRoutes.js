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

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_DELETED_STATUS = 204;
const HTTP_NOT_FOUND_STATUS = 404;

const talkerRouter = express.Router();

// Req 1: create the endpoint GET /talker to return the list of talkers registered in talker.json.

talkerRouter.get('/', async (_req, res) => {
  const talkers = await readFile();
  if (!talkers) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
    return res.status(HTTP_OK_STATUS).json(talkers);
});

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

// Req 8: create the endpoint GET /talker/search?q=searchTerm to search talkers by name.

talkerRouter.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await readFile();

  if (!q || q === '') {
    return res.status(HTTP_OK_STATUS).json(talkers);
  }

  const talkersByName = talkers
    .filter((talker) => talker.name.toLowerCase().includes(q.toLowerCase()));

  if (!talkersByName.length) {
    return res.status(HTTP_OK_STATUS).json([]);
  }

  return res.status(HTTP_OK_STATUS).json(talkersByName);
});

// Req 9: create the endpoint GET /talker/search?rate=rateNumber to search talkers by rate.

talkerRouter.get(
  '/search',
  validateToken,
  validateRate,
  validateWatchedAt,
  async (req, res) => {
  const { rate, q } = req.query;
  const talkers = await readFile();

  const filteredByName = filterTalkersByName(talkers, q);

  if (!rate) {
    return res.status(HTTP_OK_STATUS).json(filteredByName);
  }

  const filteredTalkers = filteredByName
    .filter((talker) => talker.rate === Number(rate));

  if (!filteredTalkers.length) {
    return res.status(HTTP_OK_STATUS).json([]);
  }

  return res.status(HTTP_OK_STATUS).json(filteredTalkers);
},
);

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