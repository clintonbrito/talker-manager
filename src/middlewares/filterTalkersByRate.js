const filterTalkersByRate = (talkers, rate) => talkers
  .filter((talker) => talker.talk.rate === +rate);

module.exports = filterTalkersByRate;