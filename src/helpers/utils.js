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
  const statusCode = err.cause ? err.cause : 500;
  return res.status(statusCode).json({ message: err.message });
};

// app.use((err, req, res, next) => {
//   const { status, message } = err;
//   res.status(status).json({ message });
// });

module.exports = {
  readFile,
  handleError,
};