import { NextResponse } from "next/server";

// Middleware function to protect specific routes
export async function middleware(request) {
  // Retrieve the token from the request cookies
  const token = request.cookies.get("token")?.value;

  // If no token is present, redirect to the homepage
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Validate the token by calling the WordPress JWT validation endpoint
  const res = await fetch(
    "https://estore.zkrstic.com/wp-json/jwt-auth/v1/token/validate",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  // If the token is invalid, redirect to the homepage
  if (!res.ok) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If token is valid, allow the request to proceed
  return NextResponse.next();
}

// Apply this middleware only to the /account and its nested routes
export const config = {
  matcher: "/account/:path*",
};
