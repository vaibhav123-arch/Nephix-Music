import axiosInstance from "./axiosInstance";


export const loginUser = (data) => axiosInstance.post("/auth/login", data);
export const logoutUser = () => axiosInstance.post("/auth/logout");
export const getCurrentUser = () => axiosInstance.get("/auth/me");
export const googleLoginApi = (credential) => axiosInstance.post("/auth/google", { credential });