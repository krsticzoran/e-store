"use server";

import { cookies } from "next/headers";

export async function setTokenCookie(token) {
  const cookieStore = cookies();
  cookieStore.set("token", token, {
    httpOnly: true, // Makes the cookie inaccessible to JavaScript
    secure: process.env.NODE_ENV === "production",
    path: "/", // Makes the cookie available throughout the site
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
    domain: process.env.NODE_ENV === "production" ? ".zkrstic.com" : undefined,
  });
}
