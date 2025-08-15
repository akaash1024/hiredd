import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // const userAuthentication = async () => {
  //   try {
  //     setIsLoading(true);
  //      const { data } = await api.get("/api/auth/me");
  //     setUser(data.userData);
  //   } catch (err) {
  //     setUser(null);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const LogoutUser = async () => {
  //   await api.get("/api/auth/logout");
  //   setUser(null);
  // };

  useEffect(() => {
    // userAuthentication();
  }, []);

  let value = {
    api,
    user,
    isLoading,
    isLoggedIn: !!user,
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    // LogoutUser,
    // userAuthentication,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
