function filterTalkersByName(talkers, q) {
  return talkers.filter((talker) =>
    talker.name.toLowerCase().includes(q.toLowerCase()));
}

module.exports = filterTalkersByName;