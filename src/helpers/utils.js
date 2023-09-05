const fs = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, '../talker.json');

const readFile = async () => {
  try {
    const data = await fs.readFile(talkersPath);
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Could not read file: ${err.message}`);
  }
};

const handleError = (err, _req, res, _next) => {
  console.error(err.message);
  return res.status(err.cause).json({
    message: err.message,
  });
};

module.exports = {
  readFile,
  handleError,
};