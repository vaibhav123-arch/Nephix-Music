const Artist = require("../models/artist.model");
const Album = require("../models/album.model");
const asyncHandler = require("../utils/AsyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Song = require("../models/song.model");

const getAllArtists = asyncHandler(async (req, res) => {
  const artists = await Artist.find();
  return res.status(200).json(new ApiResponse(200, { artists }));
});

const getArtistById = asyncHandler(async (req, res) => {
  const artist = await Artist.findById(req.params.id);

  if (!artist) {
    throw new ApiError(404, "Artist not found");
  }

  const albums = await Album.find({
    artist: artist._id,
  }).sort({ releaseDate: -1 });

  const songs = await Song.find({
    artist: artist._id,
  })
    .populate("artist", "name image")
    .populate("album", "title coverImage")
    .sort({ tracknumber: 1 });

  return res.status(200).json(
    new ApiResponse(200, {
      artist,
      albums,
      songs,
    })
  );
});

module.exports = { getAllArtists, getArtistById };