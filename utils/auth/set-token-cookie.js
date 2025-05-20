"use server";

import { cookies } from "next/headers";

export async function setTokenCookie(token) {
  const cookieStore = cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
    domain: process.env.NODE_ENV === "production" ? ".zkrstic.com" : undefined,
  });
}
