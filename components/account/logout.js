"use client";

import { useRouter } from "next/navigation";
import { deleteTokenCookie } from "@/utils/auth/delete-token-cookie";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async function () {
    await deleteTokenCookie();
    router.push("/");
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
