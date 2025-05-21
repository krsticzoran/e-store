// Verifies if a given JWT token is still valid by sending a request
// to the WordPress JWT validation endpoint.

export async function isTokenValid(token) {
  try {
    const res = await fetch(
      "https://estore.zkrstic.com/wp-json/jwt-auth/v1/token/validate",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      },
    );
    // If the response is OK (status 200), the token is valid
    return res.ok;
  } catch {
    // If an error occurs (e.g. network error), treat token as invalid
    return false;
  }
}
