"use client";

import { createContext, useState } from "react";

const UserContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
});

const UserProvider = ({ children, initalUser }) => {
  const [user, setUser] = useState(initalUser);

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
