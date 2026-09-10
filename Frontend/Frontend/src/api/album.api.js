import axiosInstance from "./axiosInstance"

export const getAllAlbums = () => axiosInstance.get("/albums");
export const getAlbumById = (id) => axiosInstance.get(`/albums/${id}`);
export const getAlbumsByArtist = (artistId) => axiosInstance.get(`/albums/artist/${artistId}`);
