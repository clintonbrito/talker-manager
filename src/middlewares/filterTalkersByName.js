function filterTalkersByName(talkers, q) {
  return talkers.filter((talker) =>
    talker.name.includes(q));
}

module.exports = filterTalkersByName;