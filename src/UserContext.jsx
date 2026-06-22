import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserIdState] = useState("");
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUserId = localStorage.getItem("userId");
    if (savedToken) setAuthToken(savedToken);
    if (savedUserId) setUserIdState(savedUserId);
  }, []);

  const saveToken = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const setUserId = (id) => {
    localStorage.setItem("userId", id);
    setUserIdState(id);
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setAuthToken("");
    setUserIdState("");
  };

  return (
    <UserContext.Provider
      value={{ userId, setUserId, authToken, saveToken, removeToken }}
    >
      {children}
    </UserContext.Provider>
  );
};