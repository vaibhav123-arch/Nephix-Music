const Song = require("../models/song.model");
const Album = require("../models/album.model");
const Artist = require("../models/artist.model");

// ==================== HELPER ====================

const buildTextFilter = (field, query) => ({
  [field]: {
    $regex: query,
    $options: "i",
  },
});

// ==================== SEARCH SONGS ====================

const searchSongs = async ({
  query,
  genre,
  artistId,
  albumId,
  page = 1,
  limit = 20,
}) => {
  const filter = {};

  if (query) {
    Object.assign(
      filter,
      buildTextFilter("title", query)
    );
  }

  if (genre) {
    filter.genre = genre;
  }

  if (artistId) {
    filter.artist = artistId;
  }

  if (albumId) {
    filter.album = albumId;
  }

  const skip = (page - 1) * limit;

  const [results, total] = await Promise.all([
    Song.find(filter)
      .populate("artist", "name")
      .populate("album", "title coverImage")
      .skip(skip)
      .limit(limit),

    Song.countDocuments(filter),
  ]);

  return {
    results,
    total,
    page,
    limit,
  };
};

// ==================== SEARCH ALBUMS ====================

const searchAlbums = async (query) => {
  return Album.find(
    buildTextFilter("title", query)
  ).populate("artist", "name");
};

// ==================== SEARCH ARTISTS ====================

const searchArtists = async (query) => {
  return Artist.find(
    buildTextFilter("name", query)
  );
};

// ==================== EXPORTS ====================

module.exports = {
  searchSongs,
  searchAlbums,
  searchArtists,
};