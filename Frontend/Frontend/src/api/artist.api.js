import axiosInstance from "./axiosInstance";

export const getAllArtists = () => axiosInstance.get("/artists");
export const getArtistById = (id) => axiosInstance.get(`/artists/${id}`);