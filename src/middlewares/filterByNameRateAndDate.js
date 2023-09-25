// const { readFile } = require('../helpers/utils');
// const filterTalkersByName = require('./filterTalkersByName');
// // const filterTalkersByDate = require('./filterTalkersByDate');

// const HTTP_OK_STATUS = 200;

// // eslint-disable-next-line max-lines-per-function, complexity
// const filterByNameRateAndDate = async (req, res, next) => {
//   const { rate, q, date } = req.query;
//   const rateNumber = Number(rate);
//   const talkers = await readFile();

//   const filteredByName = filterTalkersByName(talkers, q);
//   // const filteredByDate = filterTalkersByDate(talkers, date);

//   if (q && rateNumber && date) {
//     const filteredTalkersByName = filteredByName
//       .filter((talker) => talker.talk.rate === +rate);

//     const filteredTalkersByDate = filteredTalkersByName
//       .filter((talker) => talker.talk.watchedAt === date);

//     if (!filteredTalkersByDate.length || !filteredTalkersByName.length) {
//       return res.status(HTTP_OK_STATUS).json([]);
//     }

//     return res.status(HTTP_OK_STATUS).json(filteredTalkersByName);
//   }
//   next();
// };

// module.exports = filterByNameRateAndDate;