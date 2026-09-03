const asyncHandler = require("../utils/AsyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const { searchSongs, searchAlbums, searchArtists } = require("../services/search.service");
const { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } = require("../config/constants");

const searchSongsHandler = asyncHandler(async (req, res) => {
  const { query = "", genre, artistId, albumId, page = 1, limit = DEFAULT_PAGE_SIZE } = req.query;
  const safeLimit = Math.min(Number(limit) || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);

  const data = await searchSongs({ query, genre, artistId, albumId, page: Number(page) || 1, limit: safeLimit });
  return res.status(200).json(new ApiResponse(200, data));
});

const searchAlbumsHandler = asyncHandler(async (req, res) => {
  const { query = "" } = req.query;
  const albums = await searchAlbums(query);
  return res.status(200).json(new ApiResponse(200, { albums }));
});

const searchArtistsHandler = asyncHandler(async (req, res) => {
  const { query = "" } = req.query;
  const artists = await searchArtists(query);
  return res.status(200).json(new ApiResponse(200, { artists }));
});

module.exports = { searchSongsHandler, searchAlbumsHandler, searchArtistsHandler };