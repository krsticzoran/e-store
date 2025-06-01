"use server";

import { cookies } from "next/headers";

// Deletes the "token" cookie by setting it with an empty value and maxAge 0
export async function deleteTokenCookie() {
  const cookieStore = cookies();

  // Setting the token cookie with maxAge: 0 effectively deletes it
  cookieStore.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, // Instructs the browser to immediately expire the cookie
    sameSite: "lax", // Helps protect against CSRF
    domain: process.env.NODE_ENV === "production" ? ".zkrstic.com" : undefined,
  });
}
