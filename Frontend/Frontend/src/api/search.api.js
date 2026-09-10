import axiosInstance from "./axiosInstance";

export const searchSongs = (query) =>
  axiosInstance.get("/search/songs", {
    params: { query },
  });

export const searchAlbums = (query) =>
  axiosInstance.get("/search/albums", {
    params: { query },
  });

export const searchArtists = (query) =>
  axiosInstance.get("/search/artists", {
    params: { query },
  });

export const searchSuggestions = (query) =>
  axiosInstance.get("/search/suggestions", {
    params: { query },
  });