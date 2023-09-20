function filterTalkersByRate(talkers, rate) {
  return talkers.filter((talker) => Number
    .isInteger(talker.talk.rate) && talker.talk.rate === rate);
}

module.exports = filterTalkersByRate;