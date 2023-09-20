function filterTalkersByRate(talkers, rate) {
  return talkers.filter((talker) => talker.talk.rate === +rate);
}

module.exports = filterTalkersByRate;