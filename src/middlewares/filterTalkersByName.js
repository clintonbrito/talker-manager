const filterTalkersByName = (talkers, q) => talkers
  .filter((talker) => talker.name.includes(q));

module.exports = filterTalkersByName;