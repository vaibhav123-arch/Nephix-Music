const RecentlyPlayed = require("../models/RecentlyPlayed.model");
const asyncHandler = require("../utils/AsyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } = require("../config/constants");

const getRecentlyPlayed = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);

  const history = await RecentlyPlayed.find({ user: req.user._id })
    .sort({ playedAt: -1 })
    .limit(limit)
    .populate({
      path: "song",
      populate: [
        { path: "artist", select: "name" },
        { path: "album", select: "title coverImage" },
      ],
    });

  return res.status(200).json(new ApiResponse(200, { history }));
});

const clearHistory = asyncHandler(async (req, res) => {
  await RecentlyPlayed.deleteMany({ user: req.user._id });
  return res.status(200).json(new ApiResponse(200, {}, "Listening history cleared"));
});

module.exports = { getRecentlyPlayed, clearHistory };