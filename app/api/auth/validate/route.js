import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isTokenValid } from "@/utils/auth/validate-token";

/**
 * API route to check if the JWT token stored in cookies is valid.
 * Used for client-side auth checks (e.g. redirecting to /account if already logged in).
 */

export async function GET() {
  const token = cookies().get("token")?.value;

  const isValid = token ? await isTokenValid(token) : false;

  return NextResponse.json({ isValid });
}
