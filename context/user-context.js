"use client";

import { createContext, useState } from "react";

const UserContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
