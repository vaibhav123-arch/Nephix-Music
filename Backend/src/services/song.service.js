const Song = require("../models/song.model");
const RecentlyPlayed = require("../models/RecentlyPlayed.model");
const { RECENTLY_PLAYED_LIMIT } = require("../config/constants");

const getAdjacentSong = async (currentSongId, direction) => {
  const current = await Song.findById(currentSongId);

  if (!current) return null;

  const comparator =
    direction === "next"
      ? { $gt: current.tracknumber }
      : { $lt: current.tracknumber };

  const sortOrder = direction === "next" ? 1 : -1;

  let adjacent = await Song.findOne({
    album: current.album,
    tracknumber: comparator,
  }).sort({ tracknumber: sortOrder });

  if (!adjacent) {
    adjacent = await Song.findOne({ album: current.album }).sort({
      tracknumber: direction === "next" ? 1 : -1,
    });
  }

  return adjacent;
};

const recordPlay = async (userId, songId) => {
  await Song.findByIdAndUpdate(songId, { $inc: { playcount: 1 } });

  await RecentlyPlayed.create({
    user: userId,
    song: songId,
  });

  const count = await RecentlyPlayed.countDocuments({ user: userId });

  if (count > RECENTLY_PLAYED_LIMIT) {
    const excess = await RecentlyPlayed.find({ user: userId })
      .sort({ playedAt: 1 })
      .limit(count - RECENTLY_PLAYED_LIMIT);

    const excessIds = excess.map((doc) => doc._id);

    await RecentlyPlayed.deleteMany({
      _id: { $in: excessIds },
    });
  }
};

module.exports = { getAdjacentSong, recordPlay };