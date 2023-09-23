const filterTalkersByDate = (talkers, watchedAt) => talkers
  .filter((talker) => {
    console.log(talker, watchedAt);
    return talker.talk.watchedAt === watchedAt;
  });   

module.exports = filterTalkersByDate;