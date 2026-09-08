import axiosInstance from "./axiosInstance";

export const getRecentlyPlayed = (limit) => axiosInstance.get("/history", { params: { limit } });
export const clearHistory = () => axiosInstance.delete("/history");