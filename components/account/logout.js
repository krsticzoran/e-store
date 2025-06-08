"use client";

import { useRouter } from "next/navigation";
import { deleteTokenCookie } from "@/utils/auth/delete-token-cookie";
import { useContext } from "react";
import { UserContext } from "@/context/user-context";

export default function Logout() {
  const router = useRouter();
  const { logout } = useContext(UserContext);
  console.log(logout);

  // Handle user logout: delete token cookie and redirect to homepage
  const handleLogout = async () => {
    try {
      logout();
      await deleteTokenCookie();

      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-secondary px-3 py-2 text-sm font-bold uppercase tracking-[1px] text-white transition duration-500 hover:text-primary"
    >
      Logout
    </button>
  );
}
