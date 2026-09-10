import axiosInstance from "./axiosInstance";

export const searchYouTube = (query) => {
  return axiosInstance.get("/youtube/search", {
    params: { query },
  });
};