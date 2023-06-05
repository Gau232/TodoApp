import React, { createContext, useContext, useState } from "react";
import usersData from "../userInfo.json";

const MyContext = createContext();

export function useAuth() {
  return useContext(MyContext);
}

export function MyAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState("");

  const login = (email, password) => {
    const user = usersData.users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      console.log(userData);
      setIsAuthenticated(true);
    }
    setUserData(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    userData,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}
