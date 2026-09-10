import axiosInstance from "./axiosInstance";

export const getRecentlyPlayed = () => {
  return axiosInstance.get("/recently-played");
};