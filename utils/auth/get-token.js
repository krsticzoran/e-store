import { cookies } from "next/headers";

// Function to retrieve the authentication token from cookies
export default function getToken() {
  // Access the cookie store from the request headers (only available on the server)
  const cookieStore = cookies();

  // Attempt to retrieve the value of the "token" cookie
  const token = cookieStore.get("token")?.value;

  // Return the token if found, otherwise return null
  return token || null;
}
