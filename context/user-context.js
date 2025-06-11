"use client";

import { createContext, useState } from "react";

const UserContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
});

const UserProvider = ({ children, initallUser }) => {
  const [user, setUser] = useState(initallUser);

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
