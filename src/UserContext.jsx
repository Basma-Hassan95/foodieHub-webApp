import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) setAuthToken(savedToken);
  }, []);

  const saveToken = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
    setAuthToken("");
    setUserId("");
  };

  return (
    <UserContext.Provider
      value={{ userId, setUserId, authToken, saveToken, removeToken }}
    >
      {children}
    </UserContext.Provider>
  );
};
