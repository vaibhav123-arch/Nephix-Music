const Song = require("../models/song.model");
const Album = require("../models/album.model");
const Artist = require("../models/artist.model");

const buildTextFilter = (field, query) => ({ [field]: { $regex: query, $options: "i" } });

const searchSongs = async ({ query, genre, artistId, albumId, page = 1, limit = 20 }) => {
  const filter = {};
  if (query) Object.assign(filter, buildTextFilter("title", query));
  if (genre) filter.genre = genre;
  if (artistId) filter.artist = artistId;
  if (albumId) filter.album = albumId;

  const skip = (page - 1) * limit;

  const [results, total] = await Promise.all([
    Song.find(filter).populate("artist", "name").populate("album", "title coverImage").skip(skip).limit(limit),
    Song.countDocuments(filter),
  ]);

  return { results, total, page, limit };
};

const searchAlbums = async (query) => Album.find(buildTextFilter("title", query)).populate("artist", "name");
const searchArtists = async (query) => Artist.find(buildTextFilter("name", query));

module.exports = { searchSongs, searchAlbums, searchArtists };