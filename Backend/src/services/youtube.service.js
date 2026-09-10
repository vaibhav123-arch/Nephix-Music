const axios = require("axios");

const { youtubeApiKey } = require("../config/env");

const searchYouTubeVideos = async (query) => {
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        key: youtubeApiKey,
        part: "snippet",
        q: `${query} official audio`,
        type: "video",
        videoCategoryId: "10",
        videoEmbeddable: "true",
        videoSyndicated: "true",
        regionCode: "IN",
        maxResults: 20,
        order: "relevance",
      },
    }
  );

  return response.data.items;
};

module.exports = {
  searchYouTubeVideos,
};
