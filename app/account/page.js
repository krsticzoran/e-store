import getUser from "@/services/get-user";

export default async function Account() {
  const user = await getUser();

  if (!user.success) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-red-500">Error fetching user data.</p>
      </div>
    );
  }

  console.log(user);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome,{user.data.username}</h1>
      <p>{user.data.email}</p>
    </div>
  );
}
