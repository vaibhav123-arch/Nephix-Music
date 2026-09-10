import axiosInstance from "./axiosInstance";

export const getRecentlyPlayed = (limit) =>
  axiosInstance.get("/history", {
    params: { limit },
  });

export const clearHistory = () =>
  axiosInstance.delete("/history");

export const addYouTubeRecentlyPlayed = (song) =>
  axiosInstance.post("/history/youtube", {
    videoId: song.videoId,
    title: song.title,
    channel: song.channel,
    thumbnail: song.thumbnail,
  });
