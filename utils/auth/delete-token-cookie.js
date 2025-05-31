"use server";

import { cookies } from "next/headers";

export async function deleteTokenCookie() {
  const cookieStore = cookies();
  cookieStore.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, // This deletes the cookie
    sameSite: "lax",
    domain: process.env.NODE_ENV === "production" ? ".zkrstic.com" : undefined,
  });
}
