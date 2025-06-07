"use client";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/user-context";

export default function UserContextInitializer({ user }) {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return null;
}
