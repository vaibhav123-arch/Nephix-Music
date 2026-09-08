import axiosInstance from "./axiosInstance";

export const getAllSongs = () => axiosInstance.get("/songs");
export const getSongById = (id) => axiosInstance.get(`/songs/${id}`);
export const playSong = (id) => axiosInstance.post(`/songs/${id}/play`);
export const getNextSong = (id) => axiosInstance.get(`/songs/${id}/next`);
export const getPreviousSong = (id) => axiosInstance.get(`/songs/${id}/previous`);