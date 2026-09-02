const Song = require("../models/song.model");
const asyncHandler = require("../utils/AsyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { getAdjacentSong, recordPlay } = require("../services/song.service");

const getSongById = asyncHandler(async (req, res) => {
  const song = await Song.findById(req.params.id).populate("artist", "name image").populate("album", "title coverImage");
  if (!song) throw new ApiError(404, "Song not found");
  return res.status(200).json(new ApiResponse(200, { song }));
});

const playSong = asyncHandler(async (req, res) => {
  const song = await Song.findById(req.params.id);
  if (!song) throw new ApiError(404, "Song not found");
  await recordPlay(req.user._id, song._id);
  return res.status(200).json(new ApiResponse(200, { song }, "Now playing"));
});

const nextSong = asyncHandler(async (req, res) => {
  const next = await getAdjacentSong(req.params.id, "next");
  if (!next) throw new ApiError(404, "No next song available");
  return res.status(200).json(new ApiResponse(200, { song: next }));
});

const previousSong = asyncHandler(async (req, res) => {
  const previous = await getAdjacentSong(req.params.id, "previous");
  if (!previous) throw new ApiError(404, "No previous song available");
  return res.status(200).json(new ApiResponse(200, { song: previous }));
});

module.exports = { getSongById, playSong, nextSong, previousSong };