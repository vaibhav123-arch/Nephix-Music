import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  googleLoginApi,
} from "../api/auth.api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const login = async (credentials) => {
    const res = await loginUser(credentials);
    setUser(res.data.data.user);
    return res.data;
  };

  const googleLogin = async (credential) => {
    const res = await googleLoginApi(credential);
    setUser(res.data.data.user);
    return res.data;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

