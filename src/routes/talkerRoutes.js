const express = require('express');
const { readFile } = require('../helpers/utils');
const { validateTalkerById } = require('../middlewares/validateTalker');

const router = express.Router();

const HTTP_OK_STATUS = 200;

// Req 1: create the endpoint GET /talker to return the list of talkers registered in talker.json.

router.get('/', async (_req, res) => {
  const talkers = await readFile();
  if (!talkers) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
    return res.status(HTTP_OK_STATUS).json(talkers);
});

// Req 2: create the endpoint GET /talker/:id to return the talker with the given id.

router.get('/:id', validateTalkerById, async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readFile();
    const talkerId = talkers.find((talker) => talker.id === Number(id));
    return res.status(HTTP_OK_STATUS).json(talkerId);
  } catch (err) {
    throw new Error(`Could not find talker: ${err.message}`);
  }
});

module.exports = router;