const asyncHandler = require("../utils/AsyncHandler");

const ApiResponse = require("../utils/ApiResponse");

const {
  searchSongs,
  searchAlbums,
  searchArtists,
} = require("../services/search.service");

const { searchYouTubeVideos } = require("../services/youtube.service");

// ==================== SEARCH SONGS ====================

const searchSongsHandler = asyncHandler(async (req, res) => {
  const {
    query = "",
    genre,
    artistId,
    albumId,
    page = 1,
    limit = 20,
  } = req.query;

  const data = await searchSongs({
    query,
    genre,
    artistId,
    albumId,
    page: Number(page) || 1,
    limit: Number(limit) || 20,
  });

  return res.status(200).json(
    new ApiResponse(200, data)
  );
});

// ==================== SEARCH ALBUMS ====================

const searchAlbumsHandler = asyncHandler(async (req, res) => {
  const { query = "" } = req.query;

  const albums = await searchAlbums(query);

  return res.status(200).json(
    new ApiResponse(200, { albums })
  );
});

// ==================== SEARCH ARTISTS ====================

const searchArtistsHandler = asyncHandler(async (req, res) => {
  const { query = "" } = req.query;

  const artists = await searchArtists(query);

  return res.status(200).json(
    new ApiResponse(200, { artists })
  );
});

// ==================== YOUTUBE SUGGESTIONS ====================

const searchSuggestionsHandler = asyncHandler(async (req, res) => {
  const { query = "" } = req.query;

  console.log("YOUTUBE SUGGESTION QUERY:", query);

  if (!query.trim()) {
    return res.status(200).json(
      new ApiResponse(200, {
        songs: [],
      })
    );
  }

  const results = await searchYouTubeVideos(query);

  const suggestions = results.slice(0, 5).map((video) => ({
    videoId: video.id.videoId,
    title: video.snippet.title,
    channel: video.snippet.channelTitle,
    thumbnail: video.snippet.thumbnails?.medium?.url || "",
  }));

  return res.status(200).json(
    new ApiResponse(200, {
      songs: suggestions,
    })
  );
});

// ==================== EXPORTS ====================

module.exports = {
  searchSongsHandler,
  searchAlbumsHandler,
  searchArtistsHandler,
  searchSuggestionsHandler,
};