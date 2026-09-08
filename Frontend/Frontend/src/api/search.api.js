import axiosInstance from "./axiosInstance";

export const searchSongs = (params) => axiosInstance.get("/search/songs", { params });
export const searchAlbums = (query) => axiosInstance.get("/search/albums", { params: { query } });
export const searchArtists = (query) => axiosInstance.get("/search/artists", { params: { query } });