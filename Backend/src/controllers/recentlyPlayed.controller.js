const RecentlyPlayed = require("../models/recentlyPlayed.model");
const asyncHandler = require("../utils/AsyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const getRecentlyPlayed = asyncHandler(async (req, res) => {
  const recentlyPlayed = await RecentlyPlayed.find({
    user: req.user._id,
  })
    .sort({ playedAt: -1 })
    .limit(20)
    .populate({
      path: "song",
      populate: [
        { path: "artist", select: "name image" },
        { path: "album", select: "title coverImage" },
      ],
    });

  return res.status(200).json(
    new ApiResponse(200, { recentlyPlayed })
  );
});

const addYouTubeRecentlyPlayed = asyncHandler(async (req, res) => {
  const {
    videoId,
    title,
    channel,
    thumbnail,
  } = req.body;

  const recentlyPlayed = await RecentlyPlayed.create({
    user: req.user._id,
    youtubeVideoId: videoId,
    youtubeTitle: title,
    youtubeChannel: channel,
    youtubeThumbnail: thumbnail,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      { recentlyPlayed },
      "YouTube song added to recently played"
    )
  );
});

module.exports = {
  getRecentlyPlayed,
  addYouTubeRecentlyPlayed,
};