"use server";

import { cookies } from "next/headers";

export default async function Account() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-red-500">No token found.</p>
      </div>
    );
  }

  try {
    const res = await fetch(
      "https://estore.zkrstic.com/wp-json/wp/v2/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    const user = await res.json();

    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p>{user.email}</p>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-red-500">Error fetching user data.</p>
      </div>
    );
  }
}
