const asyncHandler = require("../utils/AsyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const { searchYouTubeVideos } = require("../services/youtube.service");

const searchYouTube = asyncHandler(async (req, res) => {
  const { query = "" } = req.query;

  if (!query.trim()) {
    return res.status(400).json(
      new ApiResponse(400, null, "Search query is required")
    );
  }

  const videos = await searchYouTubeVideos(query);

  const songs = videos.map((video) => ({
    videoId: video.id.videoId,
    title: video.snippet.title,
    channel: video.snippet.channelTitle,
    thumbnail:
      video.snippet.thumbnails.high?.url ||
      video.snippet.thumbnails.medium?.url ||
      video.snippet.thumbnails.default?.url,
  }));

  return res.status(200).json(
    new ApiResponse(
      200,
      { songs },
      "YouTube songs fetched successfully"
    )
  );
});

module.exports = {
  searchYouTube,
};