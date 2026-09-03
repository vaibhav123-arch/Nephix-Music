const Album = require("../models/album.model");
const Song = require("../models/song.model");
const asyncHandler = require("../utils/AsyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const getAllAlbums = asyncHandler(async (req, res) => {
  const albums = await Album.find().populate("artist", "name image");
  return res.status(200).json(new ApiResponse(200, { albums }));
});

const getAlbumById = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.id).populate("artist", "name image");
  if (!album) throw new ApiError(404, "Album not found");
  const songs = await Song.find({ album: album._id }).sort({ trackNumber: 1 });
  return res.status(200).json(new ApiResponse(200, { album, songs }));
});

const getAlbumsByArtist = asyncHandler(async (req, res) => {
  const albums = await Album.find({ artist: req.params.artistId }).sort({ releaseDate: -1 });
  return res.status(200).json(new ApiResponse(200, { albums }));
});

module.exports = { getAllAlbums, getAlbumById, getAlbumsByArtist };