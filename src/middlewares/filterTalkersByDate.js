const filterTalkersByDate = (talkers, watchedAt) => talkers
  .filter((talker) => talker.talk.watchedAt === watchedAt);   

module.exports = filterTalkersByDate;